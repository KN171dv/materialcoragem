# Site Coragem — novo site (estático, sem framework)

## O que é isso
Site novo, completo, escrito em HTML/CSS/JS puro (sem React, sem build tool).
Gerado por um script Python (`build.py`) que monta as 7 páginas a partir de
templates — assim título, meta tags e dados (endereço, telefone, horário)
ficam centralizados em um só lugar.

## Estrutura
```
coragem-site/
├── build.py           <- gera o site (roda: python3 build.py)
├── src/assets/
│   ├── style.css       <- todo o CSS do site
│   └── script.js       <- toda a interatividade (menu, formulário, animações)
└── dist/                <- SAÍDA PRONTA — é isso que vai pro Vercel
    ├── index.html
    ├── produtos.html
    ├── quem-somos.html
    ├── entrega.html
    ├── contato.html
    ├── orcamento.html
    ├── material-de-construcao-mendanha-campo-grande.html
    ├── robots.txt
    ├── sitemap.xml
    └── assets/
        ├── style.css
        └── script.js
```

## Como colocar no seu repositório (VS Code + GitHub + Vercel)

Você já tem o repositório da Lovable clonado no VS Code e o GitHub já
conectado no Vercel. Passos:

1. **Apague o conteúdo antigo do repositório** (os arquivos do projeto
   React/Vite que vieram da Lovable — `src/`, `package.json`, `vite.config.ts`,
   etc.) — ou mova para uma pasta `_antigo-lovable/` se preferir guardar de
   lado por enquanto.

2. **Copie o conteúdo da pasta `dist/`** (deste pacote) para a **raiz** do
   seu repositório. Ou seja, `index.html`, `produtos.html`, `assets/`, etc.
   ficam direto na raiz do repo (não dentro de uma subpasta `dist/`).

   Dica: também copie `build.py` e a pasta `src/` pra raiz do repo — assim,
   se um dia você (ou eu, numa próxima conversa) quiser editar um texto,
   preço ou adicionar uma categoria nova, basta editar `build.py` e rodar
   `python3 build.py` de novo pra regenerar tudo, em vez de editar cada HTML
   na mão.

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

5. Depois de comprar o domínio (`materialcoragem.com.br`, por exemplo), é só
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
  Lenis, carregados via CDN — funcionam sozinhos, sem instalar nada).
