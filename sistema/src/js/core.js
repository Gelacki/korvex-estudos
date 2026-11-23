/* Núcleo compartilhado: funciona no navegador (window) e no Node (globalThis). */
(function (g) {
  const KX = (g.KX = g.KX || {});

  KX.NIVEIS = [
    { id: 1, nome: 'Iniciante', cor: '#16a34a', desc: 'Variáveis, operadores, condições e lógica básica', descWeb: 'Estrutura HTML, textos, links, imagens, listas e primeiro CSS' },
    { id: 2, nome: 'Básico', cor: '#2563eb', desc: 'Laços, vetores, textos e funções', descWeb: 'Tabelas, formulários, semântica, seletores, box model e unidades' },
    { id: 3, nome: 'Intermediário', cor: '#d97706', desc: 'Objetos, recursão, ordenação, busca e bases numéricas', descWeb: 'Position, Flexbox, Grid, responsividade e acessibilidade' },
    { id: 4, nome: 'Avançado', cor: '#dc2626', desc: 'Estruturas de dados, grafos, programação dinâmica e complexidade', descWeb: 'Variáveis CSS, animações, seletores modernos e APIs do HTML5' }
  ];

  KX.TRILHAS = [
    { id: 'prog', nome: 'Programação & Lógica', curto: 'Programação' },
    { id: 'web', nome: 'HTML & CSS', curto: 'HTML & CSS' }
  ];

  KX.CATEGORIAS = [
    { id: 'logica', trilha: 'prog', nome: 'Lógica', desc: 'Sequências, tabela-verdade, matemática e raciocínio' },
    { id: 'rastreio', trilha: 'prog', nome: 'Teste de mesa', desc: 'Leia o código e descubra o que ele imprime' },
    { id: 'programacao', trilha: 'prog', nome: 'Programação', desc: 'Escreva a função e rode os testes automáticos' },
    { id: 'html', trilha: 'web', nome: 'HTML', desc: 'Tags, atributos, semântica, formulários e APIs do HTML5' },
    { id: 'css', trilha: 'web', nome: 'CSS', desc: 'Seletores, box model, Flexbox, Grid, responsividade e animações' }
  ];
  KX.categoriasDaTrilha = (t) => KX.CATEGORIAS.filter((c) => c.trilha === t).map((c) => c.id);
  KX.trilhaDaCategoria = (c) => (KX.CATEGORIAS.find((x) => x.id === c) || {}).trilha;

  /* ---------- Gerador pseudoaleatório com semente (mulberry32) ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  KX.criarRng = function (seed) {
    const r = mulberry32(seed >>> 0);
    const api = {
      next: r,
      int(min, max) { return Math.floor(r() * (max - min + 1)) + min; },
      pick(arr) { return arr[Math.floor(r() * arr.length)]; },
      bool(p = 0.5) { return r() < p; },
      shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
      },
      sample(arr, n) { return api.shuffle(arr).slice(0, n); },
      intArray(n, min, max) { return Array.from({ length: n }, () => api.int(min, max)); },
      uniqueInts(n, min, max) {
        const s = new Set();
        while (s.size < n) s.add(api.int(min, max));
        return [...s];
      }
    };
    return api;
  };

  KX.novaSeed = () => Math.floor(Math.random() * 2147483647);

  /* ---------- Utilitários ---------- */
  const U = (KX.util = {});

  U.esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const RE_TOKENS = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\b(\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|if|else|for|while|do|break|continue|new|class|of|in|true|false|null|undefined|typeof|switch|case|default|this|throw|try|catch|async|await)\b/g;

  /* Destaque de sintaxe JavaScript simples (gera <span class="tk-*">) */
  U.destacar = function (code) {
    let out = '', last = 0, m;
    RE_TOKENS.lastIndex = 0;
    while ((m = RE_TOKENS.exec(code))) {
      out += U.esc(code.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : 'k';
      out += `<span class="tk-${cls}">${U.esc(m[0])}</span>`;
      last = RE_TOKENS.lastIndex;
    }
    return out + U.esc(code.slice(last));
  };

  /* Destaque de HTML: nomes de tag, atributos, valores e comentários */
  U.destacarHTML = function (code) {
    const re = /<!--[\s\S]*?-->|<\/?[a-zA-Z!][^<>]*>/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += U.esc(code.slice(last, m.index));
      const t = m[0];
      const mm = /^(<\/?)([^\s>/]+)([\s\S]*?)(\/?>)$/.exec(t);
      if (t.startsWith('<!--')) out += `<span class="tk-c">${U.esc(t)}</span>`;
      else if (!mm) out += U.esc(t);
      else {
        const attrs = mm[3];
        let a = '', pos = 0, x;
        const r2 = /([^\s=]+)(\s*=\s*("[^"]*"|'[^']*'|[^\s"']+))?/g;
        while ((x = r2.exec(attrs))) {
          a += U.esc(attrs.slice(pos, x.index));
          a += `<span class="tk-p">${U.esc(x[1])}</span>`;
          if (x[2]) a += U.esc(x[2].slice(0, x[2].length - x[3].length)) + `<span class="tk-s">${U.esc(x[3])}</span>`;
          pos = r2.lastIndex;
        }
        a += U.esc(attrs.slice(pos));
        out += `${U.esc(mm[1])}<span class="tk-k">${U.esc(mm[2])}</span>${a}${U.esc(mm[4])}`;
      }
      last = re.lastIndex;
    }
    return out + U.esc(code.slice(last));
  };

  /* Destaque de CSS: propriedades, at-rules, números/unidades, strings e comentários */
  const RE_CSS = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[\w-]+|!important)|(--[\w-]+|[a-zA-Z][\w-]*)(?=\s*:[^;{}]*(?:[;}]|$))|(#[0-9a-fA-F]{3,8}\b|-?\b\d*\.?\d+(?:px|rem|em|%|vh|vw|vmin|vmax|ms|s|fr|deg|ch)?)/g;
  U.destacarCSS = function (code) {
    let out = '', last = 0, m;
    RE_CSS.lastIndex = 0;
    while ((m = RE_CSS.exec(code))) {
      if (!m[0]) { RE_CSS.lastIndex++; continue; }
      out += U.esc(code.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'p' : 'n';
      out += `<span class="tk-${cls}">${U.esc(m[0])}</span>`;
      last = RE_CSS.lastIndex;
    }
    return out + U.esc(code.slice(last));
  };

  U.destacarLang = (code, lang) => (lang === 'html' ? U.destacarHTML(code) : lang === 'css' ? U.destacarCSS(code) : U.destacar(code));

  U.codigo = (code, lang) => `<pre class="code"><code>${U.destacarLang(code.replace(/^\n+|\s+$/g, ''), lang)}</code></pre>`;

  /* Exemplo de HTML/CSS com o resultado renderizado (usado nas apostilas) */
  U.demo = function ({ html, css = '', altura = 140 }) {
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:'Segoe UI',Arial,sans-serif;font-size:14px;margin:10px;color:#1f2430;background:#fff}${css}</style></head><body>${html}</body></html>`;
    const attr = doc.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return `<div class="demo">${css ? U.codigo(css, 'css') : ''}${U.codigo(html, 'html')}<div class="demo-res"><span>Resultado</span><iframe srcdoc="${attr}" style="height:${altura}px" title="Resultado"></iframe></div></div>`;
  };

  /* Representação textual de um valor (usada em exemplos e saídas) */
  U.fmt = function fmt(v) {
    if (typeof v === 'string') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(fmt).join(', ') + ']';
    if (v && typeof v === 'object') return '{ ' + Object.keys(v).map((k) => `${/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${fmt(v[k])}`).join(', ') + ' }';
    return String(v);
  };

  /* Forma canônica para comparar resultados (chaves ordenadas, floats arredondados).
     ATENÇÃO: esta função é serializada para o Web Worker — não use variáveis externas. */
  U.canonical = function canonical(v) {
    if (typeof v === 'number') {
      if (Number.isNaN(v)) return 'NaN';
      if (!Number.isInteger(v)) return String(Math.round(v * 1e6) / 1e6);
      return String(v);
    }
    if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
    if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}';
    if (v === undefined) return 'undefined';
    return JSON.stringify(v);
  };

  /* Executa um trecho JS capturando console.log (para testes de mesa) */
  U.executarCapturando = function (code) {
    const saida = [];
    const fmtLog = (v) => (typeof v === 'string' ? v : Array.isArray(v) || (v && typeof v === 'object') ? JSON.stringify(v) : String(v));
    const fake = { log: (...a) => saida.push(a.map(fmtLog).join(' ')) };
    new Function('console', code)(fake);
    return saida.join('\n');
  };

  /* Normaliza texto de resposta: minúsculas, sem acento, espaços colapsados */
  U.normalizar = (s) => String(s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[“”"']/g, '').replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ').trim();

  U.respostaCorreta = function (ex, valor) {
    if (ex.tipo === 'escolha') return Number(valor) === ex.correta;
    const esperado = U.normalizar(ex.resposta);
    const dado = U.normalizar(valor);
    if (dado === esperado) return true;
    const bruto = String(valor).trim().replace(/^r\$\s*/i, '');
    const n1 = Number(bruto.replace(',', '.')), n2 = Number(String(ex.resposta).trim());
    if (bruto !== '' && !Number.isNaN(n1) && !Number.isNaN(n2)) return Math.abs(n1 - n2) < 1e-6;
    if (ex.aceitas) return ex.aceitas.some((a) => U.normalizar(a) === dado);
    return false;
  };

  U.fatorial = (n) => (n <= 1 ? 1 : n * U.fatorial(n - 1));
  U.comb = (n, k) => U.fatorial(n) / (U.fatorial(k) * U.fatorial(n - k));
  U.mdc = (a, b) => (b === 0 ? a : U.mdc(b, a % b));

  /* ---------- Registro de geradores ---------- */
  KX.geradores = [];
  KX.registrar = function (gerador) { KX.geradores.push(gerador); };

  KX.gerarExercicio = function ({ nivel, categoria, seed, geradorId, trilha }) {
    if (seed == null) seed = KX.novaSeed();
    const rng = KX.criarRng(seed);
    const catsTrilha = trilha ? KX.categoriasDaTrilha(trilha) : null;
    let candidatos = KX.geradores.filter((gx) =>
      (geradorId ? gx.id === geradorId : true) &&
      (nivel ? gx.nivel === nivel : true) &&
      (categoria ? gx.categoria === categoria : true) &&
      (catsTrilha && !categoria ? catsTrilha.includes(gx.categoria) : true));
    if (!candidatos.length) throw new Error('Nenhum gerador para os filtros escolhidos');
    const gerador = rng.pick(candidatos);
    const ex = gerador.gerar(rng);
    return Object.assign({ tipo: 'resposta' }, ex, {
      uid: `${gerador.id}#${seed}`,
      geradorId: gerador.id, seed,
      nivel: gerador.nivel, categoria: gerador.categoria,
      titulo: ex.titulo || gerador.titulo
    });
  };
})(typeof window !== 'undefined' ? window : globalThis);
