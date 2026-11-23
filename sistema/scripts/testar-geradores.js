// Verifica se todos os geradores funcionam para muitas sementes.
// Uso: node scripts/testar-geradores.js
const path = require('path');
const base = path.join(__dirname, '..', 'src', 'js');
['core.js', 'geradores/logica.js', 'geradores/rastreio.js', 'geradores/programacao.js', 'geradores/web-comum.js', 'geradores/web-html.js', 'geradores/web-css.js'].forEach((f) => require(path.join(base, f)));
const KX = globalThis.KX;

let erros = 0;
const porNivel = {};
for (const gx of KX.geradores) {
  const k = `${gx.nivel}-${gx.categoria}`;
  porNivel[k] = (porNivel[k] || 0) + 1;
  for (let seed = 1; seed <= 300; seed++) {
    try {
      const ex = KX.gerarExercicio({ geradorId: gx.id, seed });
      if (!ex.enunciado) throw new Error('sem enunciado');
      if (ex.tipo === 'escolha' && !(ex.correta >= 0 && ex.correta < ex.opcoes.length)) throw new Error('escolha inválida');
      if (ex.tipo === 'escolha' && new Set(ex.opcoes).size !== ex.opcoes.length) throw new Error('opções repetidas');
      if (ex.tipo === 'resposta' && (ex.resposta === '' || ex.resposta == null || /NaN|undefined|Infinity/.test(ex.resposta))) throw new Error('resposta inválida: ' + ex.resposta);
      if (ex.tipo === 'resposta' && !KX.util.respostaCorreta(ex, ex.resposta)) throw new Error('resposta não confere consigo mesma');
      if (ex.tipo === 'codigo' && ex.codigo.linguagem) {
        if (!ex.codigo.checks.length || ex.codigo.checks.some((c) => !c.desc)) throw new Error('requisitos inválidos');
      } else if (ex.tipo === 'codigo') {
        for (const t of ex.codigo.testes) if (t.esperado === undefined) throw new Error('esperado undefined');
      }
      if (/undefined|NaN/.test(ex.enunciado)) throw new Error('enunciado com undefined/NaN');
    } catch (e) {
      erros++;
      if (erros < 30) console.log(`ERRO ${gx.id} seed=${seed}: ${e.message}`);
      break;
    }
  }
}
// Monta todas as apostilas (confere se os geradores citados existem)
['pdf.js', ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `conteudo/apostila${n}.js`)].forEach((f) => require(path.join(base, f)));
for (const ap of KX.apostilas) {
  try {
    const html = KX.pdf.apostilaHTML(ap);
    const qtd = ap.capitulos.reduce((s, c) => s + c.exercicios.reduce((a, e) => a + e.n, 0), 0);
    console.log(`Apostila ${String(ap.numero).padStart(2, '0')} (${ap.trilha || 'prog'}): ${ap.capitulos.length} capítulos, ${qtd} exercícios, ${Math.round(html.length / 1024)} KB de HTML`);
  } catch (e) {
    erros++;
    console.log(`ERRO na apostila ${ap.numero}: ${e.message}`);
  }
}
console.log('Geradores:', KX.geradores.length, porNivel);
console.log(erros ? `${erros} gerador(es) com erro` : 'Todos os geradores OK');
process.exit(erros ? 1 : 0);
