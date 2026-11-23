(function (g) {
  const KX = g.KX;
  const C = KX.util.codigo;
  const dica = (t) => `<div class="box dica"><b>Dica</b><div>${t}</div></div>`;
  const atencao = (t) => `<div class="box atencao"><b>Atenção</b><div>${t}</div></div>`;
  const resumo = (itens) => `<div class="box resumo"><b>Resumo do capítulo</b><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  KX.apostilas = KX.apostilas || [];

  KX.apostilas.push({
    id: 'apostila-02', nivel: 2, numero: 2,
    titulo: 'Programação Básica',
    subtitulo: 'Laços de repetição, vetores, textos e funções',
    arquivo: 'Apostila 02 - Basico - Programacao Basica.pdf',
    apresentacao: `<p>Na Apostila 1 você aprendeu a guardar valores e a tomar decisões. Agora vem o que dá poder de verdade ao computador: <b>repetir</b> tarefas milhões de vezes sem errar, organizar muitos dados em <b>vetores</b>, manipular <b>textos</b> e dividir o programa em <b>funções</b> reutilizáveis.</p>
      <p>Ao final desta apostila você será capaz de resolver os problemas clássicos de lógica de programação que aparecem em provas, entrevistas e no dia a dia.</p>`,
    capitulos: [
      {
        titulo: 'Laços de repetição',
        html: `
<p>Imagine imprimir os números de 1 a 1000. Escrever mil linhas de <code>console.log</code> não faz sentido. Os <b>laços</b> (ou <i>loops</i>) repetem um bloco de código enquanto uma condição for verdadeira.</p>
<h3>while (enquanto)</h3>
${C(`let i = 1;
while (i <= 5) {
  console.log(i);
  i++;          // sem esta linha o laço nunca terminaria!
}
// imprime 1, 2, 3, 4, 5`)}
<p>O <code>while</code> testa a condição <b>antes</b> de cada repetição. Use-o quando não se sabe de antemão quantas vezes o laço vai rodar.</p>
<h3>for (para)</h3>
<p>O <code>for</code> junta em uma linha as três partes de um laço contado: <b>início</b>, <b>condição</b> e <b>incremento</b>.</p>
${C(`for (let i = 1; i <= 5; i++) {
  console.log(i);
}

for (let i = 10; i >= 0; i -= 2) {
  console.log(i);    // 10, 8, 6, 4, 2, 0
}`)}
<h3>do...while</h3>
<p>Executa o bloco pelo menos uma vez e só depois testa a condição.</p>
${C(`let senha;
do {
  senha = "1234";   // imagine aqui uma leitura do teclado
} while (senha !== "1234");`)}
<h3>Padrões essenciais: contador e acumulador</h3>
${C(`const notas = [7, 4, 9, 6, 10];
let soma = 0;        // acumulador: começa em 0
let aprovados = 0;   // contador: começa em 0
for (const nota of notas) {
  soma += nota;
  if (nota >= 6) aprovados++;
}
console.log(soma / notas.length);   // média: 7.2
console.log(aprovados);             // 4`)}
<ul>
  <li><b>Acumulador de soma</b> começa em 0; <b>de produto</b> começa em 1.</li>
  <li><b>Contador</b> começa em 0 e é incrementado quando algo acontece.</li>
</ul>
<h3>break e continue</h3>
${C(`for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;   // pula para a próxima volta
  if (i > 7) break;            // encerra o laço
  console.log(i);              // 1, 3, 5, 7
}`)}
${atencao('<b>Laço infinito</b> é o erro mais comum: a condição nunca fica falsa. Sempre confira se a variável de controle muda a cada volta e se ela caminha em direção à condição de parada.')}
${resumo(['while repete enquanto a condição for verdadeira; for é ideal para contagens.', 'Acumuladores somam valores; contadores contam ocorrências.', 'continue pula para a próxima volta; break encerra o laço.'])}`,
        exercicios: [{ gen: 'r-for-soma', n: 2 }, { gen: 'r-while-digitos', n: 2 }, { gen: 'p-somaAte', n: 1 }, { gen: 'p-fatorial', n: 1 }, { gen: 'p-potencia', n: 1 }, { gen: 'p-somaDigitos', n: 1 }]
      },
      {
        titulo: 'Vetores (arrays)',
        html: `
<p>Um <b>vetor</b> (array) guarda vários valores em uma única variável, em sequência. Cada valor ocupa uma posição numerada chamada <b>índice</b>, que começa em <b>0</b>.</p>
${C(`const frutas = ["maçã", "banana", "uva"];
console.log(frutas[0]);        // maçã
console.log(frutas.length);    // 3
frutas[1] = "pera";            // altera a posição 1
console.log(frutas);           // ["maçã", "pera", "uva"]`)}
<table class="tabela">
  <tr><th>Índice</th><td>0</td><td>1</td><td>2</td></tr>
  <tr><th>Valor</th><td>"maçã"</td><td>"pera"</td><td>"uva"</td></tr>
</table>
<p>O último elemento está sempre em <code>v[v.length - 1]</code>.</p>
<h3>Métodos básicos</h3>
<table class="tabela">
  <tr><th>Método</th><th>O que faz</th></tr>
  <tr><td><code>v.push(x)</code></td><td>Adiciona x no final</td></tr>
  <tr><td><code>v.pop()</code></td><td>Remove e devolve o último</td></tr>
  <tr><td><code>v.unshift(x)</code></td><td>Adiciona x no início</td></tr>
  <tr><td><code>v.shift()</code></td><td>Remove e devolve o primeiro</td></tr>
  <tr><td><code>v.includes(x)</code></td><td>true se x estiver no vetor</td></tr>
  <tr><td><code>v.indexOf(x)</code></td><td>Índice de x, ou −1 se não existir</td></tr>
  <tr><td><code>v.slice(i, j)</code></td><td>Cópia do trecho de i até j−1</td></tr>
  <tr><td><code>v.join(", ")</code></td><td>Junta tudo em um texto</td></tr>
</table>
<h3>Percorrendo vetores</h3>
${C(`const v = [4, 8, 15, 16, 23, 42];

// com índice (quando você precisa da posição)
for (let i = 0; i < v.length; i++) {
  console.log(i, v[i]);
}

// com for...of (quando só importa o valor)
for (const x of v) {
  console.log(x);
}`)}
<h3>Algoritmos clássicos com vetores</h3>
<p><b>Encontrar o maior valor:</b></p>
${C(`function maior(v) {
  let m = v[0];
  for (const x of v) {
    if (x > m) m = x;
  }
  return m;
}`)}
<p><b>Filtrar elementos:</b> criar um vetor novo só com os itens que interessam.</p>
${C(`const numeros = [3, 10, 7, 22, 5];
const pares = [];
for (const n of numeros) {
  if (n % 2 === 0) pares.push(n);
}
console.log(pares);   // [10, 22]`)}
${atencao('Acessar um índice que não existe não gera erro em JavaScript: devolve <code>undefined</code>. Cuidado com a condição <code>i <= v.length</code>, que passa uma posição do fim. O correto é <code>i < v.length</code>.')}
<h3>Matrizes</h3>
<p>Uma matriz é um vetor de vetores. Acessamos com dois índices: <code>m[linha][coluna]</code>.</p>
${C(`const m = [
  [1, 2, 3],
  [4, 5, 6]
];
console.log(m[1][2]);   // 6
for (let i = 0; i < m.length; i++)
  for (let j = 0; j < m[i].length; j++)
    console.log(m[i][j]);`)}
${resumo(['Vetores guardam vários valores; o índice começa em 0.', 'push/pop trabalham no fim; unshift/shift, no início.', 'Percorra com for (índice) ou for...of (valor).', 'Matriz é um vetor de vetores: m[linha][coluna].'])}`,
        exercicios: [{ gen: 'r-vetor', n: 3 }, { gen: 'p-somaVetor', n: 1 }, { gen: 'p-maiorElemento', n: 1 }, { gen: 'p-contarMaioresQue', n: 1 }, { gen: 'p-tabuada', n: 1 }]
      },
      {
        titulo: 'Manipulação de textos (strings)',
        html: `
<p>Textos são sequências de caracteres e funcionam de forma parecida com vetores: têm <code>length</code> e índices a partir de 0. Mas há uma diferença importante: strings são <b>imutáveis</b>. Você não altera um caractere; você cria um texto novo.</p>
${C(`const s = "Programar";
console.log(s.length);     // 9
console.log(s[0]);         // P
console.log(s[s.length - 1]);  // r
for (const ch of s) console.log(ch);   // um caractere por linha`)}
<h3>Métodos mais usados</h3>
<table class="tabela">
  <tr><th>Método</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>toUpperCase()</code></td><td><code>"oi".toUpperCase()</code></td><td>"OI"</td></tr>
  <tr><td><code>toLowerCase()</code></td><td><code>"OI".toLowerCase()</code></td><td>"oi"</td></tr>
  <tr><td><code>includes(t)</code></td><td><code>"banana".includes("nan")</code></td><td>true</td></tr>
  <tr><td><code>indexOf(t)</code></td><td><code>"banana".indexOf("n")</code></td><td>2</td></tr>
  <tr><td><code>slice(i, j)</code></td><td><code>"banana".slice(1, 4)</code></td><td>"ana"</td></tr>
  <tr><td><code>split(sep)</code></td><td><code>"a b c".split(" ")</code></td><td>["a", "b", "c"]</td></tr>
  <tr><td><code>trim()</code></td><td><code>"  oi  ".trim()</code></td><td>"oi"</td></tr>
  <tr><td><code>replaceAll(a, b)</code></td><td><code>"a-b-c".replaceAll("-", "")</code></td><td>"abc"</td></tr>
  <tr><td><code>repeat(n)</code></td><td><code>"ab".repeat(3)</code></td><td>"ababab"</td></tr>
</table>
<h3>Construindo textos em um laço</h3>
${C(`// inverter um texto
const original = "lógica";
let invertido = "";
for (let i = original.length - 1; i >= 0; i--) {
  invertido += original[i];
}
console.log(invertido);   // acigól`)}
<h3>Contando caracteres</h3>
${C(`function contarLetra(texto, letra) {
  let c = 0;
  for (const ch of texto) {
    if (ch === letra) c++;
  }
  return c;
}
console.log(contarLetra("arara", "a"));   // 3`)}
<h3>split e join: a dupla mais útil</h3>
<p><code>split</code> quebra um texto em um vetor; <code>join</code> faz o caminho inverso. Juntos, permitem trabalhar com palavras:</p>
${C(`const frase = "aprender lógica é divertido";
const palavras = frase.split(" ");
console.log(palavras.length);            // 4
console.log(palavras.join("-"));         // aprender-lógica-é-divertido`)}
${dica('Para comparar textos ignorando maiúsculas e minúsculas, converta os dois com <code>toLowerCase()</code> antes de comparar.')}
${resumo(['Strings têm índices e length, mas são imutáveis.', 'slice extrai trechos; includes e indexOf procuram.', 'split transforma texto em vetor; join faz o inverso.'])}`,
        exercicios: [{ gen: 'r-texto', n: 1 }, { gen: 'r-string-loop', n: 2 }, { gen: 'p-contarVogais', n: 1 }, { gen: 'p-inverterTexto', n: 1 }, { gen: 'p-ehPalindromo', n: 1 }, { gen: 'p-contarPalavras', n: 1 }]
      },
      {
        titulo: 'Funções',
        html: `
<p>Uma <b>função</b> é um bloco de código com nome, que executa uma tarefa específica. Funções evitam repetição, deixam o programa organizado e permitem testar cada parte separadamente.</p>
${C(`function saudacao(nome) {          // nome é o PARÂMETRO
  return "Olá, " + nome + "!";
}
const msg = saudacao("Bia");       // "Bia" é o ARGUMENTO
console.log(msg);                  // Olá, Bia!`)}
<ul>
  <li><b>Parâmetros</b> são as variáveis que a função recebe.</li>
  <li><b>return</b> devolve o resultado e encerra a função.</li>
  <li>Uma função sem <code>return</code> devolve <code>undefined</code>.</li>
</ul>
${atencao('<code>console.log</code> só <b>mostra</b> um valor na tela; <code>return</code> <b>devolve</b> o valor para quem chamou a função. Nos exercícios do sistema, os testes verificam o valor <b>retornado</b>.')}
<h3>Vários parâmetros e valores padrão</h3>
${C(`function precoFinal(preco, desconto = 0) {
  return preco - preco * desconto / 100;
}
console.log(precoFinal(200));       // 200
console.log(precoFinal(200, 10));   // 180`)}
<h3>Escopo</h3>
<p>Variáveis criadas dentro de uma função (ou de um bloco <code>{ }</code>) só existem ali dentro. Isso é o <b>escopo</b>.</p>
${C(`function teste() {
  const interna = 10;
  console.log(interna);   // 10
}
teste();
// console.log(interna);  // ERRO: interna não existe aqui fora`)}
<h3>Arrow functions</h3>
<p>Uma forma mais curta de escrever funções, muito usada em JavaScript moderno:</p>
${C(`const dobro = (x) => x * 2;
const soma = (a, b) => a + b;
const ehPar = (n) => {
  return n % 2 === 0;
};
console.log(dobro(4), soma(2, 3), ehPar(7));   // 8 5 false`)}
<h3>Dividir para conquistar</h3>
<p>Problemas grandes ficam simples quando divididos em funções pequenas, cada uma fazendo <b>uma</b> coisa:</p>
${C(`function ehPrimo(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}
function somaPrimosAte(n) {
  let s = 0;
  for (let i = 2; i <= n; i++) if (ehPrimo(i)) s += i;
  return s;
}
console.log(somaPrimosAte(10));   // 2 + 3 + 5 + 7 = 17`)}
${dica('Por que <code>d * d <= n</code>? Se n tiver um divisor maior que √n, terá também um menor que √n. Então basta testar até a raiz. Para n = 1.000.000 são 1.000 testes em vez de 1 milhão.')}
${resumo(['Funções recebem parâmetros e devolvem um resultado com return.', 'Variáveis internas pertencem ao escopo da função.', 'Arrow functions são uma sintaxe curta: (x) => x * 2.', 'Divida problemas grandes em funções pequenas e testáveis.'])}`,
        exercicios: [{ gen: 'r-funcao', n: 2 }, { gen: 'p-ehPrimo', n: 1 }, { gen: 'p-multiplosAte', n: 1 }]
      },
      {
        titulo: 'Laços aninhados e problemas clássicos',
        html: `
<p>Um laço dentro de outro é um <b>laço aninhado</b>. Para cada volta do laço externo, o laço interno roda por completo. Se o externo roda 3 vezes e o interno 4, o bloco interno executa 3 × 4 = 12 vezes.</p>
${C(`for (let i = 1; i <= 3; i++) {
  let linha = "";
  for (let j = 1; j <= i; j++) {
    linha += "*";
  }
  console.log(linha);
}
// *
// **
// ***`)}
<h3>FizzBuzz</h3>
<p>Um clássico de entrevistas: imprimir os números de 1 a n, trocando múltiplos de 3 por “Fizz”, de 5 por “Buzz” e de ambos por “FizzBuzz”.</p>
${C(`for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`)}
<h3>MDC pelo algoritmo de Euclides</h3>
<p>O máximo divisor comum de a e b é igual ao MDC de b e do resto de a ÷ b. Repete-se até o resto ser zero:</p>
${C(`function mdc(a, b) {
  while (b !== 0) {
    const resto = a % b;
    a = b;
    b = resto;
  }
  return a;
}
console.log(mdc(48, 18));         // 6
console.log(48 * 18 / mdc(48, 18));  // MMC = 144`)}
<h3>Conversão para binário</h3>
<p>O computador trabalha com base 2. Para converter um decimal em binário, dividimos sucessivamente por 2 e lemos os restos de trás para frente:</p>
<pre class="code">13 ÷ 2 = 6 resto 1
 6 ÷ 2 = 3 resto 0
 3 ÷ 2 = 1 resto 1
 1 ÷ 2 = 0 resto 1     →  13 = 1101₂</pre>
<p>Para voltar ao decimal, some as potências de 2 onde há 1: 1101₂ = 8 + 4 + 0 + 1 = 13.</p>
<h3>Aritmética modular</h3>
<p>O resto da divisão modela tudo que é <b>cíclico</b>: dias da semana (ciclo de 7), horas do relógio (ciclo de 24), posições em uma roda. Daqui a 100 dias, o dia da semana avança 100 % 7 = 2 posições.</p>
${resumo(['Em laços aninhados, o interno roda por completo a cada volta do externo.', 'MDC por Euclides: mdc(a, b) = mdc(b, a % b).', 'Binário: divisões por 2 e leitura dos restos de trás para frente.', 'O operador % modela ciclos.'])}`,
        exercicios: [{ gen: 'r-aninhado', n: 2 }, { gen: 'p-fizzBuzz', n: 1 }, { gen: 'binario', n: 2 }, { gen: 'mdc-mmc', n: 2 }, { gen: 'seq-segunda-ordem', n: 1 }, { gen: 'seq-fibonacci', n: 1 }, { gen: 'tv-contagem', n: 2 }, { gen: 'dia-semana', n: 1 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
