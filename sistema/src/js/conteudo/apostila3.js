(function (g) {
  const KX = g.KX;
  const C = KX.util.codigo;
  const dica = (t) => `<div class="box dica"><b>Dica</b><div>${t}</div></div>`;
  const atencao = (t) => `<div class="box atencao"><b>Atenção</b><div>${t}</div></div>`;
  const resumo = (itens) => `<div class="box resumo"><b>Resumo do capítulo</b><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  KX.apostilas = KX.apostilas || [];

  KX.apostilas.push({
    id: 'apostila-03', nivel: 3, numero: 3,
    titulo: 'Programação Intermediária',
    subtitulo: 'Objetos, funções de alta ordem, recursão, ordenação, busca e bases numéricas',
    arquivo: 'Apostila 03 - Intermediario - Programacao Intermediaria.pdf',
    apresentacao: `<p>Você já domina variáveis, decisões, laços, vetores e funções. Nesta apostila vamos <b>modelar dados reais</b> com objetos, escrever código mais expressivo com <code>map</code>, <code>filter</code> e <code>reduce</code>, pensar de forma <b>recursiva</b> e estudar os algoritmos clássicos de ordenação e busca.</p>
      <p>Também veremos como o computador representa números (binário, hexadecimal, bits) e algumas ferramentas de matemática que todo programador usa.</p>`,
    capitulos: [
      {
        titulo: 'Objetos e referências',
        html: `
<p>Um <b>objeto</b> agrupa dados relacionados em pares <b>chave: valor</b>. Enquanto um vetor é acessado por posição, um objeto é acessado por nome.</p>
${C(`const aluno = {
  nome: "Carla",
  idade: 21,
  notas: [8, 9.5, 7],
  ativo: true
};
console.log(aluno.nome);          // Carla
console.log(aluno["idade"]);      // 21
aluno.curso = "Sistemas";         // cria uma nova chave
delete aluno.ativo;               // remove uma chave`)}
<h3>Percorrendo objetos</h3>
${C(`const estoque = { maca: 10, banana: 4, uva: 0 };
for (const fruta in estoque) {
  console.log(fruta, estoque[fruta]);
}
console.log(Object.keys(estoque));     // ["maca", "banana", "uva"]
console.log(Object.values(estoque));   // [10, 4, 0]
console.log(Object.entries(estoque));  // [["maca", 10], ["banana", 4], ["uva", 0]]`)}
<h3>Objeto como dicionário (contagem)</h3>
<p>Um padrão muito poderoso: usar o próprio dado como chave para contar ou agrupar.</p>
${C(`const votos = ["A", "B", "A", "C", "A", "B"];
const contagem = {};
for (const v of votos) {
  contagem[v] = (contagem[v] || 0) + 1;
}
console.log(contagem);   // { A: 3, B: 2, C: 1 }`)}
<p>A expressão <code>contagem[v] || 0</code> devolve 0 quando a chave ainda não existe (pois <code>undefined</code> é considerado falso).</p>
<h3>Vetores de objetos</h3>
${C(`const produtos = [
  { nome: "Caneta", preco: 2.5 },
  { nome: "Caderno", preco: 18 },
  { nome: "Mochila", preco: 120 }
];
let total = 0;
for (const p of produtos) total += p.preco;
console.log(total);   // 140.5`)}
<h3>Valor × referência</h3>
<p>Tipos primitivos (number, string, boolean) são <b>copiados</b> na atribuição. Objetos e vetores não: a variável guarda uma <b>referência</b> (um “endereço”) para o objeto.</p>
${C(`let a = 5;
let b = a;
b = 10;
console.log(a);   // 5 → primitivos são copiados

const p1 = { x: 1 };
const p2 = p1;     // p2 aponta para o MESMO objeto
p2.x = 99;
console.log(p1.x); // 99!

const p3 = { ...p1 };   // spread: cria uma CÓPIA
p3.x = 0;
console.log(p1.x);      // 99 (não mudou)`)}
${atencao('A cópia com spread (<code>{ ...obj }</code> ou <code>[...vetor]</code>) é <b>rasa</b>: objetos internos continuam compartilhados. Para uma cópia profunda simples, use <code>structuredClone(obj)</code>.')}
<h3>Métodos</h3>
<p>Funções guardadas dentro de objetos são chamadas de métodos. A palavra <code>this</code> se refere ao próprio objeto:</p>
${C(`const conta = {
  saldo: 100,
  depositar(valor) {
    this.saldo += valor;
  }
};
conta.depositar(50);
console.log(conta.saldo);   // 150`)}
${resumo(['Objetos guardam pares chave: valor; acesse com obj.chave ou obj["chave"].', 'Object.keys, values e entries ajudam a percorrer objetos.', 'Objetos são atribuídos por referência; use spread para copiar.', 'Objetos como dicionário resolvem problemas de contagem e agrupamento.'])}`,
        exercicios: [{ gen: 'r-objetos-ref', n: 2 }, { gen: 'r-objeto-contagem', n: 1 }, { gen: 'p-contarOcorrencias', n: 1 }, { gen: 'p-agruparPorTamanho', n: 1 }]
      },
      {
        titulo: 'Funções de alta ordem: map, filter e reduce',
        html: `
<p>Em JavaScript, funções são valores: podem ser guardadas em variáveis e passadas como argumento. Uma <b>função de alta ordem</b> recebe ou devolve outra função. Os vetores têm várias delas embutidas.</p>
<h3>map: transformar cada elemento</h3>
${C(`const precos = [10, 20, 30];
const comImposto = precos.map(p => p * 1.1);
console.log(comImposto);   // [11, 22, 33]`)}
<h3>filter: manter só alguns</h3>
${C(`const idades = [12, 25, 17, 40, 8];
const adultos = idades.filter(i => i >= 18);
console.log(adultos);   // [25, 40]`)}
<h3>reduce: reduzir a um único valor</h3>
${C(`const valores = [5, 10, 15];
const soma = valores.reduce((acumulado, atual) => acumulado + atual, 0);
console.log(soma);   // 30`)}
<p>O <code>reduce</code> recebe uma função com o acumulador e o elemento atual, e o valor inicial do acumulador (aqui, 0).</p>
<h3>Encadeando</h3>
${C(`const pedidos = [
  { item: "pizza", valor: 50, entregue: true },
  { item: "suco", valor: 8, entregue: false },
  { item: "lanche", valor: 30, entregue: true }
];
const faturado = pedidos
  .filter(p => p.entregue)
  .map(p => p.valor)
  .reduce((s, v) => s + v, 0);
console.log(faturado);   // 80`)}
<h3>Outros métodos úteis</h3>
<table class="tabela">
  <tr><th>Método</th><th>Devolve</th></tr>
  <tr><td><code>find(fn)</code></td><td>O primeiro elemento que satisfaz fn (ou undefined)</td></tr>
  <tr><td><code>findIndex(fn)</code></td><td>O índice do primeiro que satisfaz fn (ou −1)</td></tr>
  <tr><td><code>some(fn)</code></td><td>true se <b>algum</b> elemento satisfaz fn</td></tr>
  <tr><td><code>every(fn)</code></td><td>true se <b>todos</b> satisfazem fn</td></tr>
  <tr><td><code>forEach(fn)</code></td><td>Nada: só executa fn para cada elemento</td></tr>
</table>
<h3>sort com comparador</h3>
<p>O <code>sort()</code> sem argumentos ordena como <b>texto</b>: <code>[10, 9, 1].sort()</code> resulta em <code>[1, 10, 9]</code>! Para números, passe uma função de comparação que devolve negativo (a vem antes), positivo (b vem antes) ou zero:</p>
${C(`const v = [10, 9, 1, 25];
v.sort((a, b) => a - b);    // crescente: [1, 9, 10, 25]
v.sort((a, b) => b - a);    // decrescente: [25, 10, 9, 1]

const pessoas = [{ nome: "Rui", idade: 30 }, { nome: "Ana", idade: 22 }];
pessoas.sort((a, b) => a.idade - b.idade);
pessoas.sort((a, b) => a.nome.localeCompare(b.nome));`)}
${atencao('<code>sort</code> modifica o vetor original. Se precisar preservá-lo, ordene uma cópia: <code>[...v].sort(...)</code>.')}
<h3>Set: conjuntos sem repetição</h3>
${C(`const comRepetidos = [3, 1, 3, 2, 1];
const unicos = [...new Set(comRepetidos)];
console.log(unicos);   // [3, 1, 2]`)}
${resumo(['map transforma, filter seleciona, reduce acumula.', 'Encadeie métodos para escrever transformações legíveis.', 'Para ordenar números use sort((a, b) => a − b).', 'new Set(v) elimina repetidos.'])}`,
        exercicios: [{ gen: 'r-map-filter', n: 3 }, { gen: 'r-ordenacao', n: 2 }, { gen: 'p-removerDuplicados', n: 1 }, { gen: 'p-capitalizar', n: 1 }, { gen: 'p-segundoMaior', n: 1 }]
      },
      {
        titulo: 'Recursão',
        html: `
<p>Uma função é <b>recursiva</b> quando chama a si mesma. A ideia é resolver um problema grande a partir da solução de uma versão menor do mesmo problema.</p>
<p>Toda recursão precisa de duas partes:</p>
<ol>
  <li><b>Caso base:</b> a situação simples, resolvida diretamente, que <b>para</b> a recursão.</li>
  <li><b>Caso recursivo:</b> a função chama a si mesma com uma entrada <b>menor</b>, aproximando-se do caso base.</li>
</ol>
${C(`function fatorial(n) {
  if (n <= 1) return 1;            // caso base
  return n * fatorial(n - 1);      // caso recursivo
}
console.log(fatorial(5));   // 120`)}
<h3>A pilha de chamadas</h3>
<p>Cada chamada fica “esperando” a próxima terminar. Veja a execução de <code>fatorial(4)</code>:</p>
<pre class="code">fatorial(4) = 4 * fatorial(3)
                  fatorial(3) = 3 * fatorial(2)
                                    fatorial(2) = 2 * fatorial(1)
                                                      fatorial(1) = 1   ← caso base
                                    fatorial(2) = 2 * 1 = 2
                  fatorial(3) = 3 * 2 = 6
fatorial(4) = 4 * 6 = 24</pre>
${atencao('Sem caso base (ou se a entrada não diminuir), a função chama a si mesma até estourar a memória: erro <i>Maximum call stack size exceeded</i>.')}
<h3>Mais exemplos</h3>
${C(`// soma dos elementos de um vetor
function soma(v) {
  if (v.length === 0) return 0;
  return v[0] + soma(v.slice(1));
}

// soma dos dígitos de um número
function somaDigitos(n) {
  if (n < 10) return n;
  return (n % 10) + somaDigitos(Math.floor(n / 10));
}

// potência rápida: a^n com cerca de log(n) multiplicações
function potencia(a, n) {
  if (n === 0) return 1;
  const metade = potencia(a, Math.floor(n / 2));
  return n % 2 === 0 ? metade * metade : metade * metade * a;
}`)}
<h3>Fibonacci e o custo da recursão ingênua</h3>
${C(`function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}`)}
<p>É elegante, mas cada chamada gera duas outras, e os mesmos valores são recalculados muitas vezes. <code>fib(40)</code> faz mais de 300 milhões de chamadas! Na Apostila 4 veremos como a <b>memoização</b> resolve isso.</p>
<h3>Recursão × iteração</h3>
<p>Todo algoritmo recursivo pode ser escrito com laços, e vice-versa. A recursão brilha em problemas naturalmente recursivos: árvores, pastas e subpastas, combinações, dividir e conquistar. Para contagens simples, um laço costuma ser mais eficiente.</p>
${dica('Para escrever uma recursão, confie no “salto de fé”: suponha que a chamada para a entrada menor já funciona e pergunte apenas como usar esse resultado para resolver a entrada atual.')}
${resumo(['Recursão = caso base + chamada com entrada menor.', 'Cada chamada ocupa espaço na pilha até retornar.', 'Recursão ingênua pode recalcular valores e ficar exponencial.'])}`,
        exercicios: [{ gen: 'r-recursao', n: 3 }, { gen: 'p-fibonacci', n: 1 }, { gen: 'recorrencia', n: 1 }]
      },
      {
        titulo: 'Ordenação e busca',
        html: `
<p>Ordenar e buscar dados estão entre as tarefas mais comuns da computação. Conhecer os algoritmos clássicos ensina técnicas que reaparecem em todo tipo de problema.</p>
<h3>Busca linear</h3>
<p>Percorre o vetor do início ao fim. Funciona em qualquer vetor, mas no pior caso olha todos os n elementos.</p>
${C(`function buscaLinear(v, alvo) {
  for (let i = 0; i < v.length; i++) {
    if (v[i] === alvo) return i;
  }
  return -1;
}`)}
<h3>Busca binária</h3>
<p>Em um vetor <b>ordenado</b>, compare com o elemento do meio: se o alvo for maior, descarte a metade esquerda; se for menor, a direita. A cada passo, metade dos candidatos some. Em 1 milhão de elementos, bastam cerca de 20 comparações!</p>
${C(`function buscaBinaria(v, alvo) {
  let ini = 0, fim = v.length - 1;
  while (ini <= fim) {
    const meio = Math.floor((ini + fim) / 2);
    if (v[meio] === alvo) return meio;
    if (v[meio] < alvo) ini = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}`)}
<h3>Bubble sort</h3>
<p>Compara pares vizinhos e troca os que estão fora de ordem. A cada passada, o maior elemento restante “borbulha” para o fim.</p>
${C(`function bubbleSort(v) {
  for (let i = 0; i < v.length - 1; i++) {
    for (let j = 0; j < v.length - 1 - i; j++) {
      if (v[j] > v[j + 1]) [v[j], v[j + 1]] = [v[j + 1], v[j]];
    }
  }
  return v;
}`)}
<h3>Selection sort</h3>
<p>Encontra o menor elemento e o coloca na primeira posição; depois o segundo menor na segunda posição, e assim por diante.</p>
${C(`function selectionSort(v) {
  for (let i = 0; i < v.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < v.length; j++) if (v[j] < v[min]) min = j;
    [v[i], v[min]] = [v[min], v[i]];
  }
  return v;
}`)}
<h3>Insertion sort</h3>
<p>Como quem organiza cartas na mão: cada novo elemento é inserido na posição correta entre os já ordenados. É rápido para vetores quase ordenados.</p>
${C(`function insertionSort(v) {
  for (let i = 1; i < v.length; i++) {
    const atual = v[i];
    let j = i - 1;
    while (j >= 0 && v[j] > atual) {
      v[j + 1] = v[j];
      j--;
    }
    v[j + 1] = atual;
  }
  return v;
}`)}
<h3>Merge sort: dividir e conquistar</h3>
<p>Divide o vetor ao meio, ordena cada metade recursivamente e <b>mescla</b> as duas metades ordenadas. É muito mais rápido em vetores grandes.</p>
${C(`function mergeSort(v) {
  if (v.length <= 1) return v;
  const meio = Math.floor(v.length / 2);
  const esq = mergeSort(v.slice(0, meio));
  const dir = mergeSort(v.slice(meio));
  const r = [];
  let i = 0, j = 0;
  while (i < esq.length && j < dir.length) {
    r.push(esq[i] <= dir[j] ? esq[i++] : dir[j++]);
  }
  return r.concat(esq.slice(i), dir.slice(j));
}`)}
<table class="tabela">
  <tr><th>Algoritmo</th><th>Pior caso</th><th>Observação</th></tr>
  <tr><td>Bubble / Selection / Insertion</td><td>O(n²)</td><td>Simples; bons para vetores pequenos</td></tr>
  <tr><td>Merge sort</td><td>O(n log n)</td><td>Estável; usa memória extra</td></tr>
  <tr><td>Busca linear</td><td>O(n)</td><td>Qualquer vetor</td></tr>
  <tr><td>Busca binária</td><td>O(log n)</td><td>Exige vetor ordenado</td></tr>
</table>
<p class="obs">A notação O(...) é explicada em detalhe na Apostila 4.</p>
${resumo(['Busca binária exige vetor ordenado e descarta metade a cada passo.', 'Bubble, selection e insertion sort são O(n²).', 'Merge sort usa dividir e conquistar e é O(n log n).'])}`,
        exercicios: [{ gen: 'p-ordenarBolha', n: 1 }, { gen: 'p-buscaBinaria', n: 1 }, { gen: 'p-mesclarOrdenados', n: 1 }, { gen: 'p-saoAnagramas', n: 1 }, { gen: 'p-rotacionar', n: 1 }, { gen: 'busca-binaria-passos', n: 1 }]
      },
      {
        titulo: 'Bases numéricas e operações com bits',
        html: `
<p>Internamente, o computador representa tudo com <b>bits</b> (0 ou 1). Entender as bases numéricas ajuda a trabalhar com cores, permissões, redes, compressão e otimizações.</p>
<h3>Sistemas de numeração</h3>
<table class="tabela">
  <tr><th>Base</th><th>Dígitos</th><th>Exemplo (valor 45)</th><th>Em JS</th></tr>
  <tr><td>Decimal (10)</td><td>0–9</td><td>45</td><td><code>45</code></td></tr>
  <tr><td>Binária (2)</td><td>0–1</td><td>101101</td><td><code>0b101101</code></td></tr>
  <tr><td>Octal (8)</td><td>0–7</td><td>55</td><td><code>0o55</code></td></tr>
  <tr><td>Hexadecimal (16)</td><td>0–9, A–F</td><td>2D</td><td><code>0x2D</code></td></tr>
</table>
<h3>Qualquer base para decimal</h3>
<p>Multiplique cada dígito pela base elevada à sua posição (da direita para a esquerda, começando em 0) e some:</p>
<pre class="code">2D₁₆ = 2×16¹ + 13×16⁰ = 32 + 13 = 45
101101₂ = 32 + 0 + 8 + 4 + 0 + 1 = 45</pre>
<h3>Decimal para outra base</h3>
<p>Divida sucessivamente pela base e leia os restos de trás para frente.</p>
${C(`console.log((45).toString(2));     // "101101"
console.log((45).toString(16));    // "2d"
console.log(parseInt("2D", 16));   // 45
console.log(parseInt("101101", 2)); // 45`)}
${dica('Cada dígito hexadecimal corresponde a exatamente 4 bits. Por isso o hexadecimal é usado para escrever binário de forma compacta: 1010 1111₂ = AF₁₆. Cores na web (#FF8800) são três bytes em hexadecimal.')}
<h3>Operadores bit a bit</h3>
<table class="tabela">
  <tr><th>Operador</th><th>Nome</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>&amp;</code></td><td>E (AND)</td><td><code>12 &amp; 10</code> (1100 &amp; 1010)</td><td>8 (1000)</td></tr>
  <tr><td><code>|</code></td><td>OU (OR)</td><td><code>12 | 10</code></td><td>14 (1110)</td></tr>
  <tr><td><code>^</code></td><td>OU exclusivo (XOR)</td><td><code>12 ^ 10</code></td><td>6 (0110)</td></tr>
  <tr><td><code>~</code></td><td>NÃO (NOT)</td><td><code>~12</code></td><td>−13</td></tr>
  <tr><td><code>&lt;&lt;</code></td><td>Desloca à esquerda</td><td><code>3 &lt;&lt; 2</code></td><td>12 (multiplica por 4)</td></tr>
  <tr><td><code>&gt;&gt;</code></td><td>Desloca à direita</td><td><code>12 &gt;&gt; 2</code></td><td>3 (divide por 4)</td></tr>
</table>
<h3>Truques úteis</h3>
${C(`const n = 13;
console.log((n & 1) === 1);        // ímpar? true
console.log((n >> 2) & 1);         // valor do bit 2 → 1
const ehPotenciaDe2 = (x) => x > 0 && (x & (x - 1)) === 0;
console.log(ehPotenciaDe2(64));    // true

// permissões combinadas com OR e testadas com AND
const LER = 1, ESCREVER = 2, EXECUTAR = 4;
const perm = LER | EXECUTAR;              // 5
console.log((perm & ESCREVER) !== 0);     // false`)}
${resumo(['Para converter para decimal, some dígito × base^posição.', 'Para converter do decimal, divida pela base e leia os restos ao contrário.', '1 dígito hexadecimal = 4 bits.', '& | ^ operam bit a bit; << e >> multiplicam e dividem por potências de 2.'])}`,
        exercicios: [{ gen: 'binario', n: 1 }, { gen: 'hexadecimal', n: 2 }, { gen: 'bitwise', n: 3 }, { gen: 'p-paraBinario', n: 1 }]
      },
      {
        titulo: 'Matemática para programadores',
        html: `
<h3>Números primos e o Crivo de Eratóstenes</h3>
<p>Para listar todos os primos até n, em vez de testar cada número, o crivo marca os múltiplos de cada primo encontrado como “não primos”:</p>
${C(`function crivo(n) {
  const primo = new Array(n + 1).fill(true);
  primo[0] = primo[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (primo[i]) {
      for (let j = i * i; j <= n; j += i) primo[j] = false;
    }
  }
  return primo.map((p, i) => p ? i : -1).filter(i => i !== -1);
}
console.log(crivo(30));   // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`)}
<h3>Contagem (combinatória)</h3>
<table class="tabela">
  <tr><th>Situação</th><th>Fórmula</th><th>Exemplo</th></tr>
  <tr><td>Ordenar n itens (permutação)</td><td>n!</td><td>5 livros na estante: 120</td></tr>
  <tr><td>Escolher k de n, <b>ordem importa</b> (arranjo)</td><td>n! / (n − k)!</td><td>Pódio entre 8: 8·7·6 = 336</td></tr>
  <tr><td>Escolher k de n, <b>ordem não importa</b> (combinação)</td><td>n! / (k!·(n − k)!)</td><td>Dupla entre 6 pessoas: 15</td></tr>
  <tr><td>Pares entre n elementos</td><td>n(n − 1) / 2</td><td>Apertos de mão entre 10: 45</td></tr>
</table>
<p>O <b>princípio multiplicativo</b> está por trás de tudo: se uma escolha tem a opções e outra tem b, as duas juntas têm a × b possibilidades.</p>
<h3>Somas de progressões</h3>
<p>A soma dos n primeiros termos de uma PA é S<sub>n</sub> = n·(a<sub>1</sub> + a<sub>n</sub>) / 2. Em particular, 1 + 2 + ... + n = n(n + 1)/2. Isso permite trocar um laço por uma fórmula de tempo constante.</p>
${C(`const n = 1000;
console.log(n * (n + 1) / 2);   // 500500, sem laço nenhum`)}
<h3>Matrizes</h3>
${C(`function transposta(m) {
  return m[0].map((_, j) => m.map(linha => linha[j]));
}
function multiplicar(a, b) {
  return a.map(linha =>
    b[0].map((_, j) => linha.reduce((s, x, k) => s + x * b[k][j], 0))
  );
}
console.log(transposta([[1, 2], [3, 4], [5, 6]]));   // [[1, 3, 5], [2, 4, 6]]`)}
<h3>Cuidado com números decimais</h3>
<p>Computadores representam decimais em binário com precisão limitada: <code>0.1 + 0.2</code> resulta em <code>0.30000000000000004</code>. Para dinheiro, trabalhe em centavos (inteiros) ou arredonde: <code>Math.round(x * 100) / 100</code>.</p>
${resumo(['O crivo de Eratóstenes lista primos de forma eficiente.', 'Permutação: n!; arranjo: ordem importa; combinação: ordem não importa.', 'Fórmulas fechadas (como n(n+1)/2) evitam laços.', 'Números decimais têm erros de arredondamento.'])}`,
        exercicios: [{ gen: 'combinatoria', n: 4 }, { gen: 'soma-pa', n: 2 }, { gen: 'p-primosAte', n: 1 }, { gen: 'p-transpor', n: 1 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
