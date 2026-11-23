/* Monta o HTML das apostilas e listas de exercícios (usado para gerar PDF e para leitura no app). */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const P = (KX.pdf = {});

  const CSS = `
@page { size: A4; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-size: 10.5pt; line-height: 1.55; color: #1f2430; margin: 0; background: #fff; }
h1, h2, h3 { color: #111827; line-height: 1.25; }
h2.cap { font-size: 20pt; margin: 0 0 4mm; padding-bottom: 3mm; border-bottom: 3px solid var(--cor); }
h2.cap small { display: block; font-size: 9.5pt; font-weight: 600; color: var(--cor); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 1mm; }
h3 { font-size: 12.5pt; margin: 6mm 0 2mm; color: var(--cor-escura); }
p { margin: 0 0 2.5mm; }
ul, ol { margin: 0 0 3mm; padding-left: 6mm; }
li { margin-bottom: 1mm; }
code { font-family: Consolas, "Cascadia Mono", monospace; font-size: 9.2pt; background: #f1f3f7; padding: 0 1.2mm; border-radius: 3px; }
pre.code { font-family: Consolas, "Cascadia Mono", monospace; font-size: 8.8pt; line-height: 1.45; background: #0f172a; color: #e2e8f0; padding: 3mm 4mm; border-radius: 6px; margin: 2mm 0 4mm; white-space: pre-wrap; word-break: break-word; page-break-inside: avoid; }
pre.code code { background: none; padding: 0; color: inherit; font-size: inherit; }
pre.saida, pre.exemplos { background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0; }
.tk-k { color: #c792ea; } .tk-s { color: #c3e88d; } .tk-n { color: #f78c6c; } .tk-c { color: #7f8ca3; font-style: italic; }
pre.saida .tk-k, pre.exemplos .tk-k { color: #7c3aed; }
table { border-collapse: collapse; margin: 2mm 0 4mm; page-break-inside: avoid; }
table.tabela { width: 100%; font-size: 9.5pt; }
table.tabela th, table.tabela td, table.tv th, table.tv td { border: 1px solid #d5dae3; padding: 1.4mm 2.4mm; text-align: left; vertical-align: top; }
table.tabela th, table.tv th { background: var(--cor-clara); color: var(--cor-escura); }
table.tv td, table.tv th { text-align: center; min-width: 11mm; }
.destaque { font-size: 13pt; font-weight: 600; text-align: center; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 2.5mm; margin: 2mm 0 3mm; }
.destaque.mono { font-family: Consolas, monospace; font-size: 10pt; font-weight: 500; }
.obs { color: #64748b; font-size: 9pt; }
.box { border-radius: 6px; padding: 3mm 4mm; margin: 3mm 0 4mm; page-break-inside: avoid; border-left: 4px solid; }
.box > b { display: block; font-size: 9pt; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 1mm; }
.box.dica { background: #ecfdf5; border-color: #10b981; } .box.dica > b { color: #047857; }
.box.atencao { background: #fff7ed; border-color: #f97316; } .box.atencao > b { color: #c2410c; }
.box.resumo { background: var(--cor-clara); border-color: var(--cor); } .box.resumo > b { color: var(--cor-escura); }
.box.resumo ul { margin: 0; }

/* Capa */
.capa { height: 262mm; display: flex; flex-direction: column; page-break-after: always; }
.capa-topo { background: linear-gradient(135deg, var(--cor-escura), var(--cor)); color: #fff; border-radius: 10px; padding: 18mm 14mm 16mm; flex: 0 0 auto; position: relative; overflow: hidden; }
.capa-topo:after { content: attr(data-icone); position: absolute; right: 8mm; bottom: -14mm; font-size: 120pt; font-weight: 800; opacity: .12; font-family: Consolas, monospace; }
.capa-marca { font-size: 10pt; letter-spacing: .25em; text-transform: uppercase; opacity: .9; font-weight: 600; }
.capa-num { font-size: 11pt; margin-top: 22mm; opacity: .9; }
.capa h1 { color: #fff; font-size: 32pt; margin: 2mm 0 4mm; }
.capa-sub { font-size: 13pt; opacity: .95; max-width: 140mm; }
.capa-nivel { display: inline-block; margin-top: 8mm; background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.45); padding: 1.5mm 5mm; border-radius: 99px; font-weight: 600; }
.capa-corpo { padding: 12mm 4mm 0; flex: 1; }
.capa-corpo h3 { margin-top: 0; }
.sumario { list-style: none; padding: 0; margin: 0; counter-reset: cap; }
.sumario li { counter-increment: cap; display: flex; gap: 4mm; padding: 2.2mm 0; border-bottom: 1px dotted #cbd5e1; font-size: 11pt; }
.sumario li:before { content: counter(cap, decimal-leading-zero); color: var(--cor); font-weight: 700; width: 9mm; }
.capa-rodape { color: #64748b; font-size: 9pt; padding: 0 4mm; }

.capitulo { page-break-before: always; }
.apresentacao { page-break-before: always; }

/* Exercícios */
.exercicios { margin-top: 8mm; padding-top: 4mm; border-top: 2px dashed var(--cor); }
.exercicios > h3 { margin-top: 0; font-size: 14pt; }
.ex { margin: 0 0 5mm; padding: 3mm 4mm; border: 1px solid #e2e8f0; border-radius: 6px; page-break-inside: avoid; }
.ex-cab { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; margin-bottom: 1.5mm; }
.ex-cab b { color: var(--cor-escura); }
.tag { font-size: 7.5pt; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; padding: .6mm 2mm; border-radius: 99px; background: #eef2ff; color: #4338ca; white-space: nowrap; }
.tag.logica { background: #ecfdf5; color: #047857; } .tag.rastreio { background: #fff7ed; color: #c2410c; } .tag.programacao { background: #eff6ff; color: #1d4ed8; }
.tag.html { background: #fff1f2; color: #be123c; } .tag.css { background: #f0f9ff; color: #0369a1; }
.tk-p { color: #82aaff; }
pre.saida .tk-p, pre.exemplos .tk-p { color: #2563eb; }
ul.requisitos { margin-top: 1mm; }
ul.requisitos li { list-style: "☐  "; }
.amostra { display: inline-block; width: 5mm; height: 5mm; border-radius: 3px; vertical-align: -1mm; margin-right: 2mm; border: 1px solid #cbd5e1; }
.demo { border: 1px solid #e2e8f0; border-radius: 6px; padding: 2mm 3mm 3mm; margin: 2mm 0 4mm; page-break-inside: avoid; background: #fbfcfe; }
.demo pre.code { margin: 1mm 0 2mm; }
.demo-res > span { display: block; font-size: 7.5pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #64748b; margin-bottom: 1mm; }
.demo-res iframe { width: 100%; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff; display: block; }
.opcoes { list-style: none; padding: 0; margin: 1mm 0 0; }
.opcoes li { margin: .8mm 0; }
.linha-resp { margin-top: 3mm; border-bottom: 1px solid #94a3b8; height: 6mm; width: 70mm; }
.caixa-resp { margin-top: 3mm; border: 1px solid #cbd5e1; border-radius: 4px; height: 18mm; }
.caixa-codigo { margin-top: 3mm; border: 1px solid #cbd5e1; border-radius: 4px; height: 42mm; background: repeating-linear-gradient(#fff 0 6.9mm, #e2e8f0 6.9mm 7mm); }
.ex-dica { font-size: 8.8pt; color: #64748b; margin-top: 2mm; }
.assinatura { margin-top: 2mm; }

/* Gabarito */
.gabarito { page-break-before: always; }
.gab { margin: 0 0 4mm; padding: 0 0 3mm; border-bottom: 1px solid #e2e8f0; page-break-inside: avoid; }
.gab-cab { font-weight: 700; color: var(--cor-escura); }
.gab-resp { margin: 1mm 0; }
.gab-resp span { background: #ecfdf5; color: #065f46; padding: .5mm 2mm; border-radius: 4px; font-weight: 700; }

/* Lista */
.lista-cab { background: linear-gradient(135deg, var(--cor-escura), var(--cor)); color: #fff; border-radius: 8px; padding: 8mm 10mm; margin-bottom: 6mm; }
.lista-cab h1 { color: #fff; margin: 0 0 1mm; font-size: 22pt; }
.lista-cab p { margin: 0; opacity: .92; }
.campos { display: flex; gap: 6mm; margin: 0 0 6mm; font-size: 10pt; }
.campos div { flex: 1; border-bottom: 1px solid #94a3b8; padding-bottom: 1mm; color: #64748b; }

@media screen {
  body { background: #e9edf3; padding: 24px 12px; }
  .folha { max-width: 210mm; margin: 0 auto; background: #fff; padding: 16mm 15mm; box-shadow: 0 4px 24px rgba(0,0,0,.08); border-radius: 6px; }
  .capitulo, .apresentacao, .gabarito { margin-top: 14mm; padding-top: 10mm; border-top: 1px solid #e2e8f0; }
  .capa { height: auto; margin-bottom: 10mm; }
  .capa-corpo { padding-bottom: 8mm; }
}
@media print { .folha { padding: 0; } }
`;
  P.CSS = CSS;

  function cores(nivel) {
    const mapa = {
      1: ['#16a34a', '#14532d', '#ecfdf3'],
      2: ['#2563eb', '#1e3a8a', '#eff4ff'],
      3: ['#d97706', '#7c2d12', '#fff8eb'],
      4: ['#dc2626', '#7f1d1d', '#fef2f2']
    };
    const [c, e, cl] = mapa[nivel] || mapa[2];
    return `--cor:${c};--cor-escura:${e};--cor-clara:${cl};`;
  }

  function documento(titulo, nivel, corpo) {
    return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${U.esc(titulo)}</title><style>${CSS}</style></head><body style="${cores(nivel)}"><div class="folha">${corpo}</div></body></html>`;
  }

  const LETRAS = 'abcdefgh';
  const NOME_CAT = { logica: 'Lógica', rastreio: 'Teste de mesa', programacao: 'Programação', html: 'HTML', css: 'CSS' };

  function exercicioHTML(ex, rotulo) {
    let corpo = ex.enunciado;
    if (ex.tipo === 'escolha') {
      corpo += `<ul class="opcoes">${ex.opcoes.map((o, i) => `<li>(${LETRAS[i]}) ${U.esc(o)}</li>`).join('')}</ul>`;
    } else if (ex.tipo === 'codigo') {
      corpo += '<div class="caixa-codigo"></div>';
    } else if (ex.categoria === 'rastreio') {
      corpo += '<div class="caixa-resp"></div>';
    } else {
      corpo += '<div class="linha-resp"></div>';
    }
    if (ex.dica) corpo += `<div class="ex-dica">💡 ${U.esc(ex.dica)}</div>`;
    return `<div class="ex"><div class="ex-cab"><b>Exercício ${rotulo} · ${U.esc(ex.titulo)}</b><span class="tag ${ex.categoria}">${NOME_CAT[ex.categoria]} · N${ex.nivel}</span></div>${corpo}</div>`;
  }

  function gabaritoHTML(ex, rotulo) {
    let resp;
    if (ex.tipo === 'escolha') resp = `<div class="gab-resp">Resposta: <span>(${LETRAS[ex.correta]}) ${U.esc(ex.opcoes[ex.correta])}</span></div>`;
    else if (ex.tipo === 'codigo') resp = '';
    else if (ex.categoria === 'rastreio') resp = '';
    else resp = `<div class="gab-resp">Resposta: <span>${U.esc(ex.resposta)}</span></div>`;
    return `<div class="gab"><div class="gab-cab">Exercício ${rotulo} · ${U.esc(ex.titulo)}</div>${resp}${ex.explicacao || ''}</div>`;
  }

  /* semente determinística a partir de um texto */
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  P.exerciciosDaApostila = function (ap) {
    return ap.capitulos.map((cap, ci) => {
      const lista = [];
      for (const item of cap.exercicios || []) {
        for (let i = 0; i < item.n; i++) {
          lista.push(KX.gerarExercicio({ geradorId: item.gen, seed: hash(`${ap.id}|${ci}|${item.gen}|${i}`) }));
        }
      }
      return lista;
    });
  };

  P.apostilaHTML = function (ap) {
    const nivel = KX.NIVEIS.find((n) => n.id === ap.nivel);
    const exs = P.exerciciosDaApostila(ap);
    const total = exs.reduce((s, l) => s + l.length, 0);
    const capa = `
      <section class="capa">
        <div class="capa-topo" data-icone="${ap.trilha === 'web' ? '&lt;/&gt;' : '{ }'}">
          <div class="capa-marca">Kovex Estudos · ${ap.trilha === 'web' ? 'Trilha HTML & CSS' : 'Trilha Programação & Lógica'}</div>
          <div class="capa-num">Apostila ${String(ap.numero).padStart(2, '0')}</div>
          <h1>${U.esc(ap.titulo)}</h1>
          <div class="capa-sub">${U.esc(ap.subtitulo)}</div>
          <div class="capa-nivel">Nível ${nivel.id} · ${nivel.nome}</div>
        </div>
        <div class="capa-corpo">
          <h3>Sumário</h3>
          <ol class="sumario">
            <li>Apresentação</li>
            ${ap.capitulos.map((c) => `<li>${U.esc(c.titulo)}</li>`).join('')}
            <li>Gabarito comentado</li>
          </ol>
        </div>
        <div class="capa-rodape">${ap.capitulos.length} capítulos · ${total} exercícios com gabarito · Linguagem dos exemplos: ${ap.linguagem || 'JavaScript'}</div>
      </section>`;
    const apres = `<section class="apresentacao"><h2 class="cap"><small>Antes de começar</small>Apresentação</h2>${ap.apresentacao}
      <div class="box dica"><b>Pratique no sistema</b><div>Os exercícios desta apostila também podem ser gerados no Kovex Estudos (menu <i>Praticar</i>, trilha <i>${ap.trilha === 'web' ? 'HTML &amp; CSS' : 'Programação &amp; Lógica'}</i>, nível ${nivel.id}), com correção automática e infinitas variações.</div></div></section>`;
    const caps = ap.capitulos.map((cap, ci) => `
      <section class="capitulo">
        <h2 class="cap"><small>Capítulo ${ci + 1}</small>${U.esc(cap.titulo)}</h2>
        ${cap.html}
        ${exs[ci].length ? `<div class="exercicios"><h3>Exercícios do capítulo ${ci + 1}</h3>${exs[ci].map((ex, i) => exercicioHTML(ex, `${ci + 1}.${i + 1}`)).join('')}</div>` : ''}
      </section>`).join('');
    const gab = `<section class="gabarito"><h2 class="cap"><small>Confira depois de tentar</small>Gabarito comentado</h2>
      ${exs.map((lista, ci) => lista.length ? `<h3>Capítulo ${ci + 1} · ${U.esc(ap.capitulos[ci].titulo)}</h3>${lista.map((ex, i) => gabaritoHTML(ex, `${ci + 1}.${i + 1}`)).join('')}` : '').join('')}
    </section>`;
    return documento(`Apostila ${ap.numero} - ${ap.titulo}`, ap.nivel, capa + apres + caps + gab);
  };

  P.listaHTML = function ({ titulo, subtitulo, exercicios, gabarito, nivelCor }) {
    const cab = `<div class="lista-cab"><h1>${U.esc(titulo)}</h1><p>${U.esc(subtitulo)}</p></div>
      <div class="campos"><div>Nome:</div><div style="flex:.5">Data:</div><div style="flex:.4">Nota:</div></div>`;
    const corpo = exercicios.map((ex, i) => exercicioHTML(ex, String(i + 1))).join('');
    const gab = gabarito ? `<section class="gabarito"><h2 class="cap"><small>Confira depois de tentar</small>Gabarito</h2>${exercicios.map((ex, i) => gabaritoHTML(ex, String(i + 1))).join('')}</section>` : '';
    return documento(titulo, nivelCor || 2, cab + corpo + gab);
  };
})(typeof window !== 'undefined' ? window : globalThis);
