/* Interface do Kovex Estudos */
(function () {
  const KX = window.KX;
  const U = KX.util;
  const api = window.api || null; // ausente se aberto fora do Electron
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const LETRAS = 'abcdefgh';
  const corNivel = (n) => `var(--n${n})`;

  /* ================= Armazenamento local ================= */
  const store = {
    ler(chave, padrao) { try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch { return padrao; } },
    gravar(chave, valor) { try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* ignora */ } }
  };
  const PROG = 'kx.progresso.v1';
  const PREF = 'kx.prefs.v1';
  let progresso = store.ler(PROG, { stats: {}, dias: {}, historico: [], acertados: {} });
  let prefs = Object.assign({ nivel: 1, categoria: '', tema: null, trilha: 'prog', progTrilha: 'prog' }, store.ler(PREF, {}));
  const apostilaDe = (trilha, nivel) => KX.apostilas.find((a) => (a.trilha || 'prog') === trilha && a.nivel === nivel);
  const descNivel = (n, trilha) => (trilha === 'web' ? n.descWeb : n.desc);

  const hoje = () => new Date().toISOString().slice(0, 10);

  function registrar(ex, ok) {
    const chave = `${ex.nivel}|${ex.categoria}`;
    const s = (progresso.stats[chave] = progresso.stats[chave] || { tentativas: 0, acertos: 0 });
    s.tentativas++;
    const jaAcertado = progresso.acertados[ex.uid];
    if (ok && !jaAcertado) {
      s.acertos++;
      progresso.acertados[ex.uid] = 1;
      progresso.dias[hoje()] = (progresso.dias[hoje()] || 0) + 1;
    }
    progresso.historico.unshift({ titulo: ex.titulo, nivel: ex.nivel, categoria: ex.categoria, ok, quando: Date.now() });
    progresso.historico = progresso.historico.slice(0, 60);
    // limita o mapa de acertados para não crescer sem fim
    const ids = Object.keys(progresso.acertados);
    if (ids.length > 5000) ids.slice(0, ids.length - 5000).forEach((k) => delete progresso.acertados[k]);
    store.gravar(PROG, progresso);
  }

  /* ================= Utilidades de UI ================= */
  function toast(msg, tipo = '', acao) {
    const el = document.createElement('div');
    el.className = `toast ${tipo}`;
    el.innerHTML = `<span>${msg}</span>`;
    if (acao) {
      const b = document.createElement('button');
      b.className = 'btn'; b.textContent = acao.rotulo;
      b.onclick = () => { acao.fn(); el.remove(); };
      el.appendChild(b);
    }
    $('#toasts').appendChild(el);
    setTimeout(() => el.remove(), acao ? 9000 : 4500);
  }

  function aplicarTema() {
    const escuro = prefs.tema ? prefs.tema === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = escuro ? 'dark' : 'light';
  }
  $('#btnTema').onclick = () => {
    prefs.tema = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    store.gravar(PREF, prefs); aplicarTema();
  };
  aplicarTema();

  /* ================= Navegação ================= */
  function irPara(view) {
    $$('.sidebar nav button').forEach((b) => b.classList.toggle('ativo', b.dataset.view === view));
    $$('.view').forEach((v) => v.classList.toggle('ativa', v.id === `view-${view}`));
    if (view === 'inicio') renderInicio();
    if (view === 'apostilas') renderApostilas();
    if (view === 'lista') atualizarPastaListas();
    if (view === 'praticar' && !atual) novoExercicio();
    $('#conteudo').scrollTop = 0;
  }
  $$('.sidebar nav button').forEach((b) => (b.onclick = () => irPara(b.dataset.view)));
  document.addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-ir]');
    if (alvo) {
      if (alvo.dataset.nivel) {
        prefs.nivel = Number(alvo.dataset.nivel);
        prefs.trilha = alvo.dataset.trilha || 'prog';
        prefs.categoria = alvo.dataset.cat || '';
        store.gravar(PREF, prefs); renderFiltros(); atual = null;
      }
      irPara(alvo.dataset.ir);
    }
  });

  /* ================= INÍCIO ================= */
  function sequenciaDias() {
    let n = 0; const d = new Date();
    if (!progresso.dias[hoje()]) d.setDate(d.getDate() - 1);
    while (progresso.dias[d.toISOString().slice(0, 10)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  function quando(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return 'agora';
    if (s < 3600) return `há ${Math.floor(s / 60)} min`;
    if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
    return `há ${Math.floor(s / 86400)} d`;
  }

  function renderInicio() {
    let acertos = 0, tentativas = 0;
    Object.values(progresso.stats).forEach((s) => { acertos += s.acertos; tentativas += s.tentativas; });
    $('#stTotal').textContent = acertos;
    $('#stTaxa').textContent = tentativas ? Math.round((acertos / tentativas) * 100) + '%' : '—';
    $('#stSeq').textContent = sequenciaDias();
    $('#stHoje').textContent = progresso.dias[hoje()] || 0;

    const META = 20; // acertos por categoria para "completar" o nível
    const coresCat = { logica: '#10b981', rastreio: '#f59e0b', programacao: '#6366f1', html: '#e11d48', css: '#0ea5e9' };
    $('#segProgTrilha').innerHTML = KX.TRILHAS.map((t) => `<button data-t="${t.id}" class="${prefs.progTrilha === t.id ? 'ativo' : ''}">${t.curto}</button>`).join('');
    $$('#segProgTrilha button').forEach((b) => (b.onclick = () => { prefs.progTrilha = b.dataset.t; store.gravar(PREF, prefs); renderInicio(); }));
    const cats = KX.CATEGORIAS.filter((c) => c.trilha === prefs.progTrilha);
    $('#progNiveis').innerHTML = KX.NIVEIS.map((n) => {
      const partes = cats.map((c) => Math.min(META, (progresso.stats[`${n.id}|${c.id}`] || {}).acertos || 0));
      const total = partes.reduce((a, b) => a + b, 0);
      const pct = Math.round((total / (META * cats.length)) * 100);
      return `<div class="nivel-prog">
        <div class="linha"><b style="color:${corNivel(n.id)}">Nível ${n.id} · ${n.nome}</b><span>${pct}%</span></div>
        <div class="barra">${partes.map((p, i) => `<i style="width:${(p / (META * cats.length)) * 100}%;background:${coresCat[cats[i].id]}"></i>`).join('')}</div>
        <div class="legenda">${cats.map((c, i) => `<span style="--c:${coresCat[c.id]}">${c.nome}: ${partes[i]}/${META}</span>`).join('')}</div>
      </div>`;
    }).join('');

    const nomeCat = Object.fromEntries(KX.CATEGORIAS.map((c) => [c.id, c.nome]));
    $('#historico').innerHTML = progresso.historico.length
      ? progresso.historico.slice(0, 15).map((h) => `<li><span class="st ${h.ok ? 'ok' : 'err'}">${h.ok ? '✓' : '✕'}</span><span>${U.esc(h.titulo)} <span class="obs">· N${h.nivel} · ${nomeCat[h.categoria]}</span></span><span class="quando">${quando(h.quando)}</span></li>`).join('')
      : '<li class="vazio">Nenhum exercício ainda. Que tal começar pelo nível Iniciante?</li>';

    $('#trilha').innerHTML = KX.TRILHAS.map((t) => `<h3 class="trilha-nome">${t.id === 'web' ? '&lt;/&gt;' : '{ }'} ${t.nome}</h3><ol>${KX.NIVEIS.map((n) => {
      const ap = apostilaDe(t.id, n.id);
      return `<li style="--c:${corNivel(n.id)}"><b>${n.id}. ${n.nome}</b><p>${descNivel(n, t.id)}</p>
        <div class="acoes">${ap ? `<button class="btn" data-ler="${ap.id}">Apostila ${String(ap.numero).padStart(2, '0')}</button>` : ''}<button class="btn" data-ir="praticar" data-nivel="${n.id}" data-trilha="${t.id}">Praticar</button></div></li>`;
    }).join('')}</ol>`).join('');
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-ler]');
    if (b) abrirLeitor(b.dataset.ler);
  });

  /* ================= PRATICAR ================= */
  let atual = null;      // exercício atual
  let resolvido = false; // já registrado como acerto/solução vista
  let tentou = false;

  function renderFiltros() {
    if (prefs.categoria && KX.trilhaDaCategoria(prefs.categoria) !== prefs.trilha) prefs.categoria = '';
    $('#segTrilha').innerHTML = KX.TRILHAS.map((t) => `<button data-t="${t.id}" class="${prefs.trilha === t.id ? 'ativo' : ''}">${t.id === 'web' ? '&lt;/&gt;' : '{ }'} ${t.nome}</button>`).join('');
    $$('#segTrilha button').forEach((b) => (b.onclick = () => { prefs.trilha = b.dataset.t; prefs.categoria = ''; store.gravar(PREF, prefs); renderFiltros(); novoExercicio(); }));
    $('#segNivel').innerHTML = KX.NIVEIS.map((n) => `<button data-n="${n.id}" class="${prefs.nivel === n.id ? 'ativo' : ''}" title="${descNivel(n, prefs.trilha)}"><span class="bolinha" style="--c:${corNivel(n.id)}"></span>${n.nome}</button>`).join('');
    $('#segCategoria').innerHTML = [{ id: '', nome: 'Todas' }, ...KX.CATEGORIAS.filter((c) => c.trilha === prefs.trilha)].map((c) => `<button data-c="${c.id}" class="${prefs.categoria === c.id ? 'ativo' : ''}" title="${c.desc || 'Todas as categorias'}">${c.nome}</button>`).join('');
    $$('#segNivel button').forEach((b) => (b.onclick = () => { prefs.nivel = Number(b.dataset.n); store.gravar(PREF, prefs); renderFiltros(); novoExercicio(); }));
    $$('#segCategoria button').forEach((b) => (b.onclick = () => { prefs.categoria = b.dataset.c; store.gravar(PREF, prefs); renderFiltros(); novoExercicio(); }));
  }

  let ultimoGerador = null;
  function novoExercicio() {
    let ex, tent = 0;
    do {
      ex = KX.gerarExercicio({ nivel: prefs.nivel, categoria: prefs.categoria || undefined, trilha: prefs.trilha });
      tent++;
    } while (ex.geradorId === ultimoGerador && tent < 6);
    ultimoGerador = ex.geradorId;
    mostrarExercicio(ex);
  }

  function mostrarExercicio(ex) {
    atual = ex; resolvido = false; tentou = false;
    const nivel = KX.NIVEIS.find((n) => n.id === ex.nivel);
    const cat = KX.CATEGORIAS.find((c) => c.id === ex.categoria);
    $('#exTags').innerHTML = `<span class="tag nivel" style="--c:${corNivel(ex.nivel)}">Nível ${nivel.id} · ${nivel.nome}</span><span class="tag">${cat.nome}</span>`;
    $('#exTitulo').textContent = ex.titulo;
    $('#exCodigo').textContent = '#' + ex.seed.toString(36).toUpperCase();
    $('#exEnunciado').innerHTML = ex.enunciado;
    ['#feedback', '#dicaBox', '#explicacao'].forEach((s) => { $(s).classList.add('oculto'); $(s).innerHTML = ''; });
    $('#btnDica').disabled = !ex.dica;
    const area = $('#areaResposta');
    area.innerHTML = '';
    if (ex.tipo === 'escolha') renderEscolha(area, ex);
    else if (ex.tipo === 'codigo' && ex.codigo.linguagem) renderCodigoWeb(area, ex);
    else if (ex.tipo === 'codigo') renderCodigo(area, ex);
    else renderResposta(area, ex);
  }

  function feedback(ok, msg) {
    const f = $('#feedback');
    f.className = `feedback ${ok ? 'ok' : 'erro'}`;
    f.innerHTML = msg;
  }

  function mostrarExplicacao(titulo) {
    const e = $('#explicacao');
    e.innerHTML = `<h3>${titulo}</h3>${atual.explicacao || ''}`;
    e.classList.remove('oculto');
  }

  function concluir(ok) {
    if (resolvido) return;
    if (ok) { resolvido = true; registrar(atual, true); }
    else if (!tentou) { registrar(atual, false); }
    tentou = true;
  }

  function renderResposta(area, ex) {
    const multi = ex.multilinha;
    area.innerHTML = `<div class="resposta-linha">
      ${multi ? '<textarea id="inResp" placeholder="Digite a saída (uma linha por console.log)" spellcheck="false"></textarea>' : '<input id="inResp" type="text" placeholder="Sua resposta" autocomplete="off" spellcheck="false">'}
      <button class="btn primario" id="btnVerificar">Verificar</button></div>
      ${multi ? '<p class="obs">Dica: Ctrl+Enter verifica.</p>' : ''}`;
    const inp = $('#inResp');
    const verificar = () => {
      if (!inp.value.trim()) return inp.focus();
      const ok = U.respostaCorreta(ex, inp.value);
      concluir(ok);
      if (ok) { feedback(true, '✓ Correto! Muito bem.'); mostrarExplicacao('Explicação'); }
      else feedback(false, '✕ Ainda não. Revise o raciocínio e tente de novo, ou peça uma dica.');
    };
    $('#btnVerificar').onclick = verificar;
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (!multi || e.ctrlKey)) { e.preventDefault(); verificar(); }
    });
    setTimeout(() => inp.focus(), 30);
  }

  function renderEscolha(area, ex) {
    area.innerHTML = `<div class="opcoes">${ex.opcoes.map((o, i) => `<button class="opcao" data-i="${i}"><span class="letra">${LETRAS[i].toUpperCase()}</span><span>${U.esc(o)}</span></button>`).join('')}</div>`;
    $$('.opcao', area).forEach((b) => (b.onclick = () => {
      const i = Number(b.dataset.i);
      const ok = U.respostaCorreta(ex, i);
      concluir(ok);
      if (ok) {
        b.classList.add('certa');
        $$('.opcao', area).forEach((x) => (x.disabled = true));
        feedback(true, '✓ Correto!');
        mostrarExplicacao('Explicação');
      } else {
        b.classList.add('errada'); b.disabled = true;
        feedback(false, '✕ Não é essa. Tente outra alternativa.');
      }
    }));
  }

  /* ----- Editor de código com destaque de sintaxe ----- */
  function renderCodigo(area, ex) {
    const chaveRascunho = `kx.rascunho.${ex.geradorId}`;
    area.innerHTML = `
      <div class="editor-wrap">
        <div class="editor-barra">
          <span>JavaScript · ${ex.codigo.testes.length} testes</span><span class="espaco"></span>
          <button class="btn" id="btnResetar" title="Voltar ao código inicial">Recomeçar</button>
          <button class="btn primario" id="btnExecutar" title="Ctrl+Enter">▶ Executar testes</button>
        </div>
        <div class="editor">
          <div class="gutter" id="gutter"></div>
          <div class="area">
            <pre class="hl" id="hl" aria-hidden="true"></pre>
            <textarea id="codigo" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
          </div>
        </div>
      </div>
      <div id="resultados" class="resultados"></div>
      <div id="consoleSaida" class="console-saida oculto"></div>`;
    const ed = montarEditor({ lang: 'js', chave: chaveRascunho, inicial: ex.codigo.inicial, executar: () => executar() });
    const ta = ed.ta;

    $('#btnResetar').onclick = () => { ed.definir(ex.codigo.inicial); $('#resultados').innerHTML = ''; $('#consoleSaida').classList.add('oculto'); };

    async function executar() {
      const btn = $('#btnExecutar');
      btn.disabled = true; btn.textContent = 'Executando…';
      const r = await KX.executarTestes(ta.value, ex);
      btn.disabled = false; btn.textContent = '▶ Executar testes';
      const out = $('#resultados');
      const chamada = (t) => `${ex.codigo.nome}(${t.args.map(U.fmt).join(', ')})`;
      if (r.erroGeral) {
        out.innerHTML = `<div class="resultado falha"><span class="ic">!</span><div><b>Erro:</b> <code>${U.esc(r.erroGeral)}</code></div></div>`;
        concluir(false);
        feedback(false, '✕ O código não pôde ser executado. Veja o erro acima.');
      } else {
        const passou = r.resultados.filter((x) => x.ok).length;
        out.innerHTML = r.resultados.map((res, i) => {
          const t = ex.codigo.testes[i];
          return `<div class="resultado ${res.ok ? 'ok' : 'falha'}"><span class="ic">${res.ok ? '✓' : '✕'}</span><div>
            <code>${U.esc(chamada(t))}</code>
            ${res.ok ? '' : `<div class="det">esperado: <code>${U.esc(U.fmt(t.esperado))}</code> · obtido: <code>${U.esc(res.erro || res.obtido)}</code></div>`}
          </div></div>`;
        }).join('');
        const ok = passou === r.resultados.length;
        concluir(ok);
        if (ok) { feedback(true, `✓ Todos os ${passou} testes passaram! Excelente.`); mostrarExplicacao('Compare com uma solução de referência'); }
        else feedback(false, `✕ ${passou} de ${r.resultados.length} testes passaram.`);
      }
      const cs = $('#consoleSaida');
      if (r.logs && r.logs.length) { cs.innerHTML = `<span class="obs">Saída do console.log:</span><pre>${U.esc(r.logs.join('\n'))}</pre>`; cs.classList.remove('oculto'); }
      else cs.classList.add('oculto');
    }
    $('#btnExecutar').onclick = executar;
  }

  /* ----- Editor reutilizável (usa #codigo, #hl e #gutter já presentes no DOM) ----- */
  const VAZIAS = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
  function montarEditor({ lang, chave, inicial, executar, aoMudar }) {
    const ta = $('#codigo'), hl = $('#hl'), gutter = $('#gutter');
    let rascunho = null;
    try { rascunho = sessionStorage.getItem(chave); } catch { /* */ }
    ta.value = rascunho || inicial;

    const sincronizar = () => { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; gutter.scrollTop = ta.scrollTop; };
    const atualizar = () => {
      hl.innerHTML = U.destacarLang(ta.value, lang) + '\n';
      const linhas = ta.value.split('\n').length;
      gutter.textContent = Array.from({ length: linhas }, (_, i) => i + 1).join('\n');
      sincronizar();
      try { sessionStorage.setItem(chave, ta.value); } catch { /* */ }
      if (aoMudar) aoMudar(ta.value);
    };
    ta.addEventListener('input', atualizar);
    ta.addEventListener('scroll', sincronizar);
    ta.addEventListener('keydown', (e) => {
      const { selectionStart: ini, selectionEnd: fim, value } = ta;
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) {
          const iniLinha = value.lastIndexOf('\n', ini - 1) + 1;
          if (value.slice(iniLinha, iniLinha + 2) === '  ') ta.setRangeText('', iniLinha, iniLinha + 2, 'preserve');
        } else ta.setRangeText('  ', ini, fim, 'end');
        atualizar();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault(); executar();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const iniLinha = value.lastIndexOf('\n', ini - 1) + 1;
        const indent = value.slice(iniLinha).match(/^ */)[0];
        const antes = value.slice(0, ini).trimEnd();
        const depois = value.slice(fim);
        const tagAberta = lang === 'html' && /<([a-zA-Z][\w-]*)(\s[^<>]*)?>$/.exec(antes);
        const abreBloco = /[{[(]$/.test(antes) || (tagAberta && !VAZIAS.test(tagAberta[1]));
        const fechaLogo = /^\s*([}\])]|<\/)/.test(depois);
        const extra = abreBloco ? '  ' : '';
        if (extra && fechaLogo) {
          ta.setRangeText('\n' + indent + extra + '\n' + indent, ini, fim, 'start');
          ta.selectionStart = ta.selectionEnd = ini + 1 + indent.length + extra.length;
        } else ta.setRangeText('\n' + indent + extra, ini, fim, 'end');
        atualizar();
      } else if (e.key === '}' && ini === fim) {
        const iniLinha = value.lastIndexOf('\n', ini - 1) + 1;
        const linha = value.slice(iniLinha, ini);
        if (/^ {2,}$/.test(linha)) {
          e.preventDefault();
          ta.setRangeText(linha.slice(2) + '}', iniLinha, ini, 'end');
          atualizar();
        }
      }
    });
    atualizar();
    setTimeout(() => {
      ta.focus();
      const pos = ta.value.indexOf('\n  \n');
      if (!rascunho && pos !== -1) ta.selectionStart = ta.selectionEnd = pos + 3;
      else if (!rascunho) ta.selectionStart = ta.selectionEnd = ta.value.length;
    }, 30);
    return { ta, definir(v) { ta.value = v; atualizar(); ta.focus(); } };
  }

  /* ----- Exercício prático de HTML/CSS: editor + pré-visualização ao vivo + requisitos ----- */
  function renderCodigoWeb(area, ex) {
    const lang = ex.codigo.linguagem;
    area.innerHTML = `
      <div class="web-grid">
        <div class="editor-wrap">
          <div class="editor-barra">
            <span>${lang.toUpperCase()} · ${ex.codigo.checks.length} requisitos</span><span class="espaco"></span>
            <button class="btn" id="btnResetar" title="Voltar ao código inicial">Recomeçar</button>
            <button class="btn primario" id="btnExecutar" title="Ctrl+Enter">✓ Verificar</button>
          </div>
          <div class="editor">
            <div class="gutter" id="gutter"></div>
            <div class="area">
              <pre class="hl" id="hl" aria-hidden="true"></pre>
              <textarea id="codigo" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
            </div>
          </div>
        </div>
        <div class="preview-wrap">
          <div class="editor-barra"><span>Pré-visualização ao vivo</span></div>
          <iframe id="previewWeb" sandbox="allow-same-origin" title="Pré-visualização"></iframe>
        </div>
      </div>
      <div id="resultados" class="resultados"></div>`;
    const preview = $('#previewWeb');
    let timer = null;
    const atualizarPreview = (codigo) => {
      clearTimeout(timer);
      timer = setTimeout(() => { preview.srcdoc = KX.montarDocumentoWeb(ex, codigo); }, 250);
    };
    const ed = montarEditor({ lang, chave: `kx.rascunho.${ex.uid}`, inicial: ex.codigo.inicial, executar: () => verificar(), aoMudar: atualizarPreview });

    async function verificar() {
      const btn = $('#btnExecutar');
      btn.disabled = true; btn.textContent = 'Verificando…';
      const r = await KX.verificarWeb(ex, ed.ta.value);
      btn.disabled = false; btn.textContent = '✓ Verificar';
      const passou = r.resultados.filter((x) => x.ok).length;
      $('#resultados').innerHTML = r.resultados.map((res) => `<div class="resultado ${res.ok ? 'ok' : 'falha'}"><span class="ic">${res.ok ? '✓' : '✕'}</span><div>${res.desc}</div></div>`).join('');
      const ok = passou === r.resultados.length;
      concluir(ok);
      if (ok) { feedback(true, `✓ Todos os ${passou} requisitos foram atendidos! Excelente.`); mostrarExplicacao('Compare com uma solução de referência'); }
      else feedback(false, `✕ ${passou} de ${r.resultados.length} requisitos atendidos. Veja os itens marcados com ✕.`);
    }
    $('#btnExecutar').onclick = verificar;
    $('#btnResetar').onclick = () => { ed.definir(ex.codigo.inicial); $('#resultados').innerHTML = ''; };
  }

  $('#btnNovo').onclick = novoExercicio;
  $('#btnProximo').onclick = novoExercicio;
  $('#btnDica').onclick = () => {
    if (!atual || !atual.dica) return;
    const d = $('#dicaBox');
    d.innerHTML = `<b>Dica:</b> ${U.esc(atual.dica)}`;
    d.classList.remove('oculto');
  };
  $('#btnSolucao').onclick = () => {
    if (!atual) return;
    if (!resolvido) { concluir(false); resolvido = true; }
    let resp = '';
    if (atual.tipo === 'escolha') resp = `<p>Resposta: <b>(${LETRAS[atual.correta].toUpperCase()}) ${U.esc(atual.opcoes[atual.correta])}</b></p>`;
    else if (atual.tipo === 'resposta' && atual.categoria !== 'rastreio') resp = `<p>Resposta: <b>${U.esc(atual.resposta)}</b></p>`;
    const e = $('#explicacao');
    e.innerHTML = `<h3>Solução</h3>${resp}${atual.explicacao || ''}`;
    e.classList.remove('oculto');
  };

  /* ================= LISTAS EM PDF ================= */
  let configCache = null;
  async function obterConfig() {
    if (!api) return { pastaApostilas: '(disponível apenas no aplicativo instalado)' };
    configCache = await api.obterConfig();
    return configCache;
  }
  async function atualizarPastaListas() {
    const cfg = await obterConfig();
    $('#lsPasta').textContent = cfg.pastaApostilas + '\\Listas';
  }

  $('#lsNiveis').innerHTML = KX.NIVEIS.map((n) => `<label class="chip"><input type="checkbox" value="${n.id}" ${n.id <= 2 ? 'checked' : ''}> ${n.id}. ${n.nome}</label>`).join('');
  $('#lsCategorias').innerHTML = KX.TRILHAS.map((t) => `<div class="grupo-chips"><small>${t.nome}</small>${KX.CATEGORIAS.filter((c) => c.trilha === t.id).map((c) => `<label class="chip"><input type="checkbox" value="${c.id}" ${t.id === prefs.trilha ? 'checked' : ''}> ${c.nome}</label>`).join('')}</div>`).join('');
  $('#lsQtd').oninput = () => ($('#lsQtdTxt').textContent = $('#lsQtd').value);

  let listaPendente = null;
  function montarLista() {
    const niveis = $$('#lsNiveis input:checked').map((i) => Number(i.value));
    const cats = $$('#lsCategorias input:checked').map((i) => i.value);
    if (!niveis.length || !cats.length) { toast('Escolha pelo menos um nível e uma categoria.', 'erro'); return null; }
    const qtd = Number($('#lsQtd').value);
    const semente = KX.novaSeed();
    const rng = KX.criarRng(semente);
    // combinações (nivel, categoria) válidas, distribuídas de forma equilibrada
    const combos = [];
    for (const n of niveis) for (const c of cats) if (KX.geradores.some((g) => g.nivel === n && g.categoria === c)) combos.push([n, c]);
    const usados = new Set();
    const exercicios = [];
    for (let i = 0; i < qtd; i++) {
      const [n, c] = combos[i % combos.length];
      const pool = KX.geradores.filter((g) => g.nivel === n && g.categoria === c);
      const livres = pool.filter((g) => !usados.has(g.id));
      const ger = rng.pick(livres.length ? livres : pool);
      usados.add(ger.id);
      exercicios.push(KX.gerarExercicio({ geradorId: ger.id, seed: rng.int(1, 2147483646) }));
    }
    const ordemCat = KX.CATEGORIAS.map((c) => c.id);
    exercicios.sort((a, b) => a.nivel - b.nivel || ordemCat.indexOf(a.categoria) - ordemCat.indexOf(b.categoria));
    const titulo = $('#lsTitulo').value.trim() || 'Lista de Exercícios';
    const nomesNiv = niveis.map((n) => KX.NIVEIS[n - 1].nome).join(', ');
    const nomesCat = cats.map((c) => KX.CATEGORIAS.find((x) => x.id === c).nome).join(', ');
    const data = new Date();
    const html = KX.pdf.listaHTML({
      titulo,
      subtitulo: `${qtd} exercícios · Níveis: ${nomesNiv} · ${nomesCat} · Código ${semente.toString(36).toUpperCase()}`,
      exercicios, gabarito: $('#lsGabarito').checked, nivelCor: Math.max(...niveis)
    });
    const carimbo = `${data.toISOString().slice(0, 10)} ${String(data.getHours()).padStart(2, '0')}h${String(data.getMinutes()).padStart(2, '0')}`;
    return { html, nomeArquivo: `${titulo} - ${carimbo}.pdf`, rodape: titulo };
  }

  async function salvarLista(lista) {
    if (!api) { toast('A geração de PDF funciona no aplicativo instalado.', 'erro'); return; }
    $('#btnGerarLista').disabled = true;
    $('#lsStatus').textContent = 'Gerando PDF…';
    const r = await api.salvarPdf({ html: lista.html, nomeArquivo: lista.nomeArquivo, subpasta: 'Listas', rodape: lista.rodape });
    $('#btnGerarLista').disabled = false;
    if (r.ok) {
      $('#lsStatus').textContent = 'Salvo em: ' + r.caminho;
      toast('Lista gerada com sucesso!', 'ok', { rotulo: 'Abrir PDF', fn: () => api.abrirArquivo('Listas\\' + lista.nomeArquivo.replace(/[<>:"/\\|?*]/g, '-')) });
    } else {
      $('#lsStatus').textContent = '';
      toast('Erro ao gerar: ' + U.esc(r.erro), 'erro');
    }
  }

  $('#formLista').onsubmit = (e) => { e.preventDefault(); const l = montarLista(); if (l) salvarLista(l); };
  $('#btnPrevia').onclick = () => {
    listaPendente = montarLista();
    if (!listaPendente) return;
    $('#previaFrame').srcdoc = listaPendente.html;
    $('#previa').classList.remove('oculto');
  };
  $('#previaFechar').onclick = () => $('#previa').classList.add('oculto');
  $('#previaGerar').onclick = () => { $('#previa').classList.add('oculto'); if (listaPendente) salvarLista(listaPendente); };
  $('#btnAbrirListas').onclick = () => api && api.abrirPasta('Listas');

  /* ================= APOSTILAS ================= */
  async function renderApostilas() {
    const cfg = await obterConfig();
    $('#apPasta').textContent = cfg.pastaApostilas;
    const existe = api ? await api.arquivosExistem(KX.apostilas.map((a) => a.arquivo)) : {};
    const cartao = (ap) => {
      const n = KX.NIVEIS.find((x) => x.id === ap.nivel);
      const qtdEx = ap.capitulos.reduce((s, c) => s + (c.exercicios || []).reduce((a, e) => a + e.n, 0), 0);
      const tem = existe[ap.arquivo];
      return `<article class="card apostila" style="--c:${corNivel(ap.nivel)}">
        <div class="capa-mini"><small>Apostila ${String(ap.numero).padStart(2, '0')} · Nível ${n.id} · ${n.nome}</small><h3>${U.esc(ap.titulo)}</h3><p>${U.esc(ap.subtitulo)}</p></div>
        <div class="corpo">
          <ol class="caps">${ap.capitulos.map((c) => `<li>${U.esc(c.titulo)}</li>`).join('')}</ol>
          <div class="meta">${ap.capitulos.length} capítulos · ${qtdEx} exercícios com gabarito · <span class="status ${tem ? 'sim' : 'nao'}">${tem ? '✓ PDF salvo na pasta' : 'PDF ainda não gerado'}</span></div>
          <div class="acoes">
            <button class="btn" data-ler="${ap.id}">Ler no app</button>
            ${tem ? `<button class="btn primario" data-abrir="${ap.id}">Abrir PDF</button><button class="btn" data-gerar="${ap.id}">Gerar novamente</button>` : `<button class="btn primario" data-gerar="${ap.id}">Gerar PDF</button>`}
          </div>
        </div>
      </article>`;
    };
    $('#listaApostilas').innerHTML = KX.TRILHAS.map((t) => `
      <h2 class="grupo-titulo">${t.id === 'web' ? '&lt;/&gt;' : '{ }'} ${t.nome}</h2>
      <div class="apostilas">${KX.apostilas.filter((a) => (a.trilha || 'prog') === t.id).map(cartao).join('')}</div>`).join('');
    $$('[data-gerar]').forEach((b) => (b.onclick = () => gerarApostila(b.dataset.gerar, b)));
    $$('[data-abrir]').forEach((b) => (b.onclick = () => abrirPdfApostila(b.dataset.abrir)));
  }

  async function gerarApostila(id, botao, silencioso) {
    if (!api) { toast('A geração de PDF funciona no aplicativo instalado.', 'erro'); return false; }
    const ap = KX.apostilas.find((a) => a.id === id);
    if (botao) { botao.disabled = true; botao.textContent = 'Gerando…'; }
    const r = await api.salvarPdf({ html: KX.pdf.apostilaHTML(ap), nomeArquivo: ap.arquivo, rodape: `Apostila ${String(ap.numero).padStart(2, '0')} · ${ap.titulo}` });
    if (r.ok) { if (!silencioso) toast(`Apostila ${ap.numero} gerada!`, 'ok', { rotulo: 'Abrir', fn: () => api.abrirArquivo(ap.arquivo) }); }
    else toast(`Erro na apostila ${ap.numero}: ${U.esc(r.erro)}`, 'erro');
    if ($('#view-apostilas').classList.contains('ativa')) renderApostilas();
    return r.ok;
  }

  async function abrirPdfApostila(id) {
    const ap = KX.apostilas.find((a) => a.id === id);
    if (!api) return;
    const existe = await api.arquivosExistem([ap.arquivo]);
    if (!existe[ap.arquivo]) { const ok = await gerarApostila(id, null, true); if (!ok) return; }
    const erro = await api.abrirArquivo(ap.arquivo);
    if (erro) toast('Não foi possível abrir: ' + U.esc(erro), 'erro');
  }

  $('#btnGerarTodas').onclick = async () => {
    const b = $('#btnGerarTodas');
    b.disabled = true;
    let ok = 0;
    for (const ap of KX.apostilas) {
      b.textContent = `Gerando ${ap.numero} de ${KX.apostilas.length}…`;
      if (await gerarApostila(ap.id, null, true)) ok++;
    }
    b.disabled = false; b.textContent = 'Gerar todas em PDF';
    toast(`${ok} apostila(s) gerada(s) na pasta de estudos.`, 'ok', { rotulo: 'Abrir pasta', fn: () => api.abrirPasta() });
  };
  $('#btnAbrirPasta').onclick = () => api && api.abrirPasta();
  $('#btnTrocarPasta').onclick = async () => {
    if (!api) return;
    const nova = await api.escolherPasta();
    if (nova) { toast('Pasta alterada para ' + U.esc(nova), 'ok'); renderApostilas(); }
  };

  /* ----- Leitor ----- */
  let leitorId = null;
  function abrirLeitor(id) {
    const ap = KX.apostilas.find((a) => a.id === id);
    leitorId = id;
    $('#leitorTitulo').textContent = `Apostila ${String(ap.numero).padStart(2, '0')} · ${ap.titulo}`;
    $('#leitorFrame').srcdoc = KX.pdf.apostilaHTML(ap);
    $('#leitor').classList.remove('oculto');
  }
  $('#leitorFechar').onclick = () => $('#leitor').classList.add('oculto');
  $('#leitorPdf').onclick = () => leitorId && abrirPdfApostila(leitorId);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { $('#leitor').classList.add('oculto'); $('#previa').classList.add('oculto'); }
  });

  /* ================= Inicialização ================= */
  async function inicializar() {
    renderFiltros();
    renderInicio();
    if (api) {
      $('#versao').textContent = 'v' + (await api.versao());
      // Gera automaticamente (uma única vez por apostila) as que ainda não estão na pasta de estudos
      const existe = await api.arquivosExistem(KX.apostilas.map((a) => a.arquivo));
      const tentadas = store.ler('kx.apostilasTentadas', []);
      const faltando = KX.apostilas.filter((a) => !existe[a.arquivo] && !tentadas.includes(a.id));
      if (faltando.length) {
        store.gravar('kx.apostilasTentadas', [...tentadas, ...faltando.map((a) => a.id)]);
        toast(`Preparando ${faltando.length} apostila(s) em PDF na pasta de estudos…`);
        let ok = 0;
        for (const ap of faltando) if (await gerarApostila(ap.id, null, true)) ok++;
        const cfg = await obterConfig();
        if (ok) toast(`${ok} apostila(s) salva(s) em ${U.esc(cfg.pastaApostilas)}`, 'ok', { rotulo: 'Abrir pasta', fn: () => api.abrirPasta() });
      }
    }
  }
  inicializar();
})();
