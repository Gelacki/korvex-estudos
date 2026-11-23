(function (g) {
  const KX = g.KX;
  const C = KX.util.codigo;
  const dica = (t) => `<div class="box dica"><b>Dica</b><div>${t}</div></div>`;
  const atencao = (t) => `<div class="box atencao"><b>Atenção</b><div>${t}</div></div>`;
  const resumo = (itens) => `<div class="box resumo"><b>Resumo do capítulo</b><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  KX.apostilas = KX.apostilas || [];

  KX.apostilas.push({
    id: 'apostila-04', nivel: 4, numero: 4,
    titulo: 'Algoritmos Avançados',
    subtitulo: 'Complexidade, estruturas de dados, grafos, backtracking, programação dinâmica e JavaScript avançado',
    arquivo: 'Apostila 04 - Avancado - Algoritmos Avancados.pdf',
    apresentacao: `<p>Esta apostila trata do que separa quem “faz funcionar” de quem resolve problemas difíceis com eficiência. São os temas cobrados em maratonas de programação e em entrevistas técnicas de grandes empresas, e que aparecem no dia a dia de sistemas que lidam com muitos dados.</p>
      <p>Pré-requisitos: domínio das Apostilas 1 a 3, principalmente recursão, objetos e funções de alta ordem.</p>`,
    capitulos: [
      {
        titulo: 'Análise de complexidade (Big-O)',
        html: `
<p>Dois algoritmos podem dar a mesma resposta e ainda assim um levar milissegundos e o outro horas. A <b>análise de complexidade</b> mede como o tempo (ou a memória) cresce quando o tamanho da entrada, <b>n</b>, aumenta.</p>
<p>A notação <b>Big-O</b> descreve esse crescimento no pior caso, ignorando constantes e termos menores. Um algoritmo que faz 3n² + 5n + 20 operações é O(n²), porque para n grande o termo n² domina.</p>
<h3>Classes mais comuns</h3>
<table class="tabela">
  <tr><th>Notação</th><th>Nome</th><th>Exemplo</th><th>n = 1.000.000</th></tr>
  <tr><td>O(1)</td><td>Constante</td><td>Acessar v[i]</td><td>1 operação</td></tr>
  <tr><td>O(log n)</td><td>Logarítmica</td><td>Busca binária</td><td>~20</td></tr>
  <tr><td>O(n)</td><td>Linear</td><td>Percorrer um vetor</td><td>1 milhão</td></tr>
  <tr><td>O(n log n)</td><td>Linearítmica</td><td>Merge sort</td><td>~20 milhões</td></tr>
  <tr><td>O(n²)</td><td>Quadrática</td><td>Dois laços aninhados</td><td>10¹² (horas)</td></tr>
  <tr><td>O(2ⁿ)</td><td>Exponencial</td><td>Fibonacci ingênuo, subconjuntos</td><td>Impossível</td></tr>
</table>
<h3>Regras práticas</h3>
<ul>
  <li><b>Passos em sequência somam:</b> O(n) + O(n) = O(n).</li>
  <li><b>Laços aninhados multiplicam:</b> um laço de n dentro de outro de n é O(n²).</li>
  <li><b>Dividir pela metade a cada passo</b> gera O(log n).</li>
  <li><b>Ignore constantes:</b> O(2n) = O(n); O(n/2) = O(n).</li>
  <li><b>Recursão:</b> conte quantas chamadas acontecem e quanto trabalho cada uma faz.</li>
</ul>
${C(`// O(n²): compara todos os pares
function temDuplicadoLento(v) {
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++)
      if (v[i] === v[j]) return true;
  return false;
}

// O(n): troca tempo por memória usando um Set
function temDuplicadoRapido(v) {
  const vistos = new Set();
  for (const x of v) {
    if (vistos.has(x)) return true;
    vistos.add(x);
  }
  return false;
}`)}
<p>Esse é o padrão mais comum de otimização: usar uma estrutura de dados auxiliar (Set, Map, objeto) para evitar um laço interno.</p>
<h3>Complexidade de espaço</h3>
<p>Também medimos a memória extra usada. <code>temDuplicadoRapido</code> é O(n) em espaço por causa do Set; <code>temDuplicadoLento</code> é O(1).</p>
<h3>Custo das operações em JavaScript</h3>
<table class="tabela">
  <tr><th>Operação</th><th>Custo</th></tr>
  <tr><td><code>v[i]</code>, <code>v.push</code>, <code>v.pop</code></td><td>O(1)</td></tr>
  <tr><td><code>v.shift</code>, <code>v.unshift</code>, <code>v.splice</code></td><td>O(n)</td></tr>
  <tr><td><code>v.includes</code>, <code>v.indexOf</code></td><td>O(n)</td></tr>
  <tr><td><code>set.has</code>, <code>map.get</code>, <code>obj[chave]</code></td><td>O(1) em média</td></tr>
  <tr><td><code>v.sort</code></td><td>O(n log n)</td></tr>
</table>
${atencao('Um <code>includes</code> dentro de um laço parece inofensivo, mas transforma O(n) em O(n²). Com 100 mil elementos são 10 bilhões de comparações.')}
${resumo(['Big-O descreve o crescimento do custo no pior caso.', 'Laços aninhados multiplicam; dividir pela metade dá log n.', 'Set e Map trocam memória por velocidade: buscas O(1).'])}`,
        exercicios: [{ gen: 'big-o', n: 4 }, { gen: 'busca-binaria-passos', n: 1 }]
      },
      {
        titulo: 'Estruturas de dados',
        html: `
<p>Uma <b>estrutura de dados</b> é uma forma de organizar informações para que certas operações fiquem eficientes. Escolher a estrutura certa costuma ser metade da solução.</p>
<h3>Pilha (stack): LIFO</h3>
<p>O último a entrar é o primeiro a sair, como uma pilha de pratos. Operações: <b>empilhar</b> (push) e <b>desempilhar</b> (pop). Usos: desfazer (Ctrl+Z), voltar no navegador, validar parênteses, avaliar expressões e a própria pilha de chamadas de funções.</p>
${C(`const pilha = [];
pilha.push(1); pilha.push(2); pilha.push(3);
console.log(pilha.pop());              // 3
console.log(pilha[pilha.length - 1]);  // topo: 2`)}
<h3>Fila (queue): FIFO</h3>
<p>O primeiro a entrar é o primeiro a sair, como uma fila de banco. Usos: filas de impressão, processamento de tarefas, busca em largura (BFS).</p>
${C(`class Fila {
  constructor() { this.itens = {}; this.ini = 0; this.fim = 0; }
  enfileirar(x) { this.itens[this.fim++] = x; }
  desenfileirar() {
    if (this.vazia()) return undefined;
    const x = this.itens[this.ini];
    delete this.itens[this.ini++];
    return x;
  }
  vazia() { return this.ini === this.fim; }
}`)}
${dica('<code>array.shift()</code> é O(n), pois reposiciona todos os elementos. Para filas grandes, use uma classe com índices como a acima, que faz tudo em O(1).')}
<h3>Map e Set</h3>
${C(`const idades = new Map();
idades.set("ana", 30);
idades.set("rui", 25);
console.log(idades.get("ana"), idades.has("bia"), idades.size);  // 30 false 2
for (const [nome, idade] of idades) console.log(nome, idade);

const visitados = new Set([1, 2, 3]);
visitados.add(2);           // ignorado: já existe
console.log(visitados.size);   // 3`)}
<p>O <code>Map</code> aceita qualquer tipo como chave (inclusive objetos) e preserva a ordem de inserção. Use-o quando as chaves forem dinâmicas.</p>
<h3>Lista ligada</h3>
<p>Cada nó guarda um valor e uma referência para o próximo. Inserir no início é O(1), mas acessar o i-ésimo elemento é O(n).</p>
${C(`class No {
  constructor(valor, prox = null) { this.valor = valor; this.prox = prox; }
}
let cabeca = new No(1, new No(2, new No(3)));
for (let n = cabeca; n; n = n.prox) console.log(n.valor);

function inverter(cabeca) {
  let anterior = null;
  while (cabeca) {
    const prox = cabeca.prox;
    cabeca.prox = anterior;
    anterior = cabeca;
    cabeca = prox;
  }
  return anterior;
}`)}
<h3>Árvores binárias de busca</h3>
<p>Cada nó tem até dois filhos: à esquerda ficam valores menores, à direita, maiores. Busca, inserção e remoção custam O(altura), que é O(log n) quando a árvore está balanceada.</p>
${C(`function inserir(no, valor) {
  if (!no) return { valor, esq: null, dir: null };
  if (valor < no.valor) no.esq = inserir(no.esq, valor);
  else no.dir = inserir(no.dir, valor);
  return no;
}
function emOrdem(no, saida = []) {   // percorre em ordem crescente
  if (no) { emOrdem(no.esq, saida); saida.push(no.valor); emOrdem(no.dir, saida); }
  return saida;
}
let raiz = null;
for (const x of [50, 30, 70, 20, 40, 60]) raiz = inserir(raiz, x);
console.log(emOrdem(raiz));   // [20, 30, 40, 50, 60, 70]`)}
${resumo(['Pilha: LIFO (push/pop). Fila: FIFO (enfileirar/desenfileirar).', 'Map e Set dão busca, inserção e remoção O(1) em média.', 'Listas ligadas inserem rápido mas acessam devagar.', 'Árvores binárias de busca mantêm os dados ordenados com operações O(log n) quando balanceadas.'])}`,
        exercicios: [{ gen: 'pilha-fila', n: 2 }, { gen: 'r-map-set', n: 1 }, { gen: 'p-balanceado', n: 1 }, { gen: 'p-avaliarRPN', n: 1 }]
      },
      {
        titulo: 'Grafos: BFS e DFS',
        html: `
<p>Um <b>grafo</b> é formado por <b>vértices</b> (nós) ligados por <b>arestas</b>. Ele modela redes sociais (pessoas e amizades), mapas (cidades e estradas), dependências entre tarefas, páginas da web e muito mais.</p>
<ul>
  <li><b>Direcionado</b> (as arestas têm sentido) ou <b>não direcionado</b>.</li>
  <li><b>Ponderado</b> (as arestas têm peso, como uma distância) ou não.</li>
  <li>Uma <b>árvore</b> é um grafo conexo sem ciclos; com n vértices, tem n − 1 arestas.</li>
</ul>
<h3>Representação: lista de adjacência</h3>
${C(`const grafo = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C", "E"],
  E: ["D"]
};`)}
<h3>Busca em largura (BFS)</h3>
<p>Explora o grafo em “camadas”: primeiro os vizinhos diretos, depois os vizinhos dos vizinhos, e assim por diante. Usa uma <b>fila</b>. Em grafos sem peso, a BFS encontra o <b>menor caminho</b> (em número de arestas).</p>
${C(`function distancias(grafo, origem) {
  const dist = { [origem]: 0 };
  const fila = [origem];
  while (fila.length) {
    const atual = fila.shift();
    for (const viz of grafo[atual]) {
      if (!(viz in dist)) {
        dist[viz] = dist[atual] + 1;
        fila.push(viz);
      }
    }
  }
  return dist;
}
console.log(distancias(grafo, "A"));   // { A: 0, B: 1, C: 1, D: 2, E: 3 }`)}
<h3>Busca em profundidade (DFS)</h3>
<p>Vai o mais fundo possível por um caminho antes de voltar (<i>backtrack</i>). Usa recursão (ou uma pilha). Ideal para detectar ciclos, encontrar componentes conectados e resolver labirintos.</p>
${C(`function dfs(grafo, no, visitados = new Set()) {
  visitados.add(no);
  for (const viz of grafo[no]) {
    if (!visitados.has(viz)) dfs(grafo, viz, visitados);
  }
  return visitados;
}
console.log([...dfs(grafo, "A")]);   // ["A", "B", "D", "C", "E"]`)}
<h3>Grades como grafos</h3>
<p>Muitos problemas usam uma grade (matriz) em que cada célula é um vértice ligado às vizinhas de cima, baixo, esquerda e direita. Um padrão útil é o vetor de direções:</p>
${C(`const direcoes = [[1, 0], [-1, 0], [0, 1], [0, -1]];
for (const [di, dj] of direcoes) {
  const ni = i + di, nj = j + dj;
  if (ni >= 0 && nj >= 0 && ni < linhas && nj < colunas) {
    // (ni, nj) é um vizinho válido
  }
}`)}
<table class="tabela">
  <tr><th></th><th>BFS</th><th>DFS</th></tr>
  <tr><td>Estrutura</td><td>Fila</td><td>Pilha / recursão</td></tr>
  <tr><td>Menor caminho (sem pesos)</td><td>Sim</td><td>Não</td></tr>
  <tr><td>Complexidade</td><td>O(V + A)</td><td>O(V + A)</td></tr>
</table>
<p class="obs">V = número de vértices, A = número de arestas. Para menores caminhos com pesos, estude o algoritmo de Dijkstra.</p>
${resumo(['Grafos têm vértices e arestas; árvores são grafos conexos sem ciclos.', 'BFS usa fila e acha o menor caminho em grafos sem peso.', 'DFS usa recursão e serve para componentes, ciclos e labirintos.', 'Grades são grafos implícitos: use um vetor de direções.'])}`,
        exercicios: [{ gen: 'grafos-contagem', n: 3 }, { gen: 'p-menorCaminho', n: 1 }, { gen: 'p-contarIlhas', n: 1 }]
      },
      {
        titulo: 'Backtracking',
        html: `
<p><b>Backtracking</b> (retrocesso) é uma técnica para explorar todas as possibilidades de forma organizada: toma-se uma decisão, explora-se recursivamente o que vem depois e, ao voltar, desfaz-se a decisão para tentar a próxima.</p>
<p>Modelo geral:</p>
<pre class="code">função explorar(estadoAtual):
  se estadoAtual é uma solução completa:
    registrar solução
    retornar
  para cada escolha possível:
    se a escolha é válida:
      fazer escolha
      explorar(novoEstado)
      desfazer escolha</pre>
<h3>Gerar todos os subconjuntos</h3>
${C(`function subconjuntos(v) {
  const resultado = [];
  const atual = [];
  function bt(i) {
    if (i === v.length) { resultado.push([...atual]); return; }
    atual.push(v[i]);  bt(i + 1);  atual.pop();   // com v[i]
    bt(i + 1);                                    // sem v[i]
  }
  bt(0);
  return resultado;
}
console.log(subconjuntos([1, 2, 3]).length);   // 8 = 2³`)}
<h3>Permutações</h3>
${C(`function permutar(v) {
  const r = [];
  const usado = new Array(v.length).fill(false);
  const atual = [];
  function bt() {
    if (atual.length === v.length) { r.push([...atual]); return; }
    for (let i = 0; i < v.length; i++) {
      if (usado[i]) continue;
      usado[i] = true; atual.push(v[i]);
      bt();
      usado[i] = false; atual.pop();
    }
  }
  bt();
  return r;
}
console.log(permutar([1, 2, 3]).length);   // 6 = 3!`)}
<h3>Poda: o segredo da eficiência</h3>
<p>Backtracking é exponencial, mas pode ficar muito mais rápido se descartarmos cedo os caminhos que não levam a solução. No problema das <b>N rainhas</b> (posicionar N rainhas num tabuleiro sem que se ataquem), testamos a validade a cada rainha colocada, em vez de gerar todos os tabuleiros:</p>
${C(`function nRainhas(n) {
  let total = 0;
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  function bt(linha) {
    if (linha === n) { total++; return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(linha - c) || diag2.has(linha + c)) continue; // poda
      cols.add(c); diag1.add(linha - c); diag2.add(linha + c);
      bt(linha + 1);
      cols.delete(c); diag1.delete(linha - c); diag2.delete(linha + c);
    }
  }
  bt(0);
  return total;
}
console.log(nRainhas(8));   // 92`)}
<h3>Raciocínio por hipóteses</h3>
<p>Problemas de lógica do tipo “quem está mentindo” são resolvidos da mesma forma: <b>suponha</b> uma hipótese, verifique se ela gera contradição e, se gerar, descarte-a e teste a próxima.</p>
${resumo(['Backtracking: escolher, explorar, desfazer.', 'Gera subconjuntos (2ⁿ) e permutações (n!) de forma sistemática.', 'A poda descarta cedo caminhos inválidos e é essencial para a eficiência.'])}`,
        exercicios: [{ gen: 'r-chamadas', n: 1 }, { gen: 'p-permutacoes', n: 1 }, { gen: 'mentirosos', n: 2 }]
      },
      {
        titulo: 'Programação dinâmica',
        html: `
<p><b>Programação dinâmica</b> (PD) resolve problemas que podem ser quebrados em <b>subproblemas que se repetem</b>. Em vez de recalcular, guardamos cada resultado e o reutilizamos.</p>
<p>Um problema é candidato a PD quando:</p>
<ol>
  <li>Tem <b>subestrutura ótima</b>: a solução ótima é formada por soluções ótimas de subproblemas.</li>
  <li>Tem <b>subproblemas sobrepostos</b>: os mesmos subproblemas aparecem várias vezes.</li>
</ol>
<h3>Memoização (de cima para baixo)</h3>
<p>Recursão + um “caderninho” com os resultados já calculados:</p>
${C(`function fib(n, memo = {}) {
  if (n < 2) return n;
  if (n in memo) return memo[n];
  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}
console.log(fib(70));   // 190392490709135, instantâneo: O(n)`)}
<h3>Tabulação (de baixo para cima)</h3>
<p>Preenche uma tabela começando pelos casos menores:</p>
${C(`function fibTab(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}`)}
<h3>Roteiro para resolver problemas de PD</h3>
<ol>
  <li><b>Defina o estado:</b> o que dp[i] (ou dp[i][j]) representa, em palavras.</li>
  <li><b>Encontre a transição:</b> como dp[i] se calcula a partir de estados menores.</li>
  <li><b>Defina os casos base.</b></li>
  <li><b>Escolha a ordem</b> de preenchimento e onde está a resposta.</li>
</ol>
<h3>Exemplo: troco com o menor número de moedas</h3>
<p>Com moedas [1, 3, 4] e valor 6, a estratégia gulosa (pegar sempre a maior) dá 4 + 1 + 1 = 3 moedas, mas o ótimo é 3 + 3 = 2 moedas.</p>
<ul>
  <li><b>Estado:</b> dp[v] = menor número de moedas para formar v.</li>
  <li><b>Transição:</b> dp[v] = 1 + min(dp[v − m]) para cada moeda m ≤ v.</li>
  <li><b>Base:</b> dp[0] = 0.</li>
</ul>
${C(`function troco(moedas, valor) {
  const dp = new Array(valor + 1).fill(Infinity);
  dp[0] = 0;
  for (let v = 1; v <= valor; v++)
    for (const m of moedas)
      if (m <= v) dp[v] = Math.min(dp[v], dp[v - m] + 1);
  return dp[valor] === Infinity ? -1 : dp[valor];
}
console.log(troco([1, 3, 4], 6));   // 2`)}
<h3>Exemplo: mochila 0/1</h3>
<p>Itens com peso e valor, mochila com capacidade C. Cada item entra no máximo uma vez. <b>Estado:</b> dp[c] = maior valor possível com capacidade c. Para cada item, decidimos pegar ou não pegar:</p>
${C(`function mochila(pesos, valores, C) {
  const dp = new Array(C + 1).fill(0);
  for (let i = 0; i < pesos.length; i++)
    for (let c = C; c >= pesos[i]; c--)       // de trás para frente!
      dp[c] = Math.max(dp[c], dp[c - pesos[i]] + valores[i]);
  return dp[C];
}`)}
${atencao('Na mochila 0/1, percorrer a capacidade <b>de trás para frente</b> garante que cada item seja usado no máximo uma vez. Percorrendo de frente para trás, o mesmo item poderia ser usado várias vezes (o que resolve outra variante, a mochila ilimitada).')}
<h3>Problemas clássicos de PD</h3>
<table class="tabela">
  <tr><th>Problema</th><th>Estado</th></tr>
  <tr><td>Caminhos em grade</td><td>dp[i][j] = caminhos até (i, j) = dp[i−1][j] + dp[i][j−1]</td></tr>
  <tr><td>Maior subsequência crescente</td><td>dp[i] = maior subsequência que termina em i</td></tr>
  <tr><td>Maior soma contígua (Kadane)</td><td>melhor soma de trecho que termina em i</td></tr>
  <tr><td>Soma de subconjunto</td><td>pode[s] = é possível formar a soma s?</td></tr>
  <tr><td>Distância de edição</td><td>dp[i][j] = edições entre os prefixos a[0..i] e b[0..j]</td></tr>
</table>
${resumo(['PD = guardar resultados de subproblemas repetidos.', 'Memoização: recursão + cache. Tabulação: tabela preenchida de baixo para cima.', 'Defina estado, transição, casos base e ordem de cálculo.'])}`,
        exercicios: [{ gen: 'recorrencia', n: 1 }, { gen: 'p-caminhosGrade', n: 1 }, { gen: 'p-moedasMinimas', n: 1 }, { gen: 'p-mochila', n: 1 }, { gen: 'p-somaSubconjunto', n: 1 }, { gen: 'p-maiorSubsequencia', n: 1 }, { gen: 'p-maiorSomaContigua', n: 1 }]
      },
      {
        titulo: 'JavaScript avançado',
        html: `
<h3>Closures</h3>
<p>Uma <b>closure</b> é uma função que “lembra” as variáveis do escopo onde foi criada, mesmo depois que esse escopo terminou. Permite criar estado privado:</p>
${C(`function criarContador() {
  let total = 0;                 // só acessível pelas funções abaixo
  return {
    incrementar: () => ++total,
    valor: () => total
  };
}
const c1 = criarContador();
const c2 = criarContador();
c1.incrementar(); c1.incrementar(); c2.incrementar();
console.log(c1.valor(), c2.valor());   // 2 1`)}
<p>Cada chamada de <code>criarContador</code> cria um novo <code>total</code>, independente dos outros.</p>
<h3>Funções que recebem e devolvem funções</h3>
${C(`function memoizar(fn) {
  const cache = new Map();
  return (x) => {
    if (!cache.has(x)) cache.set(x, fn(x));
    return cache.get(x);
  };
}
const quadradoLento = (x) => { /* cálculo pesado */ return x * x; };
const quadrado = memoizar(quadradoLento);`)}
<h3>Desestruturação, spread e rest</h3>
${C(`const [primeiro, , terceiro, ...resto] = [10, 20, 30, 40, 50];
// primeiro = 10, terceiro = 30, resto = [40, 50]

const { nome, idade = 18 } = { nome: "Lia" };    // idade usa o padrão 18

const a = [1, 2], b = [3, 4];
const junto = [...a, ...b, 5];                    // [1, 2, 3, 4, 5]

function somar(...numeros) {                       // rest: junta os argumentos
  return numeros.reduce((s, n) => s + n, 0);
}
console.log(somar(1, 2, 3, 4));                   // 10

let x = 1, y = 2;
[x, y] = [y, x];                                   // troca sem variável auxiliar`)}
<h3>Programação assíncrona e o event loop</h3>
<p>JavaScript executa uma coisa de cada vez (uma única <i>thread</i>). Tarefas demoradas (rede, arquivos, temporizadores) são agendadas e seus <i>callbacks</i> rodam depois, controlados pelo <b>event loop</b>:</p>
<ol>
  <li>Primeiro, todo o código <b>síncrono</b> é executado até o fim.</li>
  <li>Depois, todas as <b>microtarefas</b> (callbacks de Promises: <code>.then</code>, <code>await</code>).</li>
  <li>Por fim, uma <b>macrotarefa</b> por vez (<code>setTimeout</code>, eventos), esvaziando as microtarefas entre elas.</li>
</ol>
${C(`console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Saída: 1, 4, 3, 2`)}
<h3>async / await</h3>
${C(`function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function processo() {
  console.log("início");
  await esperar(1000);        // pausa só esta função, sem travar o programa
  console.log("1 segundo depois");
  try {
    const resposta = await fetch("https://api.exemplo.com/dados");
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.log("Falhou:", erro.message);
  }
}`)}
<h3>Classes</h3>
${C(`class Conta {
  #saldo = 0;                          // campo privado
  constructor(titular) { this.titular = titular; }
  depositar(v) {
    if (v <= 0) throw new Error("Valor inválido");
    this.#saldo += v;
  }
  get saldo() { return this.#saldo; }
}
class Poupanca extends Conta {
  renderJuros(taxa) { this.depositar(this.saldo * taxa); }
}
const p = new Poupanca("Rui");
p.depositar(1000);
p.renderJuros(0.01);
console.log(p.saldo);   // 1010`)}
${resumo(['Closures guardam o escopo onde foram criadas, o que permite estado privado.', 'Desestruturação, spread e rest deixam o código mais expressivo.', 'Ordem do event loop: síncrono → microtarefas (Promises) → macrotarefas (setTimeout).', 'async/await escreve código assíncrono com cara de síncrono.'])}`,
        exercicios: [{ gen: 'r-closure', n: 2 }, { gen: 'r-desestruturacao', n: 1 }, { gen: 'r-event-loop', n: 2 }, { gen: 'p-compactarRLE', n: 1 }, { gen: 'p-mesclarIntervalos', n: 1 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
