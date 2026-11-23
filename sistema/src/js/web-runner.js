/* Verifica exercícios práticos de HTML/CSS renderizando o código em um iframe isolado
   (sem scripts) e avaliando os requisitos sobre o DOM e os estilos calculados. */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const W = KX.web;

  KX.montarDocumentoWeb = function (ex, codigo) {
    if (ex.codigo.linguagem === 'css') {
      return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${codigo}</style></head><body>${ex.codigo.html}</body></html>`;
    }
    if (/<!doctype|<html[\s>]/i.test(codigo)) return codigo;
    return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"></head><body>${codigo}</body></html>`;
  };

  const norm = (v) => String(v == null ? '' : v).toLowerCase().replace(/\s+/g, ' ').trim();
  const normEsperado = (v) => {
    const s = String(v);
    if (/^#[0-9a-f]{3,8}$/i.test(s)) return `rgb(${W.hexParaRgb(s).join(', ')})`;
    return norm(s);
  };
  const normSel = (s) => norm(s).replace(/\s*([>+~,])\s*/g, '$1');

  function temRegra(doc, alvo) {
    const procura = normSel(alvo);
    const varrer = (regras) => {
      for (const r of regras) {
        if (r.type === 7 /* KEYFRAMES */ && normSel('@keyframes ' + r.name) === procura) return true;
        if (r.selectorText && (normSel(r.selectorText) === procura || normSel(r.selectorText).split(',').includes(procura))) return true;
        if (r.cssRules && r.cssRules.length && varrer(r.cssRules)) return true;
      }
      return false;
    };
    for (const folha of doc.styleSheets) {
      try { if (varrer(folha.cssRules)) return true; } catch { /* ignora */ }
    }
    return false;
  }

  function avaliar(ck, d, win) {
    const q = (s) => d.querySelector(s);
    try {
      switch (ck.tipo) {
        case 'existe': { const n = d.querySelectorAll(ck.sel).length; return n >= (ck.min || 1) && (ck.max == null || n <= ck.max); }
        case 'conta': return d.querySelectorAll(ck.sel).length === ck.n;
        case 'sem': return d.querySelectorAll(ck.sel).length === 0;
        case 'texto': { const el = q(ck.sel); return !!el && U.normalizar(el.textContent) === U.normalizar(ck.texto); }
        case 'attr': {
          const el = q(ck.sel);
          if (!el || !el.hasAttribute(ck.attr)) return false;
          if (ck.valor == null) return true;
          const v = el.getAttribute(ck.attr).trim().toLowerCase(), e = String(ck.valor).toLowerCase();
          return ck.contem ? v.split(/\s+/).includes(e) : v === e;
        }
        case 'estilo':
        case 'estiloNao': {
          const el = q(ck.sel);
          if (!el) return false;
          const v = norm(win.getComputedStyle(el)[ck.prop]);
          const e = normEsperado(ck.valor);
          const ok = ck.contem ? v.includes(e) : v === e;
          return ck.tipo === 'estilo' ? ok : !ok;
        }
        case 'medida': { const el = q(ck.sel); return !!el && Math.abs(el[ck.prop] - ck.valor) <= 1; }
        case 'antes': {
          const a = q(ck.a), b = q(ck.b);
          if (!a || !b) return false;
          const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
          return ck.eixo === 'x' ? ra.right <= rb.left + 1 : ra.bottom <= rb.top + 1;
        }
        case 'igualLargura': {
          const a = q(ck.a), b = q(ck.b);
          return !!a && !!b && Math.abs(a.getBoundingClientRect().width - b.getBoundingClientRect().width) <= 1;
        }
        case 'var': return norm(win.getComputedStyle(d.documentElement).getPropertyValue(ck.nome)) === norm(ck.valor);
        case 'colunas': {
          const el = q(ck.sel);
          if (!el) return false;
          return win.getComputedStyle(el).gridTemplateColumns.split(/\s+/).filter((x) => /^[\d.]+px$/.test(x)).length === ck.n;
        }
        case 'regra': return temRegra(d, ck.seletor);
        default: return false;
      }
    } catch {
      return false;
    }
  }

  function carregar(doc, largura) {
    return new Promise((resolve) => {
      const f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-same-origin');
      f.style.cssText = `position:fixed;left:-12000px;top:0;width:${largura}px;height:700px;border:0;visibility:hidden;`;
      const fim = () => resolve(f);
      f.addEventListener('load', fim, { once: true });
      setTimeout(fim, 3000);
      f.srcdoc = doc;
      document.body.appendChild(f);
    });
  }

  /* Retorna Promise<{ resultados: [{ ok, desc }] }> */
  KX.verificarWeb = async function (ex, codigo) {
    const doc = KX.montarDocumentoWeb(ex, codigo);
    const checks = ex.codigo.checks;
    const resultados = new Array(checks.length);
    const larguras = [...new Set(checks.map((ck) => ck.largura || 800))];
    for (const L of larguras) {
      const f = await carregar(doc, L);
      const d = f.contentDocument, win = f.contentWindow;
      checks.forEach((ck, i) => {
        if ((ck.largura || 800) === L) resultados[i] = { ok: !!d && avaliar(ck, d, win), desc: ck.desc };
      });
      f.remove();
    }
    return { resultados };
  };
})(typeof window !== 'undefined' ? window : globalThis);
