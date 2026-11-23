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
    id: 'apostila-06', trilha: 'web', nivel: 2, numero: 6,
    titulo: 'HTML5 e CSS3: Fundamentos',
    subtitulo: 'Tabelas, formulários, HTML semântico, seletores, cascata, especificidade, box model e unidades',
    arquivo: 'Apostila 06 - Basico - HTML5 e CSS3 Fundamentos.pdf',
    linguagem: 'HTML5 e CSS3',
    apresentacao: `<p>Com o básico de HTML e CSS dominado, é hora de aprender as peças que aparecem em praticamente todo site: <b>tabelas</b> para dados, <b>formulários</b> para interagir com o usuário e <b>elementos semânticos</b> para dar significado à estrutura.</p>
      <p>Do lado do CSS, você vai entender de verdade como o navegador decide qual regra vale (<b>cascata e especificidade</b>), como funciona o <b>modelo de caixa</b> (o box model, base de todo layout) e quando usar <code>px</code>, <code>em</code>, <code>rem</code>, <code>%</code> e <code>vw</code>.</p>`,
    capitulos: [
      {
        titulo: 'Tabelas',
        html: `
<p>Tabelas servem para <b>dados tabulares</b>: informações que fazem sentido em linhas e colunas, como horários, preços e notas. Não as use para montar o layout da página (para isso existem Flexbox e Grid).</p>
${demo({ css: `table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
thead { background: #e0e7ff; }
caption { font-weight: bold; margin-bottom: 6px; }`, html: `<table>
  <caption>Notas do bimestre</caption>
  <thead>
    <tr><th>Aluno</th><th>Nota 1</th><th>Nota 2</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>9</td><td>8</td></tr>
    <tr><td>Bruno</td><td>7</td><td>10</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Média</td><td>8</td><td>9</td></tr>
  </tfoot>
</table>`, altura: 190 })}
<table class="tabela">
  <tr><th>Tag</th><th>Função</th></tr>
  <tr><td><code>&lt;table&gt;</code></td><td>A tabela</td></tr>
  <tr><td><code>&lt;caption&gt;</code></td><td>Título da tabela (logo após a abertura de table)</td></tr>
  <tr><td><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code></td><td>Cabeçalho, corpo e rodapé</td></tr>
  <tr><td><code>&lt;tr&gt;</code></td><td>Linha (<i>table row</i>)</td></tr>
  <tr><td><code>&lt;th&gt;</code></td><td>Célula de cabeçalho (negrito e centralizada por padrão)</td></tr>
  <tr><td><code>&lt;td&gt;</code></td><td>Célula de dados</td></tr>
</table>
<h3>Mesclando células</h3>
${demo({ css: `td, th { border: 1px solid #94a3b8; padding: 4px 10px; text-align: center; }
table { border-collapse: collapse; }`, html: `<table>
  <tr><th colspan="2">Fim de semana</th></tr>
  <tr><td>Sábado</td><td>Domingo</td></tr>
  <tr><td rowspan="2">Livre</td><td>Manhã</td></tr>
  <tr><td>Tarde</td></tr>
</table>`, altura: 130 })}
<p><code>colspan="2"</code> faz a célula ocupar duas colunas; <code>rowspan="2"</code>, duas linhas. Lembre-se de retirar as células que foram “engolidas”.</p>
${dica('Para acessibilidade, use <code>&lt;th scope="col"&gt;</code> nos cabeçalhos de coluna e <code>scope="row"</code> nos de linha.')}
${resumo(['Tabelas são para dados, não para layout.', 'Estrutura: table > caption, thead, tbody, tfoot > tr > th/td.', 'colspan mescla colunas; rowspan mescla linhas.', 'border-collapse: collapse junta as bordas das células.'])}`,
        exercicios: [{ gen: 'hc-tabela', n: 1 }]
      },
      {
        titulo: 'Formulários',
        html: `
<p>Formulários coletam dados do usuário: login, cadastro, busca, pagamento. Os dados são enviados ao endereço do atributo <code>action</code>, usando o método do atributo <code>method</code>.</p>
${demo({ css: `form { display: grid; gap: 6px; max-width: 320px; }
input, select, textarea, button { font: inherit; padding: 6px; }
button { background: #1e40af; color: #fff; border: 0; border-radius: 6px; }`, html: `<form action="/cadastro" method="post">
  <label for="nome">Nome</label>
  <input type="text" id="nome" name="nome" required>

  <label for="email">E-mail</label>
  <input type="email" id="email" name="email" placeholder="voce@exemplo.com">

  <label for="plano">Plano</label>
  <select id="plano" name="plano">
    <option value="basico">Básico</option>
    <option value="pro" selected>Profissional</option>
  </select>

  <label><input type="checkbox" name="news"> Quero receber novidades</label>
  <button type="submit">Cadastrar</button>
</form>`, altura: 330 })}
<h3>Peças fundamentais</h3>
<ul>
  <li><code>&lt;label for="id"&gt;</code> liga o rótulo ao campo: clicar no texto foca o campo, e o leitor de tela lê o rótulo. Também vale envolver o campo com o label.</li>
  <li><code>name</code> é a chave com que o valor é enviado ao servidor (<code>email=ana@x.com</code>). Sem <code>name</code>, o campo não é enviado.</li>
  <li><code>id</code> identifica o campo na página (para o <code>for</code> do label e para o CSS/JS).</li>
  <li><code>method="get"</code> coloca os dados na URL (bom para buscas); <code>method="post"</code> os envia no corpo da requisição (use para senhas e dados pessoais).</li>
</ul>
<h3>Tipos de input do HTML5</h3>
<table class="tabela">
  <tr><th>type</th><th>Uso</th><th>type</th><th>Uso</th></tr>
  <tr><td>text</td><td>Texto curto</td><td>checkbox</td><td>Várias opções independentes</td></tr>
  <tr><td>email</td><td>E-mail (valida o formato)</td><td>radio</td><td>Uma opção de um grupo (mesmo name)</td></tr>
  <tr><td>password</td><td>Senha (oculta)</td><td>date / time</td><td>Data e hora</td></tr>
  <tr><td>number</td><td>Números (min, max, step)</td><td>range</td><td>Controle deslizante</td></tr>
  <tr><td>tel</td><td>Telefone (teclado numérico)</td><td>color</td><td>Seletor de cor</td></tr>
  <tr><td>url</td><td>Endereço web</td><td>file</td><td>Envio de arquivo</td></tr>
  <tr><td>search</td><td>Busca</td><td>hidden</td><td>Valor oculto enviado junto</td></tr>
</table>
<h3>Validação nativa</h3>
${H(`<input type="text" name="usuario" required minlength="3" maxlength="20">
<input type="number" name="idade" min="18" max="120">
<input type="text" name="cep" pattern="[0-9]{5}-[0-9]{3}" title="Formato: 00000-000">`)}
<p>O navegador impede o envio e mostra uma mensagem quando a regra não é cumprida. Mesmo assim, <b>o servidor sempre precisa validar de novo</b>: a validação no navegador é para a experiência do usuário, não para segurança.</p>
<h3>Outros elementos</h3>
${H(`<fieldset>
  <legend>Turno</legend>
  <label><input type="radio" name="turno" value="manha"> Manhã</label>
  <label><input type="radio" name="turno" value="noite"> Noite</label>
</fieldset>

<textarea name="mensagem" rows="4" cols="40"></textarea>`)}
${resumo(['form com action (destino) e method (get/post).', 'Todo campo precisa de name para ser enviado e de um label associado.', 'Os types do HTML5 trazem validação e teclados adequados no celular.', 'Rádios do mesmo grupo compartilham o name. Valide sempre também no servidor.'])}`,
        exercicios: [{ gen: 'h-inputs', n: 3 }, { gen: 'h-tabelas-forms', n: 3 }, { gen: 'hc-formulario', n: 1 }]
      },
      {
        titulo: 'HTML semântico',
        html: `
<p>Semântica é usar cada elemento pelo seu <b>significado</b>. Uma página feita só de <code>&lt;div&gt;</code> funciona, mas não diz nada a leitores de tela, buscadores ou a outros desenvolvedores. O HTML5 trouxe elementos que descrevem as regiões da página:</p>
<pre class="code">┌──────────────── &lt;header&gt; ────────────────┐
│  logo          &lt;nav&gt; Início | Blog | Sobre │
├─────────────────────────────┬─────────────┤
│ &lt;main&gt;                      │  &lt;aside&gt;    │
│   &lt;article&gt;                 │  links      │
│     &lt;h2&gt; título do post     │  anúncios   │
│     &lt;section&gt; parte 1       │             │
│     &lt;section&gt; parte 2       │             │
│   &lt;/article&gt;                │             │
├─────────────────────────────┴─────────────┤
│                 &lt;footer&gt;                  │
└───────────────────────────────────────────┘</pre>
<table class="tabela">
  <tr><th>Elemento</th><th>Significado</th></tr>
  <tr><td><code>&lt;header&gt;</code></td><td>Introdução da página ou de uma seção: logo, título, busca</td></tr>
  <tr><td><code>&lt;nav&gt;</code></td><td>Bloco de navegação principal</td></tr>
  <tr><td><code>&lt;main&gt;</code></td><td>Conteúdo principal; apenas um por página</td></tr>
  <tr><td><code>&lt;article&gt;</code></td><td>Conteúdo independente, que faz sentido sozinho: post, notícia, produto</td></tr>
  <tr><td><code>&lt;section&gt;</code></td><td>Agrupamento temático, normalmente com um título</td></tr>
  <tr><td><code>&lt;aside&gt;</code></td><td>Conteúdo complementar: barra lateral, notas</td></tr>
  <tr><td><code>&lt;footer&gt;</code></td><td>Rodapé: autoria, direitos, links secundários</td></tr>
  <tr><td><code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code></td><td>Imagem, gráfico ou código com legenda</td></tr>
  <tr><td><code>&lt;time datetime="2026-03-10"&gt;</code></td><td>Data legível por máquinas</td></tr>
</table>
${H(`<article>
  <header>
    <h2>Aprendendo Flexbox</h2>
    <p>Publicado em <time datetime="2026-03-10">10 de março</time></p>
  </header>
  <p>O Flexbox facilita alinhar elementos...</p>
  <footer>Autora: Ana</footer>
</article>`)}
${dica('Teste rápido: “Este conteúdo faria sentido sozinho, num feed?” Então é <code>article</code>. “É só uma caixa para estilizar?” Então é <code>div</code>.')}
${resumo(['Elementos semânticos descrevem o papel do conteúdo.', 'header, nav, main, article, section, aside e footer estruturam a página.', 'main aparece uma vez; header e footer podem existir dentro de articles.', 'div e span continuam úteis quando não há significado.'])}`,
        exercicios: [{ gen: 'h-semantica', n: 3 }, { gen: 'h-filhos', n: 2 }, { gen: 'hc-semantica', n: 1 }]
      },
      {
        titulo: 'Seletores, cascata e especificidade',
        html: `
<h3>Seletores combinados</h3>
<table class="tabela">
  <tr><th>Seletor</th><th>Seleciona</th></tr>
  <tr><td><code>nav a</code></td><td>Todo <code>a</code> dentro de <code>nav</code>, em qualquer nível (descendente)</td></tr>
  <tr><td><code>ul &gt; li</code></td><td>Os <code>li</code> filhos <b>diretos</b> de <code>ul</code></td></tr>
  <tr><td><code>h2 + p</code></td><td>O <code>p</code> imediatamente após um <code>h2</code> (irmão adjacente)</td></tr>
  <tr><td><code>h2 ~ p</code></td><td>Todos os <code>p</code> irmãos após um <code>h2</code></td></tr>
  <tr><td><code>h1, h2, h3</code></td><td>Todos eles (agrupamento)</td></tr>
  <tr><td><code>p.nota</code></td><td><code>p</code> que tem a classe nota</td></tr>
  <tr><td><code>.card.destaque</code></td><td>Elementos com as duas classes</td></tr>
  <tr><td><code>input[type="email"]</code></td><td>Por atributo</td></tr>
</table>
<h3>Pseudo-classes e pseudo-elementos</h3>
${demo({ css: `a { color: #1e40af; }
a:hover { color: #b91c1c; }          /* mouse em cima */
li:first-child { font-weight: bold; }
li:nth-child(even) { background: #f1f5f9; }
.preco::before { content: "R$ "; color: #64748b; }`, html: '<a href="#">Passe o mouse</a>\n<ul>\n  <li>Primeiro</li><li>Segundo</li><li>Terceiro</li><li>Quarto</li>\n</ul>\n<p class="preco">49,90</p>', altura: 170 })}
<p>Pseudo-classes (<code>:</code>) selecionam por <b>estado ou posição</b>: <code>:hover</code>, <code>:focus</code>, <code>:checked</code>, <code>:disabled</code>, <code>:first-child</code>, <code>:nth-child(2n+1)</code>, <code>:not(.x)</code>. Pseudo-elementos (<code>::</code>) criam ou selecionam <b>partes</b>: <code>::before</code>, <code>::after</code>, <code>::first-letter</code>, <code>::placeholder</code>.</p>
<h3>A cascata</h3>
<p>Quando várias regras atingem o mesmo elemento com a mesma propriedade, o navegador decide nesta ordem:</p>
<ol>
  <li><b>Importância:</b> declarações com <code>!important</code> vencem as normais (evite usar).</li>
  <li><b>Especificidade:</b> o seletor mais específico vence.</li>
  <li><b>Ordem:</b> em empate, vence a regra que aparece por último.</li>
</ol>
<h3>Calculando a especificidade</h3>
<p>Conte três números <b>(A, B, C)</b> e compare da esquerda para a direita:</p>
<table class="tabela">
  <tr><th>Coluna</th><th>Conta</th></tr>
  <tr><td>A</td><td>ids (<code>#menu</code>)</td></tr>
  <tr><td>B</td><td>classes (<code>.ativo</code>), atributos (<code>[type]</code>) e pseudo-classes (<code>:hover</code>)</td></tr>
  <tr><td>C</td><td>tags (<code>li</code>) e pseudo-elementos (<code>::before</code>)</td></tr>
</table>
<pre class="code">li                       → (0, 0, 1)
.menu li                 → (0, 1, 1)
nav ul li.ativo a:hover  → (0, 2, 4)
#topo .link              → (1, 1, 0)   ← vence todos acima</pre>
<p>Um único id vence qualquer quantidade de classes, porque a coluna A é comparada primeiro. O estilo inline (<code>style="..."</code>) vence todos os seletores. Combinadores (espaço, <code>&gt;</code>, <code>+</code>) e o seletor universal <code>*</code> não contam.</p>
<h3>Herança</h3>
<p>Algumas propriedades são herdadas pelos filhos: as de texto, como <code>color</code>, <code>font-family</code>, <code>font-size</code> e <code>line-height</code>. As de caixa, como <code>margin</code>, <code>padding</code>, <code>border</code> e <code>background</code>, não. Por isso basta definir a fonte no <code>body</code>.</p>
${atencao('Evite ids e <code>!important</code> para estilizar: eles criam uma “guerra de especificidade” difícil de manter. Prefira classes com especificidade baixa e parecida.')}
${resumo(['Combinadores: espaço (descendente), > (filho), + (adjacente), ~ (irmãos).', 'Pseudo-classes = estado/posição; pseudo-elementos = partes.', 'Cascata: !important → especificidade → ordem.', 'Especificidade (ids, classes, tags) é comparada da esquerda para a direita.'])}`,
        exercicios: [{ gen: 'c-seletores', n: 3 }, { gen: 'c-seletor-simples', n: 2 }, { gen: 'c-especificidade', n: 4 }, { gen: 'cc-seletores', n: 1 }]
      },
      {
        titulo: 'O box model (modelo de caixa)',
        html: `
<p>Para o CSS, <b>todo elemento é uma caixa retangular</b> formada por quatro camadas, de dentro para fora:</p>
<pre class="code">┌──────────────── margin ────────────────┐
│  ┌───────────── border ─────────────┐  │
│  │  ┌────────── padding ─────────┐  │  │
│  │  │                            │  │  │
│  │  │     content (conteúdo)     │  │  │
│  │  │                            │  │  │
│  │  └────────────────────────────┘  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘</pre>
<ul>
  <li><b>content:</b> onde fica o texto ou a imagem; controlado por <code>width</code> e <code>height</code>.</li>
  <li><b>padding:</b> espaço interno, entre o conteúdo e a borda. Recebe o fundo do elemento.</li>
  <li><b>border:</b> a borda.</li>
  <li><b>margin:</b> espaço externo, que afasta outros elementos. É sempre transparente.</li>
</ul>
${demo({ css: `.caixa {
  width: 220px;
  padding: 16px;
  border: 4px solid #1e40af;
  margin: 12px;
  background: #e0e7ff;
}`, html: '<div class="caixa">Conteúdo da caixa</div>', altura: 110 })}
<h3>Quanto espaço a caixa ocupa?</h3>
<p>No comportamento padrão (<code>box-sizing: content-box</code>), o <code>width</code> é só do conteúdo. Padding e borda são <b>somados</b>:</p>
<pre class="code">largura visível = width + padding esq. + padding dir. + borda esq. + borda dir.
                = 220 + 16 + 16 + 4 + 4 = 260px
espaço ocupado  = 260 + margem esq. + margem dir. = 260 + 12 + 12 = 284px</pre>
<h3>box-sizing: border-box</h3>
<p>Com <code>border-box</code>, o <code>width</code> passa a incluir padding e borda: a caixa fica com exatamente a largura informada e o conteúdo encolhe. É tão mais intuitivo que quase todo projeto começa com:</p>
${S(`*, *::before, *::after {
  box-sizing: border-box;
}`)}
<h3>Atalhos (shorthands)</h3>
${S(`padding: 10px;                /* os 4 lados */
padding: 10px 20px;           /* vertical | horizontal */
padding: 10px 20px 5px;       /* topo | horizontal | base */
padding: 10px 20px 5px 0;     /* topo | direita | base | esquerda (sentido horário) */

border: 2px solid #333;       /* espessura | estilo | cor */
border-radius: 8px;           /* cantos arredondados; 50% vira círculo */
margin: 0 auto;               /* centraliza horizontalmente um bloco com width */`)}
${atencao('<b>Colapso de margens:</b> margens verticais entre blocos vizinhos não se somam. A maior vence. Dois parágrafos com <code>margin: 20px</code> ficam separados por 20px, não por 40px.')}
<h3>display: block, inline e inline-block</h3>
<table class="tabela">
  <tr><th></th><th>block</th><th>inline</th><th>inline-block</th></tr>
  <tr><td>Exemplos</td><td>div, p, h1, ul, section</td><td>span, a, strong, em</td><td>button, img, input</td></tr>
  <tr><td>Começa em nova linha?</td><td>Sim</td><td>Não</td><td>Não</td></tr>
  <tr><td>Aceita width/height?</td><td>Sim</td><td>Não</td><td>Sim</td></tr>
  <tr><td>Largura padrão</td><td>Toda a disponível</td><td>A do conteúdo</td><td>A do conteúdo</td></tr>
</table>
${resumo(['Caixa = content + padding + border + margin.', 'content-box: width é só o conteúdo; border-box: width inclui padding e borda.', 'Shorthands seguem o sentido horário: topo, direita, base, esquerda.', 'Margens verticais colapsam; inline não aceita width e height.'])}`,
        exercicios: [{ gen: 'c-box-model', n: 4 }, { gen: 'cc-box', n: 1 }]
      },
      {
        titulo: 'Unidades de medida e tipografia',
        html: `
<table class="tabela">
  <tr><th>Unidade</th><th>Relativa a</th><th>Uso típico</th></tr>
  <tr><td><code>px</code></td><td>Pixel da tela (absoluta)</td><td>Bordas, sombras, detalhes finos</td></tr>
  <tr><td><code>rem</code></td><td>font-size do elemento raiz (<code>html</code>), normalmente 16px</td><td>Tamanhos de fonte, espaçamentos</td></tr>
  <tr><td><code>em</code></td><td>font-size do próprio elemento (em <code>font-size</code>, do pai)</td><td>Espaços proporcionais ao texto de um componente</td></tr>
  <tr><td><code>%</code></td><td>O pai (na largura, a largura do pai)</td><td>Larguras fluidas</td></tr>
  <tr><td><code>vw</code> / <code>vh</code></td><td>1% da largura / altura da janela</td><td>Seções de tela cheia</td></tr>
  <tr><td><code>ch</code></td><td>Largura do caractere “0”</td><td>Limitar o comprimento da linha (<code>max-width: 65ch</code>)</td></tr>
</table>
<h3>rem × em</h3>
${S(`html { font-size: 16px; }

.card {
  font-size: 1.25rem;   /* 1.25 × 16 = 20px */
  padding: 1em;         /* 1 × 20 = 20px (fonte do próprio card) */
  margin-bottom: 2rem;  /* 2 × 16 = 32px (sempre a raiz) */
}`)}
<p>O <code>em</code> em <code>font-size</code> se <b>acumula</b>: um elemento com <code>1.5em</code> dentro de outro com <code>1.5em</code> fica com 2,25 vezes a fonte original. O <code>rem</code> é sempre relativo à raiz, por isso é mais previsível para fontes.</p>
${dica('Usar rem nas fontes respeita o tamanho de letra que a pessoa configurou no navegador, um ponto importante de acessibilidade.')}
<h3>Tipografia legível</h3>
${demo({ css: `body {
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}
.artigo { max-width: 40ch; }
.artigo h2 { font-size: 1.4rem; line-height: 1.2; margin: 0 0 .5rem; }`, html: '<div class="artigo">\n  <h2>Por que line-height importa</h2>\n  <p>Linhas muito juntas cansam a leitura. Um line-height entre 1.4 e 1.7 e linhas de até 60 a 75 caracteres deixam o texto confortável.</p>\n</div>', altura: 170 })}
<h3>Fontes da web</h3>
${H(`<!-- no <head>: Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">`)}
${S(`body { font-family: "Inter", sans-serif; }`)}
${resumo(['px é absoluto; rem é relativo à raiz; em, à fonte do elemento.', 'em em font-size se acumula entre níveis.', '% é relativo ao pai; vw/vh, à janela.', 'Para legibilidade: line-height ~1.6 e linhas de até ~70 caracteres.'])}`,
        exercicios: [{ gen: 'c-unidades', n: 4 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
