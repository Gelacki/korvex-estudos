(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const H = (s) => U.codigo(s, 'html');
  const S = (s) => U.codigo(s, 'css');
  const demo = U.demo;
  const dica = (t) => `<div class="box dica"><b>Dica</b><div>${t}</div></div>`;
  const atencao = (t) => `<div class="box atencao"><b>Atenção</b><div>${t}</div></div>`;
  const resumo = (itens) => `<div class="box resumo"><b>Resumo do capítulo</b><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  KX.apostilas = KX.apostilas || [];

  KX.apostilas.push({
    id: 'apostila-05', trilha: 'web', nivel: 1, numero: 5,
    titulo: 'HTML5 e CSS3: Primeiros Passos',
    subtitulo: 'Como a web funciona, estrutura do documento, textos, listas, links, imagens e o primeiro CSS',
    arquivo: 'Apostila 05 - Iniciante - HTML5 e CSS3 Primeiros Passos.pdf',
    linguagem: 'HTML5 e CSS3',
    apresentacao: `<p>Todo site que você visita é construído sobre três tecnologias: <b>HTML</b> (a estrutura e o conteúdo), <b>CSS</b> (a aparência) e <b>JavaScript</b> (o comportamento). Esta apostila começa do zero absoluto: você vai entender o que acontece quando abre uma página e criar suas primeiras páginas com HTML5 e CSS3.</p>
      <p><b>Do que você precisa:</b> só de um editor de texto (o <i>VS Code</i> é gratuito e excelente) e de um navegador. Crie um arquivo <code>index.html</code>, escreva o código e abra o arquivo com dois cliques. No sistema Kovex Estudos, os exercícios práticos de HTML e CSS mostram o resultado ao vivo e conferem cada requisito automaticamente.</p>`,
    capitulos: [
      {
        titulo: 'Como a web funciona',
        html: `
<p>Quando você digita um endereço no navegador, acontece uma conversa entre dois computadores:</p>
<ol>
  <li>O <b>navegador</b> (cliente) pede a página a um <b>servidor</b> usando o protocolo <b>HTTP</b> (ou HTTPS, a versão segura).</li>
  <li>O servidor responde com arquivos: um <b>HTML</b> e, a partir dele, CSS, imagens, fontes e scripts.</li>
  <li>O navegador lê o HTML, monta a <b>árvore do documento (DOM)</b>, aplica o CSS e desenha a página na tela.</li>
</ol>
<h3>As três camadas</h3>
<table class="tabela">
  <tr><th>Tecnologia</th><th>Papel</th><th>Analogia com uma casa</th></tr>
  <tr><td>HTML</td><td>Estrutura e conteúdo</td><td>Paredes, portas e cômodos</td></tr>
  <tr><td>CSS</td><td>Aparência e layout</td><td>Pintura, decoração e disposição dos móveis</td></tr>
  <tr><td>JavaScript</td><td>Comportamento e interação</td><td>Instalação elétrica: luzes, campainha</td></tr>
</table>
<p>HTML significa <i>HyperText Markup Language</i>: não é uma linguagem de programação, e sim de <b>marcação</b>. Você marca partes do texto dizendo o que cada uma é: um título, um parágrafo, um link, uma imagem.</p>
<h3>Tags e elementos</h3>
<p>A marcação é feita com <b>tags</b>, palavras entre os sinais <code>&lt;</code> e <code>&gt;</code>. A maioria vem em pares, abertura e fechamento (com barra), e o conjunto forma um <b>elemento</b>:</p>
${H('<p>Este é um parágrafo.</p>\n<!-- abertura: <p>   conteúdo   fechamento: </p> -->')}
<p>Algumas tags são <b>vazias</b>: não têm conteúdo nem fechamento, como <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;input&gt;</code> e <code>&lt;meta&gt;</code>.</p>
<h3>Atributos</h3>
<p>Atributos dão informações extras a um elemento. Ficam na tag de abertura, no formato <code>nome="valor"</code>:</p>
${H('<a href="https://www.w3.org" title="Site do W3C">W3C</a>')}
<h3>Aninhamento</h3>
<p>Elementos podem conter outros elementos. A regra de ouro: <b>o último a abrir é o primeiro a fechar</b>.</p>
${H('<p>Isto é <strong>muito importante</strong>.</p>   <!-- correto -->\n<p>Isto é <strong>errado</p></strong>             <!-- errado: entrelaçado -->')}
${dica('Use a indentação (recuo) para mostrar quem está dentro de quem. O navegador ignora espaços extras, mas o código fica muito mais fácil de ler.')}
${resumo(['O navegador pede arquivos ao servidor via HTTP e desenha a página.', 'HTML = estrutura; CSS = aparência; JavaScript = comportamento.', 'Elementos são formados por tags de abertura e fechamento; algumas tags são vazias.', 'Atributos ficam na abertura: nome="valor". Feche as tags na ordem inversa da abertura.'])}`,
        exercicios: [{ gen: 'h-tags', n: 3 }, { gen: 'h-erro-linha', n: 2 }]
      },
      {
        titulo: 'Estrutura de um documento HTML5',
        html: `
<p>Toda página HTML5 segue o mesmo esqueleto:</p>
${H(`<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Minha primeira página</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <p>Esta é a minha primeira página.</p>
  </body>
</html>`)}
<table class="tabela">
  <tr><th>Parte</th><th>Para que serve</th></tr>
  <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Avisa ao navegador que o documento é HTML5. Sempre a primeira linha.</td></tr>
  <tr><td><code>&lt;html lang="pt-BR"&gt;</code></td><td>Elemento raiz. O <code>lang</code> informa o idioma (importante para acessibilidade e buscadores).</td></tr>
  <tr><td><code>&lt;head&gt;</code></td><td>Informações <b>sobre</b> a página, que não aparecem no corpo: título da aba, codificação, CSS, metadados.</td></tr>
  <tr><td><code>&lt;meta charset="UTF-8"&gt;</code></td><td>Garante que acentos e “ç” apareçam corretamente.</td></tr>
  <tr><td><code>&lt;meta name="viewport"&gt;</code></td><td>Faz a página se adaptar à largura de celulares.</td></tr>
  <tr><td><code>&lt;title&gt;</code></td><td>Texto da aba do navegador e do resultado no Google.</td></tr>
  <tr><td><code>&lt;body&gt;</code></td><td>Todo o conteúdo visível da página.</td></tr>
</table>
${dica('No VS Code, num arquivo .html vazio, digite <code>!</code> e aperte Tab: o esqueleto completo é criado automaticamente.')}
<h3>Comentários</h3>
${H('<!-- Comentários não aparecem na página. Use-os para explicar o código. -->')}
<h3>O DOM: a árvore do documento</h3>
<p>O navegador transforma o HTML em uma árvore de objetos chamada <b>DOM</b> (<i>Document Object Model</i>). Cada elemento é um nó; os que estão dentro dele são seus <b>filhos</b>, e os filhos dos filhos são <b>descendentes</b>.</p>
<pre class="code">html
├── head
│   ├── meta
│   └── title
└── body
    ├── h1
    └── p</pre>
<p>Esse vocabulário (pai, filho, irmão, descendente) é usado o tempo todo no CSS e no JavaScript.</p>
${resumo(['A primeira linha é sempre <!DOCTYPE html>.', 'head guarda metadados; body guarda o conteúdo visível.', 'Não esqueça meta charset, meta viewport, title e lang.', 'O navegador transforma o HTML em uma árvore: o DOM.'])}`,
        exercicios: [{ gen: 'h-estrutura', n: 4 }]
      },
      {
        titulo: 'Textos, títulos e listas',
        html: `
<h3>Títulos</h3>
<p>Existem seis níveis de título, de <code>&lt;h1&gt;</code> (mais importante) a <code>&lt;h6&gt;</code>. Use-os para criar a <b>hierarquia</b> do conteúdo, como o sumário de um livro, e não para mudar o tamanho da letra (isso é papel do CSS).</p>
${demo({ html: '<h1>Receitas</h1>\n<h2>Bolos</h2>\n<h3>Bolo de cenoura</h3>\n<p>Rende 12 fatias.</p>', altura: 170 })}
${atencao('Use apenas um <code>&lt;h1&gt;</code> por página e não pule níveis (de h2 direto para h4). Leitores de tela e buscadores usam essa hierarquia para entender a página.')}
<h3>Parágrafos e quebras</h3>
<p>O navegador junta espaços e quebras de linha do código em um único espaço. Para separar blocos de texto, use parágrafos (<code>&lt;p&gt;</code>). Para uma quebra de linha dentro do mesmo bloco, como em endereços e poemas, use <code>&lt;br&gt;</code>.</p>
<h3>Ênfase e importância</h3>
<table class="tabela">
  <tr><th>Tag</th><th>Significado</th><th>Aparência padrão</th></tr>
  <tr><td><code>&lt;strong&gt;</code></td><td>Importância forte</td><td><b>negrito</b></td></tr>
  <tr><td><code>&lt;em&gt;</code></td><td>Ênfase (muda o sentido da frase)</td><td><i>itálico</i></td></tr>
  <tr><td><code>&lt;mark&gt;</code></td><td>Destaque, relevância</td><td><span style="background:#fef08a">marca-texto</span></td></tr>
  <tr><td><code>&lt;small&gt;</code></td><td>Observações, letras miúdas</td><td><small>menor</small></td></tr>
  <tr><td><code>&lt;code&gt;</code></td><td>Trecho de código</td><td><code>monoespaçado</code></td></tr>
  <tr><td><code>&lt;blockquote&gt;</code></td><td>Citação longa</td><td>recuado</td></tr>
</table>
<p>Existem também <code>&lt;b&gt;</code> e <code>&lt;i&gt;</code>, que só mudam a aparência. Prefira <code>strong</code> e <code>em</code> quando houver significado.</p>
<h3>Listas</h3>
${demo({ html: '<h3>Ingredientes</h3>\n<ul>\n  <li>3 cenouras</li>\n  <li>4 ovos</li>\n  <li>2 xícaras de farinha</li>\n</ul>\n\n<h3>Modo de preparo</h3>\n<ol>\n  <li>Bata no liquidificador</li>\n  <li>Misture a farinha</li>\n  <li>Asse por 40 minutos</li>\n</ol>', altura: 290 })}
<ul>
  <li><code>&lt;ul&gt;</code> (<i>unordered list</i>): lista sem ordem, com marcadores.</li>
  <li><code>&lt;ol&gt;</code> (<i>ordered list</i>): lista numerada. Aceita os atributos <code>start="5"</code>, <code>reversed</code> e <code>type="A"</code>.</li>
  <li><code>&lt;li&gt;</code>: cada item. Dentro de um <code>li</code> pode haver outra lista (lista aninhada).</li>
  <li><code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>: lista de definições, como um glossário.</li>
</ul>
${resumo(['h1 a h6 criam a hierarquia; um h1 por página, sem pular níveis.', 'p separa parágrafos; br quebra linha dentro do mesmo bloco.', 'strong e em têm significado; b e i são só visuais.', 'ul = lista com marcadores, ol = numerada, li = item.'])}`,
        exercicios: [{ gen: 'hc-titulo-paragrafo', n: 1 }, { gen: 'hc-lista', n: 2 }]
      },
      {
        titulo: 'Links e imagens',
        html: `
<h3>Links</h3>
<p>O elemento <code>&lt;a&gt;</code> (<i>anchor</i>) cria hiperlinks, a essência da web. O destino vai no atributo <code>href</code>:</p>
${H(`<!-- link absoluto: endereço completo -->
<a href="https://developer.mozilla.org">MDN Web Docs</a>

<!-- link relativo: arquivo do próprio site -->
<a href="contato.html">Fale conosco</a>
<a href="blog/post1.html">Primeiro post</a>
<a href="../index.html">Voltar ao início</a>

<!-- link para uma parte da mesma página (pelo id) -->
<a href="#precos">Ver preços</a>
<section id="precos">...</section>

<!-- e-mail e telefone -->
<a href="mailto:contato@exemplo.com">Enviar e-mail</a>
<a href="tel:+5511999999999">Ligar</a>

<!-- nova aba (com segurança) -->
<a href="https://www.w3.org" target="_blank" rel="noopener">W3C</a>`)}
${dica('Caminhos relativos: <code>pasta/arquivo.html</code> desce para uma pasta; <code>../</code> sobe uma pasta. Use sempre barras normais (/) e evite espaços e acentos em nomes de arquivos.')}
<p>O texto do link deve dizer para onde ele leva. Evite “clique aqui”: quem usa leitor de tela costuma navegar pela lista de links da página, e vários “clique aqui” não dizem nada.</p>
<h3>Imagens</h3>
${H('<img src="imagens/gato.jpg" alt="Gato laranja dormindo no sofá" width="300" height="200">')}
<ul>
  <li><code>src</code>: caminho da imagem (relativo ou absoluto).</li>
  <li><code>alt</code>: texto alternativo, <b>obrigatório</b>. É lido por leitores de tela, aparece quando a imagem não carrega e ajuda os buscadores. Para imagens só decorativas, use <code>alt=""</code>.</li>
  <li><code>width</code> e <code>height</code>: dimensões em pixels. Informá-las evita que a página “pule” enquanto a imagem carrega.</li>
</ul>
<table class="tabela">
  <tr><th>Formato</th><th>Indicado para</th></tr>
  <tr><td>JPG</td><td>Fotografias</td></tr>
  <tr><td>PNG</td><td>Imagens com transparência, capturas de tela</td></tr>
  <tr><td>SVG</td><td>Ícones e logotipos (vetorial: não perde qualidade ao ampliar)</td></tr>
  <tr><td>WebP / AVIF</td><td>Fotos com arquivo bem menor (formatos modernos)</td></tr>
  <tr><td>GIF</td><td>Animações simples</td></tr>
</table>
<h3>Imagem com link</h3>
${H('<a href="index.html">\n  <img src="logo.svg" alt="Kovex Estudos - página inicial">\n</a>')}
${resumo(['a + href cria links: absolutos, relativos, âncoras (#id), mailto e tel.', 'target="_blank" abre em nova aba; use junto rel="noopener".', 'img precisa de src e alt; informe width e height.', 'Escolha o formato da imagem conforme o conteúdo.'])}`,
        exercicios: [{ gen: 'h-atributos', n: 3 }, { gen: 'hc-link', n: 1 }, { gen: 'hc-imagem', n: 1 }]
      },
      {
        titulo: 'Primeiro contato com o CSS',
        html: `
<p>O CSS (<i>Cascading Style Sheets</i>) define a aparência dos elementos. Uma <b>regra</b> CSS tem um <b>seletor</b> (quem será estilizado) e um bloco de <b>declarações</b> (propriedade: valor):</p>
${S(`seletor {
  propriedade: valor;
  outra-propriedade: valor;
}

h1 {
  color: navy;
  font-size: 32px;
}`)}
<h3>Três formas de aplicar CSS</h3>
${H(`<!-- 1. Arquivo externo (recomendado): no <head> -->
<link rel="stylesheet" href="estilo.css">

<!-- 2. Interno: uma tag <style> no <head> -->
<style>
  p { color: gray; }
</style>

<!-- 3. Inline: direto no elemento (evite) -->
<p style="color: red;">Texto vermelho</p>`)}
<p>O arquivo externo permite que todas as páginas do site compartilhem o mesmo visual e que o navegador o guarde em cache.</p>
<h3>Seletores básicos</h3>
${demo({ css: `p { color: #475569; }          /* tag */
.destaque { color: #b91c1c; }  /* classe: começa com ponto */
#aviso { background: #fef08a; } /* id: começa com # */`, html: '<p>Parágrafo comum.</p>\n<p class="destaque">Parágrafo com classe.</p>\n<p id="aviso">Parágrafo com id.</p>', altura: 130 })}
<p>Uma <b>classe</b> pode ser usada em vários elementos, e um elemento pode ter várias classes (<code>class="card destaque"</code>). Um <b>id</b> deve ser único na página. Para estilizar, prefira classes.</p>
<h3>Cores</h3>
<table class="tabela">
  <tr><th>Formato</th><th>Exemplo</th><th>Observação</th></tr>
  <tr><td>Nome</td><td><code>red</code>, <code>navy</code>, <code>tomato</code></td><td>Cerca de 140 nomes prontos</td></tr>
  <tr><td>Hexadecimal</td><td><code>#1e40af</code> ou <code>#fff</code></td><td>Pares RR GG BB, de 00 a FF</td></tr>
  <tr><td>RGB</td><td><code>rgb(30, 64, 175)</code></td><td>Vermelho, verde e azul de 0 a 255</td></tr>
  <tr><td>RGBA / transparência</td><td><code>rgb(0 0 0 / 50%)</code></td><td>O último valor é a opacidade</td></tr>
  <tr><td>HSL</td><td><code>hsl(220, 70%, 40%)</code></td><td>Matiz, saturação, luminosidade: fácil de ajustar</td></tr>
</table>
<p>No hexadecimal, cada par é um número na base 16 (0–9 e A–F). <code>#FF0000</code> é vermelho puro: FF = 255 de vermelho, 00 de verde e de azul.</p>
<h3>Textos e fontes</h3>
${demo({ css: `.titulo {
  font-family: Georgia, serif;
  font-size: 28px;
  font-weight: bold;
  color: #1e40af;
  text-align: center;
}
.legenda {
  font-family: Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #64748b;
}`, html: '<h1 class="titulo">Café & Código</h1>\n<p class="legenda">O melhor café da cidade</p>', altura: 120 })}
<ul>
  <li><code>font-family</code>: lista de fontes em ordem de preferência; termine com uma genérica (<code>serif</code>, <code>sans-serif</code>, <code>monospace</code>).</li>
  <li><code>font-weight</code>: <code>normal</code> (400), <code>bold</code> (700) ou valores de 100 a 900.</li>
  <li><code>text-align</code>: <code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code>.</li>
  <li><code>text-decoration: none</code> remove o sublinhado dos links.</li>
  <li><code>line-height: 1.6</code> deixa o texto mais legível.</li>
</ul>
${resumo(['Regra CSS = seletor { propriedade: valor; }.', 'Prefira um arquivo .css externo ligado com <link>.', 'Seletores básicos: tag, .classe e #id.', 'Cores em nome, hexadecimal, rgb() ou hsl().'])}`,
        exercicios: [{ gen: 'c-propriedades', n: 3 }, { gen: 'c-sintaxe', n: 2 }, { gen: 'c-hex-rgb', n: 2 }, { gen: 'cc-cores-texto', n: 1 }, { gen: 'cc-texto', n: 1 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
