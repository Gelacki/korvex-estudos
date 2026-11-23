/* Executa o código do aluno em um Web Worker isolado, com tempo limite. */
(function (g) {
  const KX = g.KX;
  const U = KX.util;

  const WORKER_SRC = `
const canonical = ${U.canonical.toString()};
const fmt = ${U.fmt.toString()};
self.onmessage = (e) => {
  const { codigo, nome, testes } = e.data;
  const logs = [];
  const show = (v) => typeof v === 'string' ? v : (() => { try { return fmt(v); } catch (_) { return String(v); } })();
  const console = {
    log: (...a) => logs.push(a.map(show).join(' ')),
    error: (...a) => logs.push('[erro] ' + a.map(show).join(' ')),
    warn: (...a) => logs.push('[aviso] ' + a.map(show).join(' ')),
    table: (...a) => logs.push(a.map(show).join(' '))
  };
  let fn;
  try {
    fn = new Function('console', codigo + '\\n;return typeof ' + nome + ' === "function" ? ' + nome + ' : undefined;')(console);
  } catch (err) {
    self.postMessage({ erroGeral: err.name + ': ' + err.message, logs });
    return;
  }
  if (!fn) {
    self.postMessage({ erroGeral: 'A função "' + nome + '" não foi encontrada. Não altere o nome da função.', logs });
    return;
  }
  const resultados = testes.map((t) => {
    const args = JSON.parse(JSON.stringify(t.args));
    try {
      const obtido = fn(...args);
      let txt;
      try { txt = obtido === undefined ? 'undefined' : fmt(obtido); } catch (_) { txt = String(obtido); }
      return { ok: canonical(obtido) === canonical(t.esperado), obtido: txt };
    } catch (err) {
      return { ok: false, erro: err.name + ': ' + err.message };
    }
  });
  self.postMessage({ resultados, logs: logs.slice(0, 200) });
};`;

  let workerUrl = null;
  function urlDoWorker() {
    if (!workerUrl) workerUrl = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }));
    return workerUrl;
  }

  /* Retorna Promise<{resultados?, erroGeral?, logs, tempoEsgotado?}> */
  KX.executarTestes = function (codigo, ex, limiteMs = 3000) {
    return new Promise((resolve) => {
      const w = new Worker(urlDoWorker());
      const timer = setTimeout(() => {
        w.terminate();
        resolve({ tempoEsgotado: true, erroGeral: `Tempo esgotado (${limiteMs / 1000}s). Verifique se não há um laço infinito.`, logs: [] });
      }, limiteMs);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); resolve(e.data); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ erroGeral: e.message || 'Erro ao executar', logs: [] }); e.preventDefault(); };
      w.postMessage({ codigo, nome: ex.codigo.nome, testes: ex.codigo.testes });
    });
  };
})(typeof window !== 'undefined' ? window : globalThis);
