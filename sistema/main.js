const { app, BrowserWindow, ipcMain, shell, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const SCRIPTS = [
  'core.js', 'geradores/logica.js', 'geradores/rastreio.js', 'geradores/programacao.js',
  'geradores/web-comum.js', 'geradores/web-html.js', 'geradores/web-css.js', 'pdf.js',
  'conteudo/apostila1.js', 'conteudo/apostila2.js', 'conteudo/apostila3.js', 'conteudo/apostila4.js',
  'conteudo/apostila5.js', 'conteudo/apostila6.js', 'conteudo/apostila7.js', 'conteudo/apostila8.js'
];

/* ---------------- Configuração ---------------- */
const arquivoConfig = () => path.join(app.getPath('userData'), 'config.json');
const pastaPadrao = () => path.join(app.getPath('documents'), 'Kovex Estudos', 'Apostilas');

function lerConfig() {
  try { return Object.assign({ pastaApostilas: pastaPadrao() }, JSON.parse(fs.readFileSync(arquivoConfig(), 'utf8'))); }
  catch { return { pastaApostilas: pastaPadrao() }; }
}
function salvarConfig(cfg) {
  fs.mkdirSync(path.dirname(arquivoConfig()), { recursive: true });
  fs.writeFileSync(arquivoConfig(), JSON.stringify(cfg, null, 2), 'utf8');
}

/* ---------------- PDF ---------------- */
async function htmlParaPdf(html, destino, rodape) {
  const tmp = path.join(os.tmpdir(), `kovex-${Date.now()}-${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(tmp, html, 'utf8');
  const win = new BrowserWindow({ show: false, webPreferences: { javascript: false } });
  try {
    await win.loadFile(tmp);
    const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const pdf = await win.webContents.printToPDF({
      printBackground: true,
      preferCSSPageSize: true,
      margins: { top: 0.63, bottom: 0.71, left: 0.59, right: 0.59 },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="font-family:'Segoe UI',Arial,sans-serif;font-size:7.5px;color:#94a3b8;width:100%;padding:0 15mm;display:flex;justify-content:space-between;"><span>Kovex Estudos · ${esc(rodape)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`
    });
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, pdf);
    return destino;
  } finally {
    win.destroy();
    fs.rm(tmp, { force: true }, () => {});
  }
}

/* Gera todas as apostilas em uma pasta (modo linha de comando) */
async function gerarTodasApostilas(pasta) {
  SCRIPTS.forEach((f) => require(path.join(__dirname, 'src', 'js', f)));
  const KX = globalThis.KX;
  for (const ap of KX.apostilas) {
    const destino = path.join(pasta, ap.arquivo);
    await htmlParaPdf(KX.pdf.apostilaHTML(ap), destino, `Apostila ${String(ap.numero).padStart(2, '0')} · ${ap.titulo}`);
    console.log('Gerado:', destino);
  }
}

/* ---------------- Janela ---------------- */
let janela;
function criarJanela() {
  janela = new BrowserWindow({
    width: 1320, height: 860, minWidth: 980, minHeight: 640,
    title: 'Kovex Estudos',
    backgroundColor: '#0f172a',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
  janela.once('ready-to-show', () => janela.show());
  // links externos abrem no navegador
  janela.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  janela.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); } });
  janela.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F12') janela.webContents.toggleDevTools();
    if (input.type === 'keyDown' && input.control && input.key === '=') janela.webContents.setZoomLevel(janela.webContents.getZoomLevel() + 0.5);
    if (input.type === 'keyDown' && input.control && input.key === '-') janela.webContents.setZoomLevel(janela.webContents.getZoomLevel() - 0.5);
    if (input.type === 'keyDown' && input.control && input.key === '0') janela.webContents.setZoomLevel(0);
  });
}

/* ---------------- IPC ---------------- */
function registrarIpc() {
  ipcMain.handle('config:obter', () => ({ ...lerConfig(), padrao: pastaPadrao() }));

  ipcMain.handle('config:escolherPasta', async () => {
    const cfg = lerConfig();
    const r = await dialog.showOpenDialog(janela, {
      title: 'Escolha a pasta onde as apostilas e listas serão salvas',
      defaultPath: cfg.pastaApostilas,
      properties: ['openDirectory', 'createDirectory']
    });
    if (r.canceled || !r.filePaths[0]) return null;
    cfg.pastaApostilas = r.filePaths[0];
    salvarConfig(cfg);
    return cfg.pastaApostilas;
  });

  ipcMain.handle('pdf:salvar', async (_e, { html, nomeArquivo, subpasta, rodape }) => {
    const cfg = lerConfig();
    const seguro = String(nomeArquivo).replace(/[<>:"/\\|?*]/g, '-');
    const destino = path.join(cfg.pastaApostilas, subpasta ? String(subpasta).replace(/[<>:"/\\|?*]/g, '-') : '', seguro);
    try {
      await htmlParaPdf(html, destino, rodape || seguro.replace(/\.pdf$/i, ''));
      return { ok: true, caminho: destino };
    } catch (err) {
      const msg = err.code === 'EBUSY' || err.code === 'EPERM'
        ? 'O arquivo está aberto em outro programa. Feche o PDF e tente novamente.'
        : err.message;
      return { ok: false, erro: msg };
    }
  });

  ipcMain.handle('arquivos:existem', (_e, nomes) => {
    const pasta = lerConfig().pastaApostilas;
    const r = {};
    for (const n of nomes) r[n] = fs.existsSync(path.join(pasta, n));
    return r;
  });

  ipcMain.handle('arquivo:abrir', async (_e, nome) => {
    const pasta = lerConfig().pastaApostilas;
    const alvo = path.resolve(pasta, nome);
    if (!alvo.startsWith(path.resolve(pasta))) return 'Caminho inválido';
    return shell.openPath(alvo);
  });

  ipcMain.handle('pasta:abrir', async (_e, sub) => {
    const pasta = path.join(lerConfig().pastaApostilas, sub || '');
    fs.mkdirSync(pasta, { recursive: true });
    return shell.openPath(pasta);
  });

  ipcMain.handle('app:versao', () => app.getVersion());
}

/* ---------------- Inicialização ---------------- */
const idxCli = process.argv.indexOf('--gerar-apostilas');
if (idxCli !== -1) {
  const pasta = path.resolve(process.argv[idxCli + 1] || path.join(process.cwd(), 'apostilas'));
  app.whenReady().then(async () => {
    try { await gerarTodasApostilas(pasta); } catch (e) { console.error(e); process.exitCode = 1; }
    app.quit();
  });
  app.on('window-all-closed', () => {});
} else {
  if (!app.requestSingleInstanceLock()) {
    app.quit();
  } else {
    app.on('second-instance', () => { if (janela) { if (janela.isMinimized()) janela.restore(); janela.focus(); } });
    app.whenReady().then(() => {
      Menu.setApplicationMenu(null);
      registrarIpc();
      criarJanela();
    });
    app.on('window-all-closed', () => app.quit());
  }
}
