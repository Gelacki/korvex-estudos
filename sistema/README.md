# Kovex Estudos

Aplicativo desktop (Windows) que **gera exercícios de programação e lógica** do iniciante ao avançado, com correção automática, e produz **apostilas e listas em PDF**.

## Instalar

Execute `dist\Kovex-Estudos-Setup-1.1.0.exe`. O instalador cria atalhos na Área de Trabalho e no Menu Iniciar (instalar por cima da versão anterior mantém o progresso).
Como o executável não tem assinatura digital, o Windows SmartScreen pode avisar na primeira vez: clique em **Mais informações → Executar assim mesmo**.

Na primeira abertura, as 8 apostilas são geradas automaticamente em
`Documentos\Kovex Estudos\Apostilas` (a pasta pode ser trocada na tela **Apostilas**).
As listas geradas vão para a subpasta `Listas`.

## O que o sistema faz

| Tela | Função |
|---|---|
| **Início** | Progresso por nível e categoria, taxa de acerto, dias seguidos, histórico e trilha de estudos |
| **Praticar** | Gera um exercício novo a cada clique, filtrando por trilha, nível (1 a 4) e categoria |
| **Listas em PDF** | Monta listas com níveis, categorias e quantidade à escolha, com gabarito comentado opcional |
| **Apostilas** | 8 apostilas em duas trilhas (teoria + exercícios por capítulo + gabarito): ler no app, gerar e abrir o PDF |

### Trilha Programação & Lógica (Apostilas 01 a 04)
- **Lógica**: sequências, tabela-verdade, MDC/MMC, bases numéricas, combinatória, Big-O, grafos, “quem está mentindo”…
- **Teste de mesa**: código gerado com valores aleatórios; o aluno diz o que é impresso (a resposta vem da execução real do código).
- **Programação**: o aluno escreve uma função em JavaScript no editor e ela roda contra testes sorteados num Web Worker isolado, com limite de 3 s para pegar laço infinito.

### Trilha HTML & CSS (Apostilas 05 a 08)
| Apostila | Nível | Conteúdo |
|---|---|---|
| 05 · Primeiros Passos | Iniciante | Como a web funciona, estrutura HTML5, textos, listas, links, imagens, primeiro CSS |
| 06 · Fundamentos | Básico | Tabelas, formulários, semântica, seletores, cascata e especificidade, box model, unidades |
| 07 · Layout Moderno | Intermediário | Position, Flexbox, Grid, design responsivo, acessibilidade e SEO |
| 08 · Avançado | Avançado | Variáveis e funções CSS, transform/transições/animações, `:has()`/`@layer`/container queries, BEM, mídia e APIs do HTML5 |

Os exemplos das apostilas mostram o código **e o resultado renderizado**.
- **HTML** e **CSS (teoria)**: perguntas de conceito e exercícios calculados, como “qual linha tem o erro”, contagem na árvore DOM, conversão hex/RGB, box model, rem/em/vw, especificidade, quantos elementos um seletor atinge, flex-grow, colunas `fr`, media queries, cascata, variáveis e `clamp()`.
- **HTML e CSS (prática)**: o aluno escreve o código num editor com **pré-visualização ao vivo**. A página é renderizada num iframe isolado (sem scripts) e cada requisito é conferido no DOM real e nos estilos calculados pelo navegador: atributos, textos, `getComputedStyle`, medidas, posição relativa entre elementos e regras como `:hover` e `@keyframes`. Os layouts responsivos são testados em mais de uma largura de janela.

Hoje são **151 geradores**: 95 de programação e lógica e 56 de HTML/CSS (26 deles práticos). Cada um produz variações infinitas a partir de uma semente. O código mostrado no exercício (ex.: `#3ZMBR9`) identifica a variação.

## Desenvolvimento

```powershell
npm install
npm start                 # abre o app
npm run testar            # valida os 151 geradores com 300 sementes cada e monta as 8 apostilas
npm run apostilas         # regenera os PDFs em ..\apostilas
npm run dist              # testa e gera o instalador em dist\
```

