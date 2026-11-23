/* Geradores de exercícios de HTML */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const W = KX.web;
  const c = W.c;

  const quizPares = (nivel, id, titulo, molde, pares, dica) => W.quizPares(nivel, 'html', id, titulo, molde, pares, dica);

  /* ========================== NÍVEL 1 ========================== */

  quizPares(1, 'h-tags', 'Para que serve cada tag', 'Qual tag é usada para %?', [
    ['criar um link para outra página', '<a>'],
    ['inserir uma imagem', '<img>'],
    ['escrever um parágrafo', '<p>'],
    ['o título principal da página (mais importante)', '<h1>'],
    ['criar uma lista não ordenada (com marcadores)', '<ul>'],
    ['criar uma lista numerada', '<ol>'],
    ['cada item de uma lista', '<li>'],
    ['forçar uma quebra de linha', '<br>'],
    ['marcar um texto como muito importante (negrito semântico)', '<strong>'],
    ['dar ênfase a um texto (itálico semântico)', '<em>'],
    ['criar uma tabela', '<table>'],
    ['criar uma linha de tabela', '<tr>'],
    ['criar uma célula de cabeçalho de tabela', '<th>'],
    ['criar um botão clicável', '<button>'],
    ['agrupar elementos sem significado especial (bloco genérico)', '<div>'],
    ['marcar um trecho de texto sem significado especial (em linha)', '<span>'],
    ['definir o título que aparece na aba do navegador', '<title>'],
    ['desenhar uma linha separadora temática', '<hr>']
  ], 'Pense no nome em inglês: a = anchor, p = paragraph, ul = unordered list...');

  quizPares(1, 'h-atributos', 'Atributos essenciais', 'Qual atributo é usado para %?', [
    ['definir o endereço de destino de um link', 'href'],
    ['indicar o arquivo de uma imagem', 'src'],
    ['descrever uma imagem para leitores de tela', 'alt', 'O [[alt]] também aparece se a imagem não carregar.'],
    ['abrir um link em nova aba (com o valor _blank)', 'target'],
    ['dar um identificador único a um elemento', 'id'],
    ['aplicar uma ou mais classes a um elemento (para o CSS)', 'class'],
    ['mostrar um texto de exemplo dentro de um campo vazio', 'placeholder'],
    ['ligar um <label> ao seu campo de formulário', 'for'],
    ['definir o idioma da página na tag <html>', 'lang'],
    ['exibir uma dica quando o mouse passa sobre o elemento', 'title'],
    ['tornar um campo de formulário obrigatório', 'required'],
    ['definir o tipo de um <input> (texto, e-mail, senha...)', 'type']
  ], 'Atributos ficam dentro da tag de abertura, no formato nome="valor".');

  W.quiz(1, 'html', 'h-estrutura', 'Estrutura do documento', [
    ['Qual é a declaração que indica um documento HTML5?', '<!DOCTYPE html>', ['<html5>', '<!HTML5>', '<doctype html5>', '<?html version="5"?>']],
    ['Onde deve ficar a tag [[<title>]]?', 'Dentro do <head>', ['Dentro do <body>', 'Antes do <html>', 'Depois do </html>', 'Dentro do <footer>']],
    ['Em qual parte do documento fica o conteúdo visível da página?', '<body>', ['<head>', '<meta>', '<title>', '<link>']],
    ['Qual tag define a codificação de caracteres (para acentos aparecerem corretamente)?', '<meta charset="UTF-8">', ['<charset>UTF-8</charset>', '<head encoding="UTF-8">', '<html utf8>', '<body charset="UTF-8">']],
    ['Qual destas tags NÃO precisa de tag de fechamento (é uma tag vazia)?', '<img>', ['<p>', '<a>', '<li>', '<div>']],
    ['Qual é a forma correta de escrever um comentário em HTML?', '<!-- comentário -->', ['// comentário', '/* comentário */', '# comentário', '<comment>comentário</comment>']],
    ['Quantos títulos [[<h1>]] é recomendado ter por página?', 'Apenas um', ['Nenhum', 'Um por parágrafo', 'Exatamente seis', 'Quantos quiser, sem impacto']],
    ['Quantos níveis de título (h1, h2, ...) existem no HTML?', '6', ['3', '4', '5', '8']],
    ['Como se liga um arquivo CSS externo à página?', '<link rel="stylesheet" href="estilo.css">', ['<style src="estilo.css">', '<css href="estilo.css">', '<script href="estilo.css">', '<import css="estilo.css">']],
    ['Qual tag deixa a página adaptada à largura de celulares?', '<meta name="viewport" content="width=device-width, initial-scale=1">', ['<meta mobile="true">', '<body responsive>', '<html device="mobile">', '<link rel="mobile">']]
  ]);

  KX.registrar({
    id: 'h-erro-linha', nivel: 1, categoria: 'html', titulo: 'Encontre o erro',
    gerar(r) {
      const T = r.pick(['Bem-vindo', 'Receitas', 'Meu Portfólio', 'Notícias', 'Contato']);
      const w = () => r.pick(['importante', 'novidade', 'aqui', 'detalhes', 'atenção', 'saiba mais']);
      const pg = r.pick(['sobre', 'contato', 'produtos', 'blog']);
      const img = r.pick(['foto', 'logo', 'banner', 'perfil']);
      const corretos = [
        () => `<h1>${T}</h1>`, () => `<h2>Seção de ${w()}</h2>`, () => `<p>Este é um parágrafo simples.</p>`,
        () => `<p>Texto com <strong>${w()}</strong> no meio.</p>`, () => `<a href="${pg}.html">Ver ${w()}</a>`,
        () => `<img src="${img}.jpg" alt="Imagem de ${img}">`, () => `<p>Leia <em>${w()}</em> com atenção.</p>`
      ];
      const erros = [
        ['fechamento', () => `<h2>Seção de ${w()}</h3>`, 'A tag foi aberta como <h2> mas fechada como </h3>. Abertura e fechamento devem ter o mesmo nome.'],
        ['aninhamento', () => `<p>Texto com <strong>${w()}</p></strong>`, 'As tags estão entrelaçadas: <strong> foi aberta dentro de <p>, então deve ser fechada antes de </p>. A última aberta é a primeira a ser fechada.'],
        ['alt', () => `<img src="${img}.jpg">`, 'A imagem não tem o atributo alt, obrigatório para acessibilidade (leitores de tela) e exibido se a imagem não carregar.'],
        ['aspas', () => `<a href="${pg}.html>Ver ${w()}</a>`, 'O valor do atributo href abriu aspas e não fechou: o correto é href="..." com as duas aspas.']
      ];
      const n = r.int(4, 6);
      const itens = Array.from({ length: n }, () => r.pick(corretos)());
      const pos = r.int(0, n - 1);
      const [, fnErro, expl] = r.pick(erros);
      itens[pos] = fnErro();
      const linhas = ['<body>', ...itens.map((l) => '  ' + l), '</body>'];
      const numerado = linhas.map((l, i) => `${String(i + 1).padStart(2)}  ${l}`).join('\n');
      return {
        enunciado: `<p>O código abaixo tem <b>exatamente um erro</b>. Em qual linha ele está?</p>${U.codigo(numerado, 'html')}`,
        resposta: String(pos + 2),
        dica: 'Confira se cada tag fecha com o mesmo nome, se a ordem de fechamento está certa, se toda imagem tem alt e se as aspas dos atributos estão fechadas.',
        explicacao: `<p>Linha <b>${pos + 2}</b>: ${U.esc(expl)}</p>`
      };
    }
  });

  const temas = {
    titulos: ['Minha Primeira Página', 'Receitas da Vovó', 'Diário de Estudos', 'Clube do Livro', 'Guia de Viagem', 'Oficina de Código'],
    frases: ['Aqui eu registro tudo o que aprendo sobre a web.', 'As melhores receitas caseiras em um só lugar.', 'Um espaço para compartilhar boas leituras.', 'Dicas práticas para viajar gastando pouco.', 'Aprender HTML é o primeiro passo para criar sites.']
  };

  W.pratico({
    id: 'hc-titulo-paragrafo', nivel: 1, categoria: 'html', titulo: 'Título e parágrafo',
    cfg: (r) => ({ t: r.pick(temas.titulos), p: r.pick(temas.frases) }),
    enunciado: (k) => `<p>Crie uma página com um título principal e um parágrafo logo abaixo.</p>`,
    checks: (k) => [
      { tipo: 'conta', sel: 'h1', n: 1, desc: `Exatamente um ${c('<h1>')}` },
      { tipo: 'texto', sel: 'h1', texto: k.t, desc: `O ${c('<h1>')} tem o texto “${U.esc(k.t)}”` },
      { tipo: 'texto', sel: 'p', texto: k.p, desc: `Um ${c('<p>')} com o texto “${U.esc(k.p)}”` }
    ],
    solucao: (k) => `<h1>${k.t}</h1>\n<p>${k.p}</p>`,
    dica: 'Toda tag de conteúdo tem abertura e fechamento: <h1>...</h1>.'
  });

  W.pratico({
    id: 'hc-link', nivel: 1, categoria: 'html', titulo: 'Link externo',
    cfg: (r) => r.pick([
      { url: 'https://developer.mozilla.org', txt: 'Documentação MDN' },
      { url: 'https://www.w3.org', txt: 'Site do W3C' },
      { url: 'https://web.dev', txt: 'Aprenda no web.dev' },
      { url: 'https://caniuse.com', txt: 'Can I use' }
    ]),
    enunciado: () => '<p>Crie um link que leve a um site externo e abra em uma <b>nova aba</b>, com a boa prática de segurança <code>rel="noopener"</code>.</p>',
    checks: (k) => [
      { tipo: 'attr', sel: 'a', attr: 'href', valor: k.url, desc: `Um ${c('<a>')} com ${c(`href="${k.url}"`)}` },
      { tipo: 'texto', sel: 'a', texto: k.txt, desc: `O texto do link é “${U.esc(k.txt)}”` },
      { tipo: 'attr', sel: 'a', attr: 'target', valor: '_blank', desc: `Abre em nova aba: ${c('target="_blank"')}` },
      { tipo: 'attr', sel: 'a', attr: 'rel', valor: 'noopener', contem: true, desc: `Tem ${c('rel="noopener"')}` }
    ],
    solucao: (k) => `<a href="${k.url}" target="_blank" rel="noopener">${k.txt}</a>`,
    dica: 'Os atributos ficam na tag de abertura: <a href="..." target="..." rel="...">texto</a>'
  });

  W.pratico({
    id: 'hc-imagem', nivel: 1, categoria: 'html', titulo: 'Imagem acessível',
    cfg: (r) => ({ ...r.pick([{ src: 'gato.jpg', alt: 'Gato laranja dormindo no sofá' }, { src: 'praia.jpg', alt: 'Praia com areia branca e mar azul' }, { src: 'bolo.jpg', alt: 'Bolo de chocolate com morangos' }, { src: 'montanha.jpg', alt: 'Montanha coberta de neve ao amanhecer' }]), w: r.pick([200, 240, 300, 320, 400]) }),
    enunciado: () => '<p>Insira uma imagem com texto alternativo e largura definida pelo atributo <code>width</code>.</p>',
    checks: (k) => [
      { tipo: 'attr', sel: 'img', attr: 'src', valor: k.src, desc: `${c('<img>')} com ${c(`src="${k.src}"`)}` },
      { tipo: 'attr', sel: 'img', attr: 'alt', valor: k.alt, desc: `Texto alternativo: ${c(`alt="${k.alt}"`)}` },
      { tipo: 'attr', sel: 'img', attr: 'width', valor: String(k.w), desc: `Largura: ${c(`width="${k.w}"`)}` }
    ],
    solucao: (k) => `<img src="${k.src}" alt="${k.alt}" width="${k.w}">`,
    dica: '<img> é uma tag vazia: não tem </img>.'
  });

  W.pratico({
    id: 'hc-lista', nivel: 1, categoria: 'html', titulo: 'Lista',
    cfg: (r) => {
      const t = r.pick([
        { nome: 'frutas', itens: ['Maçã', 'Banana', 'Uva', 'Manga', 'Laranja', 'Abacaxi'] },
        { nome: 'passos para fazer café', itens: ['Ferver a água', 'Colocar o filtro', 'Adicionar o pó', 'Despejar a água', 'Servir'], ordenada: true },
        { nome: 'linguagens da web', itens: ['HTML', 'CSS', 'JavaScript', 'SVG', 'WebAssembly'] },
        { nome: 'etapas de um projeto', itens: ['Planejar', 'Prototipar', 'Desenvolver', 'Testar', 'Publicar'], ordenada: true }
      ]);
      const n = r.int(3, 5);
      return { nome: t.nome, tag: t.ordenada ? 'ol' : 'ul', itens: t.ordenada ? t.itens.slice(0, n) : r.sample(t.itens, n) };
    },
    enunciado: (k) => `<p>Crie uma lista <b>${k.tag === 'ol' ? 'ordenada (numerada)' : 'não ordenada (com marcadores)'}</b> de ${k.nome}, com os itens na ordem indicada.</p>`,
    checks: (k) => [
      { tipo: 'conta', sel: `${k.tag} > li`, n: k.itens.length, desc: `Um ${c(`<${k.tag}>`)} com ${k.itens.length} itens ${c('<li>')}` },
      ...k.itens.map((it, i) => ({ tipo: 'texto', sel: `${k.tag} > li:nth-child(${i + 1})`, texto: it, desc: `Item ${i + 1}: “${U.esc(it)}”` }))
    ],
    solucao: (k) => `<${k.tag}>\n${k.itens.map((i) => `  <li>${i}</li>`).join('\n')}\n</${k.tag}>`,
    dica: 'ul = lista com marcadores, ol = lista numerada; cada item fica em um <li>.'
  });

  /* ========================== NÍVEL 2 ========================== */

  quizPares(2, 'h-semantica', 'HTML semântico', 'Qual elemento semântico representa %?', [
    ['o cabeçalho da página ou de uma seção', '<header>'],
    ['o rodapé da página', '<footer>'],
    ['um bloco de links de navegação principal', '<nav>'],
    ['o conteúdo principal e único da página', '<main>'],
    ['um conteúdo independente, como um post ou notícia', '<article>'],
    ['um agrupamento temático de conteúdo, normalmente com título', '<section>'],
    ['um conteúdo complementar, como uma barra lateral', '<aside>'],
    ['uma imagem ou diagrama acompanhado de legenda', '<figure>'],
    ['a legenda de uma figura', '<figcaption>'],
    ['uma data ou horário legível por máquinas', '<time>'],
    ['um texto destacado/marcado como relevante', '<mark>'],
    ['um bloco que pode ser expandido e recolhido', '<details>']
  ], 'Elementos semânticos descrevem o significado do conteúdo, não a aparência.');

  quizPares(2, 'h-inputs', 'Tipos de input', 'Qual valor de [[type]] no [[<input>]] serve para %?', [
    ['digitar um e-mail (com validação automática)', 'email'],
    ['digitar uma senha (caracteres ocultos)', 'password'],
    ['escolher uma data em um calendário', 'date'],
    ['digitar apenas números (com setas)', 'number'],
    ['marcar várias opções independentes', 'checkbox'],
    ['escolher apenas uma opção dentro de um grupo', 'radio'],
    ['escolher um valor deslizando um controle', 'range'],
    ['escolher uma cor', 'color'],
    ['enviar um arquivo', 'file'],
    ['digitar um telefone', 'tel'],
    ['digitar um endereço de site', 'url'],
    ['um campo de busca', 'search']
  ], 'O type muda o teclado no celular e a validação feita pelo navegador.');

  W.quiz(2, 'html', 'h-tabelas-forms', 'Tabelas e formulários', [
    ['Qual atributo faz uma célula ocupar duas colunas?', 'colspan="2"', ['rowspan="2"', 'span="2"', 'cols="2"', 'merge="2"']],
    ['Qual atributo faz uma célula ocupar duas linhas?', 'rowspan="2"', ['colspan="2"', 'rows="2"', 'height="2"', 'span-row="2"']],
    ['Qual tag agrupa as linhas de cabeçalho de uma tabela?', '<thead>', ['<th>', '<header>', '<head>', '<caption>']],
    ['Qual tag define o título (legenda) de uma tabela?', '<caption>', ['<title>', '<legend>', '<th>', '<summary>']],
    ['Qual atributo do [[<form>]] define para onde os dados são enviados?', 'action', ['method', 'href', 'src', 'target']],
    ['Qual método HTTP deve ser usado para enviar senhas em um formulário?', 'POST', ['GET', 'PUT', 'SEND', 'FETCH']],
    ['O que é necessário para que vários [[radio]] funcionem como um grupo (só um marcado)?', 'Terem o mesmo atributo name', ['Terem o mesmo id', 'Estarem dentro de um <ul>', 'Terem o atributo group', 'Terem o mesmo value']],
    ['Qual atributo dos campos define a chave com que o valor é enviado ao servidor?', 'name', ['id', 'value', 'key', 'label']],
    ['Qual tag cria uma caixa de texto com várias linhas?', '<textarea>', ['<input type="multiline">', '<text>', '<input rows="5">', '<p contenteditable>']],
    ['Qual tag agrupa campos relacionados de um formulário, com um título?', '<fieldset> com <legend>', ['<div> com <h2>', '<section> com <caption>', '<group> com <title>', '<form> com <label>']],
    ['Qual tag cria uma lista suspensa de opções?', '<select>', ['<list>', '<dropdown>', '<input type="list">', '<options>']]
  ]);

  KX.registrar({
    id: 'h-filhos', nivel: 2, categoria: 'html', titulo: 'Árvore do documento (DOM)',
    gerar(r) {
      const raiz = W.gerarArvore(r);
      const candidatos = W.nos(raiz).filter((n) => n.filhos.length >= 2);
      const alvo = r.pick(candidatos);
      alvo.id = 'alvo';
      W.nos(raiz).forEach((n) => { if (n !== alvo && n.id === 'alvo') n.id = null; });
      const descend = r.bool();
      const resp = descend ? W.nos(alvo).length : alvo.filhos.length;
      return {
        enunciado: `<p>Observe o HTML abaixo. Quantos <b>${descend ? 'descendentes (filhos, netos...)' : 'filhos diretos'}</b> tem o elemento com ${c('id="alvo"')}?</p>${U.codigo(W.arvoreHTML(raiz), 'html')}`,
        resposta: String(resp),
        dica: descend ? 'Conte todos os elementos dentro dele, em qualquer nível.' : 'Filhos diretos são os elementos exatamente um nível abaixo (indentação logo à direita).',
        explicacao: `<p>O elemento ${c('#alvo')} (${c('<' + alvo.tag + '>')}) tem ${alvo.filhos.length} filho(s) direto(s) e ${W.nos(alvo).length} descendente(s) no total. Resposta: <b>${resp}</b>.</p>`
      };
    }
  });

  W.pratico({
    id: 'hc-tabela', nivel: 2, categoria: 'html', titulo: 'Tabela de dados',
    cfg: (r) => {
      const t = r.pick([
        { cap: 'Estoque da loja', cols: ['Produto', 'Preço', 'Quantidade'], gerar: () => [r.pick(['Caneta', 'Caderno', 'Mochila', 'Régua', 'Lápis', 'Borracha']), `R$ ${r.int(2, 90)},00`, String(r.int(1, 50))] },
        { cap: 'Notas da turma', cols: ['Aluno', 'Nota 1', 'Nota 2'], gerar: () => [r.pick(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Fábio']), String(r.int(4, 10)), String(r.int(4, 10))] },
        { cap: 'Agenda da semana', cols: ['Dia', 'Atividade', 'Horário'], gerar: () => [r.pick(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']), r.pick(['Inglês', 'Academia', 'Estudo de CSS', 'Reunião']), `${r.int(7, 20)}h`] }
      ]);
      const n = r.int(2, 3);
      const usados = new Set();
      const linhas = [];
      while (linhas.length < n) { const l = t.gerar(); if (!usados.has(l[0])) { usados.add(l[0]); linhas.push(l); } }
      return { cap: t.cap, cols: t.cols, linhas };
    },
    enunciado: (k) => `<p>Monte uma tabela com legenda, cabeçalho em ${c('<thead>')} e os dados em ${c('<tbody>')}:</p>
      <table class="tv"><tr>${k.cols.map((x) => `<th>${x}</th>`).join('')}</tr>${k.linhas.map((l) => `<tr>${l.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('')}</table>`,
    checks: (k) => [
      { tipo: 'texto', sel: 'table caption', texto: k.cap, desc: `Legenda (${c('<caption>')}): “${k.cap}”` },
      { tipo: 'conta', sel: 'table thead th', n: k.cols.length, desc: `${k.cols.length} células ${c('<th>')} dentro de ${c('<thead>')}` },
      { tipo: 'texto', sel: 'thead th:nth-child(2)', texto: k.cols[1], desc: `A segunda coluna se chama “${k.cols[1]}”` },
      { tipo: 'conta', sel: 'table tbody tr', n: k.linhas.length, desc: `${k.linhas.length} linhas ${c('<tr>')} dentro de ${c('<tbody>')}` },
      { tipo: 'texto', sel: `tbody tr:nth-child(${k.linhas.length}) td:nth-child(1)`, texto: k.linhas[k.linhas.length - 1][0], desc: `A última linha começa com “${k.linhas[k.linhas.length - 1][0]}”` }
    ],
    solucao: (k) => `<table>\n  <caption>${k.cap}</caption>\n  <thead>\n    <tr>${k.cols.map((x) => `<th>${x}</th>`).join('')}</tr>\n  </thead>\n  <tbody>\n${k.linhas.map((l) => `    <tr>${l.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('\n')}\n  </tbody>\n</table>`,
    dica: 'Estrutura: <table> → <caption>, <thead> → <tr> → <th>, <tbody> → <tr> → <td>.'
  });

  W.pratico({
    id: 'hc-formulario', nivel: 2, categoria: 'html', titulo: 'Formulário de login',
    cfg: (r) => ({ acao: r.pick(['/login', '/entrar', '/acesso']), min: r.pick([6, 8, 10]), botao: r.pick(['Entrar', 'Acessar', 'Fazer login']) }),
    enunciado: (k) => `<p>Crie um formulário de login que envie os dados para <code>${k.acao}</code> usando o método POST.</p>`,
    checks: (k) => [
      { tipo: 'attr', sel: 'form', attr: 'action', valor: k.acao, desc: `${c('<form>')} com ${c(`action="${k.acao}"`)}` },
      { tipo: 'attr', sel: 'form', attr: 'method', valor: 'post', desc: `Método ${c('method="post"')}` },
      { tipo: 'existe', sel: 'form input[type="email"]#email[name="email"][required]', desc: `Campo de e-mail: ${c('type="email"')}, ${c('id="email"')}, ${c('name="email"')} e obrigatório (${c('required')})` },
      { tipo: 'existe', sel: 'label[for="email"]', desc: `Um ${c('<label>')} ligado ao campo pelo ${c('for="email"')}` },
      { tipo: 'existe', sel: `form input[type="password"][name="senha"][minlength="${k.min}"]`, desc: `Campo de senha com ${c('name="senha"')} e no mínimo ${k.min} caracteres (${c(`minlength="${k.min}"`)})` },
      { tipo: 'texto', sel: 'form button[type="submit"]', texto: k.botao, desc: `Botão de envio (${c('type="submit"')}) com o texto “${k.botao}”` }
    ],
    solucao: (k) => `<form action="${k.acao}" method="post">\n  <label for="email">E-mail</label>\n  <input type="email" id="email" name="email" required>\n\n  <label for="senha">Senha</label>\n  <input type="password" id="senha" name="senha" minlength="${k.min}" required>\n\n  <button type="submit">${k.botao}</button>\n</form>`,
    dica: 'O for do label deve ser igual ao id do campo. O name é a chave enviada ao servidor.'
  });

  W.pratico({
    id: 'hc-semantica', nivel: 2, categoria: 'html', titulo: 'Estrutura semântica',
    cfg: (r) => ({ site: r.pick(['Blog do Dev', 'Café & Código', 'Portal Web', 'Notas de Estudo']), n: r.int(2, 4), post: r.pick(['Aprendendo Flexbox', 'Meu primeiro site', 'Dicas de HTML semântico', 'Por que estudar CSS']), ano: r.int(2024, 2026) }),
    enunciado: (k) => `<p>Monte o esqueleto semântico de um blog: cabeçalho com o nome do site e o menu, conteúdo principal com um artigo, e rodapé.</p>`,
    checks: (k) => [
      { tipo: 'texto', sel: 'header h1', texto: k.site, desc: `${c('<header>')} contendo um ${c('<h1>')} “${k.site}”` },
      { tipo: 'conta', sel: 'header nav a', n: k.n, desc: `Um ${c('<nav>')} dentro do header com ${k.n} links` },
      { tipo: 'texto', sel: 'main article h2', texto: k.post, desc: `${c('<main>')} com um ${c('<article>')} cujo ${c('<h2>')} é “${k.post}”` },
      { tipo: 'existe', sel: 'main article p', desc: `O artigo tem pelo menos um parágrafo` },
      { tipo: 'texto', sel: 'footer p', texto: `© ${k.ano} ${k.site}`, desc: `${c('<footer>')} com o parágrafo “© ${k.ano} ${k.site}”` }
    ],
    solucao: (k) => `<header>\n  <h1>${k.site}</h1>\n  <nav>\n${['Início', 'Artigos', 'Sobre', 'Contato'].slice(0, k.n).map((x) => `    <a href="#">${x}</a>`).join('\n')}\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>${k.post}</h2>\n    <p>Conteúdo do artigo...</p>\n  </article>\n</main>\n<footer>\n  <p>© ${k.ano} ${k.site}</p>\n</footer>`,
    dica: 'header, nav, main, article e footer funcionam como divs, mas com significado.'
  });

  /* ========================== NÍVEL 3 ========================== */

  W.quiz(3, 'html', 'h-acessibilidade', 'Acessibilidade', [
    ['Qual é o texto alternativo mais adequado para uma foto decorativa, sem informação?', 'alt="" (vazio)', ['Remover o atributo alt', 'alt="imagem"', 'alt="foto decorativa.jpg"', 'title="decoração"']],
    ['Por que usar [[<button>]] em vez de [[<div onclick>]] para ações?', 'O botão já é focável pelo teclado e anunciado por leitores de tela', ['Porque div não aceita cliques', 'Porque o botão carrega mais rápido', 'Porque div não pode ter texto', 'Não há diferença']],
    ['Para que serve o atributo [[aria-label]]?', 'Dar um nome acessível a um elemento sem texto visível', ['Mudar a cor do texto', 'Traduzir a página', 'Criar uma dica visual', 'Validar formulários']],
    ['O que [[aria-hidden="true"]] faz?', 'Esconde o elemento dos leitores de tela', ['Esconde o elemento visualmente', 'Desabilita cliques', 'Remove o elemento do HTML', 'Torna o elemento obrigatório']],
    ['Qual a ordem correta de títulos em uma página?', 'h1, depois h2, depois h3, sem pular níveis', ['Qualquer ordem, conforme o tamanho desejado', 'Vários h1 em sequência', 'Começar por h3 para textos menores', 'Usar só h4 e h5']],
    ['Por que o atributo [[lang="pt-BR"]] na tag [[<html>]] é importante?', 'Leitores de tela usam a pronúncia correta do idioma', ['Ativa a tradução automática do CSS', 'Melhora a velocidade do site', 'Define a moeda da página', 'É obrigatório para usar acentos']],
    ['Qual atributo indica, em um menu, o link da página atual?', 'aria-current="page"', ['aria-active="true"', 'class="current"', 'selected', 'aria-page="this"']],
    ['Qual é a forma mais acessível de associar um rótulo a um campo?', '<label for="id-do-campo">', ['Um <p> acima do campo', 'O atributo placeholder', 'Um <span> ao lado', 'O atributo title']],
    ['Qual atributo coloca um elemento não interativo na ordem de navegação pelo Tab?', 'tabindex="0"', ['tabindex="-1"', 'focus="true"', 'aria-tab', 'order="1"']]
  ]);

  W.quiz(3, 'html', 'h-seo', 'SEO e metadados', [
    ['Qual meta tag define o resumo exibido pelo Google nos resultados?', '<meta name="description" content="...">', ['<meta name="summary">', '<meta name="keywords">', '<title description>', '<meta google="...">']],
    ['Qual tag é a mais importante para SEO dentro do [[<head>]]?', '<title>', ['<meta charset>', '<link rel="icon">', '<base>', '<style>']],
    ['Para que servem as meta tags [[og:title]], [[og:image]]...?', 'Definir a prévia ao compartilhar o link em redes sociais', ['Otimizar imagens', 'Configurar o Google Analytics', 'Bloquear robôs', 'Traduzir a página']],
    ['O que [[<link rel="canonical">]] informa aos buscadores?', 'Qual é a URL oficial de um conteúdo duplicado', ['O ícone do site', 'A folha de estilos principal', 'A página inicial', 'O idioma da página']],
    ['Qual meta tag impede que uma página apareça nos buscadores?', '<meta name="robots" content="noindex">', ['<meta name="hidden">', '<meta name="google" content="off">', '<meta noseo>', '<meta name="index" content="false">']],
    ['Qual tag define o ícone que aparece na aba do navegador?', '<link rel="icon" href="favicon.ico">', ['<meta icon="favicon.ico">', '<img favicon>', '<icon src="favicon.ico">', '<title icon="favicon.ico">']]
  ]);

  W.pratico({
    id: 'hc-form-avancado', nivel: 3, categoria: 'html', titulo: 'Formulário de inscrição',
    cfg: (r) => ({
      legenda: r.pick(['Dados da inscrição', 'Cadastro no curso', 'Inscrição no evento']),
      opcoes: r.sample(['HTML', 'CSS', 'JavaScript', 'Acessibilidade', 'Design', 'Git'], r.int(3, 4)),
      turnos: r.sample(['manha', 'tarde', 'noite'], r.int(2, 3)),
      linhas: r.pick([3, 4, 5, 6])
    }),
    enunciado: (k) => `<p>Crie um formulário com os campos agrupados em um ${c('<fieldset>')}: lista suspensa de cursos, escolha do turno com botões de rádio e um campo de observações.</p>`,
    checks: (k) => [
      { tipo: 'texto', sel: 'fieldset legend', texto: k.legenda, desc: `${c('<fieldset>')} com ${c('<legend>')} “${k.legenda}”` },
      { tipo: 'conta', sel: 'select#curso option', n: k.opcoes.length, desc: `${c('<select id="curso">')} com ${k.opcoes.length} opções: ${k.opcoes.join(', ')}` },
      { tipo: 'texto', sel: 'select#curso option:first-child', texto: k.opcoes[0], desc: `A primeira opção é “${k.opcoes[0]}”` },
      { tipo: 'conta', sel: 'input[type="radio"][name="turno"]', n: k.turnos.length, desc: `${k.turnos.length} botões de rádio com ${c('name="turno"')} (valores: ${k.turnos.join(', ')})` },
      { tipo: 'existe', sel: `input[type="radio"][name="turno"][value="${k.turnos[0]}"]`, desc: `Um rádio com ${c(`value="${k.turnos[0]}"`)}` },
      { tipo: 'attr', sel: 'textarea#obs', attr: 'rows', valor: String(k.linhas), desc: `${c('<textarea id="obs">')} com ${c(`rows="${k.linhas}"`)}` }
    ],
    solucao: (k) => `<form>\n  <fieldset>\n    <legend>${k.legenda}</legend>\n\n    <label for="curso">Curso</label>\n    <select id="curso" name="curso">\n${k.opcoes.map((o) => `      <option>${o}</option>`).join('\n')}\n    </select>\n\n    <p>Turno:</p>\n${k.turnos.map((t) => `    <label><input type="radio" name="turno" value="${t}"> ${t}</label>`).join('\n')}\n\n    <label for="obs">Observações</label>\n    <textarea id="obs" name="obs" rows="${k.linhas}"></textarea>\n  </fieldset>\n</form>`,
    dica: 'Rádios do mesmo grupo compartilham o name; cada um tem seu value.'
  });

  W.pratico({
    id: 'hc-figura-details', nivel: 3, categoria: 'html', titulo: 'Figura e conteúdo expansível',
    cfg: (r) => ({ ...r.pick([{ src: 'grafico.png', alt: 'Gráfico de vendas por mês', leg: 'Vendas do primeiro semestre' }, { src: 'mapa.png', alt: 'Mapa do centro da cidade', leg: 'Como chegar ao evento' }, { src: 'diagrama.png', alt: 'Diagrama do box model', leg: 'O modelo de caixa do CSS' }]), pergunta: r.pick(['Qual o prazo de entrega?', 'Posso cancelar a inscrição?', 'O curso tem certificado?']) }),
    enunciado: () => `<p>Crie uma figura com legenda e, abaixo, uma pergunta frequente que se expande ao clicar (sem JavaScript).</p>`,
    checks: (k) => [
      { tipo: 'attr', sel: 'figure img', attr: 'alt', valor: k.alt, desc: `${c('<figure>')} com ${c('<img>')} de ${c(`src="${k.src}"`)} e ${c(`alt="${k.alt}"`)}` },
      { tipo: 'attr', sel: 'figure img', attr: 'src', valor: k.src, desc: `A imagem usa ${c(`src="${k.src}"`)}` },
      { tipo: 'texto', sel: 'figure figcaption', texto: k.leg, desc: `${c('<figcaption>')} “${k.leg}”` },
      { tipo: 'texto', sel: 'details summary', texto: k.pergunta, desc: `${c('<details>')} com ${c('<summary>')} “${k.pergunta}”` },
      { tipo: 'existe', sel: 'details p', desc: `A resposta fica em um ${c('<p>')} dentro do details` }
    ],
    solucao: (k) => `<figure>\n  <img src="${k.src}" alt="${k.alt}">\n  <figcaption>${k.leg}</figcaption>\n</figure>\n\n<details>\n  <summary>${k.pergunta}</summary>\n  <p>Resposta da pergunta.</p>\n</details>`,
    dica: '<details> esconde o conteúdo; o <summary> é o texto clicável sempre visível.'
  });

  W.pratico({
    id: 'hc-nav-acessivel', nivel: 3, categoria: 'html', titulo: 'Menu acessível',
    cfg: (r) => { const itens = r.sample(['Início', 'Produtos', 'Serviços', 'Blog', 'Sobre', 'Contato'], r.int(3, 5)); return { itens, atual: r.pick(itens), label: r.pick(['Principal', 'Menu principal', 'Navegação do site']) }; },
    enunciado: (k) => `<p>Crie um menu de navegação acessível: ${c('<nav>')} com nome acessível, links dentro de uma lista e a indicação da página atual (“${k.atual}”).</p>`,
    checks: (k) => [
      { tipo: 'attr', sel: 'nav', attr: 'aria-label', valor: k.label, desc: `${c('<nav>')} com ${c(`aria-label="${k.label}"`)}` },
      { tipo: 'conta', sel: 'nav ul li a', n: k.itens.length, desc: `${k.itens.length} links, cada um em um ${c('<li>')} de um ${c('<ul>')}: ${k.itens.join(', ')}` },
      { tipo: 'conta', sel: 'nav a[aria-current="page"]', n: 1, desc: `Exatamente um link com ${c('aria-current="page"')}` },
      { tipo: 'texto', sel: 'nav a[aria-current="page"]', texto: k.atual, desc: `O link atual é “${k.atual}”` }
    ],
    solucao: (k) => `<nav aria-label="${k.label}">\n  <ul>\n${k.itens.map((i) => `    <li><a href="#"${i === k.atual ? ' aria-current="page"' : ''}>${i}</a></li>`).join('\n')}\n  </ul>\n</nav>`,
    dica: 'aria-current="page" avisa ao leitor de tela qual é a página em que o usuário está.'
  });

  /* ========================== NÍVEL 4 ========================== */

  W.quiz(4, 'html', 'h-apis', 'Recursos do HTML5', [
    ['Qual elemento cria uma área de desenho controlada por JavaScript?', '<canvas>', ['<svg>', '<draw>', '<paint>', '<graphic>']],
    ['Qual elemento cria uma janela modal nativa?', '<dialog>', ['<modal>', '<popup>', '<window>', '<alert>']],
    ['Qual elemento guarda um trecho de HTML que não é exibido, para ser clonado via JavaScript?', '<template>', ['<slot>', '<hidden>', '<script type="html">', '<noscript>']],
    ['Qual atributo faz uma imagem carregar só quando estiver perto de aparecer na tela?', 'loading="lazy"', ['defer', 'async', 'lazy="true"', 'preload="none"']],
    ['Qual elemento permite oferecer formatos ou tamanhos diferentes de imagem conforme a tela?', '<picture>', ['<figure>', '<img srcset-group>', '<media>', '<source-set>']],
    ['Como guardar dados personalizados em um elemento HTML?', 'Atributos data-*, como data-id="7"', ['Atributos custom-*', 'O atributo value em qualquer tag', 'Comentários HTML', 'Atributos x-*']],
    ['Qual atributo do [[<script>]] faz o script baixar em paralelo e rodar só depois do HTML ser lido?', 'defer', ['async', 'lazy', 'later', 'onload']],
    ['Qual elemento mostra o andamento de uma tarefa?', '<progress>', ['<meter>', '<loading>', '<bar>', '<status>']],
    ['Qual elemento representa uma medida dentro de um intervalo conhecido (ex.: uso de disco)?', '<meter>', ['<progress>', '<range>', '<gauge>', '<output>']],
    ['Qual atributo de [[<input>]] liga o campo a uma lista de sugestões em [[<datalist>]]?', 'list', ['datalist', 'options', 'suggest', 'for']]
  ]);

  W.quiz(4, 'html', 'h-midia', 'Áudio e vídeo', [
    ['Qual atributo exibe os botões de play, pausa e volume em um [[<video>]]?', 'controls', ['player', 'buttons', 'show', 'ui']],
    ['Qual atributo define a imagem mostrada antes do vídeo começar?', 'poster', ['thumbnail', 'cover', 'preview', 'image']],
    ['Para que serve a tag [[<track>]] dentro de um vídeo?', 'Adicionar legendas ou descrições (arquivos .vtt)', ['Definir a trilha sonora', 'Trocar o formato do vídeo', 'Medir o tempo assistido', 'Criar capítulos visuais']],
    ['Para um vídeo começar sozinho no navegador, além de autoplay ele geralmente precisa de:', 'muted', ['loop', 'controls', 'preload', 'poster']],
    ['Por que usar várias tags [[<source>]] dentro de [[<video>]]?', 'Oferecer formatos alternativos; o navegador usa o primeiro que suportar', ['Tocar vários vídeos ao mesmo tempo', 'Criar uma playlist', 'Melhorar o SEO', 'Dividir o vídeo em partes']],
    ['Qual atributo faz o áudio ou vídeo recomeçar ao terminar?', 'loop', ['repeat', 'restart', 'infinite', 'cycle']]
  ]);

  W.pratico({
    id: 'hc-midia', nivel: 4, categoria: 'html', titulo: 'Vídeo com legendas',
    cfg: (r) => ({ nome: r.pick(['aula-flexbox', 'tutorial-grid', 'apresentacao', 'demo-produto']), w: r.pick([480, 560, 640, 720]) }),
    enunciado: (k) => `<p>Insira o vídeo <code>${k.nome}.mp4</code> com controles, imagem de capa, um formato alternativo WebM e legendas em português.</p>`,
    checks: (k) => [
      { tipo: 'existe', sel: 'video[controls]', desc: `${c('<video>')} com o atributo ${c('controls')}` },
      { tipo: 'attr', sel: 'video', attr: 'width', valor: String(k.w), desc: `Largura ${c(`width="${k.w}"`)}` },
      { tipo: 'attr', sel: 'video', attr: 'poster', valor: `${k.nome}.jpg`, desc: `Capa ${c(`poster="${k.nome}.jpg"`)}` },
      { tipo: 'attr', sel: 'video source[type="video/mp4"]', attr: 'src', valor: `${k.nome}.mp4`, desc: `${c('<source>')} MP4: ${c(`src="${k.nome}.mp4" type="video/mp4"`)}` },
      { tipo: 'attr', sel: 'video source[type="video/webm"]', attr: 'src', valor: `${k.nome}.webm`, desc: `${c('<source>')} WebM: ${c(`src="${k.nome}.webm" type="video/webm"`)}` },
      { tipo: 'existe', sel: `video track[kind="captions"][srclang="pt"][src="${k.nome}.vtt"]`, desc: `Legendas: ${c(`<track kind="captions" srclang="pt" src="${k.nome}.vtt">`)}` }
    ],
    solucao: (k) => `<video controls width="${k.w}" poster="${k.nome}.jpg">\n  <source src="${k.nome}.webm" type="video/webm">\n  <source src="${k.nome}.mp4" type="video/mp4">\n  <track kind="captions" srclang="pt" label="Português" src="${k.nome}.vtt">\n  Seu navegador não suporta vídeo.\n</video>`,
    dica: 'As tags <source> e <track> ficam dentro de <video>.'
  });

  W.pratico({
    id: 'hc-picture', nivel: 4, categoria: 'html', titulo: 'Imagem responsiva',
    cfg: (r) => ({ bp: r.pick([600, 768, 900, 1024]), nome: r.pick(['banner', 'capa', 'destaque']), alt: r.pick(['Equipe reunida no escritório', 'Vista aérea da cidade', 'Notebook com código na tela']) }),
    enunciado: (k) => `<p>Use ${c('<picture>')} para mostrar <code>${k.nome}-grande.jpg</code> em telas a partir de ${k.bp}px e <code>${k.nome}-pequeno.jpg</code> nas menores. A imagem deve carregar de forma preguiçosa.</p>`,
    checks: (k) => [
      { tipo: 'existe', sel: `picture source[media="(min-width: ${k.bp}px)"][srcset="${k.nome}-grande.jpg"]`, desc: `${c('<source>')} com ${c(`media="(min-width: ${k.bp}px)"`)} e ${c(`srcset="${k.nome}-grande.jpg"`)}` },
      { tipo: 'attr', sel: 'picture img', attr: 'src', valor: `${k.nome}-pequeno.jpg`, desc: `${c('<img>')} padrão com ${c(`src="${k.nome}-pequeno.jpg"`)}` },
      { tipo: 'attr', sel: 'picture img', attr: 'alt', valor: k.alt, desc: `${c(`alt="${k.alt}"`)}` },
      { tipo: 'attr', sel: 'picture img', attr: 'loading', valor: 'lazy', desc: `Carregamento preguiçoso: ${c('loading="lazy"')}` }
    ],
    solucao: (k) => `<picture>\n  <source media="(min-width: ${k.bp}px)" srcset="${k.nome}-grande.jpg">\n  <img src="${k.nome}-pequeno.jpg" alt="${k.alt}" loading="lazy">\n</picture>`,
    dica: 'O <img> é obrigatório dentro de <picture> e é usado quando nenhum <source> se aplica.'
  });

  W.pratico({
    id: 'hc-dialog', nivel: 4, categoria: 'html', titulo: 'Janela modal nativa',
    cfg: (r) => ({ id: r.pick(['confirmar', 'aviso', 'sair']), titulo: r.pick(['Tem certeza?', 'Atenção', 'Deseja sair?']), botao: r.pick(['Fechar', 'Entendi', 'OK']) }),
    enunciado: (k) => `<p>Crie uma janela modal com ${c('<dialog>')}. O botão dentro dela deve fechá-la usando um formulário com ${c('method="dialog"')} (sem JavaScript). Para a visualização, deixe a janela aberta com o atributo ${c('open')}.</p>`,
    checks: (k) => [
      { tipo: 'existe', sel: `dialog#${k.id}`, desc: `${c(`<dialog id="${k.id}">`)}` },
      { tipo: 'existe', sel: 'dialog[open]', desc: `O dialog tem o atributo ${c('open')}` },
      { tipo: 'texto', sel: 'dialog h2', texto: k.titulo, desc: `Título ${c('<h2>')} “${k.titulo}”` },
      { tipo: 'attr', sel: 'dialog form', attr: 'method', valor: 'dialog', desc: `${c('<form method="dialog">')} dentro do dialog` },
      { tipo: 'texto', sel: 'dialog form button', texto: k.botao, desc: `Botão “${k.botao}” dentro do form` }
    ],
    solucao: (k) => `<dialog id="${k.id}" open>\n  <h2>${k.titulo}</h2>\n  <p>Mensagem da janela.</p>\n  <form method="dialog">\n    <button>${k.botao}</button>\n  </form>\n</dialog>`,
    dica: 'Com method="dialog", enviar o formulário fecha o <dialog> automaticamente.'
  });
})(typeof window !== 'undefined' ? window : globalThis);
