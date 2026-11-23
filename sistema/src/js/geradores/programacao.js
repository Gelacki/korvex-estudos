/* Geradores de exercícios de PROGRAMAÇÃO (JavaScript, com testes automáticos).
   Cada exercício tem uma solução de referência; os resultados esperados dos testes
   são calculados executando essa solução sobre entradas sorteadas. */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const clone = (x) => JSON.parse(JSON.stringify(x));

  function def(spec) {
    KX.registrar({
      id: 'p-' + spec.nome, nivel: spec.nivel, categoria: 'programacao', titulo: spec.titulo,
      gerar(r) {
        const cfg = spec.cfg ? spec.cfg(r) : {};
        const src = spec.solucao(cfg).trim();
        const fn = new Function(src + `\nreturn ${spec.nome};`)();
        const casos = spec.casos(r, cfg);
        const testes = casos.map((args) => ({ args, esperado: fn(...clone(args)) }));
        const exemplos = testes.slice(0, Math.min(3, testes.length));
        const chamada = (t) => `${spec.nome}(${t.args.map(U.fmt).join(', ')})`;
        const enunciado = `${spec.enunciado(cfg)}
          <p class="assinatura">Assinatura: <code>function ${spec.nome}(${spec.params.join(', ')})</code></p>
          <p><b>Exemplos:</b></p>
          <pre class="code exemplos">${exemplos.map((t) => U.esc(`${chamada(t)}  →  ${U.fmt(t.esperado)}`)).join('\n')}</pre>`;
        return {
          tipo: 'codigo',
          enunciado,
          dica: spec.dica,
          resposta: src,
          codigo: {
            nome: spec.nome,
            inicial: `function ${spec.nome}(${spec.params.join(', ')}) {\n  // escreva seu código aqui\n  \n}\n`,
            testes, solucao: src
          },
          explicacao: `<p>Uma solução possível:</p>${U.codigo(src)}`
        };
      }
    });
  }

  const palavras = ['casa', 'programa', 'logica', 'arara', 'ovo', 'teclado', 'radar', 'javascript', 'reviver', 'banana', 'sol', 'computador', 'osso', 'mouse'];
  const frases = ['o rato roeu a roupa', 'aprender programacao exige pratica', 'logica de programacao', 'um dois tres', 'estudar todo dia', 'a vida e bela', 'codigo limpo e simples'];

  /* ======================= NÍVEL 1 — INICIANTE ======================= */

  def({
    nivel: 1, nome: 'somar', titulo: 'Somar dois números', params: ['a', 'b'],
    enunciado: () => '<p>Escreva uma função que recebe dois números e <b>retorna</b> a soma deles.</p>',
    solucao: () => 'function somar(a, b) {\n  return a + b;\n}',
    casos: (r) => [[2, 3], [r.int(-50, 50), r.int(-50, 50)], [0, 0], [r.int(100, 999), r.int(1, 99)], [-7, 7]],
    dica: 'Use a palavra-chave return.'
  });

  def({
    nivel: 1, nome: 'areaRetangulo', titulo: 'Área do retângulo', params: ['base', 'altura'],
    enunciado: () => '<p>Retorne a área de um retângulo dados a base e a altura (área = base × altura).</p>',
    solucao: () => 'function areaRetangulo(base, altura) {\n  return base * altura;\n}',
    casos: (r) => [[5, 3], [r.int(1, 20), r.int(1, 20)], [10, 0], [r.int(1, 99), r.int(1, 99)], [2.5, 4]],
    dica: 'Multiplique os dois parâmetros.'
  });

  def({
    nivel: 1, nome: 'ehPar', titulo: 'Par ou ímpar', params: ['n'],
    enunciado: () => '<p>Retorne <code>true</code> se o número for par e <code>false</code> se for ímpar.</p>',
    solucao: () => 'function ehPar(n) {\n  return n % 2 === 0;\n}',
    casos: (r) => [[4], [7], [0], [r.int(1, 999)], [r.int(1, 999)], [-6]],
    dica: 'Um número é par quando o resto da divisão por 2 é zero (operador %).'
  });

  def({
    nivel: 1, nome: 'maiorDeTres', titulo: 'Maior de três', params: ['a', 'b', 'c'],
    enunciado: () => '<p>Retorne o maior entre três números <b>sem usar</b> <code>Math.max</code>.</p>',
    solucao: () => 'function maiorDeTres(a, b, c) {\n  let maior = a;\n  if (b > maior) maior = b;\n  if (c > maior) maior = c;\n  return maior;\n}',
    casos: (r) => [[1, 5, 3], [9, 2, 4], [1, 2, 8], [r.int(-20, 20), r.int(-20, 20), r.int(-20, 20)], [7, 7, 7], [-3, -1, -2]],
    dica: 'Guarde o primeiro como "maior" e compare com os outros.'
  });

  def({
    nivel: 1, nome: 'celsiusParaFahrenheit', titulo: 'Conversão de temperatura', params: ['c'],
    enunciado: () => '<p>Converta uma temperatura de Celsius para Fahrenheit. Fórmula: <b>F = C × 9 / 5 + 32</b>.</p>',
    solucao: () => 'function celsiusParaFahrenheit(c) {\n  return c * 9 / 5 + 32;\n}',
    casos: (r) => [[0], [100], [-40], [r.int(-30, 45)], [37]],
    dica: 'Basta aplicar a fórmula.'
  });

  def({
    nivel: 1, nome: 'situacaoAluno', titulo: 'Situação do aluno', params: ['n1', 'n2', 'n3'],
    cfg: (r) => ({ min: r.pick([6, 7]) }),
    enunciado: (c) => `<p>Calcule a média das três notas e retorne: <code>"Aprovado"</code> se a média for maior ou igual a <b>${c.min}</b>; <code>"Recuperação"</code> se for maior ou igual a <b>${c.min - 2}</b>; caso contrário, <code>"Reprovado"</code>.</p>`,
    solucao: (c) => `function situacaoAluno(n1, n2, n3) {\n  const media = (n1 + n2 + n3) / 3;\n  if (media >= ${c.min}) return "Aprovado";\n  if (media >= ${c.min - 2}) return "Recuperação";\n  return "Reprovado";\n}`,
    casos: (r, c) => [[10, 8, 9], [c.min - 1, c.min - 1, c.min - 1], [2, 3, 1], [r.int(0, 10), r.int(0, 10), r.int(0, 10)], [c.min, c.min, c.min], [r.int(0, 10), r.int(0, 10), r.int(0, 10)]],
    dica: 'Calcule a média primeiro e depois use if / else if / else.'
  });

  def({
    nivel: 1, nome: 'valorAbsoluto', titulo: 'Valor absoluto', params: ['n'],
    enunciado: () => '<p>Retorne o valor absoluto (módulo) de um número, <b>sem usar</b> <code>Math.abs</code>.</p>',
    solucao: () => 'function valorAbsoluto(n) {\n  if (n < 0) return -n;\n  return n;\n}',
    casos: (r) => [[-5], [5], [0], [r.int(-999, -1)], [r.int(1, 999)]],
    dica: 'Se o número for negativo, inverta o sinal.'
  });

  def({
    nivel: 1, nome: 'anoBissexto', titulo: 'Ano bissexto', params: ['ano'],
    enunciado: () => '<p>Retorne <code>true</code> se o ano for bissexto. Regra: divisível por 4 e não divisível por 100, <b>ou</b> divisível por 400.</p>',
    solucao: () => 'function anoBissexto(ano) {\n  return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;\n}',
    casos: (r) => [[2024], [1900], [2000], [2023], [r.int(1800, 2400)], [r.int(1800, 2400)]],
    dica: 'Traduza a regra usando && e ||.'
  });

  def({
    nivel: 1, nome: 'precoComDesconto', titulo: 'Preço com desconto', params: ['preco'],
    cfg: (r) => ({ lim: r.pick([100, 150, 200]), pct: r.pick([5, 10, 15, 20]) }),
    enunciado: (c) => `<p>Uma loja dá <b>${c.pct}% de desconto</b> para compras a partir de <b>R$ ${c.lim}</b> (inclusive). Retorne o preço final.</p>`,
    solucao: (c) => `function precoComDesconto(preco) {\n  if (preco >= ${c.lim}) {\n    return preco - preco * ${c.pct} / 100;\n  }\n  return preco;\n}`,
    casos: (r, c) => [[c.lim + 100], [c.lim - 1], [c.lim], [r.int(10, 400)], [r.int(10, 400)]],
    dica: 'Use um if para decidir se aplica o desconto.'
  });

  def({
    nivel: 1, nome: 'faixaEtaria', titulo: 'Faixa etária', params: ['idade'],
    enunciado: () => '<p>Retorne <code>"criança"</code> (até 11 anos), <code>"adolescente"</code> (12 a 17), <code>"adulto"</code> (18 a 59) ou <code>"idoso"</code> (60 ou mais).</p>',
    solucao: () => 'function faixaEtaria(idade) {\n  if (idade < 12) return "criança";\n  if (idade < 18) return "adolescente";\n  if (idade < 60) return "adulto";\n  return "idoso";\n}',
    casos: (r) => [[5], [15], [30], [70], [12], [18], [60], [r.int(0, 100)]],
    dica: 'Teste as faixas em ordem crescente.'
  });

  /* ======================= NÍVEL 2 — BÁSICO ======================= */

  def({
    nivel: 2, nome: 'somaAte', titulo: 'Soma de 1 até N', params: ['n'],
    enunciado: () => '<p>Retorne a soma de todos os inteiros de 1 até <code>n</code> usando um laço.</p>',
    solucao: () => 'function somaAte(n) {\n  let soma = 0;\n  for (let i = 1; i <= n; i++) soma += i;\n  return soma;\n}',
    casos: (r) => [[5], [1], [0], [r.int(10, 100)], [r.int(100, 1000)]],
    dica: 'Use uma variável acumuladora começando em 0.'
  });

  def({
    nivel: 2, nome: 'fatorial', titulo: 'Fatorial', params: ['n'],
    enunciado: () => '<p>Retorne o fatorial de <code>n</code> (n! = 1 × 2 × ... × n). Por definição, 0! = 1.</p>',
    solucao: () => 'function fatorial(n) {\n  let r = 1;\n  for (let i = 2; i <= n; i++) r *= i;\n  return r;\n}',
    casos: (r) => [[5], [0], [1], [r.int(2, 12)], [10]],
    dica: 'Acumulador começando em 1, multiplicando a cada passo.'
  });

  def({
    nivel: 2, nome: 'tabuada', titulo: 'Tabuada', params: ['n'],
    enunciado: () => '<p>Retorne um vetor com a tabuada de <code>n</code> de 1 a 10.</p>',
    solucao: () => 'function tabuada(n) {\n  const r = [];\n  for (let i = 1; i <= 10; i++) r.push(n * i);\n  return r;\n}',
    casos: (r) => [[3], [r.int(2, 12)], [0], [r.int(13, 30)]],
    dica: 'Use push para adicionar itens no vetor.'
  });

  def({
    nivel: 2, nome: 'somaVetor', titulo: 'Soma dos elementos', params: ['v'],
    enunciado: () => '<p>Retorne a soma de todos os números do vetor. Vetor vazio soma 0.</p>',
    solucao: () => 'function somaVetor(v) {\n  let s = 0;\n  for (const x of v) s += x;\n  return s;\n}',
    casos: (r) => [[[1, 2, 3]], [[]], [r.intArray(6, -10, 30)], [r.intArray(10, 0, 100)]],
    dica: 'Percorra o vetor com for...of.'
  });

  def({
    nivel: 2, nome: 'contarVogais', titulo: 'Contar vogais', params: ['texto'],
    enunciado: () => '<p>Retorne quantas vogais (a, e, i, o, u — maiúsculas ou minúsculas) existem no texto.</p>',
    solucao: () => 'function contarVogais(texto) {\n  let c = 0;\n  for (const ch of texto.toLowerCase()) {\n    if ("aeiou".includes(ch)) c++;\n  }\n  return c;\n}',
    casos: (r) => [['programacao'], ['XYZ'], [''], ['AEIOU aeiou'], [r.pick(frases)], [r.pick(palavras).toUpperCase()]],
    dica: 'Converta para minúsculas e verifique cada caractere com includes.'
  });

  def({
    nivel: 2, nome: 'inverterTexto', titulo: 'Inverter texto', params: ['texto'],
    enunciado: () => '<p>Retorne o texto ao contrário <b>sem usar</b> <code>reverse()</code>.</p>',
    solucao: () => 'function inverterTexto(texto) {\n  let r = "";\n  for (let i = texto.length - 1; i >= 0; i--) r += texto[i];\n  return r;\n}',
    casos: (r) => [['abc'], [''], [r.pick(palavras)], [r.pick(frases)]],
    dica: 'Percorra o texto do último índice até o 0.'
  });

  def({
    nivel: 2, nome: 'ehPalindromo', titulo: 'Palíndromo', params: ['texto'],
    enunciado: () => '<p>Retorne <code>true</code> se o texto for um palíndromo (lê-se igual de trás para frente), <b>ignorando espaços e maiúsculas/minúsculas</b>.</p>',
    solucao: () => 'function ehPalindromo(texto) {\n  const s = texto.toLowerCase().split(" ").join("");\n  for (let i = 0, j = s.length - 1; i < j; i++, j--) {\n    if (s[i] !== s[j]) return false;\n  }\n  return true;\n}',
    casos: (r) => [['Arara'], ['casa'], ['A sacada da casa'], [r.pick(palavras)], [r.pick(palavras)], ['']],
    dica: 'Limpe o texto e compare as pontas, avançando para o meio.'
  });

  def({
    nivel: 2, nome: 'fizzBuzz', titulo: 'FizzBuzz', params: ['n'],
    cfg: (r) => r.pick([{ a: 3, b: 5 }, { a: 2, b: 7 }, { a: 3, b: 4 }, { a: 4, b: 6 }]),
    enunciado: (c) => `<p>Retorne um vetor com os números de 1 a <code>n</code> como texto, mas: múltiplos de <b>${c.a}</b> viram <code>"Fizz"</code>, múltiplos de <b>${c.b}</b> viram <code>"Buzz"</code> e múltiplos de ambos viram <code>"FizzBuzz"</code>.</p>`,
    solucao: (c) => `function fizzBuzz(n) {\n  const r = [];\n  for (let i = 1; i <= n; i++) {\n    let s = "";\n    if (i % ${c.a} === 0) s += "Fizz";\n    if (i % ${c.b} === 0) s += "Buzz";\n    r.push(s || String(i));\n  }\n  return r;\n}`,
    casos: (r) => [[5], [r.int(12, 20)], [1], [r.int(20, 30)]],
    dica: 'Monte o texto concatenando "Fizz" e "Buzz" conforme as condições.'
  });

  def({
    nivel: 2, nome: 'maiorElemento', titulo: 'Maior elemento', params: ['v'],
    enunciado: () => '<p>Retorne o maior número do vetor (não vazio) <b>sem usar</b> <code>Math.max</code> nem <code>sort</code>.</p>',
    solucao: () => 'function maiorElemento(v) {\n  let maior = v[0];\n  for (const x of v) if (x > maior) maior = x;\n  return maior;\n}',
    casos: (r) => [[[3, 9, 2]], [[-5, -2, -9]], [[7]], [r.intArray(8, -50, 50)], [r.intArray(12, 0, 1000)]],
    dica: 'Comece com o primeiro elemento como maior.'
  });

  def({
    nivel: 2, nome: 'contarMaioresQue', titulo: 'Contar maiores que K', params: ['v', 'k'],
    enunciado: () => '<p>Retorne quantos elementos do vetor são estritamente maiores que <code>k</code>.</p>',
    solucao: () => 'function contarMaioresQue(v, k) {\n  let c = 0;\n  for (const x of v) if (x > k) c++;\n  return c;\n}',
    casos: (r) => [[[1, 5, 8, 3], 4], [[], 0], [r.intArray(10, 0, 50), r.int(10, 40)], [[2, 2, 2], 2]],
    dica: 'Contador + if dentro do laço.'
  });

  def({
    nivel: 2, nome: 'ehPrimo', titulo: 'Número primo', params: ['n'],
    enunciado: () => '<p>Retorne <code>true</code> se <code>n</code> for primo (maior que 1 e divisível apenas por 1 e por ele mesmo).</p>',
    solucao: () => 'function ehPrimo(n) {\n  if (n < 2) return false;\n  for (let d = 2; d * d <= n; d++) {\n    if (n % d === 0) return false;\n  }\n  return true;\n}',
    casos: (r) => [[7], [1], [2], [9], [97], [r.int(2, 500)], [r.int(2, 500)], [r.int(500, 5000)]],
    dica: 'Basta testar divisores até a raiz quadrada de n.'
  });

  def({
    nivel: 2, nome: 'somaDigitos', titulo: 'Soma dos dígitos', params: ['n'],
    enunciado: () => '<p>Retorne a soma dos dígitos de um inteiro não negativo. Ex.: 482 → 4 + 8 + 2 = 14.</p>',
    solucao: () => 'function somaDigitos(n) {\n  let s = 0;\n  while (n > 0) {\n    s += n % 10;\n    n = Math.floor(n / 10);\n  }\n  return s;\n}',
    casos: (r) => [[482], [0], [9], [r.int(1000, 99999)], [r.int(100000, 9999999)]],
    dica: 'n % 10 dá o último dígito; Math.floor(n / 10) o remove.'
  });

  def({
    nivel: 2, nome: 'multiplosAte', titulo: 'Múltiplos até N', params: ['n'],
    cfg: (r) => ({ k: r.int(3, 9) }),
    enunciado: (c) => `<p>Retorne um vetor com todos os múltiplos de <b>${c.k}</b> entre 1 e <code>n</code> (inclusive), em ordem crescente.</p>`,
    solucao: (c) => `function multiplosAte(n) {\n  const r = [];\n  for (let i = ${c.k}; i <= n; i += ${c.k}) r.push(i);\n  return r;\n}`,
    casos: (r, c) => [[c.k * 3], [c.k - 1], [r.int(20, 60)], [c.k]],
    dica: 'Comece no próprio múltiplo e avance de k em k.'
  });

  def({
    nivel: 2, nome: 'contarPalavras', titulo: 'Contar palavras', params: ['frase'],
    enunciado: () => '<p>Retorne quantas palavras existem na frase. Considere que as palavras são separadas por um ou mais espaços e que podem existir espaços no início e no fim.</p>',
    solucao: () => 'function contarPalavras(frase) {\n  return frase.split(" ").filter(p => p !== "").length;\n}',
    casos: (r) => [['ola mundo'], ['  muitos   espacos aqui  '], [''], [r.pick(frases)], [r.pick(frases)]],
    dica: 'split(" ") e descarte os pedaços vazios.'
  });

  def({
    nivel: 2, nome: 'potencia', titulo: 'Potência com laço', params: ['base', 'exp'],
    enunciado: () => '<p>Retorne <code>base</code> elevado a <code>exp</code> (inteiro ≥ 0) <b>sem usar</b> <code>**</code> nem <code>Math.pow</code>.</p>',
    solucao: () => 'function potencia(base, exp) {\n  let r = 1;\n  for (let i = 0; i < exp; i++) r *= base;\n  return r;\n}',
    casos: (r) => [[2, 10], [5, 0], [r.int(2, 9), r.int(1, 6)], [-3, 3], [r.int(2, 4), r.int(5, 10)]],
    dica: 'Multiplique a base exp vezes.'
  });

  /* ======================= NÍVEL 3 — INTERMEDIÁRIO ======================= */

  def({
    nivel: 3, nome: 'removerDuplicados', titulo: 'Remover duplicados', params: ['v'],
    enunciado: () => '<p>Retorne um novo vetor sem elementos repetidos, mantendo a ordem da primeira ocorrência.</p>',
    solucao: () => 'function removerDuplicados(v) {\n  const vistos = new Set();\n  const r = [];\n  for (const x of v) {\n    if (!vistos.has(x)) {\n      vistos.add(x);\n      r.push(x);\n    }\n  }\n  return r;\n}',
    casos: (r) => [[[1, 2, 2, 3, 1]], [[]], [r.intArray(12, 1, 6)], [r.intArray(15, 1, 10)]],
    dica: 'Use um Set para lembrar o que já apareceu.'
  });

  def({
    nivel: 3, nome: 'contarOcorrencias', titulo: 'Frequência de itens', params: ['v'],
    enunciado: () => '<p>Retorne um objeto em que cada chave é um item do vetor e o valor é quantas vezes ele aparece.</p>',
    solucao: () => 'function contarOcorrencias(v) {\n  const r = {};\n  for (const x of v) r[x] = (r[x] || 0) + 1;\n  return r;\n}',
    casos: (r) => [[['a', 'b', 'a']], [[]], [r.sample(['maçã', 'uva', 'pera', 'kiwi'], 4).concat(r.sample(['maçã', 'uva', 'pera'], 2))], [Array.from({ length: 8 }, () => r.pick(['x', 'y', 'z']))]],
    dica: 'Use o item como chave: r[x] = (r[x] || 0) + 1.'
  });

  def({
    nivel: 3, nome: 'ordenarBolha', titulo: 'Bubble sort', params: ['v'],
    enunciado: () => '<p>Retorne o vetor ordenado em ordem crescente implementando o <b>Bubble Sort</b> (não use <code>sort</code>).</p>',
    solucao: () => 'function ordenarBolha(v) {\n  const a = v.slice();\n  for (let i = 0; i < a.length - 1; i++) {\n    for (let j = 0; j < a.length - 1 - i; j++) {\n      if (a[j] > a[j + 1]) {\n        [a[j], a[j + 1]] = [a[j + 1], a[j]];\n      }\n    }\n  }\n  return a;\n}',
    casos: (r) => [[[5, 1, 4, 2]], [[]], [[1]], [r.intArray(10, -20, 20)], [r.intArray(15, 0, 100)]],
    dica: 'Compare vizinhos e troque se estiverem fora de ordem; repita n−1 vezes.'
  });

  def({
    nivel: 3, nome: 'buscaBinaria', titulo: 'Busca binária', params: ['v', 'alvo'],
    enunciado: () => '<p>Dado um vetor <b>ordenado</b> sem repetidos, retorne o índice de <code>alvo</code> usando busca binária, ou <code>-1</code> se não existir.</p>',
    solucao: () => 'function buscaBinaria(v, alvo) {\n  let ini = 0, fim = v.length - 1;\n  while (ini <= fim) {\n    const meio = Math.floor((ini + fim) / 2);\n    if (v[meio] === alvo) return meio;\n    if (v[meio] < alvo) ini = meio + 1;\n    else fim = meio - 1;\n  }\n  return -1;\n}',
    casos: (r) => {
      const v = r.uniqueInts(12, 1, 99).sort((a, b) => a - b);
      return [[[1, 3, 5, 7, 9], 7], [[1, 3, 5], 4], [[], 1], [v, r.pick(v)], [v, v[0]], [v, v[v.length - 1]], [v, 100]];
    },
    dica: 'Compare com o elemento do meio e descarte metade a cada passo.'
  });

  def({
    nivel: 3, nome: 'saoAnagramas', titulo: 'Anagramas', params: ['a', 'b'],
    enunciado: () => '<p>Retorne <code>true</code> se as duas palavras forem anagramas (mesmas letras, mesma quantidade, em qualquer ordem). Ignore maiúsculas/minúsculas.</p>',
    solucao: () => 'function saoAnagramas(a, b) {\n  const norm = (s) => s.toLowerCase().split("").sort().join("");\n  return norm(a) === norm(b);\n}',
    casos: (r) => {
      const p = r.pick(palavras);
      return [['amor', 'Roma'], ['casa', 'caso'], [p, r.shuffle(p.split('')).join('')], ['abc', 'abcd'], ['', '']];
    },
    dica: 'Ordene as letras das duas palavras e compare.'
  });

  def({
    nivel: 3, nome: 'primosAte', titulo: 'Crivo de primos', params: ['n'],
    enunciado: () => '<p>Retorne um vetor com todos os números primos de 2 até <code>n</code>. Tente usar o <b>Crivo de Eratóstenes</b>.</p>',
    solucao: () => 'function primosAte(n) {\n  const ehPrimo = new Array(n + 1).fill(true);\n  const r = [];\n  for (let i = 2; i <= n; i++) {\n    if (!ehPrimo[i]) continue;\n    r.push(i);\n    for (let j = i * i; j <= n; j += i) ehPrimo[j] = false;\n  }\n  return r;\n}',
    casos: (r) => [[10], [2], [1], [r.int(20, 60)], [r.int(60, 120)]],
    dica: 'Marque como não primos todos os múltiplos de cada primo encontrado.'
  });

  def({
    nivel: 3, nome: 'fibonacci', titulo: 'Sequência de Fibonacci', params: ['n'],
    enunciado: () => '<p>Retorne um vetor com os <code>n</code> primeiros termos de Fibonacci, começando por 0 e 1.</p>',
    solucao: () => 'function fibonacci(n) {\n  const r = [];\n  for (let i = 0; i < n; i++) {\n    r.push(i < 2 ? i : r[i - 1] + r[i - 2]);\n  }\n  return r;\n}',
    casos: (r) => [[7], [0], [1], [2], [r.int(10, 25)]],
    dica: 'Cada termo é a soma dos dois anteriores.'
  });

  def({
    nivel: 3, nome: 'transpor', titulo: 'Matriz transposta', params: ['m'],
    enunciado: () => '<p>Retorne a transposta da matriz <code>m</code> (linhas viram colunas). A matriz tem pelo menos uma linha.</p>',
    solucao: () => 'function transpor(m) {\n  const r = [];\n  for (let j = 0; j < m[0].length; j++) {\n    r.push([]);\n    for (let i = 0; i < m.length; i++) r[j].push(m[i][j]);\n  }\n  return r;\n}',
    casos: (r) => {
      const l = r.int(2, 4), c = r.int(2, 4);
      return [[[[1, 2, 3], [4, 5, 6]]], [[[1]]], [Array.from({ length: l }, () => r.intArray(c, 0, 9))]];
    },
    dica: 'O elemento m[i][j] vai para a posição r[j][i].'
  });

  def({
    nivel: 3, nome: 'capitalizar', titulo: 'Capitalizar palavras', params: ['frase'],
    enunciado: () => '<p>Retorne a frase com a primeira letra de cada palavra em maiúscula e o resto em minúscula. As palavras são separadas por um espaço.</p>',
    solucao: () => 'function capitalizar(frase) {\n  return frase\n    .split(" ")\n    .map(p => p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : p)\n    .join(" ");\n}',
    casos: (r) => [['ola mundo'], ['jAVAsCRIPT é LEGAL'], [''], [r.pick(frases)]],
    dica: 'split, map e join.'
  });

  def({
    nivel: 3, nome: 'segundoMaior', titulo: 'Segundo maior', params: ['v'],
    enunciado: () => '<p>Retorne o <b>segundo maior valor distinto</b> do vetor. Se não existir, retorne <code>null</code>.</p>',
    solucao: () => 'function segundoMaior(v) {\n  let p = -Infinity, s = -Infinity;\n  for (const x of v) {\n    if (x > p) { s = p; p = x; }\n    else if (x < p && x > s) s = x;\n  }\n  return s === -Infinity ? null : s;\n}',
    casos: (r) => [[[4, 9, 2, 9]], [[5, 5]], [[]], [r.intArray(8, 0, 50)], [r.intArray(10, -30, 30)]],
    dica: 'Guarde o maior e o segundo maior numa única passada.'
  });

  def({
    nivel: 3, nome: 'agruparPorTamanho', titulo: 'Agrupar por tamanho', params: ['palavras'],
    enunciado: () => '<p>Retorne um objeto cujas chaves são tamanhos de palavra e os valores são vetores com as palavras daquele tamanho, na ordem original.</p>',
    solucao: () => 'function agruparPorTamanho(palavras) {\n  const r = {};\n  for (const p of palavras) {\n    if (!r[p.length]) r[p.length] = [];\n    r[p.length].push(p);\n  }\n  return r;\n}',
    casos: (r) => [[['sol', 'lua', 'terra']], [[]], [r.sample(palavras, 6)]],
    dica: 'Crie o vetor da chave quando ele ainda não existir.'
  });

  def({
    nivel: 3, nome: 'paraBinario', titulo: 'Decimal para binário', params: ['n'],
    enunciado: () => '<p>Retorne a representação binária (texto) de um inteiro <code>n ≥ 0</code> <b>sem usar</b> <code>toString(2)</code>.</p>',
    solucao: () => 'function paraBinario(n) {\n  if (n === 0) return "0";\n  let r = "";\n  while (n > 0) {\n    r = (n % 2) + r;\n    n = Math.floor(n / 2);\n  }\n  return r;\n}',
    casos: (r) => [[5], [0], [1], [r.int(2, 255)], [r.int(256, 100000)]],
    dica: 'Divisões sucessivas por 2; o resto vai para a esquerda do texto.'
  });

  def({
    nivel: 3, nome: 'mesclarOrdenados', titulo: 'Mesclar vetores ordenados', params: ['a', 'b'],
    enunciado: () => '<p>Dados dois vetores já ordenados, retorne um único vetor ordenado com todos os elementos, em tempo linear (sem <code>sort</code>).</p>',
    solucao: () => 'function mesclarOrdenados(a, b) {\n  const r = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) r.push(a[i++]);\n    else r.push(b[j++]);\n  }\n  while (i < a.length) r.push(a[i++]);\n  while (j < b.length) r.push(b[j++]);\n  return r;\n}',
    casos: (r) => {
      const s = (n) => r.intArray(n, 0, 50).sort((x, y) => x - y);
      return [[[1, 4, 7], [2, 3, 9]], [[], [1, 2]], [s(5), s(7)], [s(8), s(3)]];
    },
    dica: 'Dois índices, um em cada vetor; sempre pegue o menor.'
  });

  def({
    nivel: 3, nome: 'rotacionar', titulo: 'Rotacionar vetor', params: ['v', 'k'],
    enunciado: () => '<p>Retorne um novo vetor com os elementos rotacionados <code>k</code> posições para a <b>direita</b>. <code>k</code> pode ser maior que o tamanho do vetor.</p>',
    solucao: () => 'function rotacionar(v, k) {\n  if (v.length === 0) return [];\n  k = k % v.length;\n  return v.slice(v.length - k).concat(v.slice(0, v.length - k));\n}',
    casos: (r) => [[[1, 2, 3, 4, 5], 2], [[1, 2, 3], 3], [[], 4], [r.intArray(6, 0, 9), r.int(1, 15)]],
    dica: 'Use k % tamanho e junte dois pedaços com slice.'
  });

  /* ======================= NÍVEL 4 — AVANÇADO ======================= */

  def({
    nivel: 4, nome: 'balanceado', titulo: 'Parênteses balanceados', params: ['s'],
    enunciado: () => '<p>Retorne <code>true</code> se todos os <code>()</code>, <code>[]</code> e <code>{}</code> do texto estiverem corretamente abertos e fechados. Outros caracteres devem ser ignorados.</p>',
    solucao: () => 'function balanceado(s) {\n  const pilha = [];\n  const pares = { ")": "(", "]": "[", "}": "{" };\n  for (const ch of s) {\n    if ("([{".includes(ch)) pilha.push(ch);\n    else if (ch in pares) {\n      if (pilha.pop() !== pares[ch]) return false;\n    }\n  }\n  return pilha.length === 0;\n}',
    casos: (r) => {
      const gerar = () => { let s = ''; const p = []; for (let i = 0; i < 10; i++) { if (p.length && r.bool()) s += { '(': ')', '[': ']', '{': '}' }[p.pop()]; else { const c = r.pick(['(', '[', '{']); p.push(c); s += c; } } return s + p.reverse().map((c) => ({ '(': ')', '[': ']', '{': '}' }[c])).join(''); };
      const ok = gerar();
      return [['([]{})'], ['([)]'], [''], ['((('], [ok], [ok + ')'], ['f(x[0]) { return 1; }']];
    },
    dica: 'Use uma pilha: empilhe aberturas; ao ver um fechamento, o topo tem que ser o par correspondente.'
  });

  def({
    nivel: 4, nome: 'permutacoes', titulo: 'Permutações', params: ['s'],
    enunciado: () => '<p>Retorne todas as permutações <b>distintas</b> das letras do texto, em ordem alfabética.</p>',
    solucao: () => 'function permutacoes(s) {\n  const r = new Set();\n  function bt(atual, resto) {\n    if (resto.length === 0) { r.add(atual); return; }\n    for (let i = 0; i < resto.length; i++) {\n      bt(atual + resto[i], resto.slice(0, i) + resto.slice(i + 1));\n    }\n  }\n  bt("", s);\n  return [...r].sort();\n}',
    casos: (r) => [['abc'], ['aab'], ['x'], [r.sample(['a', 'b', 'c', 'd', 'e'], 4).join('')]],
    dica: 'Backtracking: escolha uma letra, recorra com as restantes. Use um Set para evitar repetidas.'
  });

  def({
    nivel: 4, nome: 'mesclarIntervalos', titulo: 'Mesclar intervalos', params: ['intervalos'],
    enunciado: () => '<p>Dado um vetor de intervalos <code>[inicio, fim]</code>, mescle os que se sobrepõem (ou se tocam) e retorne o resultado ordenado pelo início.</p>',
    solucao: () => 'function mesclarIntervalos(intervalos) {\n  const v = intervalos.map(x => x.slice()).sort((a, b) => a[0] - b[0]);\n  const r = [];\n  for (const [ini, fim] of v) {\n    const ult = r[r.length - 1];\n    if (ult && ini <= ult[1]) ult[1] = Math.max(ult[1], fim);\n    else r.push([ini, fim]);\n  }\n  return r;\n}',
    casos: (r) => [[[[1, 3], [2, 6], [8, 10], [15, 18]]], [[[1, 4], [4, 5]]], [[]], [Array.from({ length: 6 }, () => { const a = r.int(0, 30); return [a, a + r.int(0, 6)]; })]],
    dica: 'Ordene pelo início e compare cada intervalo com o último do resultado.'
  });

  def({
    nivel: 4, nome: 'caminhosGrade', titulo: 'Caminhos na grade', params: ['linhas', 'colunas'],
    enunciado: () => '<p>Em uma grade de <code>linhas × colunas</code>, partindo do canto superior esquerdo, quantos caminhos diferentes levam ao canto inferior direito andando apenas para a <b>direita</b> ou para <b>baixo</b>? Use programação dinâmica.</p>',
    solucao: () => 'function caminhosGrade(linhas, colunas) {\n  const dp = Array.from({ length: linhas }, () => new Array(colunas).fill(1));\n  for (let i = 1; i < linhas; i++)\n    for (let j = 1; j < colunas; j++)\n      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n  return dp[linhas - 1][colunas - 1];\n}',
    casos: (r) => [[2, 2], [3, 3], [1, 5], [r.int(3, 8), r.int(3, 8)], [r.int(8, 12), r.int(8, 12)]],
    dica: 'O número de caminhos até uma célula é a soma dos caminhos até a célula de cima e a da esquerda.'
  });

  def({
    nivel: 4, nome: 'mochila', titulo: 'Problema da mochila 0/1', params: ['pesos', 'valores', 'capacidade'],
    enunciado: () => '<p>Cada item tem um peso e um valor. Escolha itens (cada um no máximo uma vez) cuja soma dos pesos não ultrapasse a capacidade e retorne o <b>maior valor total</b> possível.</p>',
    solucao: () => 'function mochila(pesos, valores, capacidade) {\n  const dp = new Array(capacidade + 1).fill(0);\n  for (let i = 0; i < pesos.length; i++) {\n    for (let c = capacidade; c >= pesos[i]; c--) {\n      dp[c] = Math.max(dp[c], dp[c - pesos[i]] + valores[i]);\n    }\n  }\n  return dp[capacidade];\n}',
    casos: (r) => {
      const n = r.int(4, 7);
      return [[[1, 3, 4, 5], [1, 4, 5, 7], 7], [[5], [10], 4], [[], [], 10], [r.intArray(n, 1, 10), r.intArray(n, 1, 30), r.int(8, 20)]];
    },
    dica: 'dp[c] = melhor valor com capacidade c. Percorra c de trás para frente para não reutilizar o mesmo item.'
  });

  def({
    nivel: 4, nome: 'menorCaminho', titulo: 'Menor caminho no labirinto', params: ['grade'],
    enunciado: () => '<p>A grade é um vetor de textos com <code>"."</code> (livre) e <code>"#"</code> (parede). Retorne o menor número de passos (cima, baixo, esquerda, direita) do canto superior esquerdo ao inferior direito, ou <code>-1</code> se não houver caminho. Use <b>busca em largura (BFS)</b>.</p>',
    solucao: () => 'function menorCaminho(grade) {\n  const L = grade.length, C = grade[0].length;\n  if (grade[0][0] === "#" || grade[L - 1][C - 1] === "#") return -1;\n  const dist = Array.from({ length: L }, () => new Array(C).fill(-1));\n  const fila = [[0, 0]];\n  dist[0][0] = 0;\n  while (fila.length) {\n    const [i, j] = fila.shift();\n    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {\n      const a = i + di, b = j + dj;\n      if (a >= 0 && b >= 0 && a < L && b < C && grade[a][b] === "." && dist[a][b] === -1) {\n        dist[a][b] = dist[i][j] + 1;\n        fila.push([a, b]);\n      }\n    }\n  }\n  return dist[L - 1][C - 1];\n}',
    casos: (r) => {
      const grade = () => { const l = r.int(4, 6), c = r.int(4, 7); const g2 = Array.from({ length: l }, () => Array.from({ length: c }, () => (r.bool(0.28) ? '#' : '.'))); g2[0][0] = '.'; g2[l - 1][c - 1] = '.'; return g2.map((x) => x.join('')); };
      return [[['..#', '#..', '...']], [['.#', '#.']], [['.']], [grade()], [grade()], [grade()]];
    },
    dica: 'BFS a partir da origem, guardando a distância de cada célula visitada.'
  });

  def({
    nivel: 4, nome: 'compactarRLE', titulo: 'Compressão RLE', params: ['s'],
    enunciado: () => '<p>Implemente a compressão <i>run-length encoding</i>: cada sequência de caracteres iguais vira o caractere seguido da quantidade. Ex.: <code>"aaabcc"</code> → <code>"a3b1c2"</code>.</p>',
    solucao: () => 'function compactarRLE(s) {\n  let r = "";\n  for (let i = 0; i < s.length; ) {\n    let j = i;\n    while (j < s.length && s[j] === s[i]) j++;\n    r += s[i] + (j - i);\n    i = j;\n  }\n  return r;\n}',
    casos: (r) => [['aaabcc'], [''], ['x'], [Array.from({ length: r.int(8, 16) }, () => r.pick(['a', 'b'])).join('')], [Array.from({ length: 5 }, () => r.pick(['z', 'y', 'w']).repeat(r.int(1, 4))).join('')]],
    dica: 'Para cada posição, avance um segundo índice enquanto o caractere se repetir.'
  });

  def({
    nivel: 4, nome: 'avaliarRPN', titulo: 'Notação polonesa reversa', params: ['tokens'],
    enunciado: () => '<p>Avalie uma expressão em notação polonesa reversa (pós-fixa). <code>tokens</code> é um vetor de textos com números e os operadores <code>+ - * /</code>. A divisão é inteira, truncando em direção a zero (<code>Math.trunc</code>).</p>',
    solucao: () => 'function avaliarRPN(tokens) {\n  const p = [];\n  for (const t of tokens) {\n    if ("+-*/".includes(t) && t.length === 1) {\n      const b = p.pop(), a = p.pop();\n      if (t === "+") p.push(a + b);\n      else if (t === "-") p.push(a - b);\n      else if (t === "*") p.push(a * b);\n      else p.push(Math.trunc(a / b));\n    } else p.push(Number(t));\n  }\n  return p.pop();\n}',
    casos: (r) => [[['2', '1', '+', '3', '*']], [['4', '13', '5', '/', '+']], [['7']], [[String(r.int(1, 20)), String(r.int(1, 20)), r.pick(['+', '-', '*']), String(r.int(1, 9)), r.pick(['+', '*', '-'])]], [[String(r.int(10, 99)), String(r.int(2, 9)), '/', String(r.int(1, 9)), '-']]],
    dica: 'Pilha: números são empilhados; um operador desempilha dois, calcula e empilha o resultado.'
  });

  def({
    nivel: 4, nome: 'somaSubconjunto', titulo: 'Soma de subconjunto', params: ['v', 'alvo'],
    enunciado: () => '<p>Retorne <code>true</code> se existir algum subconjunto (possivelmente vazio) dos números positivos de <code>v</code> cuja soma seja exatamente <code>alvo</code>.</p>',
    solucao: () => 'function somaSubconjunto(v, alvo) {\n  const pode = new Array(alvo + 1).fill(false);\n  pode[0] = true;\n  for (const x of v) {\n    for (let s = alvo; s >= x; s--) {\n      if (pode[s - x]) pode[s] = true;\n    }\n  }\n  return pode[alvo];\n}',
    casos: (r) => [[[3, 34, 4, 12, 5, 2], 9], [[3, 34, 4, 12, 5, 2], 30], [[], 0], [r.intArray(6, 1, 20), r.int(10, 40)], [r.intArray(5, 5, 15), r.int(1, 4)]],
    dica: 'Programação dinâmica: pode[s] indica se a soma s é alcançável.'
  });

  def({
    nivel: 4, nome: 'maiorSubsequencia', titulo: 'Maior subsequência crescente', params: ['v'],
    enunciado: () => '<p>Retorne o <b>tamanho</b> da maior subsequência estritamente crescente do vetor (os elementos não precisam ser vizinhos).</p>',
    solucao: () => 'function maiorSubsequencia(v) {\n  const dp = new Array(v.length).fill(1);\n  let melhor = 0;\n  for (let i = 0; i < v.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (v[j] < v[i]) dp[i] = Math.max(dp[i], dp[j] + 1);\n    }\n    melhor = Math.max(melhor, dp[i]);\n  }\n  return melhor;\n}',
    casos: (r) => [[[10, 9, 2, 5, 3, 7, 101, 18]], [[]], [[5, 5, 5]], [r.intArray(10, 0, 30)], [r.intArray(14, 0, 50)]],
    dica: 'dp[i] = tamanho da maior subsequência que termina em i.'
  });

  def({
    nivel: 4, nome: 'maiorSomaContigua', titulo: 'Maior soma contígua (Kadane)', params: ['v'],
    enunciado: () => '<p>Retorne a maior soma possível de um trecho <b>contíguo e não vazio</b> do vetor (que pode conter negativos).</p>',
    solucao: () => 'function maiorSomaContigua(v) {\n  let atual = v[0], melhor = v[0];\n  for (let i = 1; i < v.length; i++) {\n    atual = Math.max(v[i], atual + v[i]);\n    melhor = Math.max(melhor, atual);\n  }\n  return melhor;\n}',
    casos: (r) => [[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], [[-3, -1, -2]], [[5]], [r.intArray(10, -10, 10)], [r.intArray(15, -20, 15)]],
    dica: 'Algoritmo de Kadane: em cada posição, continue o trecho atual ou recomece.'
  });

  def({
    nivel: 4, nome: 'contarIlhas', titulo: 'Contar ilhas', params: ['mapa'],
    enunciado: () => '<p>O mapa é um vetor de textos com <code>"1"</code> (terra) e <code>"0"</code> (água). Uma ilha é um grupo de terras ligadas na horizontal ou vertical. Retorne quantas ilhas existem. Use <b>busca em profundidade (DFS)</b>.</p>',
    solucao: () => 'function contarIlhas(mapa) {\n  const g = mapa.map(l => l.split(""));\n  let ilhas = 0;\n  function afundar(i, j) {\n    if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] !== "1") return;\n    g[i][j] = "0";\n    afundar(i + 1, j); afundar(i - 1, j); afundar(i, j + 1); afundar(i, j - 1);\n  }\n  for (let i = 0; i < g.length; i++)\n    for (let j = 0; j < g[0].length; j++)\n      if (g[i][j] === "1") { ilhas++; afundar(i, j); }\n  return ilhas;\n}',
    casos: (r) => {
      const mapa = () => Array.from({ length: r.int(4, 6) }, (_, i, ) => i).map(() => '').map(() => Array.from({ length: 6 }, () => (r.bool(0.4) ? '1' : '0')).join(''));
      return [[['11000', '11000', '00100', '00011']], [['000']], [['1']], [mapa()], [mapa()]];
    },
    dica: 'Ao encontrar terra, conte uma ilha e "afunde" toda ela com DFS para não contar de novo.'
  });

  def({
    nivel: 4, nome: 'moedasMinimas', titulo: 'Troco com menos moedas', params: ['moedas', 'valor'],
    enunciado: () => '<p>Dadas as moedas disponíveis (quantidade ilimitada de cada), retorne o <b>menor número de moedas</b> que somam exatamente <code>valor</code>, ou <code>-1</code> se for impossível. Atenção: a estratégia gulosa nem sempre funciona!</p>',
    solucao: () => 'function moedasMinimas(moedas, valor) {\n  const dp = new Array(valor + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let v = 1; v <= valor; v++) {\n    for (const m of moedas) {\n      if (m <= v && dp[v - m] + 1 < dp[v]) dp[v] = dp[v - m] + 1;\n    }\n  }\n  return dp[valor] === Infinity ? -1 : dp[valor];\n}',
    casos: (r) => [[[1, 3, 4], 6], [[2], 3], [[1, 5, 10, 25], 0], [r.uniqueInts(3, 2, 12), r.int(15, 60)], [[1, 5, 10, 25, 50], r.int(30, 199)]],
    dica: 'dp[v] = 1 + min(dp[v − m]) para cada moeda m ≤ v.'
  });
})(typeof window !== 'undefined' ? window : globalThis);
