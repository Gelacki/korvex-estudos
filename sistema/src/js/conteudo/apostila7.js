(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const H = (s) => U.codigo(s, 'html');
  const S = (s) => U.codigo(s, 'css');
  const demo = U.demo;
  const dica = (t) => `<div class="box dica"><b>Dica</b><div>${t}</div></div>`;
  const atencao = (t) => `<div class="box atencao"><b>Atenção</b><div>${t}</div></div>`;
  const resumo = (itens) => `<div class="box resumo"><b>Resumo do capítulo</b><ul>${itens.map((i) => `<li>${i}</li>`).join('')}</ul></div>`;
  const caixas = '.item { background: #c7d2fe; border: 1px solid #6366f1; padding: 8px 12px; border-radius: 6px; }';
  KX.apostilas = KX.apostilas || [];

  KX.apostilas.push({
    id: 'apostila-07', trilha: 'web', nivel: 3, numero: 7,
    titulo: 'HTML5 e CSS3: Layout Moderno',
    subtitulo: 'Position, Flexbox, CSS Grid, design responsivo, acessibilidade e SEO',
    arquivo: 'Apostila 07 - Intermediario - HTML5 e CSS3 Layout Moderno.pdf',
    linguagem: 'HTML5 e CSS3',
    apresentacao: `<p>Montar layouts já foi a parte mais frustrante do CSS: tabelas, <code>float</code>, “gambiarras” para centralizar. Hoje temos ferramentas feitas para isso: <b>Flexbox</b> para alinhar em uma direção e <b>Grid</b> para layouts em duas dimensões.</p>
      <p>Nesta apostila você aprende a posicionar elementos, construir layouts profissionais que se adaptam do celular ao monitor (<b>design responsivo</b>) e garantir que as páginas sejam acessíveis a todas as pessoas e bem encontradas pelos buscadores.</p>`,
    capitulos: [
      {
        titulo: 'Position e empilhamento',
        html: `
<p>A propriedade <code>position</code> tira o elemento do fluxo normal (ou não) e permite movê-lo com <code>top</code>, <code>right</code>, <code>bottom</code> e <code>left</code>.</p>
<table class="tabela">
  <tr><th>Valor</th><th>Comportamento</th><th>Referência para top/left</th></tr>
  <tr><td><code>static</code></td><td>Padrão: segue o fluxo; top/left não funcionam</td><td>—</td></tr>
  <tr><td><code>relative</code></td><td>Continua no fluxo (o espaço original é mantido) e pode ser deslocado</td><td>A própria posição original</td></tr>
  <tr><td><code>absolute</code></td><td>Sai do fluxo (não ocupa espaço)</td><td>O ancestral posicionado mais próximo</td></tr>
  <tr><td><code>fixed</code></td><td>Sai do fluxo e fica fixo na tela ao rolar</td><td>A janela (viewport)</td></tr>
  <tr><td><code>sticky</code></td><td>Rola normalmente até atingir o limite e então “gruda”</td><td>O container de rolagem</td></tr>
</table>
<h3>O padrão relative + absolute</h3>
${demo({ css: `.card { position: relative; width: 220px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px; }
.selo {
  position: absolute;
  top: -10px;
  right: 10px;
  background: #dc2626; color: #fff;
  padding: 2px 10px; border-radius: 99px; font-size: 12px;
}`, html: '<div class="card">\n  <span class="selo">Novo</span>\n  <h3>Curso de CSS</h3>\n  <p>Do zero ao avançado.</p>\n</div>', altura: 150 })}
<p>O <code>position: relative</code> no card não o move: ele só vira a <b>referência</b> para o selo absoluto. Sem ele, o selo se posicionaria em relação à página inteira.</p>
<h3>Cabeçalho fixo e sticky</h3>
${S(`.topo { position: sticky; top: 0; z-index: 10; background: white; }
.voltar-ao-topo { position: fixed; right: 16px; bottom: 16px; }`)}
<h3>z-index</h3>
<p>Quando elementos posicionados se sobrepõem, <code>z-index</code> define quem fica na frente (o maior valor). Ele só funciona em elementos com position diferente de static, ou em itens flex e grid.</p>
${atencao('Cada elemento com z-index (e algumas outras propriedades, como <code>opacity</code> menor que 1 e <code>transform</code>) cria um <b>contexto de empilhamento</b>. Um filho nunca passa à frente de algo que está acima do seu pai, por maior que seja o seu z-index.')}
${resumo(['relative mantém o espaço e serve de referência para absolute.', 'absolute sai do fluxo e se posiciona no ancestral posicionado mais próximo.', 'fixed prende à janela; sticky gruda ao rolar.', 'z-index ordena a sobreposição dentro do mesmo contexto de empilhamento.'])}`,
        exercicios: [{ gen: 'c-layout', n: 2 }, { gen: 'cc-position', n: 1 }]
      },
      {
        titulo: 'Flexbox',
        html: `
<p>O Flexbox organiza itens em <b>uma direção</b> (linha ou coluna) e distribui o espaço entre eles. Basta aplicar <code>display: flex</code> no <b>container</b>: seus filhos diretos viram <b>itens flex</b>.</p>
${demo({ css: `.container { display: flex; gap: 8px; }
${caixas}`, html: '<div class="container">\n  <div class="item">Um</div>\n  <div class="item">Dois</div>\n  <div class="item">Três</div>\n</div>', altura: 60 })}
<h3>Os dois eixos</h3>
<p>Tudo no Flexbox gira em torno de dois eixos. O <b>eixo principal</b> é definido por <code>flex-direction</code> (<code>row</code>, horizontal, é o padrão; <code>column</code>, vertical). O <b>eixo cruzado</b> é o perpendicular.</p>
<table class="tabela">
  <tr><th>Propriedade (no container)</th><th>Função</th><th>Valores comuns</th></tr>
  <tr><td><code>flex-direction</code></td><td>Direção do eixo principal</td><td>row, column, row-reverse</td></tr>
  <tr><td><code>justify-content</code></td><td>Distribui no eixo <b>principal</b></td><td>flex-start, center, flex-end, space-between, space-around, space-evenly</td></tr>
  <tr><td><code>align-items</code></td><td>Alinha no eixo <b>cruzado</b></td><td>stretch (padrão), center, flex-start, flex-end, baseline</td></tr>
  <tr><td><code>flex-wrap</code></td><td>Permite quebrar linha</td><td>nowrap (padrão), wrap</td></tr>
  <tr><td><code>gap</code></td><td>Espaço entre os itens</td><td>12px, 1rem</td></tr>
</table>
${demo({ css: `.barra { display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f1f5f9; }
.logo { font-weight: bold; }
.menu { display: flex; gap: 12px; list-style: none; margin: 0; padding: 0; }`, html: '<header class="barra">\n  <span class="logo">Kovex</span>\n  <ul class="menu">\n    <li>Início</li><li>Cursos</li><li>Contato</li>\n  </ul>\n</header>', altura: 70 })}
<h3>Centralizar (finalmente fácil)</h3>
${S(`.tela {
  display: flex;
  justify-content: center;   /* horizontal */
  align-items: center;       /* vertical */
  min-height: 100vh;
}`)}
<h3>Propriedades dos itens</h3>
<ul>
  <li><code>flex-grow</code>: quanto o item cresce para ocupar o espaço <b>livre</b> (0 = não cresce).</li>
  <li><code>flex-shrink</code>: quanto encolhe quando falta espaço (1 = encolhe, padrão).</li>
  <li><code>flex-basis</code>: tamanho inicial antes de distribuir o espaço.</li>
  <li><code>flex: 1</code> é o atalho mais usado: “cresça e divida o espaço igualmente”.</li>
  <li><code>align-self</code> alinha um item específico; <code>order</code> muda a ordem visual.</li>
</ul>
${demo({ css: `.container { display: flex; gap: 8px; }
${caixas}
.a { flex-grow: 1; }
.b { flex-grow: 2; }`, html: '<div class="container">\n  <div class="item">fixo</div>\n  <div class="item a">grow 1</div>\n  <div class="item b">grow 2</div>\n</div>', altura: 60 })}
<h3>Como o espaço livre é dividido</h3>
<pre class="code">container = 600px, gap = 0
itens: A (basis 100px, grow 1)   B (basis 100px, grow 2)   C (basis 100px, grow 0)

espaço livre = 600 − (100 + 100 + 100) = 300px
soma dos grows = 1 + 2 + 0 = 3  →  cada unidade = 300 ÷ 3 = 100px
A = 100 + 1×100 = 200px    B = 100 + 2×100 = 300px    C = 100px</pre>
${resumo(['display: flex no container; os filhos diretos viram itens.', 'justify-content = eixo principal; align-items = eixo cruzado.', 'flex-direction troca o eixo principal; flex-wrap permite quebrar.', 'flex-grow divide o espaço livre proporcionalmente.'])}`,
        exercicios: [{ gen: 'c-flex-grow', n: 3 }, { gen: 'cc-flex-centro', n: 1 }, { gen: 'cc-flex-menu', n: 1 }]
      },
      {
        titulo: 'CSS Grid',
        html: `
<p>O Grid cria layouts em <b>duas dimensões</b>: linhas e colunas ao mesmo tempo. Use Flexbox para componentes em uma direção (menus, barras) e Grid para a estrutura da página e para grades de cards.</p>
${demo({ css: `.grade {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
${caixas}`, html: '<div class="grade">\n  <div class="item">1</div><div class="item">2</div><div class="item">3</div>\n  <div class="item">4</div><div class="item">5</div><div class="item">6</div>\n</div>', altura: 100 })}
<h3>A unidade fr</h3>
<p><code>fr</code> é uma <b>fração do espaço livre</b>, depois de descontadas as colunas fixas e os gaps:</p>
<pre class="code">width: 800px;  grid-template-columns: 200px 1fr 2fr;  gap: 20px;

livre = 800 − 200 − 2×20 = 560px   →   1fr = 560 ÷ 3 ≈ 186,7px
colunas: 200px | 186,7px | 373,3px</pre>
<h3>Funções úteis</h3>
${S(`grid-template-columns: repeat(4, 1fr);                 /* 4 colunas iguais */
grid-template-columns: 250px 1fr;                       /* barra lateral + conteúdo */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
/* ↑ quantas colunas de no mínimo 200px couberem: responsivo sem media query! */`)}
<h3>Posicionando itens</h3>
${demo({ css: `.grade { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
${caixas}
.largo { grid-column: 1 / 3; }      /* da linha 1 até a 3 = 2 colunas */
.alto  { grid-row: span 2; }         /* ocupa 2 linhas */`, html: '<div class="grade">\n  <div class="item largo">grid-column: 1 / 3</div>\n  <div class="item alto">span 2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n</div>', altura: 100 })}
<p>As <b>linhas</b> da grade são numeradas a partir de 1: uma grade de 3 colunas tem as linhas 1, 2, 3 e 4. <code>grid-column: 1 / -1</code> ocupa a largura toda.</p>
<h3>grid-template-areas</h3>
${demo({ css: `.layout {
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-areas:
    "topo    topo"
    "lateral conteudo"
    "rodape  rodape";
  gap: 6px;
}
.layout > * { background: #e0e7ff; padding: 8px; border-radius: 6px; }
header { grid-area: topo; }
aside  { grid-area: lateral; }
main   { grid-area: conteudo; }
footer { grid-area: rodape; }`, html: '<div class="layout">\n  <header>Topo</header>\n  <aside>Menu</aside>\n  <main>Conteúdo</main>\n  <footer>Rodapé</footer>\n</div>', altura: 150 })}
<p>As áreas desenham o layout como um mapa: cada string é uma linha, e repetir um nome estende a área. Mudar o layout no celular vira só trocar o mapa dentro de uma media query.</p>
${dica('<code>place-items: center</code> num container grid centraliza os itens nos dois eixos de uma vez.')}
${resumo(['Grid = duas dimensões; Flexbox = uma.', 'fr divide o espaço livre depois das colunas fixas e dos gaps.', 'repeat(auto-fit, minmax(200px, 1fr)) cria grades responsivas.', 'grid-column/grid-row posicionam itens; grid-template-areas desenha o layout por nomes.'])}`,
        exercicios: [{ gen: 'c-grid-fr', n: 3 }, { gen: 'cc-grid', n: 1 }, { gen: 'c-seletor-combinado', n: 2 }]
      },
      {
        titulo: 'Design responsivo',
        html: `
<p>Um site responsivo se adapta a qualquer tela, do celular de 360px ao monitor de 2560px. Os três pilares são: a <b>meta viewport</b>, <b>layouts fluidos</b> (%, fr, flex) e <b>media queries</b>.</p>
${H('<meta name="viewport" content="width=device-width, initial-scale=1">')}
<p>Sem essa linha, o celular finge ter uma tela de cerca de 980px e mostra a página miniaturizada.</p>
<h3>Media queries</h3>
${S(`/* aplica o bloco só quando a janela tem 768px ou mais */
@media (min-width: 768px) {
  .colunas { flex-direction: row; }
}

/* só até 600px */
@media (max-width: 600px) {
  .menu { display: none; }
}

/* outras condições */
@media (orientation: landscape) { ... }
@media (prefers-color-scheme: dark) { ... }
@media print { .nao-imprimir { display: none; } }`)}
<h3>Mobile first</h3>
<p>A estratégia recomendada é escrever primeiro o CSS do celular (o mais simples, geralmente uma coluna) e ir <b>acrescentando</b> regras com <code>min-width</code> para telas maiores:</p>
${S(`.produtos { display: grid; gap: 16px; grid-template-columns: 1fr; }

@media (min-width: 600px) {
  .produtos { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1000px) {
  .produtos { grid-template-columns: repeat(4, 1fr); }
}`)}
<p>Com janela de 800px, valem a regra base e a de 600px, e a de 600px vence porque vem depois: 2 colunas. Com <code>max-width</code> (desktop first), a lógica se inverte: valem as consultas com breakpoint <b>maior ou igual</b> à largura.</p>
<table class="tabela">
  <tr><th>Breakpoints comuns</th><th>Dispositivo típico</th></tr>
  <tr><td>até 599px</td><td>Celulares</td></tr>
  <tr><td>600px – 899px</td><td>Tablets em pé</td></tr>
  <tr><td>900px – 1199px</td><td>Tablets deitados e notebooks pequenos</td></tr>
  <tr><td>1200px ou mais</td><td>Desktops</td></tr>
</table>
${dica('Não escolha breakpoints por aparelho: redimensione a janela e crie um breakpoint onde o layout começar a “quebrar”.')}
<h3>Imagens e textos fluidos</h3>
${S(`img { max-width: 100%; height: auto; }      /* nunca estoura o container */
.container { width: min(1100px, 100% - 2rem); margin-inline: auto; }
h1 { font-size: clamp(1.75rem, 4vw, 3rem); } /* cresce com a tela, com limites */`)}
${resumo(['Sempre inclua a meta viewport.', 'Mobile first: CSS base para o celular + media queries com min-width.', 'Se várias media queries valem, vence a última declarada.', 'Use max-width: 100% em imagens e unidades fluidas (%, fr, vw, clamp).'])}`,
        exercicios: [{ gen: 'c-media', n: 4 }, { gen: 'cc-responsivo', n: 1 }]
      },
      {
        titulo: 'Acessibilidade e SEO',
        html: `
<p><b>Acessibilidade</b> (a11y) é garantir que todas as pessoas consigam usar o site, inclusive quem usa leitor de tela, navega só pelo teclado, tem baixa visão ou daltonismo. No Brasil ela é exigida pela Lei Brasileira de Inclusão (Lei 13.146/2015), e as diretrizes internacionais são as <b>WCAG</b>.</p>
<h3>Checklist essencial</h3>
<ul>
  <li><b>HTML semântico:</b> botões são <code>&lt;button&gt;</code>, links são <code>&lt;a&gt;</code>, títulos em ordem.</li>
  <li><b>Textos alternativos</b> em todas as imagens com informação; <code>alt=""</code> nas decorativas.</li>
  <li><b>Rótulos</b> em todos os campos de formulário (<code>&lt;label&gt;</code>).</li>
  <li><b>Teclado:</b> tudo deve funcionar com Tab, Enter e Espaço, e o foco precisa ser visível. Nunca use <code>outline: none</code> sem um substituto.</li>
  <li><b>Contraste:</b> no mínimo 4,5:1 entre texto e fundo (3:1 para textos grandes).</li>
  <li><b>Não depender só da cor:</b> um erro de formulário deve ter também ícone ou texto.</li>
  <li><b>Idioma:</b> <code>&lt;html lang="pt-BR"&gt;</code>.</li>
</ul>
${H(`<!-- foco visível e personalizado -->
<style>
  a:focus-visible, button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
</style>

<!-- botão só com ícone precisa de nome acessível -->
<button aria-label="Fechar janela">✕</button>

<!-- menu com a página atual indicada -->
<nav aria-label="Principal">
  <ul>
    <li><a href="/" aria-current="page">Início</a></li>
    <li><a href="/cursos">Cursos</a></li>
  </ul>
</nav>`)}
<h3>ARIA com moderação</h3>
<p>Os atributos ARIA (<code>aria-label</code>, <code>aria-hidden</code>, <code>aria-expanded</code>, <code>role</code>...) complementam o HTML quando não há elemento nativo adequado. A primeira regra do ARIA é: <b>se existe um elemento HTML que já faz isso, use o elemento</b>.</p>
<h3>SEO: ser encontrado</h3>
${H(`<head>
  <title>Curso de CSS Grid do Zero | Kovex Estudos</title>
  <meta name="description" content="Aprenda CSS Grid com exemplos práticos e exercícios corrigidos automaticamente.">
  <link rel="canonical" href="https://exemplo.com/cursos/css-grid">
  <!-- prévia ao compartilhar em redes sociais (Open Graph) -->
  <meta property="og:title" content="Curso de CSS Grid do Zero">
  <meta property="og:image" content="https://exemplo.com/capa-grid.jpg">
</head>`)}
<ul>
  <li><code>&lt;title&gt;</code> único e descritivo em cada página (até ~60 caracteres).</li>
  <li><code>meta description</code> com um resumo atraente (até ~155 caracteres).</li>
  <li>Um <code>h1</code> claro, títulos hierárquicos e texto de qualidade.</li>
  <li>URLs legíveis, links com textos descritivos, imagens com alt.</li>
  <li>Velocidade e versão mobile também contam para o ranqueamento.</li>
</ul>
${dica('Acessibilidade e SEO andam juntos: os buscadores “leem” a página de forma parecida com um leitor de tela.')}
${resumo(['Semântica, alt, labels, teclado, foco visível e contraste são a base da acessibilidade.', 'Use ARIA só quando o HTML nativo não resolver.', 'title, meta description, h1 e conteúdo de qualidade são a base do SEO.', 'Open Graph controla a prévia em redes sociais.'])}`,
        exercicios: [{ gen: 'h-acessibilidade', n: 3 }, { gen: 'h-seo', n: 2 }, { gen: 'hc-nav-acessivel', n: 1 }, { gen: 'hc-form-avancado', n: 1 }, { gen: 'hc-figura-details', n: 1 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
