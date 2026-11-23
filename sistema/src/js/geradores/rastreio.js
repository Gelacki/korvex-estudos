/* Geradores de TESTE DE MESA: o aluno lê o código e diz o que é impresso.
   A resposta é obtida executando o próprio código gerado. */
(function (g) {
  const KX = g.KX;
  const U = KX.util;

  function montar(r, codigo, extra = {}) {
    const resposta = extra.resposta != null ? extra.resposta : U.executarCapturando(codigo);
    const linhas = resposta.split('\n').length;
    return Object.assign({
      enunciado: `<p>O que o programa abaixo imprime?${linhas > 1 ? ` <span class="obs">(${linhas} linhas — escreva uma por linha ou separadas por espaço)</span>` : ''}</p>${U.codigo(codigo)}`,
      resposta,
      multilinha: linhas > 1 || resposta.length > 30,
      dica: 'Faça um teste de mesa: anote o valor de cada variável linha a linha.',
      explicacao: `<p>Saída:</p><pre class="code saida">${U.esc(resposta)}</pre>`
    }, extra);
  }
  const reg = (nivel, id, titulo, gerar) => KX.registrar({ id, nivel, categoria: 'rastreio', titulo, gerar });

  /* ===================== NÍVEL 1 ===================== */

  reg(1, 'r-aritmetica', 'Variáveis e operadores', (r) => {
    const a = r.int(2, 20), b = r.int(2, 9);
    const op1 = r.pick(['+', '-', '*']), op2 = r.pick(['%', '+', '-']);
    const cod = `let a = ${a};\nlet b = ${b};\nlet c = a ${op1} b * 2;\na = c ${op2} b;\nb = b + 1;\nconsole.log(a, b, c);`;
    return montar(r, cod, { dica: 'Lembre da precedência: * / % são calculados antes de + e −. E a variável muda de valor quando recebe uma nova atribuição.' });
  });

  reg(1, 'r-divisao', 'Divisão inteira e resto', (r) => {
    const n = r.int(20, 200), d = r.int(3, 9);
    const cod = `const total = ${n};\nconst grupos = ${d};\nconst porGrupo = Math.floor(total / grupos);\nconst sobra = total % grupos;\nconsole.log(porGrupo);\nconsole.log(sobra);`;
    return montar(r, cod, { dica: 'Math.floor arredonda para baixo; % é o resto da divisão.' });
  });

  reg(1, 'r-if-else', 'Estrutura condicional', (r) => {
    const nota = r.int(0, 100) / 10;
    const cod = `const nota = ${nota};\nlet conceito;\nif (nota >= 9) {\n  conceito = "A";\n} else if (nota >= 7) {\n  conceito = "B";\n} else if (nota >= 5) {\n  conceito = "C";\n} else {\n  conceito = "D";\n}\nconsole.log(conceito);`;
    return montar(r, cod, { dica: 'As condições são testadas de cima para baixo; só o primeiro bloco verdadeiro executa.' });
  });

  reg(1, 'r-logicos', 'Operadores lógicos e comparação', (r) => {
    const idade = r.int(10, 70), temIngresso = r.bool(), vip = r.bool(0.3);
    const cod = `const idade = ${idade};\nconst temIngresso = ${temIngresso};\nconst vip = ${vip};\nconst entra = (idade >= 18 && temIngresso) || vip;\nconst desconto = idade < 12 || idade >= 65;\nconsole.log(entra);\nconsole.log(desconto);`;
    return montar(r, cod, { dica: '&& exige os dois verdadeiros; || exige pelo menos um.' });
  });

  reg(1, 'r-texto', 'Textos (strings)', (r) => {
    const p = r.pick(['programa', 'logica', 'algoritmo', 'variavel', 'computador', 'teclado']);
    const n = r.int(1, 3);
    const cod = `const palavra = "${p}";\nconsole.log(palavra.length);\nconsole.log(palavra[${n}] + palavra[0]);\nconsole.log(palavra.toUpperCase().slice(0, ${n + 2}));`;
    return montar(r, cod, { dica: 'Os índices começam em 0. slice(i, j) vai de i até j−1.' });
  });

  /* ===================== NÍVEL 2 ===================== */

  reg(2, 'r-for-soma', 'Laço for com acumulador', (r) => {
    const a = r.int(0, 5), b = a + r.int(6, 15), s = r.int(1, 3);
    const cod = `let soma = 0;\nfor (let i = ${a}; i <= ${b}; i += ${s}) {\n  soma += i;\n}\nconsole.log(soma);`;
    return montar(r, cod, { dica: 'Liste os valores que i assume e some todos.' });
  });

  reg(2, 'r-while-digitos', 'Laço while', (r) => {
    const n = r.int(1000, 99999);
    if (r.bool()) {
      const cod = `let n = ${n};\nlet soma = 0;\nwhile (n > 0) {\n  soma += n % 10;\n  n = Math.floor(n / 10);\n}\nconsole.log(soma);`;
      return montar(r, cod, { dica: 'n % 10 pega o último dígito; Math.floor(n / 10) o remove.' });
    }
    const m = r.int(3, 30);
    const cod = `let n = ${m};\nlet passos = 0;\nwhile (n !== 1) {\n  if (n % 2 === 0) n = n / 2;\n  else n = 3 * n + 1;\n  passos++;\n}\nconsole.log(passos);`;
    return montar(r, cod, { dica: 'Anote o valor de n a cada passo até chegar em 1.' });
  });

  reg(2, 'r-vetor', 'Percorrendo vetores', (r) => {
    const v = r.intArray(6, 1, 30), k = r.int(8, 20);
    const t = r.int(0, 2);
    const cods = [
      `const v = [${v.join(', ')}];\nlet maior = v[0];\nlet pos = 0;\nfor (let i = 1; i < v.length; i++) {\n  if (v[i] > maior) {\n    maior = v[i];\n    pos = i;\n  }\n}\nconsole.log(maior, pos);`,
      `const v = [${v.join(', ')}];\nlet cont = 0;\nfor (const x of v) {\n  if (x > ${k}) cont++;\n}\nconsole.log(cont);`,
      `const v = [${v.join(', ')}];\nconst r = [];\nfor (let i = v.length - 1; i >= 0; i -= 2) {\n  r.push(v[i]);\n}\nconsole.log(r.join(", "));`
    ];
    return montar(r, cods[t]);
  });

  reg(2, 'r-aninhado', 'Laços aninhados', (r) => {
    const a = r.int(2, 5), b = r.int(2, 5), m = r.int(2, 3);
    const cod = `let c = 0;\nfor (let i = 0; i < ${a}; i++) {\n  for (let j = 0; j < ${b}; j++) {\n    if ((i + j) % ${m} === 0) c++;\n  }\n}\nconsole.log(c);`;
    return montar(r, cod, { dica: 'Monte uma tabelinha com todos os pares (i, j).' });
  });

  reg(2, 'r-string-loop', 'Laço sobre texto', (r) => {
    const s = r.pick(['banana', 'arara', 'abacaxi', 'paralelepipedo', 'otorrino', 'mississipi']);
    const c = r.pick([...new Set(s.split(''))]);
    if (r.bool()) {
      const cod = `const s = "${s}";\nlet r = "";\nfor (let i = s.length - 1; i >= 0; i--) {\n  r += s[i];\n}\nconsole.log(r);`;
      return montar(r, cod);
    }
    const cod = `const s = "${s}";\nlet cont = 0;\nlet ultima = -1;\nfor (let i = 0; i < s.length; i++) {\n  if (s[i] === "${c}") {\n    cont++;\n    ultima = i;\n  }\n}\nconsole.log(cont, ultima);`;
    return montar(r, cod);
  });

  reg(2, 'r-funcao', 'Funções', (r) => {
    const a = r.int(2, 4), b = r.int(-3, 5), c = r.int(1, 5);
    const cod = `function f(x) {\n  return x * ${a} + ${b};\n}\nfunction g(x) {\n  return f(x) - x;\n}\nconsole.log(f(${c}));\nconsole.log(g(f(${c})));`;
    return montar(r, cod, { dica: 'Resolva de dentro para fora: primeiro f(...), depois g(...).' });
  });

  /* ===================== NÍVEL 3 ===================== */

  reg(3, 'r-map-filter', 'map, filter e reduce', (r) => {
    let v, k;
    do { v = r.intArray(7, 1, 20); k = r.int(2, 4); }
    while (!v.some((x) => x % k === 0) || !v.some((x, i) => (x + i) % 2 === 0));
    const m = r.int(2, 5), t = r.int(0, 2);
    const cods = [
      `const v = [${v.join(', ')}];\nconst r = v.filter(x => x % ${k} === 0).map(x => x * ${m});\nconsole.log(r.join(", "));`,
      `const v = [${v.join(', ')}];\nconst total = v.reduce((acc, x) => acc + (x > 10 ? x : 0), 0);\nconsole.log(total);`,
      `const v = [${v.join(', ')}];\nconst r = v.map((x, i) => x + i).filter(x => x % 2 === 0);\nconsole.log(r.length, r[0]);`
    ];
    return montar(r, cods[t], { dica: 'filter mantém só os itens que passam no teste; map transforma cada item; reduce acumula um valor.' });
  });

  reg(3, 'r-recursao', 'Recursão', (r) => {
    const t = r.int(0, 2);
    if (t === 0) {
      const base = r.int(1, 3), k = r.int(1, 3), m = r.int(3, 6);
      return montar(r, `function f(n) {\n  if (n <= 1) return ${base};\n  return f(n - 1) + n * ${k};\n}\nconsole.log(f(${m}));`, { dica: 'Expanda: f(n) = f(n−1) + ..., até chegar ao caso base.' });
    }
    if (t === 1) {
      const n = r.int(100, 9999);
      return montar(r, `function g(n) {\n  if (n < 10) return n;\n  return g(Math.floor(n / 10)) + n % 10;\n}\nconsole.log(g(${n}));`, { dica: 'Cada chamada remove o último dígito.' });
    }
    const a = r.int(2, 3), b = r.int(3, 5);
    return montar(r, `function p(base, exp) {\n  if (exp === 0) return 1;\n  return base * p(base, exp - 1);\n}\nconsole.log(p(${a}, ${b}) - p(${b}, ${a - 1}));`);
  });

  reg(3, 'r-objetos-ref', 'Objetos e referências', (r) => {
    const idade = r.int(10, 40), x = r.int(1, 5), m = r.int(2, 3);
    const nome = r.pick(['Ana', 'Rui', 'Lia', 'Téo']);
    const cod = `const p = { nome: "${nome}", idade: ${idade} };\nconst q = p;\nconst c = { ...p };\nq.idade += ${x};\nc.idade *= ${m};\nconsole.log(p.idade, q.idade, c.idade);`;
    return montar(r, cod, { dica: 'q = p não copia o objeto: as duas variáveis apontam para o mesmo objeto. O spread {...p} cria uma cópia.' });
  });

  reg(3, 'r-objeto-contagem', 'Objetos como dicionário', (r) => {
    const pal = r.pick(['abacate', 'banana', 'cachorro', 'recorrer', 'pipoca', 'arroz']);
    const cod = `const s = "${pal}";\nconst cont = {};\nfor (const ch of s) {\n  cont[ch] = (cont[ch] || 0) + 1;\n}\nconst letras = Object.keys(cont).filter(k => cont[k] > 1);\nconsole.log(letras.join(", "));\nconsole.log(Object.keys(cont).length);`;
    return montar(r, cod, { dica: 'Object.keys mantém a ordem em que as chaves foram criadas.' });
  });

  reg(3, 'r-ordenacao', 'Ordenação com comparador', (r) => {
    const v = r.uniqueInts(6, 1, 40);
    const t = r.int(0, 1);
    const cod = t === 0
      ? `const v = [${v.join(', ')}];\nv.sort((a, b) => b - a);\nconsole.log(v.slice(0, 3).join(", "));`
      : `const v = [${v.join(', ')}];\nv.sort((a, b) => (a % 5) - (b % 5) || a - b);\nconsole.log(v.join(", "));`;
    return montar(r, cod, { dica: t ? 'Primeiro ordena pelo resto da divisão por 5; em caso de empate, pelo próprio valor.' : 'b − a ordena de forma decrescente.' });
  });

  /* ===================== NÍVEL 4 ===================== */

  reg(4, 'r-closure', 'Closures', (r) => {
    const i1 = r.int(0, 10), i2 = r.int(0, 10), p = r.int(2, 5);
    const n1 = r.int(1, 3), n2 = r.int(1, 2);
    const cod = `function contador(inicio, passo) {\n  let c = inicio;\n  return () => {\n    c += passo;\n    return c;\n  };\n}\nconst a = contador(${i1}, ${p});\nconst b = contador(${i2}, 1);\n${'a();\n'.repeat(n1)}${'b();\n'.repeat(n2)}console.log(a(), b());`;
    return montar(r, cod, { dica: 'Cada chamada de contador cria a sua própria variável c, que sobrevive entre chamadas.' });
  });

  reg(4, 'r-chamadas', 'Contando chamadas recursivas', (r) => {
    const m = r.int(4, 7);
    const cod = `let chamadas = 0;\nfunction fib(n) {\n  chamadas++;\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}\nconst r = fib(${m});\nconsole.log(r, chamadas);`;
    return montar(r, cod, { dica: 'Desenhe a árvore de chamadas. Chamadas(n) = 1 + Chamadas(n−1) + Chamadas(n−2).' });
  });

  reg(4, 'r-desestruturacao', 'Desestruturação e spread', (r) => {
    const v = r.intArray(6, 1, 20);
    const cod = `const v = [${v.join(', ')}];\nconst [a, , b, ...resto] = v;\nconst { length } = resto;\nconst w = [b, ...resto, a];\nconsole.log(a + b, length);\nconsole.log(w.join(", "));`;
    return montar(r, cod, { dica: 'A vírgula vazia pula um elemento; ...resto junta o que sobrou.' });
  });

  reg(4, 'r-event-loop', 'Ordem de execução assíncrona', (r) => {
    const letras = r.sample(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 5);
    const tipos = r.shuffle(['sync', 'sync', 'micro', 'macro', r.pick(['sync', 'micro', 'macro'])]);
    const linhas = [], sync = [], micro = [], macro = [];
    tipos.forEach((t, i) => {
      const L = letras[i];
      if (t === 'sync') { linhas.push(`console.log("${L}");`); sync.push(L); }
      if (t === 'micro') { linhas.push(`Promise.resolve().then(() => console.log("${L}"));`); micro.push(L); }
      if (t === 'macro') { linhas.push(`setTimeout(() => console.log("${L}"), 0);`); macro.push(L); }
    });
    const resp = [...sync, ...micro, ...macro].join('\n');
    return montar(r, linhas.join('\n'), {
      resposta: resp,
      dica: 'Primeiro roda todo o código síncrono; depois as Promises (microtarefas); por último os setTimeout (macrotarefas).',
      explicacao: `<p>Síncronos: ${sync.join(', ') || '—'} → microtarefas (Promise): ${micro.join(', ') || '—'} → macrotarefas (setTimeout): ${macro.join(', ') || '—'}.</p><pre class="code saida">${resp}</pre>`
    });
  });

  reg(4, 'r-map-set', 'Map e Set', (r) => {
    const v = r.intArray(9, 1, 6);
    const cod = `const v = [${v.join(', ')}];\nconst unicos = new Set(v);\nconst freq = new Map();\nfor (const x of v) freq.set(x, (freq.get(x) || 0) + 1);\nlet maisFreq = null;\nfor (const [k, c] of freq) {\n  if (maisFreq === null || c > freq.get(maisFreq)) maisFreq = k;\n}\nconsole.log(unicos.size, maisFreq, freq.get(maisFreq));`;
    return montar(r, cod, { dica: 'Set descarta repetidos. Map guarda pares chave → valor na ordem de inserção; em empate, fica o que apareceu primeiro.' });
  });
})(typeof window !== 'undefined' ? window : globalThis);
