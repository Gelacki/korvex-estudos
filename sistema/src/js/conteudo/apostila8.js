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
    id: 'apostila-08', trilha: 'web', nivel: 4, numero: 8,
    titulo: 'HTML5 e CSS3: Avançado',
    subtitulo: 'Variáveis e funções CSS, transform, transições e animações, seletores modernos, arquitetura de CSS e APIs do HTML5',
    arquivo: 'Apostila 08 - Avancado - HTML5 e CSS3 Avancado.pdf',
    linguagem: 'HTML5 e CSS3',
    apresentacao: `<p>Esta apostila reúne os recursos que deixam um front-end com cara profissional: <b>temas</b> com variáveis CSS, <b>tipografia fluida</b>, <b>microinterações</b> com transições e animações, os <b>seletores modernos</b> que reduzem a necessidade de JavaScript (<code>:has()</code>, <code>:is()</code>, <code>:where()</code>), organização do CSS em projetos grandes e os recursos nativos de mídia e interface do HTML5.</p>
      <p>Pré-requisitos: Apostilas 05 a 07, principalmente cascata, especificidade, Flexbox e Grid.</p>`,
    capitulos: [
      {
        titulo: 'Variáveis CSS e funções',
        html: `
<p>As <b>propriedades personalizadas</b> (custom properties), conhecidas como variáveis CSS, guardam valores reutilizáveis. São declaradas com dois hífens e lidas com <code>var()</code>:</p>
${demo({ css: `:root {
  --cor-primaria: #4f46e5;
  --raio: 10px;
  --espaco: 12px;
}
.botao {
  background: var(--cor-primaria);
  color: #fff; border: 0;
  border-radius: var(--raio);
  padding: var(--espaco) calc(var(--espaco) * 2);
}
.botao.perigo { --cor-primaria: #dc2626; }  /* redefine só aqui */`, html: '<button class="botao">Salvar</button>\n<button class="botao perigo">Excluir</button>', altura: 60 })}
<ul>
  <li>Variáveis declaradas em <code>:root</code> valem para a página inteira.</li>
  <li>Elas são <b>herdadas</b> e respeitam a cascata: redefinir em um elemento muda o valor para ele e seus descendentes.</li>
  <li><code>var(--nome, reserva)</code> usa o valor reserva quando a variável não existe.</li>
  <li>Diferente das variáveis de pré-processadores como o Sass, elas existem no navegador e podem ser alteradas em tempo real, inclusive por JavaScript e media queries.</li>
</ul>
<h3>Tema escuro com variáveis</h3>
${S(`:root {
  --fundo: #ffffff;
  --texto: #111827;
}
@media (prefers-color-scheme: dark) {
  :root {
    --fundo: #0f172a;
    --texto: #e5e7eb;
  }
}
body { background: var(--fundo); color: var(--texto); }`)}
<h3>Funções matemáticas</h3>
<table class="tabela">
  <tr><th>Função</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>calc()</code></td><td><code>width: calc(100% - 2rem)</code></td><td>Mistura unidades diferentes</td></tr>
  <tr><td><code>min()</code></td><td><code>width: min(600px, 100%)</code></td><td>O menor valor: nunca passa de 600px</td></tr>
  <tr><td><code>max()</code></td><td><code>padding: max(1rem, 3vw)</code></td><td>O maior valor: no mínimo 1rem</td></tr>
  <tr><td><code>clamp()</code></td><td><code>font-size: clamp(1rem, 2.5vw, 2rem)</code></td><td>Valor preferido limitado entre um mínimo e um máximo</td></tr>
</table>
<h3>clamp(): tipografia fluida</h3>
<pre class="code">font-size: clamp(16px, 4vw, 32px);

janela 300px  → 4vw = 12px  → abaixo do mínimo → 16px
janela 600px  → 4vw = 24px  → dentro dos limites → 24px
janela 1200px → 4vw = 48px  → acima do máximo  → 32px</pre>
${dica('Outras funções úteis: <code>aspect-ratio: 16 / 9</code> para manter proporções, e <code>color-mix(in srgb, var(--cor) 20%, white)</code> para gerar tons a partir de uma cor base.')}
${resumo(['Variáveis: --nome: valor; lidas com var(--nome, reserva).', 'São herdadas e podem ser redefinidas por escopo e em media queries.', 'calc mistura unidades; min, max e clamp criam valores fluidos com limites.'])}`,
        exercicios: [{ gen: 'c-variaveis', n: 4 }, { gen: 'c-clamp', n: 3 }, { gen: 'cc-variaveis', n: 1 }]
      },
      {
        titulo: 'Transform, transições e animações',
        html: `
<h3>transform</h3>
<p>Move, gira, escala e inclina elementos <b>sem afetar o layout</b> dos vizinhos:</p>
${demo({ css: `.item { display: inline-block; width: 70px; padding: 10px 0; margin: 14px; text-align: center; background: #c7d2fe; border-radius: 6px; }
.t1 { transform: translateY(-8px); }
.t2 { transform: rotate(15deg); }
.t3 { transform: scale(1.25); }
.t4 { transform: skewX(-12deg); }`, html: '<div class="item">normal</div><div class="item t1">translate</div><div class="item t2">rotate</div><div class="item t3">scale</div><div class="item t4">skew</div>', altura: 90 })}
<p>Funções podem ser combinadas, e a ordem importa: <code>transform: translateX(50px) rotate(45deg)</code>. O ponto de origem é ajustado com <code>transform-origin</code>.</p>
<h3>transition</h3>
<p>Anima a mudança de uma propriedade entre dois estados, por exemplo quando o <code>:hover</code> é ativado:</p>
${S(`.botao {
  background: #4f46e5;
  transition: background-color .3s ease, transform .3s ease;
  /*           propriedade      duração  curva    */
}
.botao:hover {
  background: #3730a3;
  transform: translateY(-2px);
}`)}
<p>A <code>transition</code> fica na regra normal, e não no <code>:hover</code>, para que a animação aconteça na ida e na volta. As curvas (<i>timing functions</i>) mais comuns são <code>ease</code>, <code>linear</code>, <code>ease-in</code>, <code>ease-out</code>, <code>ease-in-out</code> e <code>cubic-bezier()</code>.</p>
<h3>animation e @keyframes</h3>
<p>Animações rodam sozinhas, com quantos quadros-chave você quiser:</p>
${demo({ css: `@keyframes pulsar {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.15); opacity: .6; }
}
.notificacao {
  display: inline-block; width: 18px; height: 18px;
  border-radius: 50%; background: #dc2626;
  animation: pulsar 1.2s ease-in-out infinite;
}`, html: '<span class="notificacao"></span> Você tem novas mensagens', altura: 50 })}
<table class="tabela">
  <tr><th>Propriedade</th><th>Exemplo</th></tr>
  <tr><td><code>animation-name</code></td><td><code>pulsar</code></td></tr>
  <tr><td><code>animation-duration</code></td><td><code>1.2s</code></td></tr>
  <tr><td><code>animation-timing-function</code></td><td><code>linear</code>, <code>ease-in-out</code></td></tr>
  <tr><td><code>animation-delay</code></td><td><code>.5s</code></td></tr>
  <tr><td><code>animation-iteration-count</code></td><td><code>3</code>, <code>infinite</code></td></tr>
  <tr><td><code>animation-direction</code></td><td><code>alternate</code> (vai e volta)</td></tr>
  <tr><td><code>animation-fill-mode</code></td><td><code>forwards</code> (mantém o último quadro)</td></tr>
</table>
<h3>Desempenho e acessibilidade</h3>
<ul>
  <li>Prefira animar <code>transform</code> e <code>opacity</code>: o navegador as anima sem recalcular o layout. Animar <code>width</code>, <code>top</code> ou <code>margin</code> custa muito mais.</li>
  <li>Respeite quem configurou o sistema para reduzir movimento:</li>
</ul>
${S(`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}`)}
${resumo(['transform move, gira e escala sem afetar o layout.', 'transition anima mudanças de estado; coloque-a na regra normal.', 'animation + @keyframes cria animações independentes.', 'Anime transform e opacity e respeite prefers-reduced-motion.'])}`,
        exercicios: [{ gen: 'c-animacoes', n: 4 }, { gen: 'cc-transicao', n: 1 }, { gen: 'cc-animacao', n: 1 }]
      },
      {
        titulo: 'Seletores modernos e arquitetura de CSS',
        html: `
<h3>:is(), :where() e :not()</h3>
${S(`/* em vez de repetir... */
article h1, article h2, article h3 { line-height: 1.2; }
/* ...agrupe */
article :is(h1, h2, h3) { line-height: 1.2; }

/* :where() é igual, mas com especificidade ZERO: ótimo para estilos base */
:where(ul, ol)[class] { list-style: none; padding: 0; }

/* :not() exclui */
.menu a:not(.ativo) { opacity: .7; }`)}
<p>A especificidade de <code>:is()</code> e <code>:not()</code> é a do argumento <b>mais específico</b>; a de <code>:where()</code> é sempre (0, 0, 0).</p>
<h3>:has(): o seletor “pai”</h3>
<p>Por décadas o CSS não conseguia selecionar um elemento com base no que ele contém. O <code>:has()</code> resolve isso:</p>
${demo({ css: `.card { border: 2px solid #cbd5e1; padding: 8px; border-radius: 8px; margin-bottom: 6px; }
.card:has(img) { border-color: #4f46e5; }              /* cards que têm imagem */
label:has(input:checked) { font-weight: bold; color: #047857; }`, html: '<div class="card">Card só com texto</div>\n<div class="card"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'%3E%3Ccircle cx=\'8\' cy=\'8\' r=\'7\' fill=\'%234f46e5\'/%3E%3C/svg%3E" alt=""> Card com imagem</div>\n<label><input type="checkbox" checked> Opção marcada</label>', altura: 120 })}
<h3>Cascade layers (@layer)</h3>
<p>Camadas permitem definir a prioridade de blocos inteiros de CSS, independentemente da especificidade. A camada declarada por último vence:</p>
${S(`@layer reset, base, componentes, utilitarios;

@layer base        { a { color: blue; } }
@layer componentes { .menu a { color: black; } }
@layer utilitarios { .texto-vermelho { color: red; } }  /* vence mesmo com especificidade menor */`)}
<h3>Container queries</h3>
<p>Media queries olham para a janela; container queries olham para o <b>container</b>. Um mesmo componente pode se adaptar ao espaço onde foi colocado (barra lateral ou área principal):</p>
${S(`.area-do-card { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}`)}
<h3>Organizando CSS em projetos grandes</h3>
<p>A convenção <b>BEM</b> (Bloco, Elemento, Modificador) dá nomes previsíveis e mantém a especificidade baixa:</p>
${S(`.card { }                 /* bloco */
.card__titulo { }         /* elemento: parte do bloco */
.card__botao { }
.card--destaque { }       /* modificador: variação */`)}
${H(`<article class="card card--destaque">
  <h3 class="card__titulo">Plano Pro</h3>
  <button class="card__botao">Assinar</button>
</article>`)}
<ul>
  <li>Comece com um <b>reset</b> leve (box-sizing, margens) e estilos base.</li>
  <li>Centralize cores, espaçamentos e fontes em variáveis (<i>design tokens</i>).</li>
  <li>Use propriedades lógicas (<code>margin-inline</code>, <code>padding-block</code>) para suportar idiomas da direita para a esquerda.</li>
  <li>Evite ids, <code>!important</code> e seletores muito longos.</li>
</ul>
${resumo([':is agrupa; :where agrupa com especificidade zero; :not exclui.', ':has seleciona pelo conteúdo (o “seletor pai”).', '@layer controla a prioridade por camadas; @container adapta pelo tamanho do container.', 'BEM e design tokens mantêm o CSS previsível em projetos grandes.'])}`,
        exercicios: [{ gen: 'c-moderno', n: 4 }, { gen: 'c-cascata', n: 4 }, { gen: 'cc-grid-areas', n: 1 }]
      },
      {
        titulo: 'Multimídia e APIs do HTML5',
        html: `
<h3>Vídeo e áudio nativos</h3>
${H(`<video controls width="640" poster="capa.jpg" preload="metadata">
  <source src="aula.webm" type="video/webm">
  <source src="aula.mp4" type="video/mp4">
  <track kind="captions" srclang="pt" label="Português" src="aula.vtt" default>
  Seu navegador não suporta vídeo.
</video>

<audio controls src="podcast.mp3"></audio>`)}
<ul>
  <li>O navegador usa o primeiro <code>&lt;source&gt;</code> cujo formato suportar.</li>
  <li><code>&lt;track&gt;</code> adiciona legendas no formato WebVTT, essenciais para acessibilidade.</li>
  <li>Atributos úteis: <code>autoplay</code> (normalmente exige <code>muted</code>), <code>loop</code>, <code>muted</code>, <code>playsinline</code>.</li>
</ul>
<h3>Imagens responsivas</h3>
${H(`<!-- mesma imagem em vários tamanhos: o navegador escolhe -->
<img src="foto-800.jpg"
     srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
     sizes="(min-width: 900px) 50vw, 100vw"
     alt="Equipe reunida" loading="lazy" width="800" height="533">

<!-- imagens diferentes ou formatos modernos: <picture> -->
<picture>
  <source type="image/avif" srcset="banner.avif">
  <source media="(min-width: 768px)" srcset="banner-largo.jpg">
  <img src="banner-estreito.jpg" alt="Promoção de inverno">
</picture>`)}
<p><code>loading="lazy"</code> adia o carregamento de imagens fora da tela, o que deixa a página muito mais rápida.</p>
<h3>Componentes nativos de interface</h3>
${demo({ css: `details { border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; }
summary { cursor: pointer; font-weight: 600; }`, html: `<details>
  <summary>O curso tem certificado?</summary>
  <p>Sim, ao concluir todos os módulos.</p>
</details>
<label>Progresso: <progress value="70" max="100"></progress></label><br>
<label>Disco: <meter value="0.8" low="0.3" high="0.7" optimum="0.2">80%</meter></label>`, altura: 120 })}
${H(`<!-- janela modal nativa -->
<dialog id="confirmar">
  <h2>Tem certeza?</h2>
  <form method="dialog">
    <button value="nao">Cancelar</button>
    <button value="sim">Confirmar</button>
  </form>
</dialog>
<!-- abrir com JavaScript: document.getElementById('confirmar').showModal() -->

<!-- sugestões em um campo -->
<input list="linguagens" name="ling">
<datalist id="linguagens">
  <option value="HTML"><option value="CSS"><option value="JavaScript">
</datalist>`)}
<h3>Canvas, template e atributos data-*</h3>
${H(`<canvas id="grafico" width="400" height="200"></canvas>   <!-- desenho via JavaScript -->

<template id="modelo-card">                               <!-- HTML inerte, para clonar via JS -->
  <article class="card"><h3></h3></article>
</template>

<button data-produto-id="42" data-preco="19.90">Comprar</button>
<!-- no JS: botao.dataset.produtoId → "42";  no CSS: [data-preco] { } -->`)}
<h3>Carregamento de scripts</h3>
<table class="tabela">
  <tr><th>Forma</th><th>Comportamento</th></tr>
  <tr><td><code>&lt;script src="app.js"&gt;</code></td><td>Interrompe a leitura do HTML até baixar e executar</td></tr>
  <tr><td><code>&lt;script defer src="app.js"&gt;</code></td><td>Baixa em paralelo e executa depois que o HTML foi lido, na ordem (recomendado)</td></tr>
  <tr><td><code>&lt;script async src="analytics.js"&gt;</code></td><td>Baixa em paralelo e executa assim que chegar, sem ordem garantida</td></tr>
  <tr><td><code>&lt;script type="module"&gt;</code></td><td>Módulos ES; já se comportam como defer</td></tr>
</table>
${atencao('Recursos nativos (details, dialog, input types, validação) já vêm acessíveis e funcionam sem JavaScript. Antes de instalar uma biblioteca, verifique se o HTML já resolve.')}
${resumo(['video/audio com vários source e track para legendas.', 'srcset/sizes e picture servem a imagem certa; loading="lazy" adia as que estão fora da tela.', 'details, dialog, progress, meter e datalist são componentes nativos.', 'canvas desenha, template guarda HTML inerte, data-* guarda dados; prefira scripts com defer.'])}`,
        exercicios: [{ gen: 'h-apis', n: 3 }, { gen: 'h-midia', n: 2 }, { gen: 'hc-midia', n: 1 }, { gen: 'hc-picture', n: 1 }, { gen: 'hc-dialog', n: 1 }]
      }
    ]
  });
})(typeof window !== 'undefined' ? window : globalThis);
