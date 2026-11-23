/* Geradores de exercícios de LÓGICA */
(function (g) {
  const KX = g.KX;
  const U = KX.util;
  const reg = (nivel, id, titulo, gerar) => KX.registrar({ id, nivel, categoria: 'logica', titulo, gerar });
  const VF = (b) => (b ? 'V' : 'F');

  /* ===================== NÍVEL 1 ===================== */

  reg(1, 'seq-aritmetica', 'Sequência aritmética', (r) => {
    const a = r.int(1, 30), d = r.pick([2, 3, 4, 5, 6, 7, 8, 9, 11, -3, -4]);
    const termos = Array.from({ length: 5 }, (_, i) => a + i * d);
    return {
      enunciado: `<p>Observe a sequência e descubra o próximo número:</p><p class="destaque">${termos.join(', ')}, <b>?</b></p>`,
      resposta: String(a + 5 * d),
      dica: 'Calcule a diferença entre dois termos vizinhos.',
      explicacao: `<p>Cada termo é o anterior ${d > 0 ? 'somado a ' + d : 'menos ' + -d}. Logo, ${termos[4]} ${d > 0 ? '+ ' + d : '− ' + -d} = <b>${a + 5 * d}</b>.</p>`
    };
  });

  reg(1, 'seq-geometrica', 'Sequência geométrica', (r) => {
    const a = r.int(1, 5), q = r.pick([2, 3]);
    const termos = Array.from({ length: 5 }, (_, i) => a * q ** i);
    return {
      enunciado: `<p>Qual é o próximo termo da sequência?</p><p class="destaque">${termos.join(', ')}, <b>?</b></p>`,
      resposta: String(a * q ** 5),
      dica: 'Divida um termo pelo anterior.',
      explicacao: `<p>Cada termo é o anterior multiplicado por ${q}: ${termos[4]} × ${q} = <b>${a * q ** 5}</b>.</p>`
    };
  });

  reg(1, 'tv-simples', 'Valor lógico de uma expressão', (r) => {
    const A = r.bool(), B = r.bool();
    const exprs = [
      ['A E B', A && B], ['A OU B', A || B], ['NÃO A', !A], ['A E (NÃO B)', A && !B],
      ['NÃO (A OU B)', !(A || B)], ['(NÃO A) OU B', !A || B], ['NÃO (A E B)', !(A && B)]
    ];
    const [txt, val] = r.pick(exprs);
    return {
      tipo: 'escolha',
      enunciado: `<p>Considere <b>A = ${A ? 'Verdadeiro' : 'Falso'}</b> e <b>B = ${B ? 'Verdadeiro' : 'Falso'}</b>.</p><p>Qual é o valor da expressão:</p><p class="destaque">${txt}</p>`,
      opcoes: ['Verdadeiro', 'Falso'],
      correta: val ? 0 : 1,
      resposta: val ? 'Verdadeiro' : 'Falso',
      dica: 'E só é verdadeiro se ambos forem verdadeiros. OU é verdadeiro se pelo menos um for. NÃO inverte.',
      explicacao: `<p>Substituindo A = ${VF(A)} e B = ${VF(B)}, a expressão <b>${txt}</b> resulta em <b>${val ? 'Verdadeiro' : 'Falso'}</b>.</p>`
    };
  });

  reg(1, 'problema-aritmetico', 'Problema do dia a dia', (r) => {
    const tipo = r.int(0, 3);
    if (tipo === 0) {
      const preco = r.int(2, 15) * 20, pct = r.pick([10, 15, 20, 25, 30, 50]);
      const final = preco - (preco * pct) / 100;
      return {
        enunciado: `<p>Um produto custa <b>R$ ${preco}</b> e está com <b>${pct}% de desconto</b>. Qual o preço final (em reais)?</p>`,
        resposta: String(final),
        dica: 'Desconto = preço × porcentagem ÷ 100.',
        explicacao: `<p>Desconto: ${preco} × ${pct} ÷ 100 = ${(preco * pct) / 100}. Preço final: ${preco} − ${(preco * pct) / 100} = <b>${final}</b>.</p>`
      };
    }
    if (tipo === 1) {
      const alunos = r.int(25, 60), porFila = r.int(4, 8);
      return {
        enunciado: `<p>Um auditório recebe <b>${alunos}</b> alunos. Cada fileira tem <b>${porFila}</b> cadeiras. Quantas fileiras são necessárias para que todos se sentem?</p>`,
        resposta: String(Math.ceil(alunos / porFila)),
        dica: 'Se sobrar alguém, é preciso mais uma fileira.',
        explicacao: `<p>${alunos} ÷ ${porFila} = ${Math.floor(alunos / porFila)} com resto ${alunos % porFila}. ${alunos % porFila ? 'Como sobra gente, soma-se uma fileira' : 'Divisão exata'}: <b>${Math.ceil(alunos / porFila)}</b>.</p>`
      };
    }
    if (tipo === 2) {
      const ini = r.int(20, 80), ganhou = r.int(5, 30), deu = r.int(5, 20), pac = r.int(2, 5), por = r.pick([4, 5, 6, 8]);
      const res = ini + ganhou - deu + pac * por;
      return {
        enunciado: `<p>Ana tinha <b>${ini}</b> figurinhas, ganhou <b>${ganhou}</b> e deu <b>${deu}</b> ao irmão. Depois comprou <b>${pac}</b> pacotes com <b>${por}</b> figurinhas cada. Quantas figurinhas ela tem agora?</p>`,
        resposta: String(res),
        dica: 'Resolva por etapas: some o que ganhou, subtraia o que deu e depois some os pacotes.',
        explicacao: `<p>${ini} + ${ganhou} − ${deu} = ${ini + ganhou - deu}. Pacotes: ${pac} × ${por} = ${pac * por}. Total: <b>${res}</b>.</p>`
      };
    }
    const vel = r.pick([40, 50, 60, 80, 90, 100]), horas = r.int(2, 6), min = r.pick([0, 30]);
    const dist = vel * horas + (vel * min) / 60;
    return {
      enunciado: `<p>Um carro anda a velocidade constante de <b>${vel} km/h</b>. Que distância (em km) ele percorre em <b>${horas}h${min ? min + 'min' : ''}</b>?</p>`,
      resposta: String(dist),
      dica: 'Distância = velocidade × tempo (tempo em horas).',
      explicacao: `<p>Tempo = ${horas + min / 60} h. Distância = ${vel} × ${horas + min / 60} = <b>${dist}</b> km.</p>`
    };
  });

  reg(1, 'divisiveis-intervalo', 'Divisibilidade em um intervalo', (r) => {
    const a = r.int(1, 30), b = a + r.int(20, 80), k = r.int(2, 9);
    const qtd = Math.floor(b / k) - Math.floor((a - 1) / k);
    return {
      enunciado: `<p>Quantos números inteiros de <b>${a}</b> até <b>${b}</b> (inclusive) são divisíveis por <b>${k}</b>?</p>`,
      resposta: String(qtd),
      dica: `Quantos múltiplos de ${k} existem até ${b}? E até ${a - 1}?`,
      explicacao: `<p>Até ${b} há ⌊${b}/${k}⌋ = ${Math.floor(b / k)} múltiplos; até ${a - 1} há ⌊${a - 1}/${k}⌋ = ${Math.floor((a - 1) / k)}. Diferença: <b>${qtd}</b>.</p>`
    };
  });

  reg(1, 'ordem-logica', 'Ordenação por pistas', (r) => {
    const nomes = r.sample(['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Fábio'], 3);
    const [x, y, z] = nomes; // altura: x > y > z
    const pistas = r.shuffle([`${x} é mais alto(a) que ${y}.`, `${z} é mais baixo(a) que ${y}.`]);
    const pergunta = r.pick(['mais alto(a)', 'mais baixo(a)', 'do meio']);
    const resp = pergunta === 'mais alto(a)' ? x : pergunta === 'mais baixo(a)' ? z : y;
    const ops = r.shuffle(nomes);
    return {
      tipo: 'escolha',
      enunciado: `<p>Leia as pistas:</p><ul>${pistas.map((p) => `<li>${p}</li>`).join('')}</ul><p>Quem é o(a) <b>${pergunta}</b>?</p>`,
      opcoes: ops, correta: ops.indexOf(resp), resposta: resp,
      dica: 'Monte uma fila do mais alto para o mais baixo.',
      explicacao: `<p>Ordem: ${x} &gt; ${y} &gt; ${z}. Resposta: <b>${resp}</b>.</p>`
    };
  });

  /* ===================== NÍVEL 2 ===================== */

  reg(2, 'seq-segunda-ordem', 'Sequência com diferenças crescentes', (r) => {
    const a = r.int(1, 10), d0 = r.int(1, 5), inc = r.int(1, 4);
    const t = [a];
    for (let i = 0; i < 5; i++) t.push(t[i] + d0 + i * inc);
    const difs = t.slice(1).map((v, i) => v - t[i]);
    return {
      enunciado: `<p>Descubra o próximo termo:</p><p class="destaque">${t.slice(0, 5).join(', ')}, <b>?</b></p>`,
      resposta: String(t[5]),
      dica: 'Olhe as diferenças entre termos. Elas também formam um padrão.',
      explicacao: `<p>Diferenças: ${difs.slice(0, 4).join(', ')} — aumentam de ${inc} em ${inc}. Próxima diferença: ${difs[4]}. ${t[4]} + ${difs[4]} = <b>${t[5]}</b>.</p>`
    };
  });

  reg(2, 'seq-fibonacci', 'Sequência tipo Fibonacci', (r) => {
    const t = [r.int(1, 9), r.int(1, 9)];
    while (t.length < 7) t.push(t[t.length - 1] + t[t.length - 2]);
    return {
      enunciado: `<p>Qual o próximo termo?</p><p class="destaque">${t.slice(0, 6).join(', ')}, <b>?</b></p>`,
      resposta: String(t[6]),
      dica: 'Relacione cada termo com os dois anteriores.',
      explicacao: `<p>Cada termo é a soma dos dois anteriores: ${t[4]} + ${t[5]} = <b>${t[6]}</b>.</p>`
    };
  });

  reg(2, 'binario', 'Conversão binário ⇄ decimal', (r) => {
    const n = r.int(5, 255), bin = n.toString(2);
    if (r.bool()) {
      const partes = bin.split('').map((b, i) => (b === '1' ? 2 ** (bin.length - 1 - i) : null)).filter((x) => x !== null);
      return {
        enunciado: `<p>Converta o número binário para decimal:</p><p class="destaque">${bin}<sub>2</sub></p>`,
        resposta: String(n),
        dica: 'Cada posição vale uma potência de 2, da direita para a esquerda: 1, 2, 4, 8, 16...',
        explicacao: `<p>Somando as potências onde há 1: ${partes.join(' + ')} = <b>${n}</b>.</p>`
      };
    }
    return {
      enunciado: `<p>Converta o número decimal para binário:</p><p class="destaque">${n}<sub>10</sub></p>`,
      resposta: bin,
      aceitas: [bin.padStart(8, '0')],
      dica: 'Divida sucessivamente por 2 e leia os restos de baixo para cima.',
      explicacao: `<p>Divisões sucessivas por 2 e leitura dos restos de trás para frente: <b>${bin}</b>.</p>`
    };
  });

  reg(2, 'mdc-mmc', 'MDC e MMC', (r) => {
    const f = r.pick([2, 3, 4, 5, 6]), a = f * r.int(2, 9), b = f * r.int(2, 9);
    const mdc = U.mdc(a, b), mmc = (a * b) / mdc;
    const pedeMdc = r.bool();
    const contexto = pedeMdc
      ? `Uma loja quer dividir <b>${a}</b> canetas azuis e <b>${b}</b> vermelhas em kits iguais, sem misturar cores e sem sobras, usando o <b>maior</b> número possível de itens por kit. Quantos itens terá cada kit?`
      : `Dois ônibus saem juntos do terminal. Um passa a cada <b>${a}</b> minutos e o outro a cada <b>${b}</b>. Depois de quantos minutos eles saem juntos de novo?`;
    return {
      enunciado: `<p>${contexto}</p>`,
      resposta: String(pedeMdc ? mdc : mmc),
      dica: pedeMdc ? 'Procure o maior divisor comum (MDC).' : 'Procure o menor múltiplo comum (MMC).',
      explicacao: `<p>MDC(${a}, ${b}) = ${mdc}; MMC = ${a} × ${b} ÷ ${mdc} = ${mmc}. Resposta: <b>${pedeMdc ? mdc : mmc}</b>.</p>`
    };
  });

  reg(2, 'tv-contagem', 'Tabela-verdade', (r) => {
    const exprs = [
      ['(A E B) OU C', (A, B, C) => (A && B) || C, 3],
      ['A → B', (A, B) => !A || B, 2],
      ['(A OU B) E NÃO C', (A, B, C) => (A || B) && !C, 3],
      ['A ↔ B', (A, B) => A === B, 2],
      ['NÃO A OU (B E C)', (A, B, C) => !A || (B && C), 3],
      ['(A → B) E (B → C)', (A, B, C) => (!A || B) && (!B || C), 3],
      ['A XOU B', (A, B) => A !== B, 2]
    ];
    const [txt, f, nv] = r.pick(exprs);
    let cont = 0; const linhas = [];
    for (let i = 0; i < 2 ** nv; i++) {
      const vals = Array.from({ length: nv }, (_, k) => !((i >> (nv - 1 - k)) & 1));
      const v = f(...vals); if (v) cont++;
      linhas.push(`<tr>${vals.map((x) => `<td>${VF(x)}</td>`).join('')}<td><b>${VF(v)}</b></td></tr>`);
    }
    const cab = ['A', 'B', 'C'].slice(0, nv).map((x) => `<th>${x}</th>`).join('');
    return {
      enunciado: `<p>Monte a tabela-verdade da expressão abaixo. Em quantas linhas ela é <b>verdadeira</b>?</p><p class="destaque">${txt}</p><p class="obs">→ é a implicação (“se... então”), ↔ é a bicondicional (“se e somente se”), XOU é o “ou exclusivo”.</p>`,
      resposta: String(cont),
      dica: `Com ${nv} variáveis a tabela tem ${2 ** nv} linhas.`,
      explicacao: `<table class="tv"><tr>${cab}<th>${txt}</th></tr>${linhas.join('')}</table><p>Linhas verdadeiras: <b>${cont}</b>.</p>`
    };
  });

  reg(2, 'dia-semana', 'Aritmética modular (dias da semana)', (r) => {
    const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const hoje = r.int(0, 6), n = r.int(15, 400), alvo = (hoje + n) % 7;
    const ops = r.shuffle([alvo, ...r.sample([0, 1, 2, 3, 4, 5, 6].filter((d) => d !== alvo), 3)]);
    return {
      tipo: 'escolha',
      enunciado: `<p>Hoje é <b>${dias[hoje]}</b>. Que dia da semana será daqui a <b>${n}</b> dias?</p>`,
      opcoes: ops.map((d) => dias[d]), correta: ops.indexOf(alvo), resposta: dias[alvo],
      dica: 'A semana se repete a cada 7 dias: use o resto da divisão por 7.',
      explicacao: `<p>${n} % 7 = ${n % 7}. Avançando ${n % 7} dia(s) a partir de ${dias[hoje]}: <b>${dias[alvo]}</b>.</p>`
    };
  });

  /* ===================== NÍVEL 3 ===================== */

  reg(3, 'bitwise', 'Operações bit a bit', (r) => {
    const a = r.int(5, 63), b = r.int(5, 63);
    const [op, nome, f] = r.pick([['&', 'E (AND)', (x, y) => x & y], ['|', 'OU (OR)', (x, y) => x | y], ['^', 'OU exclusivo (XOR)', (x, y) => x ^ y]]);
    const res = f(a, b), bits = (v) => v.toString(2).padStart(6, '0');
    return {
      enunciado: `<p>Qual o resultado em decimal de:</p><p class="destaque">${a} ${op} ${b}</p><p class="obs">${op} é o operador ${nome} bit a bit.</p>`,
      resposta: String(res),
      dica: 'Converta os dois para binário, aplique a operação coluna a coluna e volte para decimal.',
      explicacao: `<pre class="code">  ${bits(a)}  (${a})\n${op} ${bits(b)}  (${b})\n  ------\n  ${bits(res)}  (${res})</pre><p>Resultado: <b>${res}</b>.</p>`
    };
  });

  reg(3, 'hexadecimal', 'Base hexadecimal', (r) => {
    const n = r.int(30, 4095), hex = n.toString(16).toUpperCase();
    if (r.bool()) return {
      enunciado: `<p>Converta para decimal:</p><p class="destaque">${hex}<sub>16</sub></p>`,
      resposta: String(n),
      dica: 'A=10, B=11, C=12, D=13, E=14, F=15. Cada posição vale uma potência de 16.',
      explicacao: `<p>${hex.split('').map((c, i) => `${parseInt(c, 16)}×16<sup>${hex.length - 1 - i}</sup>`).join(' + ')} = <b>${n}</b>.</p>`
    };
    return {
      enunciado: `<p>Converta para hexadecimal:</p><p class="destaque">${n}<sub>10</sub></p>`,
      resposta: hex, aceitas: ['0x' + hex],
      dica: 'Divida sucessivamente por 16. Restos de 10 a 15 viram A a F.',
      explicacao: `<p>Divisões por 16, lendo os restos de trás para frente: <b>${hex}</b>.</p>`
    };
  });

  reg(3, 'combinatoria', 'Contagem e combinatória', (r) => {
    const t = r.int(0, 3);
    if (t === 0) {
      const n = r.int(4, 7);
      return {
        enunciado: `<p>De quantas maneiras diferentes <b>${n}</b> pessoas podem formar uma fila?</p>`,
        resposta: String(U.fatorial(n)), dica: 'É uma permutação: n!',
        explicacao: `<p>${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')} = <b>${U.fatorial(n)}</b>.</p>`
      };
    }
    if (t === 1) {
      const n = r.int(5, 10), k = r.int(2, 4);
      return {
        enunciado: `<p>Uma equipe de <b>${k}</b> pessoas será escolhida entre <b>${n}</b> candidatos. A ordem não importa. Quantas equipes diferentes são possíveis?</p>`,
        resposta: String(U.comb(n, k)), dica: 'Combinação: C(n, k) = n! / (k! · (n−k)!)',
        explicacao: `<p>C(${n}, ${k}) = ${n}! / (${k}! · ${n - k}!) = <b>${U.comb(n, k)}</b>.</p>`
      };
    }
    if (t === 2) {
      const n = r.int(5, 12), res = n * (n - 1) * (n - 2);
      return {
        enunciado: `<p>Uma corrida tem <b>${n}</b> competidores. De quantas formas diferentes pode ser formado o pódio (1º, 2º e 3º lugar)?</p>`,
        resposta: String(res), dica: 'A ordem importa: arranjo A(n, 3).',
        explicacao: `<p>${n} × ${n - 1} × ${n - 2} = <b>${res}</b>.</p>`
      };
    }
    const n = r.int(5, 20), res = (n * (n - 1)) / 2;
    return {
      enunciado: `<p>Em uma reunião com <b>${n}</b> pessoas, cada uma aperta a mão de todas as outras exatamente uma vez. Quantos apertos de mão acontecem?</p>`,
      resposta: String(res), dica: 'Cada aperto envolve um par de pessoas: C(n, 2).',
      explicacao: `<p>C(${n}, 2) = ${n} × ${n - 1} ÷ 2 = <b>${res}</b>.</p>`
    };
  });

  reg(3, 'soma-pa', 'Soma de progressão aritmética', (r) => {
    const a1 = r.int(1, 20), d = r.int(1, 7), n = r.int(10, 50);
    const an = a1 + (n - 1) * d, s = (n * (a1 + an)) / 2;
    return {
      enunciado: `<p>Qual é a soma dos <b>${n}</b> primeiros termos da sequência abaixo?</p><p class="destaque">${a1}, ${a1 + d}, ${a1 + 2 * d}, ${a1 + 3 * d}, ...</p>`,
      resposta: String(s),
      dica: 'Sₙ = n · (a₁ + aₙ) / 2, com aₙ = a₁ + (n − 1) · r.',
      explicacao: `<p>a<sub>${n}</sub> = ${a1} + ${n - 1} × ${d} = ${an}. S = ${n} × (${a1} + ${an}) ÷ 2 = <b>${s}</b>.</p>`
    };
  });

  reg(3, 'pilha-fila', 'Pilha e fila', (r) => {
    const ehPilha = r.bool();
    const ops = []; const est = [];
    for (let i = 0; i < 9; i++) {
      if (est.length && r.bool(0.35)) {
        const v = ehPilha ? est.pop() : est.shift();
        ops.push(ehPilha ? 'desempilha' : 'desenfileira'); void v;
      } else {
        const v = r.int(1, 50); est.push(v);
        ops.push(`${ehPilha ? 'empilha' : 'enfileira'} ${v}`);
      }
    }
    if (!est.length) { const v = r.int(1, 50); est.push(v); ops.push(`${ehPilha ? 'empilha' : 'enfileira'} ${v}`); }
    const resp = ehPilha ? est[est.length - 1] : est[0];
    return {
      enunciado: `<p>Uma <b>${ehPilha ? 'pilha' : 'fila'}</b> começa vazia e recebe as operações, na ordem:</p><p class="destaque mono">${ops.join(' → ')}</p><p>Qual elemento está ${ehPilha ? 'no <b>topo</b> da pilha' : 'na <b>frente</b> da fila'} ao final?</p>`,
      resposta: String(resp),
      dica: ehPilha ? 'Pilha: o último a entrar é o primeiro a sair (LIFO).' : 'Fila: o primeiro a entrar é o primeiro a sair (FIFO).',
      explicacao: `<p>Conteúdo final (${ehPilha ? 'base → topo' : 'frente → fim'}): [${est.join(', ')}]. Resposta: <b>${resp}</b>.</p>`
    };
  });

  /* ===================== NÍVEL 4 ===================== */

  reg(4, 'recorrencia', 'Relação de recorrência', (r) => {
    const a = r.int(1, 5), k = r.int(2, 3), c = r.int(-3, 5), m = r.int(4, 6);
    const v = [a]; for (let i = 1; i <= m; i++) v.push(k * v[i - 1] + c);
    const cs = c === 0 ? '' : c > 0 ? ` + ${c}` : ` − ${-c}`;
    return {
      enunciado: `<p>Considere a função definida por:</p><p class="destaque">f(0) = ${a}<br>f(n) = ${k} · f(n − 1)${cs}, para n ≥ 1</p><p>Quanto vale <b>f(${m})</b>?</p>`,
      resposta: String(v[m]),
      dica: 'Calcule f(1), f(2), ... passo a passo.',
      explicacao: `<p>${v.map((x, i) => `f(${i}) = ${x}`).join('; ')}. Resposta: <b>${v[m]}</b>.</p>`
    };
  });

  const COMPLEXIDADES = [
    ['O(1)', 'function f(v) {\n  return v[0] + v[v.length - 1];\n}'],
    ['O(n)', 'function f(v) {\n  let s = 0;\n  for (let i = 0; i < v.length; i++) s += v[i];\n  return s;\n}'],
    ['O(n²)', 'function f(v) {\n  let c = 0;\n  for (let i = 0; i < v.length; i++)\n    for (let j = 0; j < v.length; j++)\n      if (v[i] === v[j]) c++;\n  return c;\n}'],
    ['O(log n)', 'function f(n) {\n  let passos = 0;\n  while (n > 1) {\n    n = Math.floor(n / 2);\n    passos++;\n  }\n  return passos;\n}'],
    ['O(n log n)', 'function f(n) {\n  let c = 0;\n  for (let i = 0; i < n; i++)\n    for (let j = 1; j < n; j *= 2)\n      c++;\n  return c;\n}'],
    ['O(n³)', 'function f(n) {\n  let c = 0;\n  for (let i = 0; i < n; i++)\n    for (let j = 0; j < n; j++)\n      for (let k = 0; k < n; k++)\n        c++;\n  return c;\n}'],
    ['O(2ⁿ)', 'function f(n) {\n  if (n <= 1) return n;\n  return f(n - 1) + f(n - 2);\n}'],
    ['O(n)', 'function f(v) {\n  let maior = -Infinity;\n  for (const x of v) if (x > maior) maior = x;\n  for (const x of v) if (x === maior) return x;\n}']
  ];
  reg(4, 'big-o', 'Complexidade de algoritmos', (r) => {
    const [resp, cod] = r.pick(COMPLEXIDADES);
    const todas = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)'];
    const ops = r.shuffle([resp, ...r.sample(todas.filter((x) => x !== resp), 3)]);
    const motivo = {
      'O(1)': 'faz um número fixo de operações, independente do tamanho da entrada',
      'O(n)': 'percorre a entrada um número constante de vezes',
      'O(n²)': 'tem dois laços aninhados, cada um com n iterações',
      'O(log n)': 'divide o problema pela metade a cada passo',
      'O(n log n)': 'o laço externo roda n vezes e o interno dobra j até n (log n vezes)',
      'O(n³)': 'tem três laços aninhados de n iterações',
      'O(2ⁿ)': 'cada chamada gera duas novas chamadas recursivas'
    }[resp];
    return {
      tipo: 'escolha',
      enunciado: `<p>Qual a complexidade de tempo (notação Big-O) da função abaixo, em função de n (o tamanho da entrada)?</p>${U.codigo(cod)}`,
      opcoes: ops, correta: ops.indexOf(resp), resposta: resp,
      dica: 'Conte quantas vezes a operação mais interna executa quando n cresce.',
      explicacao: `<p><b>${resp}</b>: o algoritmo ${motivo}.</p>`
    };
  });

  reg(4, 'busca-binaria-passos', 'Busca binária', (r) => {
    const n = r.pick([10, 50, 100, 500, 1000, 4000, 10000, 65536, 1000000]);
    const res = Math.floor(Math.log2(n)) + 1;
    return {
      enunciado: `<p>Uma lista <b>ordenada</b> tem <b>${n.toLocaleString('pt-BR')}</b> elementos. No <b>pior caso</b>, quantas comparações a busca binária faz para concluir a busca?</p>`,
      resposta: String(res),
      dica: 'A cada comparação, metade dos elementos restantes é descartada: ⌊log₂ n⌋ + 1.',
      explicacao: `<p>⌊log₂ ${n}⌋ + 1 = ${Math.floor(Math.log2(n))} + 1 = <b>${res}</b>.</p>`
    };
  });

  reg(4, 'grafos-contagem', 'Grafos e árvores', (r) => {
    const t = r.int(0, 2), n = r.int(5, 30);
    if (t === 0) return {
      enunciado: `<p>Um grafo <b>completo</b> (todos os vértices ligados entre si) não direcionado tem <b>${n}</b> vértices. Quantas arestas ele possui?</p>`,
      resposta: String((n * (n - 1)) / 2), dica: 'Cada par de vértices forma uma aresta.',
      explicacao: `<p>n(n−1)/2 = ${n} × ${n - 1} ÷ 2 = <b>${(n * (n - 1)) / 2}</b>.</p>`
    };
    if (t === 1) return {
      enunciado: `<p>Uma <b>árvore</b> (grafo conexo e sem ciclos) tem <b>${n}</b> vértices. Quantas arestas ela tem?</p>`,
      resposta: String(n - 1), dica: 'Uma árvore com n vértices sempre tem a mesma quantidade de arestas.',
      explicacao: `<p>Toda árvore com n vértices tem n − 1 arestas: <b>${n - 1}</b>.</p>`
    };
    const h = r.int(2, 9), res = 2 ** (h + 1) - 1;
    return {
      enunciado: `<p>Quantos nós tem, no máximo, uma <b>árvore binária</b> de altura <b>${h}</b>? (A raiz sozinha tem altura 0.)</p>`,
      resposta: String(res), dica: 'Cada nível k tem até 2ᵏ nós.',
      explicacao: `<p>1 + 2 + 4 + ... + 2<sup>${h}</sup> = 2<sup>${h + 1}</sup> − 1 = <b>${res}</b>.</p>`
    };
  });

  reg(4, 'mentirosos', 'Verdade ou mentira', (r) => {
    // Três pessoas; exatamente uma mente. Cada uma afirma algo sobre quem quebrou o vaso.
    const nomes = r.sample(['Ana', 'Bia', 'Caio', 'Davi', 'Eva', 'Gil'], 3);
    for (let tent = 0; tent < 50; tent++) {
      const culpado = r.int(0, 2);
      const tipos = [0, 1, 2].map(() => r.int(0, 2));
      const alvos = [0, 1, 2].map((i) => r.pick([0, 1, 2].filter((j) => j !== i)));
      const frase = (i) => tipos[i] === 0 ? `"Fui eu."` : tipos[i] === 1 ? `"Foi ${nomes[alvos[i]]}."` : `"Não foi ${nomes[alvos[i]]}."`;
      const verdade = (i, c) => tipos[i] === 0 ? c === i : tipos[i] === 1 ? c === alvos[i] : c !== alvos[i];
      const solucoes = [0, 1, 2].filter((c) => [0, 1, 2].filter((i) => !verdade(i, c)).length === 1);
      if (solucoes.length === 1 && solucoes[0] === culpado) {
        return {
          tipo: 'escolha',
          enunciado: `<p>Um vaso foi quebrado e uma destas três pessoas é a culpada. Sabe-se que <b>exatamente uma delas mente</b>.</p><ul>${[0, 1, 2].map((i) => `<li><b>${nomes[i]}</b>: ${frase(i)}</li>`).join('')}</ul><p>Quem quebrou o vaso?</p>`,
          opcoes: nomes, correta: culpado, resposta: nomes[culpado],
          dica: 'Teste cada suspeito como culpado e conte quantas frases ficariam falsas.',
          explicacao: `<p>Supondo que <b>${nomes[culpado]}</b> é o culpado, só a frase de ${nomes[[0, 1, 2].find((i) => !verdade(i, culpado))]} é falsa — exatamente uma mentira. As outras hipóteses não dão exatamente uma mentira.</p>`
        };
      }
    }
    // fallback determinístico
    return {
      tipo: 'escolha',
      enunciado: `<p>Exatamente um mente.</p><ul><li><b>${nomes[0]}</b>: "Foi ${nomes[1]}."</li><li><b>${nomes[1]}</b>: "Não fui eu... foi ${nomes[2]}."</li><li><b>${nomes[2]}</b>: "Não fui eu."</li></ul><p>Quem foi?</p>`,
      opcoes: nomes, correta: 1, resposta: nomes[1], dica: 'Teste cada hipótese.',
      explicacao: `<p>Se foi ${nomes[1]}: só ${nomes[1]} mente. Resposta: <b>${nomes[1]}</b>.</p>`
    };
  });
})(typeof window !== 'undefined' ? window : globalThis);
