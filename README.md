# Site Coragem — novo site (estático, sem framework)

## O que é isso
Site novo, completo, escrito em HTML/CSS/JS puro (sem React, sem build tool).
Gerado por um script Python (`build.py`) que monta as 7 páginas a partir de
templates — assim título, meta tags e dados (endereço, telefone, horário)
ficam centralizados em um só lugar.

## Estrutura
```
materialcoragem/
├── build.py            <- gera o HTML do site (roda: python3 build.py)
├── vercel.json         <- publica a pasta site/ (outputDirectory: "site")
├── public/upload/      <- arquivo original da logo
└── site/               <- É ISSO QUE VAI PRO VERCEL
    ├── index.html, produtos.html, quem-somos.html, entrega.html,
    │   contato.html, orcamento.html,
    │   material-de-construcao-mendanha-campo-grande.html   <- gerados pelo build.py
    ├── robots.txt, sitemap.xml                             <- gerados pelo build.py
    ├── favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png,
    │   site.webmanifest                                    <- ícones (castelo da logo)
    └── assets/         <- editados à mão (o build.py não mexe aqui)
        ├── style.css       <- todo o CSS do site
        ├── script.js       <- menu, formulário, mapa, FAQ, animações e scroll
        └── logo-coragem.png
```

### Como editar
- **Texto, telefone, endereço, horário, categorias, FAQ:** edite `build.py`
  e rode `python3 build.py`. Ele reescreve os HTML e o sitemap em `site/`.
  Não edite os `.html` à mão, senão a próxima geração apaga a mudança.
- **Visual e interações:** edite `site/assets/style.css` e
  `site/assets/script.js` direto.
- Pra conferir o resultado sem mexer em `site/`:
  `python3 build.py /tmp/teste` gera numa pasta separada.

## Como colocar no seu repositório (VS Code + GitHub + Vercel)

Você já tem o repositório da Lovable clonado no VS Code e o GitHub já
conectado no Vercel. Passos:

1. **Apague o conteúdo antigo do repositório** (os arquivos do projeto
   React/Vite que vieram da Lovable — `src/`, `package.json`, `vite.config.ts`,
   etc.) — ou mova para uma pasta `_antigo-lovable/` se preferir guardar de
   lado por enquanto.

2. **O site fica na pasta `site/`** e o `vercel.json` já manda o Vercel
   publicar essa pasta. Pra mudar texto, preço ou categoria, edite
   `build.py` e rode `python3 build.py` (veja "Como editar" acima).

3. **Commit e push:**
   ```
   git add .
   git commit -m "Novo site: design profissional + SEO local + formulário WhatsApp"
   git push
   ```

4. Como o Vercel já está conectado no seu GitHub, o push sozinho já dispara
   o deploy. Não precisa configurar nada — o Vercel detecta que é um site
   estático (sem framework) e serve os arquivos direto. Em ~1 minuto você
   tem uma URL tipo `coragem-site.vercel.app`.

5. O domínio registrado é `coragemabr.com.br` (sem www). Pra configurar outro, é só
   ir em **Project Settings → Domains** no Vercel e adicionar o domínio —
   ele te dá os registros de DNS pra colocar no registrador (Registro.br).
   Aviso quando chegar nessa parte que te guio passo a passo.

## O que tem de diferente/melhor que o site antigo (Lovable)
- Cada página tem título e descrição própria pro Google (o site antigo era
  uma SPA só com um título fixo pra tudo).
- Dados estruturados (JSON-LD) com endereço, telefone, horário e nota do
  Google — ajuda o Google a entender que é uma loja física.
- Nova página `material-de-construcao-mendanha-campo-grande.html` mirando
  as buscas locais.
- Formulário de orçamento manda tudo pronto pro WhatsApp (não guarda dado
  nenhum, não precisa de backend).
- Animações sutis de entrada ao rolar a página e rolagem suave (GSAP +
  ScrollTrigger + Lenis + Motion, carregados via CDN — funcionam sozinhos,
  sem instalar nada). O Lenis roda num único loop, o do `gsap.ticker`: não
  crie outro `requestAnimationFrame` pra ele, isso volta a travar o scroll.
- O mapa do Google só carrega quando a pessoa clica em "Carregar mapa"
  (deixa a página ~400 KiB mais leve e não "sequestra" a rolagem).
- Na página de entrega, a animação do caminhão é um SVG leve controlado
  pelo scroll (`initTruckScene` em `script.js`).