### Problemas conhecidos no ambiente de desenvolvimento

- **`app` indefinido / "Cannot read properties of undefined (reading 'whenReady')"**: o terminal integrado do VS Code define `ELECTRON_RUN_AS_NODE=1`. Rode antes: `Remove-Item Env:ELECTRON_RUN_AS_NODE`.
- **"Electron failed to install correctly"**: com o Node 26 o download pós-instalação pode não extrair. Extraia manualmente o zip do cache (`%LOCALAPPDATA%\electron\Cache\...\electron-v33.*.zip`) em `node_modules\electron\dist` e crie `node_modules\electron\path.txt` com o conteúdo `electron.exe`.
- **"Cannot create symbolic link" no `npm run dist`**: ative o *Modo de Desenvolvedor* do Windows, ou extraia o `.7z` do winCodeSign em `%LOCALAPPDATA%\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0` ignorando a pasta `darwin` (`7za x arquivo.7z -xr!darwin -o<pasta>`).

## Estrutura

```
main.js                     processo principal: janela, PDF (printToPDF), pastas, modo --gerar-apostilas
preload.js                  ponte segura entre a interface e o sistema de arquivos
src/index.html, styles.css  interface
src/js/core.js              RNG com semente, utilitários, registro de geradores, correção de respostas
src/js/geradores/           logica.js · rastreio.js · programacao.js · web-comum.js · web-html.js · web-css.js
src/js/runner.js            executa o código JavaScript do aluno em Web Worker com tempo limite
src/js/web-runner.js        renderiza o HTML/CSS do aluno em iframe isolado e confere os requisitos
src/js/pdf.js               HTML/CSS das apostilas e listas (usado no PDF e no leitor do app)
src/js/conteudo/            texto das apostilas 1 a 4
scripts/                    validação dos geradores e geração do ícone
```

## Como adicionar exercícios

**Lógica / teste de mesa**: em `src/js/geradores/logica.js` ou `rastreio.js`:

```js
reg(2, 'meu-id', 'Título', (r) => ({
  enunciado: '<p>...</p>',
  resposta: '42',            // ou tipo: 'escolha', opcoes: [...], correta: 0
  dica: '...',
  explicacao: '<p>...</p>'
}));
```
No teste de mesa, use `montar(r, codigo)`: a resposta é obtida executando o código.

**Programação**: em `src/js/geradores/programacao.js`:

```js
def({
  nivel: 2, nome: 'dobro', titulo: 'Dobro', params: ['n'],
  enunciado: () => '<p>Retorne o dobro de n.</p>',
  solucao: () => 'function dobro(n) {\n  return n * 2;\n}',
  casos: (r) => [[2], [0], [r.int(-50, 50)]],   // os resultados esperados vêm da solução
  dica: 'Multiplique por 2.'
});
```

**HTML/CSS prático**: em `web-html.js` ou `web-css.js`:

```js
W.pratico({
  id: 'cc-sombra', nivel: 2, categoria: 'css', titulo: 'Sombra no card',
  html: () => '<div class="card">Olá</div>',            // só para CSS: o HTML fixo da página
  enunciado: () => '<p>Dê fundo branco ao card.</p>',
  checks: () => [
    { tipo: 'estilo', sel: '.card', prop: 'backgroundColor', valor: '#ffffff', desc: 'Fundo branco' }
  ],
  solucao: () => '.card { background: #fff; }',
  dica: '...'
});
```
Tipos de requisito: `existe`, `conta`, `sem`, `texto`, `attr`, `estilo`, `estiloNao`, `medida`, `antes`, `igualLargura`, `var`, `colunas` e `regra`. Use `largura` para testar uma largura de janela específica.

Depois rode `npm run testar`. Para colocar um exercício numa apostila, inclua `{ gen: 'id-do-gerador', n: quantidade }` em `exercicios` do capítulo (os geradores de programação têm o id `p-<nome>`).
