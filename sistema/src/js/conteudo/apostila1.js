(function (g) {
  const KX = g.KX;
  const C = KX.util.codigo;
  const dica = (t) => `<div class="box dica"><b>Dica</b><div>${t}</div></div>`;
  const atencao = (t) => `<div class="box atencao"><b>Atenção</b><div>${t}</div></div>`;
  const resumo = (itens) => `<div class="box resumo"><b>Resumo do capítulo</b><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  KX.apostilas = KX.apostilas || [];

  KX.apostilas.push({
    id: 'apostila-01', nivel: 1, numero: 1,
    titulo: 'Lógica de Programação',
    subtitulo: 'Primeiros passos: algoritmos, variáveis, operadores, lógica e decisões',
    arquivo: 'Apostila 01 - Iniciante - Logica de Programacao.pdf',
    apresentacao: `<p>Esta apostila é o ponto de partida. Você não precisa saber nada de programação: vamos construir o raciocínio passo a passo, sempre com exemplos curtos e exercícios ao final de cada capítulo.</p>
      <p>Usaremos a linguagem <b>JavaScript</b> nos exemplos. Ela roda em qualquer navegador e no próprio sistema Kovex Estudos, onde você pode escrever o código e ver os testes passarem na hora. Os conceitos, porém, valem para qualquer linguagem: Python, Java, C, C# e outras.</p>
      <p><b>Como estudar:</b> leia o capítulo, digite os exemplos (não copie e cole, digite!), resolva os exercícios no papel ou no sistema e só depois confira o gabarito no final da apostila.</p>`,
    capitulos: [
      {
        titulo: 'Algoritmos e o pensamento computacional',
        html: `
<p>Um <b>algoritmo</b> é uma sequência finita e ordenada de passos que resolve um problema. Você usa algoritmos o tempo todo sem perceber: uma receita de bolo, o caminho de casa até o trabalho, as instruções para montar um móvel.</p>
<h3>Exemplo: trocar uma lâmpada</h3>
<ol>
  <li>Desligar o interruptor.</li>
  <li>Pegar uma escada e posicioná-la embaixo da lâmpada.</li>
  <li>Subir na escada.</li>
  <li>Retirar a lâmpada queimada.</li>
  <li>Colocar a lâmpada nova.</li>
  <li>Descer da escada e ligar o interruptor.</li>
</ol>
<p>Repare em três características de todo bom algoritmo:</p>
<ul>
  <li><b>Ordem:</b> os passos têm uma sequência. Ligar o interruptor antes de trocar a lâmpada seria perigoso.</li>
  <li><b>Clareza:</b> cada passo deve ser preciso, sem ambiguidade. O computador não “adivinha” o que você quis dizer.</li>
  <li><b>Fim:</b> o algoritmo precisa terminar em algum momento.</li>
</ul>
<h3>Entrada, processamento e saída</h3>
<p>Quase todo programa segue o modelo <b>entrada → processamento → saída</b>. Na calculadora: os números digitados são a entrada, a conta é o processamento e o resultado na tela é a saída.</p>
<table class="tabela">
  <tr><th>Problema</th><th>Entrada</th><th>Processamento</th><th>Saída</th></tr>
  <tr><td>Calcular a média</td><td>Três notas</td><td>Somar e dividir por 3</td><td>A média</td></tr>
  <tr><td>Converter temperatura</td><td>Graus Celsius</td><td>F = C × 9/5 + 32</td><td>Graus Fahrenheit</td></tr>
  <tr><td>Verificar maioridade</td><td>Idade</td><td>Comparar com 18</td><td>“Maior” ou “Menor”</td></tr>
</table>
<h3>Pseudocódigo</h3>
<p>Antes de escrever na linguagem de programação, é comum descrever o algoritmo em <b>pseudocódigo</b>: um português estruturado, sem se preocupar com regras de sintaxe.</p>
<pre class="code">ALGORITMO media
  LEIA nota1, nota2, nota3
  media ← (nota1 + nota2 + nota3) / 3
  SE media >= 7 ENTÃO
    ESCREVA "Aprovado"
  SENÃO
    ESCREVA "Reprovado"
FIM</pre>
<p>O mesmo algoritmo em JavaScript:</p>
${C(`const nota1 = 8, nota2 = 6.5, nota3 = 7;
const media = (nota1 + nota2 + nota3) / 3;
if (media >= 7) {
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}`)}
<h3>Onde executar seu código</h3>
<ul>
  <li><b>No Kovex Estudos:</b> na tela <i>Praticar</i>, escolha a categoria <i>Programação</i>, escreva a função e clique em <i>Executar testes</i>.</li>
  <li><b>No navegador:</b> aperte <code>F12</code>, abra a aba <i>Console</i> e digite o código.</li>
  <li><b>No computador:</b> instale o Node.js, salve o código em <code>programa.js</code> e rode <code>node programa.js</code> no terminal.</li>
</ul>
<h3>Teste de mesa</h3>
<p>Fazer um <b>teste de mesa</b> é executar o algoritmo “no papel”, anotando o valor de cada variável a cada linha. É a habilidade mais importante para entender código e encontrar erros. Os exercícios da categoria <i>Teste de mesa</i> treinam exatamente isso.</p>
${dica('Diante de qualquer problema, pergunte primeiro: quais são as entradas? Qual saída eu quero? Quais passos levam de uma à outra?')}
${resumo(['Algoritmo é uma sequência finita, ordenada e sem ambiguidade de passos.', 'Programas seguem o modelo entrada → processamento → saída.', 'Pseudocódigo ajuda a pensar antes de programar.', 'Teste de mesa é executar o código no papel, linha a linha.'])}`,
        exercicios: [{ gen: 'ordem-logica', n: 2 }, { gen: 'problema-aritmetico', n: 3 }]
      },
      {
        titulo: 'Variáveis, tipos de dados e operadores',
        html: `
<p>Uma <b>variável</b> é um espaço na memória com um nome, onde guardamos um valor que pode ser usado e alterado depois. Pense numa caixa com uma etiqueta.</p>
${C(`let idade = 25;        // cria a variável idade com o valor 25
idade = idade + 1;     // agora idade vale 26
const PI = 3.14159;    // const: o valor não pode ser reatribuído
console.log(idade);    // imprime 26`)}
<ul>
  <li><code>let</code> declara uma variável cujo valor pode mudar.</li>
  <li><code>const</code> declara uma constante: não pode receber outro valor depois.</li>
  <li><code>console.log(...)</code> mostra valores na tela (a “saída”).</li>
</ul>
${atencao('O sinal <code>=</code> na programação significa <b>atribuição</b> (“recebe”), não igualdade matemática. <code>x = x + 1</code> quer dizer: “calcule x + 1 e guarde o resultado em x”.')}
<h3>Regras para nomes</h3>
<p>Nomes de variáveis podem conter letras, números, <code>_</code> e <code>$</code>, mas não podem começar com número nem ter espaços. Use nomes que expliquem o conteúdo: <code>precoTotal</code> é muito melhor do que <code>pt</code> ou <code>x</code>. Em JavaScript o padrão é o <i>camelCase</i>: primeira palavra minúscula e as seguintes com inicial maiúscula.</p>
<h3>Tipos de dados primitivos</h3>
<table class="tabela">
  <tr><th>Tipo</th><th>Exemplos</th><th>Uso</th></tr>
  <tr><td><code>number</code></td><td><code>42</code>, <code>-7</code>, <code>3.5</code></td><td>Números inteiros e decimais (use ponto, não vírgula)</td></tr>
  <tr><td><code>string</code></td><td><code>"Olá"</code>, <code>'Maria'</code></td><td>Textos, sempre entre aspas</td></tr>
  <tr><td><code>boolean</code></td><td><code>true</code>, <code>false</code></td><td>Verdadeiro ou falso</td></tr>
  <tr><td><code>undefined</code></td><td><code>undefined</code></td><td>Variável sem valor definido</td></tr>
  <tr><td><code>null</code></td><td><code>null</code></td><td>Ausência intencional de valor</td></tr>
</table>
${C(`console.log(typeof 10);       // "number"
console.log(typeof "10");     // "string"
console.log(typeof true);     // "boolean"`)}
<h3>Operadores aritméticos</h3>
<table class="tabela">
  <tr><th>Operador</th><th>Significado</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>+</code></td><td>Soma</td><td><code>7 + 2</code></td><td>9</td></tr>
  <tr><td><code>-</code></td><td>Subtração</td><td><code>7 - 2</code></td><td>5</td></tr>
  <tr><td><code>*</code></td><td>Multiplicação</td><td><code>7 * 2</code></td><td>14</td></tr>
  <tr><td><code>/</code></td><td>Divisão</td><td><code>7 / 2</code></td><td>3.5</td></tr>
  <tr><td><code>%</code></td><td>Resto da divisão</td><td><code>7 % 2</code></td><td>1</td></tr>
  <tr><td><code>**</code></td><td>Potência</td><td><code>2 ** 3</code></td><td>8</td></tr>
</table>
<p>O operador <code>%</code> (módulo) é muito usado: para saber se um número é par (<code>n % 2 === 0</code>), pegar o último dígito (<code>n % 10</code>) ou fazer coisas “a cada N vezes”.</p>
<p>Para a <b>divisão inteira</b>, use <code>Math.floor(a / b)</code>, que arredonda para baixo: <code>Math.floor(17 / 5)</code> dá 3 e <code>17 % 5</code> dá 2, porque 17 = 5 × 3 + 2.</p>
<h3>Precedência</h3>
<p>Como na matemática, <code>*</code>, <code>/</code> e <code>%</code> são calculados antes de <code>+</code> e <code>-</code>. Use parênteses para deixar a intenção clara:</p>
${C(`console.log(2 + 3 * 4);     // 14
console.log((2 + 3) * 4);   // 20`)}
<h3>Atribuição composta</h3>
${C(`let x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x++;      // x = x + 1  → 25`)}
<h3>Textos e concatenação</h3>
<p>O <code>+</code> entre textos <b>junta</b> (concatena). Cuidado: <code>"5" + 3</code> resulta em <code>"53"</code>, pois o número vira texto. Para converter texto em número, use <code>Number("5")</code>.</p>
${C(`const nome = "Ana";
console.log("Olá, " + nome + "!");   // Olá, Ana!
console.log("5" + 3);                // 53
console.log(Number("5") + 3);        // 8`)}
${resumo(['let cria variáveis que mudam; const cria constantes.', 'Tipos básicos: number, string, boolean, undefined e null.', '% é o resto da divisão; Math.floor(a / b) é a divisão inteira.', 'Multiplicação e divisão têm precedência sobre soma e subtração.'])}`,
        exercicios: [{ gen: 'r-aritmetica', n: 2 }, { gen: 'r-divisao', n: 1 }, { gen: 'r-texto', n: 1 }, { gen: 'p-somar', n: 1 }, { gen: 'p-areaRetangulo', n: 1 }, { gen: 'p-celsiusParaFahrenheit', n: 1 }]
      },
      {
        titulo: 'Lógica proposicional e operadores lógicos',
        html: `
<p>Uma <b>proposição</b> é uma frase que pode ser verdadeira (V) ou falsa (F), nunca as duas ao mesmo tempo. “Está chovendo” é uma proposição; “Que horas são?” não é.</p>
<p>Na programação, proposições viram <b>expressões booleanas</b>, que resultam em <code>true</code> ou <code>false</code>.</p>
<h3>Operadores de comparação</h3>
<table class="tabela">
  <tr><th>Operador</th><th>Significado</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>===</code></td><td>Igual (valor e tipo)</td><td><code>5 === 5</code></td><td>true</td></tr>
  <tr><td><code>!==</code></td><td>Diferente</td><td><code>5 !== 3</code></td><td>true</td></tr>
  <tr><td><code>&gt;</code> / <code>&lt;</code></td><td>Maior / menor</td><td><code>2 &gt; 7</code></td><td>false</td></tr>
  <tr><td><code>&gt;=</code> / <code>&lt;=</code></td><td>Maior ou igual / menor ou igual</td><td><code>7 &gt;= 7</code></td><td>true</td></tr>
</table>
${atencao('Em JavaScript, prefira sempre <code>===</code> e <code>!==</code>. Os operadores <code>==</code> e <code>!=</code> convertem tipos de forma pouco intuitiva: <code>"5" == 5</code> é <code>true</code>!')}
<h3>Conectivos lógicos</h3>
<table class="tabela">
  <tr><th>Lógica</th><th>JavaScript</th><th>Quando é verdadeiro</th></tr>
  <tr><td>E (conjunção)</td><td><code>&amp;&amp;</code></td><td>Somente se <b>as duas</b> partes forem verdadeiras</td></tr>
  <tr><td>OU (disjunção)</td><td><code>||</code></td><td>Se <b>pelo menos uma</b> parte for verdadeira</td></tr>
  <tr><td>NÃO (negação)</td><td><code>!</code></td><td>Inverte o valor</td></tr>
</table>
<h3>Tabelas-verdade</h3>
<p>Uma tabela-verdade lista todas as combinações possíveis de valores e o resultado da expressão em cada uma. Com 2 variáveis há 4 linhas; com 3, 8 linhas (2<sup>n</sup>).</p>
<table class="tv">
  <tr><th>A</th><th>B</th><th>A E B</th><th>A OU B</th><th>NÃO A</th></tr>
  <tr><td>V</td><td>V</td><td>V</td><td>V</td><td>F</td></tr>
  <tr><td>V</td><td>F</td><td>F</td><td>V</td><td>F</td></tr>
  <tr><td>F</td><td>V</td><td>F</td><td>V</td><td>V</td></tr>
  <tr><td>F</td><td>F</td><td>F</td><td>F</td><td>V</td></tr>
</table>
<h3>Outros conectivos</h3>
<ul>
  <li><b>Implicação (A → B)</b>, “se A então B”: só é falsa quando A é V e B é F. Equivale a <code>!A || B</code>.</li>
  <li><b>Bicondicional (A ↔ B)</b>, “A se e somente se B”: verdadeira quando A e B têm o mesmo valor. Em código: <code>A === B</code>.</li>
  <li><b>Ou exclusivo (A XOU B)</b>: verdadeiro quando exatamente um é V. Em código: <code>A !== B</code>.</li>
</ul>
<h3>Leis de De Morgan</h3>
<p>Muito úteis para simplificar condições:</p>
<ul>
  <li><code>!(A &amp;&amp; B)</code> é o mesmo que <code>!A || !B</code></li>
  <li><code>!(A || B)</code> é o mesmo que <code>!A &amp;&amp; !B</code></li>
</ul>
${C(`const idade = 20;
const temCarteira = true;
const podeDirigir = idade >= 18 && temCarteira;    // true
const ehFimDeSemana = false, ehFeriado = true;
const descansa = ehFimDeSemana || ehFeriado;        // true
console.log(podeDirigir, descansa, !descansa);      // true true false`)}
${dica('Para resolver uma expressão complexa, substitua cada variável pelo seu valor e resolva os parênteses de dentro para fora, como na matemática. O NÃO é aplicado antes do E, que é aplicado antes do OU.')}
${resumo(['Proposições são verdadeiras ou falsas; em código, true ou false.', 'E exige as duas partes verdadeiras; OU, pelo menos uma; NÃO inverte.', 'Uma tabela-verdade com n variáveis tem 2ⁿ linhas.', 'Use === e !== para comparar em JavaScript.'])}`,
        exercicios: [{ gen: 'tv-simples', n: 4 }, { gen: 'r-logicos', n: 2 }]
      },
      {
        titulo: 'Estruturas de decisão',
        html: `
<p>Até aqui, nossos programas executavam todas as linhas, uma após a outra. Com as <b>estruturas condicionais</b>, o programa decide o que fazer de acordo com uma condição.</p>
<h3>if (se)</h3>
${C(`const temperatura = 32;
if (temperatura > 30) {
  console.log("Está quente!");
}`)}
<p>O bloco entre <code>{ }</code> só é executado se a condição for verdadeira.</p>
<h3>if / else (se / senão)</h3>
${C(`const idade = 16;
if (idade >= 18) {
  console.log("Pode votar e dirigir");
} else {
  console.log("Ainda não pode dirigir");
}`)}
<h3>else if (senão se): várias alternativas</h3>
${C(`const nota = 7.5;
if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 7) {
  console.log("Bom");          // ← este executa
} else if (nota >= 5) {
  console.log("Regular");
} else {
  console.log("Insuficiente");
}`)}
${atencao('As condições são testadas <b>de cima para baixo</b> e apenas o <b>primeiro</b> bloco verdadeiro é executado. Por isso a ordem importa: se o teste <code>nota >= 5</code> viesse primeiro, uma nota 9 seria classificada como “Regular”.')}
<h3>Condições compostas</h3>
${C(`const hora = 14;
const ehDiaUtil = true;
if (ehDiaUtil && hora >= 8 && hora < 18) {
  console.log("Loja aberta");
} else {
  console.log("Loja fechada");
}`)}
<h3>Operador ternário</h3>
<p>Para escolher entre dois valores de forma compacta:</p>
${C(`const n = 7;
const tipo = n % 2 === 0 ? "par" : "ímpar";
console.log(tipo);   // ímpar`)}
<h3>switch</h3>
<p>Útil quando comparamos uma variável com vários valores exatos:</p>
${C(`const dia = 3;
switch (dia) {
  case 1: console.log("Domingo"); break;
  case 2: console.log("Segunda"); break;
  case 3: console.log("Terça"); break;
  default: console.log("Outro dia");
}`)}
<p>O <code>break</code> encerra o switch. Sem ele, a execução “cai” para o próximo <code>case</code>.</p>
<h3>Funções: um primeiro contato</h3>
<p>Os exercícios de programação pedem que você escreva uma <b>função</b>: um bloco de código com nome, que recebe valores (parâmetros) e devolve um resultado com <code>return</code>. Veremos funções em detalhe na Apostila 2. Por enquanto, basta este modelo:</p>
${C(`function classificar(n) {
  if (n > 0) return "positivo";
  if (n < 0) return "negativo";
  return "zero";
}
console.log(classificar(-4));   // negativo`)}
<p>Quando o <code>return</code> é executado, a função termina imediatamente. Por isso, no exemplo acima, não foi preciso usar <code>else</code>.</p>
${resumo(['if executa um bloco se a condição for verdadeira; else trata o caso contrário.', 'Com else if, só o primeiro bloco verdadeiro executa: a ordem importa.', 'O ternário escolhe entre dois valores: condição ? a : b.', 'return devolve o resultado e encerra a função.'])}`,
        exercicios: [{ gen: 'r-if-else', n: 2 }, { gen: 'p-ehPar', n: 1 }, { gen: 'p-maiorDeTres', n: 1 }, { gen: 'p-valorAbsoluto', n: 1 }, { gen: 'p-situacaoAluno', n: 1 }, { gen: 'p-anoBissexto', n: 1 }, { gen: 'p-faixaEtaria', n: 1 }, { gen: 'p-precoComDesconto', n: 1 }]
      },
      {
        titulo: 'Raciocínio lógico com números',
        html: `
<p>Programar é, em grande parte, enxergar <b>padrões</b>. Treinar sequências numéricas e problemas de contagem desenvolve exatamente essa habilidade.</p>
<h3>Progressão aritmética (PA)</h3>
<p>Cada termo é o anterior <b>somado</b> a uma constante chamada razão (r).</p>
<p class="destaque">2, 5, 8, 11, 14, ... (r = 3)</p>
<p>Termo geral: a<sub>n</sub> = a<sub>1</sub> + (n − 1) · r. O 10º termo da sequência acima é 2 + 9 · 3 = 29.</p>
<h3>Progressão geométrica (PG)</h3>
<p>Cada termo é o anterior <b>multiplicado</b> por uma constante chamada razão (q).</p>
<p class="destaque">3, 6, 12, 24, 48, ... (q = 2)</p>
<h3>Estratégia para descobrir padrões</h3>
<ol>
  <li>Calcule as <b>diferenças</b> entre termos vizinhos. Se forem iguais, é uma PA.</li>
  <li>Calcule as <b>divisões</b> entre termos vizinhos. Se forem iguais, é uma PG.</li>
  <li>Se as diferenças formarem uma nova sequência (1, 2, 3, 4...), aplique o passo 1 de novo sobre elas.</li>
  <li>Verifique se cada termo depende dos <b>dois anteriores</b> (como na sequência de Fibonacci: 1, 1, 2, 3, 5, 8...).</li>
</ol>
<h3>Divisibilidade</h3>
<p>Um número a é divisível por b quando o resto de a ÷ b é zero: em código, <code>a % b === 0</code>. Quantos múltiplos de k existem de 1 até n? Exatamente ⌊n / k⌋ (divisão inteira).</p>
${C(`// múltiplos de 7 entre 1 e 100
console.log(Math.floor(100 / 7));   // 14`)}
<h3>Gerando uma sequência com código</h3>
${C(`let termo = 2;
const razao = 3;
let texto = "";
for (let i = 0; i < 6; i++) {   // laço: repete 6 vezes (Apostila 2)
  texto += termo + " ";
  termo += razao;
}
console.log(texto);   // 2 5 8 11 14 17`)}
${dica('Nos problemas do dia a dia, separe os dados, escreva as contas por etapas e confira se o resultado faz sentido (um desconto nunca deixa o preço negativo, por exemplo).')}
${resumo(['Na PA soma-se a razão; na PG multiplica-se.', 'Analise diferenças e divisões entre termos vizinhos para achar o padrão.', 'a % b === 0 indica que a é divisível por b.'])}`,
        exercicios: [{ gen: 'seq-aritmetica', n: 2 }, { gen: 'seq-geometrica', n: 2 }, { gen: 'divisiveis-intervalo', n: 2 }, { gen: 'problema-aritmetico', n: 2 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
