/* Utilitários dos geradores de HTML & CSS */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const W = (KX.web = {});

  W.c = (s) => `<code>${U.esc(s)}</code>`;
  /* texto simples com [[trechos de código]] */
  W.fmtTexto = (s) => U.esc(s).replace(/\[\[(.+?)\]\]/g, '<code>$1</code>');

  /* Banco de perguntas de múltipla escolha: [pergunta, correta, [distratores], explicação?] */
  W.quiz = function (nivel, categoria, id, titulo, banco) {
    KX.registrar({
      id, nivel, categoria, titulo,
      gerar(r) {
        const [perg, certa, distr, expl] = r.pick(banco);
        const ops = r.shuffle([certa, ...r.sample(distr.filter((d) => d !== certa), 3)]);
        return {
          tipo: 'escolha',
          enunciado: `<p>${W.fmtTexto(perg)}</p>`,
          opcoes: ops, correta: ops.indexOf(certa), resposta: certa,
          dica: 'Elimine primeiro as alternativas que você tem certeza de que estão erradas.',
          explicacao: `<p>Resposta: <b>${U.esc(certa)}</b>.${expl ? ' ' + W.fmtTexto(expl) : ''}</p>`
        };
      }
    });
  };

  /* Pergunta a partir de pares [descrição, resposta, explicação?]; distratores = outras respostas */
  W.quizPares = function (nivel, categoria, id, titulo, molde, pares, dica) {
    KX.registrar({
      id, nivel, categoria, titulo,
      gerar(r) {
        const [desc, resp, expl] = r.pick(pares);
        const outros = [...new Set(pares.map((p) => p[1]).filter((x) => x !== resp))];
        const ops = r.shuffle([resp, ...r.sample(outros, 3)]);
        return {
          tipo: 'escolha',
          enunciado: `<p>${molde.replace('%', W.fmtTexto(desc))}</p>`,
          opcoes: ops, correta: ops.indexOf(resp), resposta: resp, dica,
          explicacao: `<p>Resposta: <b>${U.esc(resp)}</b>.${expl ? ' ' + W.fmtTexto(expl) : ''}</p>`
        };
      }
    });
  };

  /* Exercício prático de HTML/CSS verificado no navegador (ver web-runner.js) */
  W.pratico = function (spec) {
    KX.registrar({
      id: spec.id, nivel: spec.nivel, categoria: spec.categoria, titulo: spec.titulo,
      gerar(r) {
        const cfg = spec.cfg ? spec.cfg(r) : {};
        const lang = spec.categoria === 'css' ? 'css' : 'html';
        const html = spec.html ? spec.html(cfg).trim() : '';
        const checks = spec.checks(cfg);
        const sol = spec.solucao(cfg).trim();
        let enunciado = spec.enunciado(cfg);
        if (lang === 'css') enunciado += `<p><b>HTML da página (já pronto, não precisa alterar):</b></p>${U.codigo(html, 'html')}`;
        enunciado += `<p><b>Requisitos verificados:</b></p><ul class="requisitos">${checks.map((c) => `<li>${c.desc}</li>`).join('')}</ul>`;
        return {
          tipo: 'codigo',
          enunciado,
          dica: spec.dica,
          resposta: sol,
          codigo: {
            linguagem: lang, html, checks, solucao: sol,
            inicial: lang === 'css' ? '/* escreva seu CSS aqui */\n\n' : '<!-- escreva seu HTML aqui -->\n\n'
          },
          explicacao: `<p>Uma solução possível:</p>${U.codigo(sol, lang)}`
        };
      }
    });
  };

  /* ---------- Árvore de elementos aleatória (para contar e testar seletores) ---------- */
  W.gerarArvore = function (r) {
    const raiz = { tag: 'body', classes: [], id: null, filhos: [], pai: null };
    const add = (pai, tag, classes = [], id = null) => { const n = { tag, classes, id, filhos: [], pai }; pai.filhos.push(n); return n; };
    const nCont = r.int(2, 3);
    for (let i = 0; i < nCont; i++) {
      const cont = add(raiz, r.pick(['div', 'section']), r.bool(0.7) ? [r.pick(['card', 'box', 'menu', 'painel'])] : []);
      const nFilhos = r.int(2, 4);
      for (let j = 0; j < nFilhos; j++) {
        const tipo = r.int(0, 4);
        if (tipo === 0) add(cont, 'p', r.bool(0.4) ? [r.pick(['destaque', 'nota'])] : []);
        else if (tipo === 1) add(cont, 'span', r.bool(0.3) ? ['nota'] : []);
        else if (tipo === 2) add(cont, 'a', r.bool(0.5) ? ['link'] : []);
        else if (tipo === 3) {
          const ul = add(cont, 'ul');
          const nLi = r.int(2, 4);
          for (let k = 0; k < nLi; k++) add(ul, 'li', r.bool(0.3) ? ['ativo'] : []);
        } else {
          const box = add(cont, 'div', ['box']);
          const nb = r.int(1, 3);
          for (let k = 0; k < nb; k++) add(box, r.pick(['p', 'span', 'a']), r.bool(0.3) ? [r.pick(['destaque', 'nota', 'link'])] : []);
        }
      }
    }
    // ids únicos em 1 ou 2 elementos
    const todos = W.nos(raiz);
    r.sample(todos, r.int(1, 2)).forEach((n, i) => (n.id = ['principal', 'topo'][i]));
    return raiz;
  };
  W.nos = (raiz) => { const r = []; (function rec(n) { for (const f of n.filhos) { r.push(f); rec(f); } })(raiz); return r; };

  const TEXTOS = { p: 'Texto', span: 'item', a: 'link', li: 'Item' };
  W.arvoreHTML = function (raiz) {
    const linhas = [];
    (function rec(n, nivel) {
      for (const f of n.filhos) {
        const at = (f.id ? ` id="${f.id}"` : '') + (f.classes.length ? ` class="${f.classes.join(' ')}"` : '') + (f.tag === 'a' ? ' href="#"' : '');
        const pad = '  '.repeat(nivel);
        if (f.filhos.length) { linhas.push(`${pad}<${f.tag}${at}>`); rec(f, nivel + 1); linhas.push(`${pad}</${f.tag}>`); }
        else linhas.push(`${pad}<${f.tag}${at}>${TEXTOS[f.tag] || ''}</${f.tag}>`);
      }
    })(raiz, 0);
    return linhas.join('\n');
  };

  /* ---------- Matcher de seletores (tag, .classe, #id, :first-child, :last-child; ' ', '>', '+', ',') ---------- */
  function parseComposto(s) {
    const c = { tag: null, classes: [], id: null, pseudos: [] };
    const re = /([a-zA-Z][\w-]*)|\.([\w-]+)|#([\w-]+)|:([\w-]+)/g;
    let m;
    while ((m = re.exec(s))) {
      if (m[1]) c.tag = m[1].toLowerCase();
      else if (m[2]) c.classes.push(m[2]);
      else if (m[3]) c.id = m[3];
      else c.pseudos.push(m[4]);
    }
    return c;
  }
  function casaComposto(n, c) {
    if (c.tag && n.tag !== c.tag) return false;
    if (c.id && n.id !== c.id) return false;
    if (!c.classes.every((k) => n.classes.includes(k))) return false;
    for (const p of c.pseudos) {
      const irmaos = n.pai ? n.pai.filhos : [n];
      if (p === 'first-child' && irmaos[0] !== n) return false;
      if (p === 'last-child' && irmaos[irmaos.length - 1] !== n) return false;
    }
    return true;
  }
  W.contarSeletor = function (raiz, seletor) {
    const grupos = seletor.split(',').map((s) => s.trim());
    const compilados = grupos.map((s) => {
      const toks = s.replace(/\s*([>+])\s*/g, ' $1 ').trim().split(/\s+/);
      const comps = [], combs = [];
      for (const t of toks) {
        if (t === '>' || t === '+') combs[comps.length - 1] = t;
        else comps.push(parseComposto(t));
      }
      return { comps, combs: comps.slice(0, -1).map((_, i) => combs[i] || ' ') };
    });
    const casa = (n, comp, idx) => {
      if (!casaComposto(n, comp.comps[idx])) return false;
      if (idx === 0) return true;
      const comb = comp.combs[idx - 1];
      if (comb === '>') return !!(n.pai && casa(n.pai, comp, idx - 1));
      if (comb === '+') {
        if (!n.pai) return false;
        const i = n.pai.filhos.indexOf(n);
        return i > 0 && casa(n.pai.filhos[i - 1], comp, idx - 1);
      }
      for (let a = n.pai; a; a = a.pai) if (casa(a, comp, idx - 1)) return true;
      return false;
    };
    return W.nos(raiz).filter((n) => compilados.some((cp) => casa(n, cp, cp.comps.length - 1))).length;
  };

  /* ---------- Cores ---------- */
  W.hexParaRgb = (hex) => {
    const h = hex.replace('#', '');
    const v = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
    return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
  };
  W.CORES = ['#1e40af', '#b91c1c', '#047857', '#7c3aed', '#c2410c', '#0e7490', '#be185d', '#334155', '#4d7c0f', '#a16207'];
  W.NOMES_COR = { '#1e40af': 'azul', '#b91c1c': 'vermelho', '#047857': 'verde', '#7c3aed': 'roxo', '#c2410c': 'laranja', '#0e7490': 'ciano', '#be185d': 'rosa', '#334155': 'cinza-escuro', '#4d7c0f': 'verde-oliva', '#a16207': 'mostarda' };
})(typeof window !== 'undefined' ? window : globalThis);
