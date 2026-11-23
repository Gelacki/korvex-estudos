/* Geradores de exercícios de CSS */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const W = KX.web;
  const c = W.c;
  const css = (s) => U.codigo(s, 'css');
  const reg = (nivel, id, titulo, gerar) => KX.registrar({ id, nivel, categoria: 'css', titulo, gerar });
  const cores = (r, n) => r.sample(W.CORES, n);

  /* ========================== NÍVEL 1 ========================== */

  W.quizPares(1, 'css', 'c-propriedades', 'Propriedades básicas', 'Qual propriedade CSS é usada para %?', [
    ['mudar a cor do texto', 'color'],
    ['mudar a cor de fundo', 'background-color'],
    ['mudar o tamanho da fonte', 'font-size'],
    ['deixar o texto em negrito', 'font-weight'],
    ['trocar a família da fonte', 'font-family'],
    ['alinhar o texto ao centro', 'text-align'],
    ['criar espaço interno entre o conteúdo e a borda', 'padding'],
    ['criar espaço externo ao redor do elemento', 'margin'],
    ['arredondar os cantos', 'border-radius'],
    ['remover o sublinhado de um link', 'text-decoration'],
    ['definir o espaçamento entre as linhas do texto', 'line-height'],
    ['deixar o elemento semitransparente', 'opacity'],
    ['adicionar uma sombra à caixa', 'box-shadow'],
    ['transformar o texto em maiúsculas', 'text-transform']
  ], 'Os nomes das propriedades são palavras em inglês ligadas por hífen.');

  W.quiz(1, 'css', 'c-sintaxe', 'Sintaxe do CSS', [
    ['Qual é a sintaxe correta de uma regra CSS?', 'p { color: red; }', ['p ( color = red )', '{ p: color red }', 'p: color { red };', '<p style> color: red </p>']],
    ['Como se seleciona os elementos com [[class="destaque"]]?', '.destaque', ['#destaque', 'destaque', '*destaque', '[destaque]']],
    ['Como se seleciona o elemento com [[id="topo"]]?', '#topo', ['.topo', 'topo', '@topo', '$topo']],
    ['Como se escreve um comentário em CSS?', '/* comentário */', ['// comentário', '<!-- comentário -->', '# comentário', '-- comentário']],
    ['Onde fica a tag [[<style>]] quando o CSS é escrito na própria página?', 'Dentro do <head>', ['Dentro do <title>', 'Depois de </html>', 'Dentro de cada <p>', 'Em um <div> no fim']],
    ['Qual destas formas aplica CSS direto em um elemento (estilo inline)?', '<p style="color: blue">', ['<p css="color: blue">', '<p class="color: blue">', '<p font="blue">', '<style p="blue">']],
    ['Qual é a forma recomendada de usar CSS em um site com várias páginas?', 'Um arquivo .css externo ligado com <link>', ['Estilo inline em cada tag', 'Uma tag <style> repetida em cada página', 'Atributos de cor no HTML', 'Imagens com o texto já formatado']],
    ['Qual unidade representa uma cor com transparência?', 'rgba(0, 0, 0, 0.5)', ['rgb(0, 0, 0, 50)', '#000000-50', 'hex(0, 0, 0, .5)', 'color(black, half)']]
  ]);

  reg(1, 'c-hex-rgb', 'Cores: hexadecimal e RGB', (r) => {
    const rgb = [r.int(0, 255), r.int(0, 255), r.int(0, 255)];
    const hex = '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
    const detalhe = rgb.map((v, i) => `${['R', 'G', 'B'][i]}: ${hex.slice(1 + i * 2, 3 + i * 2).toUpperCase()}₁₆ = ${Math.floor(v / 16)}×16 + ${v % 16} = ${v}`).join('<br>');
    if (r.bool()) return {
      enunciado: `<p>Converta a cor para o formato ${c('rgb()')}:</p><p class="destaque"><span class="amostra" style="background:${hex}"></span>${hex.toUpperCase()}</p>`,
      resposta: `rgb(${rgb.join(', ')})`, aceitas: [rgb.join(', '), rgb.join(' ')],
      dica: 'Separe o hexadecimal em 3 pares (RR GG BB) e converta cada par: A=10, B=11, ..., F=15. Valor = 1º dígito × 16 + 2º dígito.',
      explicacao: `<p>${detalhe}</p><p>Resposta: <b>rgb(${rgb.join(', ')})</b>.</p>`
    };
    return {
      enunciado: `<p>Converta a cor para hexadecimal (${c('#rrggbb')}):</p><p class="destaque"><span class="amostra" style="background:${hex}"></span>rgb(${rgb.join(', ')})</p>`,
      resposta: hex, aceitas: [hex.slice(1)],
      dica: 'Divida cada valor por 16: o quociente é o 1º dígito e o resto o 2º (10=A ... 15=F).',
      explicacao: `<p>${detalhe}</p><p>Resposta: <b>${hex.toUpperCase()}</b> (maiúsculas ou minúsculas tanto faz).</p>`
    };
  });

  W.pratico({
    id: 'cc-cores-texto', nivel: 1, categoria: 'css', titulo: 'Cores e fontes',
    cfg: (r) => { const [c1, c2] = cores(r, 2); return { fundo: r.pick(['#f8fafc', '#fef9c3', '#ecfeff', '#fdf2f8', '#f0fdf4']), c1, c2, tam: r.pick([28, 32, 36, 40]), fonte: r.pick(['Georgia', 'Verdana', 'Arial', 'Tahoma']) }; },
    html: () => '<h1 class="titulo">Bem-vindo ao meu site</h1>\n<p class="texto">Estou aprendendo CSS e já sei mudar cores e fontes.</p>',
    enunciado: () => '<p>Estilize a página conforme os requisitos.</p>',
    checks: (k) => [
      { tipo: 'estilo', sel: 'body', prop: 'backgroundColor', valor: k.fundo, desc: `Fundo da página (${c('body')}) na cor ${c(k.fundo)}` },
      { tipo: 'estilo', sel: '.titulo', prop: 'color', valor: k.c1, desc: `${c('.titulo')} com cor ${c(k.c1)}` },
      { tipo: 'estilo', sel: '.titulo', prop: 'fontSize', valor: `${k.tam}px`, desc: `${c('.titulo')} com ${c(`font-size: ${k.tam}px`)}` },
      { tipo: 'estilo', sel: '.texto', prop: 'color', valor: k.c2, desc: `${c('.texto')} com cor ${c(k.c2)}` },
      { tipo: 'estilo', sel: '.texto', prop: 'fontFamily', valor: k.fonte, contem: true, desc: `${c('.texto')} usando a fonte ${c(k.fonte)} (com uma fonte genérica de reserva)` }
    ],
    solucao: (k) => `body {\n  background-color: ${k.fundo};\n}\n\n.titulo {\n  color: ${k.c1};\n  font-size: ${k.tam}px;\n}\n\n.texto {\n  color: ${k.c2};\n  font-family: ${k.fonte}, sans-serif;\n}`,
    dica: 'Seletor de classe começa com ponto: .titulo { ... }'
  });

  W.pratico({
    id: 'cc-texto', nivel: 1, categoria: 'css', titulo: 'Formatação de texto',
    cfg: (r) => ({ esp: r.pick([1, 2, 3]), cor: r.pick(W.CORES) }),
    html: () => '<p class="aviso">Inscrições abertas</p>\n<p>Confira o <a class="link" href="#">regulamento completo</a>.</p>',
    enunciado: () => '<p>Formate o aviso e o link.</p>',
    checks: (k) => [
      { tipo: 'estilo', sel: '.aviso', prop: 'textAlign', valor: 'center', desc: `${c('.aviso')} centralizado` },
      { tipo: 'estilo', sel: '.aviso', prop: 'fontWeight', valor: '700', desc: `${c('.aviso')} em negrito` },
      { tipo: 'estilo', sel: '.aviso', prop: 'textTransform', valor: 'uppercase', desc: `${c('.aviso')} em maiúsculas (${c('text-transform')})` },
      { tipo: 'estilo', sel: '.aviso', prop: 'letterSpacing', valor: `${k.esp}px`, desc: `${c('.aviso')} com ${c(`letter-spacing: ${k.esp}px`)}` },
      { tipo: 'estilo', sel: '.link', prop: 'textDecorationLine', valor: 'none', desc: `${c('.link')} sem sublinhado` },
      { tipo: 'estilo', sel: '.link', prop: 'color', valor: k.cor, desc: `${c('.link')} com cor ${c(k.cor)}` }
    ],
    solucao: (k) => `.aviso {\n  text-align: center;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: ${k.esp}px;\n}\n\n.link {\n  text-decoration: none;\n  color: ${k.cor};\n}`,
    dica: 'font-weight: bold equivale a 700.'
  });

  /* ========================== NÍVEL 2 ========================== */

  W.quiz(2, 'css', 'c-seletores', 'Seletores', [
    ['O que o seletor [[ul li]] seleciona?', 'Todos os li que estão dentro de um ul, em qualquer nível', ['Só os li filhos diretos de ul', 'Os ul e os li', 'O primeiro li de cada ul', 'Os li que vêm logo depois de um ul']],
    ['O que o seletor [[ul > li]] seleciona?', 'Os li que são filhos diretos de um ul', ['Todos os li dentro de ul, em qualquer nível', 'Os ul maiores que li', 'Os li depois de um ul', 'O último li']],
    ['O que o seletor [[h1, h2]] seleciona?', 'Todos os h1 e todos os h2', ['Os h2 dentro de h1', 'Só os h1 seguidos de h2', 'Nenhum: a sintaxe está errada', 'O primeiro h1 e o primeiro h2']],
    ['O que o seletor [[h2 + p]] seleciona?', 'O p que vem imediatamente depois de um h2', ['Todos os p depois de h2', 'Os h2 e os p', 'Os p dentro de h2', 'O h2 antes de um p']],
    ['O que o seletor [[h2 ~ p]] seleciona?', 'Todos os p irmãos que vêm depois de um h2', ['Só o p imediatamente após o h2', 'Os p antes do h2', 'Os p dentro do h2', 'Os h2 e os p']],
    ['O que [[a:hover]] seleciona?', 'Links com o mouse por cima', ['Links já visitados', 'Links clicados', 'Links com foco do teclado', 'Todos os links']],
    ['O que [[input[type="email"]]] seleciona?', 'Inputs cujo atributo type é email', ['Inputs com a classe email', 'Inputs com id email', 'Todos os inputs da página', 'Inputs com name email']],
    ['O que [[li:nth-child(2n)]] seleciona?', 'Os itens em posição par (2º, 4º, 6º...)', ['Os 2 primeiros itens', 'O 2º item apenas', 'Os itens ímpares', 'A cada 2 listas, um item']],
    ['O que o seletor [[*]] seleciona?', 'Todos os elementos', ['Nenhum elemento', 'Só o body', 'Elementos sem classe', 'Elementos com estilos importantes']],
    ['Para que servem [[::before]] e [[::after]]?', 'Inserir conteúdo gerado antes/depois do conteúdo do elemento', ['Selecionar o elemento anterior/posterior', 'Aplicar estilos antes/depois do carregamento', 'Criar animações de entrada e saída', 'Definir margens antes/depois']]
  ]);

  reg(2, 'c-box-model', 'Box model', (r) => {
    for (;;) {
      const borderBox = r.bool();
      const w = r.pick([200, 240, 250, 300, 320, 400]);
      const pv = r.pick([5, 10, 15, 20]), ph = r.pick([10, 15, 20, 25, 30]);
      const b = r.pick([1, 2, 3, 4, 5]), m = r.pick([0, 8, 10, 16, 20]);
      const doisPad = pv !== ph && r.bool();
      const visivel = borderBox ? w : w + 2 * ph + 2 * b;
      const conteudo = borderBox ? w - 2 * ph - 2 * b : w;
      const q = r.int(0, 2);
      if (conteudo <= 0) continue;
      const pergunta = ['a <b>largura visível</b> da caixa (de borda a borda)', 'o <b>espaço horizontal total</b> ocupado (incluindo as margens)', 'a <b>largura da área de conteúdo</b>'][q];
      const resp = [visivel, visivel + 2 * m, conteudo][q];
      const codigo = `.caixa {\n${borderBox ? '  box-sizing: border-box;\n' : ''}  width: ${w}px;\n  padding: ${doisPad ? `${pv}px ${ph}px` : `${ph}px`};\n  border: ${b}px solid black;\n  margin: ${m}px;\n}`;
      return {
        enunciado: `<p>Qual é ${pergunta}, em pixels?</p>${css(codigo)}`,
        resposta: String(resp),
        dica: borderBox ? 'Com box-sizing: border-box, o width já inclui padding e borda.' : 'No padrão (content-box), o width é só do conteúdo: padding e borda são somados por fora.',
        explicacao: `<p>${borderBox ? `border-box: largura visível = width = ${w}px; conteúdo = ${w} − 2×${ph} − 2×${b} = ${conteudo}px.` : `content-box: conteúdo = width = ${w}px; visível = ${w} + 2×${ph} + 2×${b} = ${visivel}px.`}${doisPad ? ` (Em ${c(`padding: ${pv}px ${ph}px`)}, o 2º valor é o horizontal.)` : ''} Com as margens: ${visivel} + 2×${m} = ${visivel + 2 * m}px.</p><p>Resposta: <b>${resp}</b>.</p>`
      };
    }
  });

  reg(2, 'c-unidades', 'Unidades de medida', (r) => {
    const t = r.int(0, 3);
    if (t === 0) {
      for (;;) {
        const R = r.pick([16, 10, 20]), X = r.pick([1, 1.25, 1.5, 2]), Y = r.pick([1, 1.5, 2, 0.5]);
        const res = R * X * Y;
        if (!Number.isInteger(res)) continue;
        return {
          enunciado: `<p>Qual é o padding do ${c('.card')}, em pixels?</p>${css(`html { font-size: ${R}px; }\n.card {\n  font-size: ${X}rem;\n  padding: ${Y}em;\n}`)}`,
          resposta: String(res),
          dica: 'rem é relativo à fonte do html; em é relativo à fonte do próprio elemento.',
          explicacao: `<p>font-size do card = ${X} × ${R} = ${R * X}px. padding = ${Y} × ${R * X} = <b>${res}</b>px.</p>`
        };
      }
    }
    if (t === 1) {
      for (;;) {
        const W0 = r.int(10, 60) * 20, P = r.pick([25, 40, 50, 60, 75, 80]);
        const res = (W0 * P) / 100;
        if (!Number.isInteger(res)) continue;
        return {
          enunciado: `<p>Qual é a largura do ${c('.filho')}, em pixels?</p>${css(`.pai { width: ${W0}px; }\n.filho { width: ${P}%; }`)}`,
          resposta: String(res), dica: 'Porcentagem de largura é relativa à largura do elemento pai.',
          explicacao: `<p>${P}% de ${W0}px = <b>${res}</b>px.</p>`
        };
      }
    }
    if (t === 2) {
      const V = r.pick([360, 400, 800, 1000, 1200, 1440, 1600]), X = r.pick([10, 25, 50, 80, 100]);
      return {
        enunciado: `<p>Em uma janela com <b>${V}px</b> de largura, qual a largura do ${c('.banner')} em pixels?</p>${css(`.banner { width: ${X}vw; }`)}`,
        resposta: String((V * X) / 100), dica: '1vw = 1% da largura da janela (viewport).',
        explicacao: `<p>${X}vw = ${X}% de ${V} = <b>${(V * X) / 100}</b>px.</p>`
      };
    }
    for (;;) {
      const base = r.pick([16, 20, 24]), a = r.pick([1.5, 2, 1.25]), b = r.pick([0.5, 0.75, 1.5]);
      const res = base * a * b;
      if (!Number.isInteger(res)) continue;
      return {
        enunciado: `<p>Qual é o tamanho da fonte do ${c('.neto')}, em pixels?</p>${css(`.avo   { font-size: ${base}px; }\n.pai   { font-size: ${a}em; }\n.neto  { font-size: ${b}em; }`)}<pre class="code">${U.destacarHTML('<div class="avo">\n  <div class="pai">\n    <p class="neto">Texto</p>\n  </div>\n</div>')}</pre>`,
        resposta: String(res), dica: 'em em font-size é relativo à fonte do pai, e o efeito se acumula a cada nível.',
        explicacao: `<p>pai = ${a} × ${base} = ${base * a}px; neto = ${b} × ${base * a} = <b>${res}</b>px. Por isso o rem (sempre relativo ao html) é mais previsível.</p>`
      };
    }
  });

  /* Especificidade */
  function gerarSeletor(r) {
    const tags = ['div', 'ul', 'li', 'a', 'p', 'nav', 'section', 'h2', 'span'];
    const classes = ['.menu', '.item', '.ativo', '.card', '.titulo', '.link', '.btn'];
    const pc = [':hover', ':first-child', ':focus', ':nth-child(2)'];
    const attrs = ['[type="text"]', '[href]', '[data-id]'];
    const pe = ['::before', '::after', '::first-line'];
    const n = r.int(1, 4);
    let a = 0, b = 0, cc = 0;
    let idUsado = !r.bool(0.4);
    const comps = [];
    for (let i = 0; i < n; i++) {
      let s = '';
      if (r.bool(0.6)) { s += r.pick(tags); cc++; }
      if (!idUsado && r.bool(0.5)) { s += '#' + r.pick(['topo', 'principal', 'lateral']); a++; idUsado = true; }
      const k = r.int(0, 2);
      for (let j = 0; j < k; j++) { const t = r.int(0, 2); s += t === 0 ? r.pick(classes) : t === 1 ? r.pick(pc) : r.pick(attrs); b++; }
      if (!s) { s = r.pick(tags); cc++; }
      comps.push(s);
    }
    if (r.bool(0.2)) { comps[comps.length - 1] += r.pick(pe); cc++; }
    return { sel: comps.join(r.bool(0.25) ? ' > ' : ' '), esp: [a, b, cc] };
  }
  const espStr = (e) => e.join(', ');
  const compara = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];

  reg(2, 'c-especificidade', 'Especificidade', (r) => {
    if (r.bool(0.6)) {
      const { sel, esp } = gerarSeletor(r);
      return {
        enunciado: `<p>Qual é a especificidade do seletor abaixo, no formato <b>(ids, classes, tags)</b>?</p><p class="destaque mono">${U.esc(sel)}</p>`,
        resposta: espStr(esp), aceitas: [`(${espStr(esp)})`, esp.join(''), esp.join(' ')],
        dica: 'Conte: ids (#); classes, atributos [ ] e pseudo-classes (:); tags e pseudo-elementos (::). Combinadores (espaço, >) não contam.',
        explicacao: `<p>ids = ${esp[0]}, classes/atributos/pseudo-classes = ${esp[1]}, tags/pseudo-elementos = ${esp[2]}. Especificidade: <b>(${espStr(esp)})</b>.</p>`
      };
    }
    let A, B;
    do { A = gerarSeletor(r); B = gerarSeletor(r); } while (A.sel === B.sel);
    const cmp = compara(A.esp, B.esp);
    const venc = cmp > 0 ? 0 : 1; // empate: vence o declarado depois (B)
    const cor = cores(r, 2);
    return {
      tipo: 'escolha',
      enunciado: `<p>As duas regras abaixo atingem o mesmo elemento. Qual cor ele terá?</p>${css(`${A.sel} { color: ${cor[0]}; }\n${B.sel} { color: ${cor[1]}; }`)}`,
      opcoes: [`${cor[0]} (1ª regra)`, `${cor[1]} (2ª regra)`], correta: venc, resposta: cor[venc],
      dica: 'Vence a maior especificidade, comparando ids, depois classes, depois tags. Em empate, vence a regra que vem por último.',
      explicacao: `<p>1ª: (${espStr(A.esp)}) · 2ª: (${espStr(B.esp)}). ${cmp === 0 ? 'Empate, então vence a declarada por último' : `Vence a ${venc + 1}ª, mais específica`}: <b>${cor[venc]}</b>.</p>`
    };
  });

  /* Seletores na árvore */
  function seletorNaArvore(r, complexo) {
    const raiz = W.gerarArvore(r);
    const nos = W.nos(raiz);
    const tags = [...new Set(nos.map((n) => n.tag))];
    const classes = [...new Set(nos.flatMap((n) => n.classes))];
    const ids = nos.filter((n) => n.id).map((n) => '#' + n.id);
    const conts = ['div', 'section', 'ul', ...classes.filter((k) => ['card', 'box', 'menu', 'painel'].includes(k)).map((k) => '.' + k), ...ids];
    const folhas = ['p', 'span', 'a', 'li'];
    for (let t = 0; t < 40; t++) {
      let sel;
      if (!complexo) sel = r.pick([...tags.filter((x) => x !== 'body'), ...classes.map((k) => '.' + k)]);
      else {
        const A = r.pick(conts), B = r.pick(folhas), k = r.pick(classes);
        sel = r.pick([`${A} ${B}`, `${A} > ${B}`, `${B}:first-child`, `${B}:last-child`, `${B} + ${B}`, `${B}.${k}`, `${A} .${k}`, `${A} > ${B}:first-child`, `${B}.${k}, ${A} > ${r.pick(folhas)}`]);
      }
      const n = W.contarSeletor(raiz, sel);
      if (n >= 1) return { raiz, sel, n };
    }
    return { raiz, sel: 'div', n: W.contarSeletor(raiz, 'div') };
  }
  const regSel = (nivel, id, complexo) => reg(nivel, id, complexo ? 'Seletores combinados' : 'Contando seletores', (r) => {
    const { raiz, sel, n } = seletorNaArvore(r, complexo);
    return {
      enunciado: `<p>Quantos elementos do HTML abaixo são selecionados por:</p><p class="destaque mono">${U.esc(sel)}</p>${U.codigo(W.arvoreHTML(raiz), 'html')}`,
      resposta: String(n),
      dica: complexo ? 'Espaço = descendente em qualquer nível; > = filho direto; + = irmão imediatamente seguinte; vírgula = união (sem contar repetidos).' : 'Conte as tags com esse nome, ou os elementos que têm essa classe entre as suas classes.',
      explicacao: `<p>O seletor ${c(sel)} seleciona <b>${n}</b> elemento(s).</p>`
    };
  });
  regSel(2, 'c-seletor-simples', false);

  W.pratico({
    id: 'cc-box', nivel: 2, categoria: 'css', titulo: 'Caixa com box model',
    cfg: (r) => ({ w: r.pick([240, 280, 300, 320, 360]), p: r.pick([12, 16, 20, 24]), b: r.pick([2, 3, 4]), m: r.pick([10, 20, 24, 32]), rad: r.pick([6, 8, 12, 16]), cor: r.pick(W.CORES) }),
    html: () => '<div class="caixa">\n  <h2>Plano Premium</h2>\n  <p>Tudo o que você precisa para estudar.</p>\n</div>',
    enunciado: (k) => `<p>Estilize a ${c('.caixa')} de modo que a largura <b>visível</b> (de borda a borda) seja exatamente ${k.w}px.</p>`,
    checks: (k) => [
      { tipo: 'medida', sel: '.caixa', prop: 'offsetWidth', valor: k.w, desc: `Largura visível de ${k.w}px (dica: ${c('box-sizing: border-box')})` },
      { tipo: 'estilo', sel: '.caixa', prop: 'paddingLeft', valor: `${k.p}px`, desc: `Padding de ${k.p}px em todos os lados` },
      { tipo: 'estilo', sel: '.caixa', prop: 'paddingTop', valor: `${k.p}px`, desc: `(padding superior também ${k.p}px)` },
      { tipo: 'estilo', sel: '.caixa', prop: 'borderTopWidth', valor: `${k.b}px`, desc: `Borda de ${k.b}px` },
      { tipo: 'estilo', sel: '.caixa', prop: 'borderTopStyle', valor: 'solid', desc: `Borda sólida (${c('solid')})` },
      { tipo: 'estilo', sel: '.caixa', prop: 'borderTopColor', valor: k.cor, desc: `Cor da borda ${c(k.cor)}` },
      { tipo: 'estilo', sel: '.caixa', prop: 'marginTop', valor: `${k.m}px`, desc: `Margem de ${k.m}px` },
      { tipo: 'estilo', sel: '.caixa', prop: 'borderTopLeftRadius', valor: `${k.rad}px`, desc: `Cantos arredondados de ${k.rad}px` }
    ],
    solucao: (k) => `.caixa {\n  box-sizing: border-box;\n  width: ${k.w}px;\n  padding: ${k.p}px;\n  border: ${k.b}px solid ${k.cor};\n  margin: ${k.m}px;\n  border-radius: ${k.rad}px;\n}`,
    dica: 'Sem border-box, a largura visível seria width + 2×padding + 2×borda.'
  });

  W.pratico({
    id: 'cc-seletores', nivel: 2, categoria: 'css', titulo: 'Praticando seletores',
    cfg: (r) => { const [c1, c2, c3] = cores(r, 3); return { c1, c2, c3 }; },
    html: () => '<nav class="menu">\n  <a href="#">Início</a>\n  <a href="#" class="ativo">Cursos</a>\n  <a href="#">Contato</a>\n</nav>\n<p>Leia o <a href="#" id="destaque">regulamento</a>.</p>\n<ul class="lista">\n  <li>Primeiro</li>\n  <li>Segundo</li>\n  <li>Terceiro</li>\n  <li>Quarto</li>\n</ul>',
    enunciado: () => '<p>Use seletores de descendente, classe, id e pseudo-classe para atingir <b>apenas</b> os elementos pedidos.</p>',
    checks: (k) => [
      { tipo: 'estilo', sel: '.menu a:first-child', prop: 'color', valor: k.c1, desc: `Links dentro de ${c('.menu')} com cor ${c(k.c1)}` },
      { tipo: 'estiloNao', sel: '#destaque', prop: 'color', valor: k.c1, desc: `O link ${c('#destaque')} (fora do menu) <b>não</b> recebe essa cor` },
      { tipo: 'estilo', sel: '.menu .ativo', prop: 'fontWeight', valor: '700', desc: `O link ${c('.ativo')} em negrito` },
      { tipo: 'estilo', sel: '#destaque', prop: 'backgroundColor', valor: k.c2, desc: `${c('#destaque')} com fundo ${c(k.c2)}` },
      { tipo: 'estilo', sel: '.lista li:nth-child(2)', prop: 'backgroundColor', valor: k.c3, desc: `Itens em posição <b>par</b> da ${c('.lista')} com fundo ${c(k.c3)}` },
      { tipo: 'estilo', sel: '.lista li:nth-child(4)', prop: 'backgroundColor', valor: k.c3, desc: `(o 4º item também)` },
      { tipo: 'estiloNao', sel: '.lista li:nth-child(1)', prop: 'backgroundColor', valor: k.c3, desc: `Os itens ímpares <b>não</b> recebem o fundo` }
    ],
    solucao: (k) => `.menu a {\n  color: ${k.c1};\n}\n\n.menu .ativo {\n  font-weight: bold;\n}\n\n#destaque {\n  background-color: ${k.c2};\n}\n\n.lista li:nth-child(even) {\n  background-color: ${k.c3};\n}`,
    dica: ':nth-child(even) ou :nth-child(2n) seleciona as posições pares.'
  });

  /* ========================== NÍVEL 3 ========================== */

  regSel(3, 'c-seletor-combinado', true);

  W.quiz(3, 'css', 'c-layout', 'Flexbox, Grid e position', [
    ['No Flexbox (direção padrão: row), qual propriedade alinha os itens no eixo horizontal?', 'justify-content', ['align-items', 'text-align', 'align-content', 'flex-align']],
    ['No Flexbox (direção padrão: row), qual propriedade alinha os itens no eixo vertical?', 'align-items', ['justify-content', 'vertical-align', 'flex-direction', 'place-content']],
    ['Qual propriedade permite que os itens flex quebrem para a próxima linha?', 'flex-wrap: wrap', ['flex-direction: column', 'display: block', 'overflow: wrap', 'white-space: wrap']],
    ['O que [[flex: 1]] faz em um item?', 'Faz o item crescer para ocupar o espaço livre', ['Deixa o item com 1px', 'Coloca o item em primeiro', 'Impede o item de crescer', 'Ativa o modo flex no item']],
    ['O que significa [[1fr]] no CSS Grid?', 'Uma fração do espaço livre do container', ['1 pixel', '1% da tela', 'Uma linha da grade', '1 fonte (font-relative)']],
    ['Como fazer um item de grid ocupar da linha 1 até a linha 3 das colunas (2 colunas)?', 'grid-column: 1 / 3', ['grid-column: 1 - 3', 'grid-column: 2', 'column-span: 1 3', 'grid-width: 2']],
    ['Um elemento com [[position: absolute]] é posicionado em relação a quê?', 'Ao ancestral posicionado mais próximo (não static)', ['Sempre à janela do navegador', 'Ao elemento anterior', 'Ao body, sempre', 'À sua posição original']],
    ['Qual position mantém o elemento fixo na tela mesmo ao rolar a página?', 'fixed', ['absolute', 'relative', 'static', 'float']],
    ['Qual position deixa o elemento rolar normalmente até um ponto e então “grudar”?', 'sticky', ['fixed', 'absolute', 'relative', 'static']],
    ['O que [[z-index]] controla?', 'A ordem de empilhamento de elementos sobrepostos', ['O zoom do elemento', 'A transparência', 'A distância da borda', 'A ordem no HTML']],
    ['Qual a diferença entre [[display: none]] e [[visibility: hidden]]?', 'none remove o espaço do elemento; hidden esconde mas mantém o espaço', ['Não há diferença', 'hidden remove o espaço; none mantém', 'none só funciona em imagens', 'hidden apaga o elemento do HTML']],
    ['Elementos com [[display: inline]] aceitam [[width]] e [[height]]?', 'Não; para isso use inline-block ou block', ['Sim, sempre', 'Só width', 'Só em tabelas', 'Só com !important']]
  ]);

  reg(3, 'c-flex-grow', 'Flexbox: flex-grow', (r) => {
    const n = 3, nomes = ['.a', '.b', '.c'];
    const bases = Array.from({ length: n }, () => r.int(5, 15) * 10);
    let grows;
    do { grows = Array.from({ length: n }, () => r.int(0, 3)); } while (grows.every((x) => x === 0));
    const k = r.int(2, 8) * 10, gap = r.pick([0, 10, 20]);
    const somaG = grows.reduce((a, b) => a + b, 0);
    const largura = bases.reduce((a, b) => a + b, 0) + gap * (n - 1) + somaG * k;
    const alvo = r.int(0, n - 1);
    const res = bases[alvo] + grows[alvo] * k;
    const codigo = `.container {\n  display: flex;\n  width: ${largura}px;\n  gap: ${gap}px;\n}\n${nomes.map((s, i) => `${s} { flex-basis: ${bases[i]}px; flex-grow: ${grows[i]}; }`).join('\n')}`;
    const livre = somaG * k;
    return {
      enunciado: `<p>Os três itens estão dentro do container, na ordem a, b, c. Qual a largura final do item ${c(nomes[alvo])}, em pixels?</p>${css(codigo)}`,
      resposta: String(res),
      dica: 'Espaço livre = largura do container − soma das bases − gaps. Ele é dividido proporcionalmente ao flex-grow.',
      explicacao: `<p>Livre = ${largura} − (${bases.join(' + ')}) − ${gap * (n - 1)} = ${livre}px. Soma dos grows = ${somaG}, então cada unidade de grow vale ${livre} ÷ ${somaG} = ${k}px. ${nomes[alvo]} = ${bases[alvo]} + ${grows[alvo]} × ${k} = <b>${res}</b>px.</p>`
    };
  });

  reg(3, 'c-grid-fr', 'Grid: unidade fr', (r) => {
    const n = r.int(3, 4);
    const cols = Array.from({ length: n }, () => (r.bool(0.35) ? { px: r.int(10, 25) * 10 } : { fr: r.int(1, 3) }));
    if (!cols.some((x) => x.fr)) cols[0] = { fr: 1 };
    const gap = r.pick([0, 10, 16, 20, 24]), k = r.int(6, 20) * 10;
    const somaFr = cols.reduce((s, x) => s + (x.fr || 0), 0), fixos = cols.reduce((s, x) => s + (x.px || 0), 0);
    const largura = fixos + gap * (n - 1) + somaFr * k;
    const alvo = r.int(0, n - 1);
    const res = cols[alvo].px || cols[alvo].fr * k;
    const tpl = cols.map((x) => (x.px ? `${x.px}px` : `${x.fr}fr`)).join(' ');
    return {
      enunciado: `<p>Qual a largura da <b>${alvo + 1}ª coluna</b>, em pixels?</p>${css(`.grade {\n  display: grid;\n  width: ${largura}px;\n  grid-template-columns: ${tpl};\n  gap: ${gap}px;\n}`)}`,
      resposta: String(res),
      dica: 'Primeiro desconte as colunas fixas e os gaps; o que sobra é dividido entre as frações.',
      explicacao: `<p>Espaço para frações = ${largura} − ${fixos} (fixas) − ${gap * (n - 1)} (gaps) = ${somaFr * k}px. Total de fr = ${somaFr}, então 1fr = ${k}px. Coluna ${alvo + 1} (${tpl.split(' ')[alvo]}) = <b>${res}</b>px.</p>`
    };
  });

  reg(3, 'c-media', 'Media queries', (r) => {
    const bps = r.sample([480, 576, 640, 768, 900, 992, 1024, 1200, 1280], 3).sort((a, b) => a - b);
    const mobileFirst = r.bool();
    const V = r.bool(0.25) ? r.pick(bps) : r.int(30, 150) * 10;
    let resp, codigo;
    if (mobileFirst) {
      codigo = `.grade { grid-template-columns: repeat(1, 1fr); }\n\n${bps.map((b, i) => `@media (min-width: ${b}px) {\n  .grade { grid-template-columns: repeat(${i + 2}, 1fr); }\n}`).join('\n\n')}`;
      resp = 1; bps.forEach((b, i) => { if (V >= b) resp = i + 2; });
    } else {
      const desc = [...bps].reverse();
      codigo = `.grade { grid-template-columns: repeat(4, 1fr); }\n\n${desc.map((b, i) => `@media (max-width: ${b}px) {\n  .grade { grid-template-columns: repeat(${3 - i}, 1fr); }\n}`).join('\n\n')}`;
      resp = 4; desc.forEach((b, i) => { if (V <= b) resp = 3 - i; });
    }
    return {
      enunciado: `<p>Com a janela do navegador em <b>${V}px</b> de largura, quantas colunas a ${c('.grade')} terá?</p>${css(codigo)}`,
      resposta: String(resp),
      dica: 'min-width: vale da largura indicada para cima; max-width: dela para baixo (ambos incluem o próprio valor). Se várias regras valem, ganha a última.',
      explicacao: `<p>${mobileFirst ? 'Mobile first (min-width)' : 'Desktop first (max-width)'}: para ${V}px, a última regra aplicável define <b>${resp}</b> coluna(s).</p>`
    };
  });

  W.pratico({
    id: 'cc-flex-centro', nivel: 3, categoria: 'css', titulo: 'Centralizar com Flexbox',
    cfg: (r) => ({ h: r.pick([240, 300, 360, 400]), fundo: r.pick(['#e0e7ff', '#dcfce7', '#fef3c7', '#fce7f3']) }),
    html: () => '<div class="tela">\n  <div class="cartao">Estou no centro!</div>\n</div>',
    enunciado: () => `<p>Centralize o ${c('.cartao')} na horizontal e na vertical dentro da ${c('.tela')} usando Flexbox.</p>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.tela', prop: 'display', valor: 'flex', desc: `${c('.tela')} com ${c('display: flex')}` },
      { tipo: 'estilo', sel: '.tela', prop: 'justifyContent', valor: 'center', desc: 'Centralizado no eixo principal (horizontal)' },
      { tipo: 'estilo', sel: '.tela', prop: 'alignItems', valor: 'center', desc: 'Centralizado no eixo cruzado (vertical)' },
      { tipo: 'medida', sel: '.tela', prop: 'offsetHeight', valor: k.h, desc: `${c('.tela')} com ${k.h}px de altura` },
      { tipo: 'estilo', sel: '.tela', prop: 'backgroundColor', valor: k.fundo, desc: `Fundo da tela ${c(k.fundo)}` }
    ],
    solucao: (k) => `.tela {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: ${k.h}px;\n  background-color: ${k.fundo};\n}`,
    dica: 'Sem altura definida, a tela tem só a altura do conteúdo e não dá para ver a centralização vertical.'
  });

  W.pratico({
    id: 'cc-flex-menu', nivel: 3, categoria: 'css', titulo: 'Menu horizontal com Flexbox',
    cfg: (r) => ({ gap: r.pick([8, 12, 16, 24]), just: r.pick(['space-between', 'center', 'flex-end', 'space-around']) }),
    html: () => '<nav class="menu">\n  <ul>\n    <li><a href="#">Início</a></li>\n    <li><a href="#">Cursos</a></li>\n    <li><a href="#">Blog</a></li>\n    <li><a href="#">Contato</a></li>\n  </ul>\n</nav>',
    enunciado: () => `<p>Transforme a lista em um menu horizontal.</p>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.menu ul', prop: 'display', valor: 'flex', desc: `A ${c('ul')} do menu com ${c('display: flex')}` },
      { tipo: 'estilo', sel: '.menu ul', prop: 'listStyleType', valor: 'none', desc: 'Sem marcadores de lista' },
      { tipo: 'estilo', sel: '.menu ul', prop: 'paddingLeft', valor: '0px', desc: 'Sem o recuo padrão da lista (padding 0)' },
      { tipo: 'estilo', sel: '.menu ul', prop: 'columnGap', valor: `${k.gap}px`, desc: `Espaço de ${k.gap}px entre os itens (${c('gap')})` },
      { tipo: 'estilo', sel: '.menu ul', prop: 'justifyContent', valor: k.just, desc: `Distribuição ${c(`justify-content: ${k.just}`)}` },
      { tipo: 'antes', a: '.menu li:nth-child(1)', b: '.menu li:nth-child(2)', eixo: 'x', desc: 'Os itens ficam lado a lado (o 2º à direita do 1º)' }
    ],
    solucao: (k) => `.menu ul {\n  display: flex;\n  list-style: none;\n  padding: 0;\n  gap: ${k.gap}px;\n  justify-content: ${k.just};\n}`,
    dica: 'O container flex é o elemento cujos filhos você quer alinhar: aqui, a ul.'
  });

  W.pratico({
    id: 'cc-grid', nivel: 3, categoria: 'css', titulo: 'Galeria com Grid',
    cfg: (r) => ({ n: r.pick([2, 3, 4]), gap: r.pick([8, 12, 16, 20]) }),
    html: () => `<div class="galeria">\n${[1, 2, 3, 4, 5, 6].map((i) => `  <div class="foto">${i}</div>`).join('\n')}\n</div>`,
    enunciado: (k) => `<p>Organize as fotos em uma grade de <b>${k.n} colunas de mesma largura</b>.</p>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.galeria', prop: 'display', valor: 'grid', desc: `${c('.galeria')} com ${c('display: grid')}` },
      { tipo: 'colunas', sel: '.galeria', n: k.n, desc: `${k.n} colunas (dica: ${c(`repeat(${k.n}, 1fr)`)})` },
      { tipo: 'igualLargura', a: '.foto:nth-child(1)', b: `.foto:nth-child(${k.n})`, desc: 'Todas as colunas com a mesma largura' },
      { tipo: 'estilo', sel: '.galeria', prop: 'columnGap', valor: `${k.gap}px`, desc: `Espaço de ${k.gap}px entre colunas` },
      { tipo: 'estilo', sel: '.galeria', prop: 'rowGap', valor: `${k.gap}px`, desc: `Espaço de ${k.gap}px entre linhas` }
    ],
    solucao: (k) => `.galeria {\n  display: grid;\n  grid-template-columns: repeat(${k.n}, 1fr);\n  gap: ${k.gap}px;\n}`,
    dica: 'gap sozinho define o espaço entre linhas e entre colunas.'
  });

  W.pratico({
    id: 'cc-position', nivel: 3, categoria: 'css', titulo: 'Selo com position',
    cfg: (r) => ({ t: r.pick([8, 10, 12, 16]), d: r.pick([8, 10, 12, 16]), z: r.pick([2, 5, 10]) }),
    html: () => '<div class="card">\n  <span class="selo">Novo</span>\n  <h3>Curso de CSS</h3>\n  <p>Do zero ao avançado.</p>\n</div>',
    enunciado: (k) => `<p>Posicione o ${c('.selo')} no canto <b>superior direito</b> do ${c('.card')}, sobreposto ao conteúdo.</p>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.card', prop: 'position', valor: 'relative', desc: `${c('.card')} como referência: ${c('position: relative')}` },
      { tipo: 'estilo', sel: '.selo', prop: 'position', valor: 'absolute', desc: `${c('.selo')} com ${c('position: absolute')}` },
      { tipo: 'estilo', sel: '.selo', prop: 'top', valor: `${k.t}px`, desc: `${k.t}px do topo` },
      { tipo: 'estilo', sel: '.selo', prop: 'right', valor: `${k.d}px`, desc: `${k.d}px da direita` },
      { tipo: 'estilo', sel: '.selo', prop: 'zIndex', valor: String(k.z), desc: `${c(`z-index: ${k.z}`)}` }
    ],
    solucao: (k) => `.card {\n  position: relative;\n}\n\n.selo {\n  position: absolute;\n  top: ${k.t}px;\n  right: ${k.d}px;\n  z-index: ${k.z};\n}`,
    dica: 'O absolute se posiciona em relação ao ancestral mais próximo que tenha position diferente de static.'
  });

  W.pratico({
    id: 'cc-responsivo', nivel: 3, categoria: 'css', titulo: 'Layout responsivo',
    cfg: (r) => ({ bp: r.pick([600, 700, 768]), gap: r.pick([12, 16, 20]) }),
    html: () => '<div class="colunas">\n  <section>Coluna A</section>\n  <section>Coluna B</section>\n  <section>Coluna C</section>\n</div>',
    enunciado: (k) => `<p>Usando a abordagem <b>mobile first</b>, empilhe as colunas em telas pequenas e coloque-as lado a lado a partir de <b>${k.bp}px</b>. A verificação testa a página em duas larguras de janela.</p>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.colunas', prop: 'display', valor: 'flex', largura: k.bp - 120, desc: `${c('.colunas')} com ${c('display: flex')}` },
      { tipo: 'estilo', sel: '.colunas', prop: 'flexDirection', valor: 'column', largura: k.bp - 120, desc: `Em ${k.bp - 120}px: colunas empilhadas (${c('flex-direction: column')})` },
      { tipo: 'antes', a: '.colunas section:nth-child(1)', b: '.colunas section:nth-child(2)', eixo: 'y', largura: k.bp - 120, desc: `Em ${k.bp - 120}px: a coluna B fica abaixo da A` },
      { tipo: 'estilo', sel: '.colunas', prop: 'flexDirection', valor: 'row', largura: k.bp + 100, desc: `Em ${k.bp + 100}px: lado a lado (${c('@media (min-width: ' + k.bp + 'px)')})` },
      { tipo: 'antes', a: '.colunas section:nth-child(1)', b: '.colunas section:nth-child(2)', eixo: 'x', largura: k.bp + 100, desc: `Em ${k.bp + 100}px: a coluna B fica à direita da A` },
      { tipo: 'estilo', sel: '.colunas', prop: 'rowGap', valor: `${k.gap}px`, desc: `Espaço de ${k.gap}px entre as colunas (${c('gap')})` }
    ],
    solucao: (k) => `.colunas {\n  display: flex;\n  flex-direction: column;\n  gap: ${k.gap}px;\n}\n\n@media (min-width: ${k.bp}px) {\n  .colunas {\n    flex-direction: row;\n  }\n}`,
    dica: 'Mobile first: o estilo padrão é o do celular; a media query com min-width acrescenta o layout de telas maiores.'
  });

  /* ========================== NÍVEL 4 ========================== */

  reg(4, 'c-cascata', 'Cascata: quem vence?', (r) => {
    const pool = [
      ['p', [0, 0, 1]], ['.msg', [0, 1, 0]], ['.caixa p', [0, 1, 1]], ['p.alerta', [0, 1, 1]], ['.msg.alerta', [0, 2, 0]],
      ['#aviso', [1, 0, 0]], ['div p', [0, 0, 2]], ['.caixa .msg', [0, 2, 0]], ['div.caixa p.msg', [0, 2, 2]], ['#aviso.msg', [1, 1, 0]], ['body div p', [0, 0, 3]]
    ];
    const regras = r.sample(pool, 4).map(([sel, esp], i) => ({ sel, esp, cor: null, imp: false, i }));
    const cs = cores(r, 4);
    regras.forEach((x, i) => (x.cor = cs[i]));
    if (r.bool(0.35)) r.pick(regras.filter((x) => x.esp[0] === 0)).imp = true;
    let venc = regras[0];
    for (const x of regras.slice(1)) {
      if (x.imp !== venc.imp) { if (x.imp) venc = x; continue; }
      if (compara(x.esp, venc.esp) >= 0) venc = x;
    }
    const codigo = regras.map((x) => `${x.sel} { color: ${x.cor}${x.imp ? ' !important' : ''}; }`).join('\n');
    return {
      tipo: 'escolha',
      enunciado: `<p>Qual será a cor do texto do parágrafo?</p>${U.codigo('<div class="caixa">\n  <p id="aviso" class="msg alerta">Atenção!</p>\n</div>', 'html')}${css(codigo)}`,
      opcoes: cs, correta: cs.indexOf(venc.cor), resposta: venc.cor,
      dica: 'Ordem de decisão: !important primeiro; depois a maior especificidade; em empate, a regra que aparece por último.',
      explicacao: `<p>${regras.map((x) => `${c(x.sel)} (${espStr(x.esp)})${x.imp ? ' !important' : ''}`).join(' · ')}</p><p>Vence ${c(venc.sel)}${venc.imp ? ' por ter !important' : ''}: <b>${venc.cor}</b>.</p>`
    };
  });

  reg(4, 'c-variaveis', 'Variáveis CSS', (r) => {
    const [A, B, C2] = cores(r, 3);
    const t = r.int(0, 2);
    if (t === 0) {
      const dentro = r.bool();
      const resp = dentro ? B : A;
      const ops = r.shuffle([A, B, C2]);
      return {
        tipo: 'escolha',
        enunciado: `<p>Qual a cor do título que está <b>${dentro ? 'dentro' : 'fora'}</b> do ${c('.card')}?</p>${css(`:root { --cor: ${A}; }\n.card { --cor: ${B}; }\n.titulo { color: var(--cor, ${C2}); }`)}${U.codigo('<h2 class="titulo">Fora do card</h2>\n<div class="card">\n  <h2 class="titulo">Dentro do card</h2>\n</div>', 'html')}`,
        opcoes: ops, correta: ops.indexOf(resp), resposta: resp,
        dica: 'Variáveis CSS são herdadas: o valor usado é o definido no ancestral mais próximo.',
        explicacao: `<p>${dentro ? `Dentro do card, ${c('--cor')} foi redefinida para ${B}` : `Fora do card vale o valor de ${c(':root')}: ${A}`}. O valor reserva (${C2}) só seria usado se a variável não existisse. Resposta: <b>${resp}</b>.</p>`
      };
    }
    if (t === 1) {
      const e = r.pick([4, 6, 8, 10, 12]), k = r.pick([2, 3, 4]), extra = r.pick([0, 2, 4]);
      const res = e * k + extra;
      return {
        enunciado: `<p>Qual o padding do ${c('.botao')}, em pixels?</p>${css(`:root { --espaco: ${e}px; }\n.botao { padding: calc(var(--espaco) * ${k}${extra ? ` + ${extra}px` : ''}); }`)}`,
        resposta: String(res), dica: 'Substitua a variável pelo valor e resolva o calc.',
        explicacao: `<p>${e} × ${k}${extra ? ` + ${extra}` : ''} = <b>${res}</b>px.</p>`
      };
    }
    const definida = r.bool();
    const resp = definida ? A : C2;
    const ops = r.shuffle([A, B, C2]);
    return {
      tipo: 'escolha',
      enunciado: `<p>Qual a cor de fundo do ${c('.botao')}?</p>${css(`:root {\n  --primaria: ${B};\n${definida ? `  --fundo-botao: ${A};\n` : ''}}\n.botao { background: var(--fundo-botao, ${C2}); }`)}`,
      opcoes: ops, correta: ops.indexOf(resp), resposta: resp,
      dica: 'O segundo argumento de var() é o valor reserva, usado quando a variável não foi definida.',
      explicacao: `<p>${definida ? `${c('--fundo-botao')} está definida, então vale ${A}` : `${c('--fundo-botao')} não existe, então usa-se o reserva ${C2}`}. Resposta: <b>${resp}</b>.</p>`
    };
  });

  reg(4, 'c-clamp', 'Tipografia fluida com clamp()', (r) => {
    const min = r.pick([14, 16, 18, 20]), max = r.pick([32, 36, 40, 48]), vw = r.pick([2, 3, 4, 5]);
    const regiao = r.int(0, 2);
    let V;
    if (regiao === 0) V = r.int(20, Math.max(21, Math.floor((min * 100) / vw / 10) - 1)) * 10;
    else if (regiao === 2) V = Math.ceil((max * 100) / vw / 10) * 10 + r.int(1, 30) * 10;
    else V = r.int(Math.ceil((min * 100) / vw / 10), Math.floor((max * 100) / vw / 10)) * 10;
    const pref = (vw * V) / 100;
    const res = Math.min(Math.max(min, pref), max);
    return {
      enunciado: `<p>Com a janela em <b>${V}px</b> de largura, qual o tamanho da fonte do título, em pixels?</p>${css(`h1 { font-size: clamp(${min}px, ${vw}vw, ${max}px); }`)}`,
      resposta: String(res),
      dica: 'clamp(mínimo, preferido, máximo): calcule o valor preferido e limite-o entre o mínimo e o máximo.',
      explicacao: `<p>${vw}vw de ${V}px = ${pref}px. Limitado entre ${min}px e ${max}px: <b>${res}</b>px.</p>`
    };
  });

  W.quiz(4, 'css', 'c-moderno', 'CSS moderno', [
    ['O que o seletor [[.card:has(img)]] seleciona?', 'Os .card que contêm uma imagem', ['As imagens dentro de .card', 'Os .card sem imagem', 'O primeiro .card com imagem', 'As imagens com a classe card']],
    ['Qual a especificidade de [[:where(#menu .item)]]?', '(0, 0, 0)', ['(1, 1, 0)', '(0, 1, 0)', '(1, 0, 0)', 'Igual à do seletor mais específico']],
    ['Qual a especificidade de [[:is(#menu, .item)]]?', 'A do argumento mais específico: (1, 0, 0)', ['(0, 0, 0)', '(1, 1, 0)', '(0, 1, 0)', 'Sempre (0, 1, 0)']],
    ['Para que serve [[@layer]]?', 'Organizar a cascata em camadas com prioridade definida', ['Criar camadas visuais com z-index', 'Agrupar media queries', 'Importar fontes', 'Definir animações em camadas']],
    ['Qual recurso aplica estilos conforme o tamanho do elemento pai, e não da janela?', 'Container queries (@container)', ['Media queries (@media)', '@supports', 'Viewport units', ':has()']],
    ['O que [[aspect-ratio: 16 / 9]] faz?', 'Mantém a proporção largura × altura do elemento', ['Define a resolução da imagem', 'Recorta a imagem em 16 × 9 pixels', 'Divide a grade em 16 colunas e 9 linhas', 'Ajusta o zoom']],
    ['Qual propriedade lógica equivale a [[margin-left]] em textos da esquerda para a direita?', 'margin-inline-start', ['margin-block-start', 'margin-start-left', 'margin-x', 'inline-margin']],
    ['Qual media query detecta que o usuário prefere menos animações?', '@media (prefers-reduced-motion: reduce)', ['@media (animation: none)', '@media (motion: off)', '@media (reduced: true)', '@media screen and (no-motion)']],
    ['Qual media query detecta o tema escuro do sistema?', '@media (prefers-color-scheme: dark)', ['@media (theme: dark)', '@media (dark-mode)', '@media (color: black)', '@media screen and (night)']],
    ['Qual propriedade avisa o navegador que um elemento vai ser animado, para otimizar?', 'will-change', ['animate-hint', 'transform-style', 'contain: paint', 'render-mode']]
  ]);

  W.quiz(4, 'css', 'c-animacoes', 'Transições e animações', [
    ['Qual a diferença principal entre [[transition]] e [[animation]]?', 'transition reage a mudanças de estado; animation roda por @keyframes sozinha', ['Não há diferença', 'animation só funciona no hover', 'transition usa @keyframes', 'transition só funciona com cores']],
    ['Quais propriedades são mais baratas de animar (sem recalcular o layout)?', 'transform e opacity', ['width e height', 'top e left', 'margin e padding', 'font-size e line-height']],
    ['Como fazer uma animação repetir para sempre?', 'animation-iteration-count: infinite', ['animation-loop: true', 'animation-repeat: always', 'animation-count: 0', 'transition: infinite']],
    ['O que [[transform: translateX(50px)]] faz?', 'Desloca o elemento 50px para a direita sem afetar os vizinhos', ['Aumenta a largura em 50px', 'Gira o elemento 50 graus', 'Move o elemento e empurra os vizinhos', 'Adiciona margem de 50px']],
    ['O que [[animation-fill-mode: forwards]] faz?', 'Mantém o estilo do último quadro quando a animação termina', ['Repete a animação', 'Toca a animação ao contrário', 'Adianta a animação', 'Começa pelo último quadro']],
    ['Em [[transition: opacity .3s ease-in .1s]], o que é o [[.1s]]?', 'O atraso antes de começar (delay)', ['A duração', 'A suavização', 'A opacidade final', 'O tempo entre repetições']],
    ['Qual função de transform aumenta o elemento em 20%?', 'scale(1.2)', ['scale(20%)', 'zoom(1.2)', 'resize(120%)', 'grow(0.2)']]
  ]);

  W.pratico({
    id: 'cc-variaveis', nivel: 4, categoria: 'css', titulo: 'Tema com variáveis CSS',
    cfg: (r) => ({ cor: r.pick(W.CORES), esp: r.pick([6, 8, 10, 12]), rad: r.pick([4, 6, 8, 999]) }),
    html: () => '<h1 class="titulo">Painel</h1>\n<p>Personalize o tema mudando só as variáveis.</p>\n<button class="botao">Salvar</button>',
    enunciado: (k) => `<p>Crie um tema baseado em variáveis CSS definidas em ${c(':root')} e use-as no título e no botão.</p>`,
    checks: (k) => [
      { tipo: 'var', nome: '--cor-primaria', valor: k.cor, desc: `${c(`--cor-primaria: ${k.cor}`)} em ${c(':root')}` },
      { tipo: 'var', nome: '--espaco', valor: `${k.esp}px`, desc: `${c(`--espaco: ${k.esp}px`)} em ${c(':root')}` },
      { tipo: 'estilo', sel: '.titulo', prop: 'color', valor: k.cor, desc: `${c('.titulo')} com a cor da variável` },
      { tipo: 'estilo', sel: '.botao', prop: 'backgroundColor', valor: k.cor, desc: `${c('.botao')} com fundo na cor da variável` },
      { tipo: 'estilo', sel: '.botao', prop: 'color', valor: '#ffffff', desc: 'Texto do botão branco' },
      { tipo: 'estilo', sel: '.botao', prop: 'paddingLeft', valor: `${k.esp * 2}px`, desc: `Padding horizontal = o dobro de ${c('--espaco')} (${c('calc(var(--espaco) * 2)')})` },
      { tipo: 'estilo', sel: '.botao', prop: 'paddingTop', valor: `${k.esp}px`, desc: `Padding vertical = ${c('var(--espaco)')}` },
      { tipo: 'estilo', sel: '.botao', prop: 'borderTopLeftRadius', valor: `${k.rad}px`, desc: `Cantos com ${k.rad}px` }
    ],
    solucao: (k) => `:root {\n  --cor-primaria: ${k.cor};\n  --espaco: ${k.esp}px;\n}\n\n.titulo {\n  color: var(--cor-primaria);\n}\n\n.botao {\n  background-color: var(--cor-primaria);\n  color: #fff;\n  padding: var(--espaco) calc(var(--espaco) * 2);\n  border: none;\n  border-radius: ${k.rad}px;\n}`,
    dica: 'padding com dois valores: vertical horizontal.'
  });

  W.pratico({
    id: 'cc-transicao', nivel: 4, categoria: 'css', titulo: 'Botão com transição',
    cfg: (r) => ({ dur: r.pick([0.2, 0.25, 0.3, 0.4, 0.5]), cor: r.pick(W.CORES), rad: r.pick([6, 8, 10]) }),
    html: () => '<button class="botao">Comprar agora</button>',
    enunciado: (k) => `<p>Crie um botão cuja cor de fundo mude suavemente quando o mouse passar por cima (${c(':hover')}) e que suba levemente com ${c('transform')}.</p>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.botao', prop: 'backgroundColor', valor: k.cor, desc: `Fundo ${c(k.cor)} no estado normal` },
      { tipo: 'estilo', sel: '.botao', prop: 'transitionProperty', valor: 'background-color', contem: true, desc: `Transição em ${c('background-color')}` },
      { tipo: 'estilo', sel: '.botao', prop: 'transitionDuration', valor: `${k.dur}s`, contem: true, desc: `Duração de ${k.dur}s` },
      { tipo: 'estilo', sel: '.botao', prop: 'cursor', valor: 'pointer', desc: `Cursor de mãozinha (${c('cursor: pointer')})` },
      { tipo: 'estilo', sel: '.botao', prop: 'borderTopLeftRadius', valor: `${k.rad}px`, desc: `Cantos arredondados de ${k.rad}px` },
      { tipo: 'regra', seletor: '.botao:hover', desc: `Uma regra ${c('.botao:hover')} (com nova cor e ${c('transform')})` }
    ],
    solucao: (k) => `.botao {\n  background-color: ${k.cor};\n  color: #fff;\n  border: none;\n  padding: 12px 24px;\n  border-radius: ${k.rad}px;\n  cursor: pointer;\n  transition: background-color ${k.dur}s ease, transform ${k.dur}s ease;\n}\n\n.botao:hover {\n  background-color: #111827;\n  transform: translateY(-2px);\n}`,
    dica: 'A transition fica na regra normal do elemento, não no :hover, para animar na ida e na volta.'
  });

  W.pratico({
    id: 'cc-animacao', nivel: 4, categoria: 'css', titulo: 'Animação de carregamento',
    cfg: (r) => ({ nome: r.pick(['girar', 'rodar', 'spin']), dur: r.pick([0.8, 1, 1.2, 1.5, 2]), tam: r.pick([32, 40, 48]) }),
    html: () => '<div class="loader"></div>',
    enunciado: (k) => `<p>Crie um indicador de carregamento circular que gire sem parar, usando ${c(`@keyframes ${k.nome}`)}.</p>`,
    checks: (k) => [
      { tipo: 'medida', sel: '.loader', prop: 'offsetWidth', valor: k.tam, desc: `Largura visível ${k.tam}px` },
      { tipo: 'medida', sel: '.loader', prop: 'offsetHeight', valor: k.tam, desc: `Altura visível ${k.tam}px` },
      { tipo: 'estilo', sel: '.loader', prop: 'borderTopLeftRadius', valor: '50%', desc: `Formato circular (${c('border-radius: 50%')})` },
      { tipo: 'regra', seletor: `@keyframes ${k.nome}`, desc: `${c(`@keyframes ${k.nome}`)} definido (de 0 a 360 graus)` },
      { tipo: 'estilo', sel: '.loader', prop: 'animationName', valor: k.nome, desc: `${c('.loader')} usa a animação ${c(k.nome)}` },
      { tipo: 'estilo', sel: '.loader', prop: 'animationDuration', valor: `${k.dur}s`, desc: `Duração de ${k.dur}s por volta` },
      { tipo: 'estilo', sel: '.loader', prop: 'animationTimingFunction', valor: 'linear', desc: 'Velocidade constante (linear)' },
      { tipo: 'estilo', sel: '.loader', prop: 'animationIterationCount', valor: 'infinite', desc: 'Repete para sempre' }
    ],
    solucao: (k) => `@keyframes ${k.nome} {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.loader {\n  box-sizing: border-box;\n  width: ${k.tam}px;\n  height: ${k.tam}px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #4f46e5;\n  border-radius: 50%;\n  animation: ${k.nome} ${k.dur}s linear infinite;\n}`,
    dica: 'O atalho animation aceita: nome duração função repetição.'
  });

  W.pratico({
    id: 'cc-grid-areas', nivel: 4, categoria: 'css', titulo: 'Layout com grid-template-areas',
    cfg: (r) => ({ lat: r.pick([160, 180, 200, 220]), gap: r.pick([8, 12, 16]) }),
    html: () => '<div class="layout">\n  <header>Topo</header>\n  <aside>Menu lateral</aside>\n  <main>Conteúdo</main>\n  <footer>Rodapé</footer>\n</div>',
    enunciado: (k) => `<p>Monte o layout clássico com ${c('grid-template-areas')}: topo e rodapé ocupando a largura toda, e no meio o menu lateral (${k.lat}px) à esquerda do conteúdo.</p><pre class="code">┌──────────── topo ────────────┐\n│ lateral │      conteudo      │\n└─────────── rodape ───────────┘</pre>`,
    checks: (k) => [
      { tipo: 'estilo', sel: '.layout', prop: 'display', valor: 'grid', desc: `${c('.layout')} com ${c('display: grid')}` },
      { tipo: 'medida', sel: 'aside', prop: 'offsetWidth', valor: k.lat, desc: `Menu lateral com ${k.lat}px de largura` },
      { tipo: 'antes', a: 'aside', b: 'main', eixo: 'x', desc: 'O menu lateral fica à esquerda do conteúdo' },
      { tipo: 'antes', a: 'header', b: 'main', eixo: 'y', desc: 'O topo fica acima do conteúdo' },
      { tipo: 'antes', a: 'main', b: 'footer', eixo: 'y', desc: 'O rodapé fica abaixo do conteúdo' },
      { tipo: 'igualLargura', a: 'header', b: '.layout', desc: 'Topo ocupa toda a largura do layout' },
      { tipo: 'igualLargura', a: 'footer', b: '.layout', desc: 'Rodapé ocupa toda a largura do layout' },
      { tipo: 'estilo', sel: '.layout', prop: 'columnGap', valor: `${k.gap}px`, desc: `Espaço de ${k.gap}px entre as áreas` }
    ],
    solucao: (k) => `.layout {\n  display: grid;\n  grid-template-columns: ${k.lat}px 1fr;\n  grid-template-areas:\n    "topo    topo"\n    "lateral conteudo"\n    "rodape  rodape";\n  gap: ${k.gap}px;\n}\n\nheader { grid-area: topo; }\naside  { grid-area: lateral; }\nmain   { grid-area: conteudo; }\nfooter { grid-area: rodape; }`,
    dica: 'Cada string de grid-template-areas é uma linha; repetir um nome faz a área ocupar várias células.'
  });
})(typeof window !== 'undefined' ? window : globalThis);
