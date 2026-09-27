# Coragem Builder

# ATUALIZAÇÃO DO PROJETO: Material de contrução Coragem
> Versão atual: 1.0

## 🎯 OBJETIVO DA ATUALIZAÇÃO
**Tipos de alteração:** Outras alterações

**Descrição:** alterar o prompt para esse

Perfeito 👌
Aqui está o **PROMPT COMPLETO, ATUALIZADO**, já com **AZUL + AMARELO** integrados corretamente.
Pode **copiar e colar direto na AI** que você estiver usando.

---

# 🧱 Material de Construção Coragem — MVP (Site + Sistema de Orçamento)

## 👉 VISÃO GERAL DO PROJETO

**Nome do Projeto:** Material de Construção Coragem

**Descrição:**
Plataforma web para **organizar pedidos de orçamento e materiais**, centralizar atendimento via WhatsApp e melhorar a presença digital da loja no Google, **sem venda online direta**.

O site funciona como um **vendedor digital**, coletando pedidos de orçamento e direcionando o cliente para o WhatsApp, onde a venda é finalizada pelo atendente.

---

## 🎯 OBJETIVO DO MVP

* Organizar pedidos de orçamento
* Centralizar atendimento via WhatsApp
* Apresentar produtos de forma clara
* Informar entrega, horários e localização
* Passar credibilidade e profissionalismo
* Trazer clientes do Google (SEO local)

⚠️ **IMPORTANTE:**
Este projeto **NÃO é um e-commerce**.
Não deve existir botão “Comprar”, carrinho ou pagamento online.

---

## 👥 PÚBLICO-ALVO

### Público final do site

* Pessoas físicas (reformas e construções)
* Pedreiros e profissionais autônomos
* Pequenos construtores
* Empresas locais de construção

### Público comprador do site (quem contrataria esse projeto)

* Donos de lojas de material de construção
* Pequenas e médias lojas de bairro
* Lojas que fazem entrega
* Empresários que querem profissionalizar o negócio

---

## 🧱 PROBLEMAS QUE O SITE RESOLVE

### 🧱 Vendas e pedidos

* Pedido de orçamento organizado
* Centralização via WhatsApp
* Registro de pedidos fora do horário comercial
* Separação por tipo de cliente:

  * Pessoa física
  * Obra pequena
  * Construtor / empresa

---

### 📦 Produtos (informacional)

* Catálogo organizado por categorias
* Produtos com foto e descrição
* Produtos em destaque
* Aviso “produto sob consulta”
* Lista de marcas trabalhadas

---

### 🚚 Entregas

* Informações claras sobre entrega
* Regiões atendidas
* Prazo médio
* Opção:

  * Retirada na loja
  * Entrega em domicílio

---

### 📅 Atendimento

* Solicitação de orçamento técnico
* Upload de lista de materiais (PDF ou foto)
* Horário de funcionamento visível
* Redução de mensagens repetidas no WhatsApp

---

### 📍 Informações da loja

* Endereço com Google Maps
* Horário de funcionamento
* Telefones e WhatsApp
* Credibilidade local

---

## ⚡ FUNCIONALIDADES DO MVP

### 🌐 Área Pública (Site)

* Página inicial profissional
* Catálogo de produtos
* Página “Quem Somos”
* Página “Entrega”
* Página “Contato”
* Botão fixo de WhatsApp
* Botão **“Pedir Orçamento”**
* Site 100% responsivo (mobile-first)

---

### 📝 Formulários

* Formulário de pedido de orçamento
* Formulário de pedido de materiais
* Campo de mensagem livre
* Upload de lista de materiais
* Seleção:

  * Tipo de cliente
  * Entrega ou retirada

---

### 🛠️ Área Administrativa (/admin)

* Login exclusivo para administrador
* Lista de pedidos recebidos
* Dados do cliente
* Tipo de pedido
* Status do pedido:

  * Novo
  * Em atendimento
  * Finalizado
* Botão para contato direto via WhatsApp

---

## 🗄️ BACK-END (OBRIGATÓRIO)

### Estrutura de dados

**Tabela `usuarios`**

* id
* nome
* email
* senha_hash
* tipo (admin)
* criado_em

**Tabela `pedidos`**

* id
* nome_cliente
* telefone
* tipo_cliente
* tipo_entrega
* mensagem
* arquivo_lista
* status
* criado_em

### Segurança

* Autenticação segura
* Proteção da rota `/admin`
* Apenas administradores acessam o painel

---

## 🎨 DESIGN E ESTILO VISUAL (ATUALIZADO)

* **Estilo:** Minimalista
* **Cor primária:** Azul (#2563EB ou #1D4ED8)
* **Cor secundária / destaque:** Amarelo (#FACC15 ou #FBBF24)
* **Cores neutras:** Branco e cinza escuro (#1F2937)
* **Tipografia:** Inter (sans-serif moderna)
* **Imagens:** Reais (obra, materiais, equipe, caminhão)
* **Idioma:** Português (Brasil)

### 📌 Uso das cores

* **Azul:** cabeçalho, rodapé, títulos, seções principais
* **Amarelo:** botões de ação (CTA), ícones, destaques
* **Branco/Cinza:** fundo e textos longos

---

## 🔘 BOTÕES (CTA)

* Cor: Amarelo
* Texto:

  * “Pedir Orçamento”
  * “Chamar no WhatsApp”
* Hover: Amarelo mais escuro
* Botão fixo de WhatsApp visível em todas as páginas

---

## 🧩 STACK TÉCNICA

* Plataforma: **Lovable**
* Front-end: React + TypeScript
* Estilo: Tailwind CSS + shadcn/ui
* Back-end: Lovable Cloud (Supabase integrado)
* Autenticação com RLS
* Design mobile-first

---

## 🚀 INSTRUÇÕES FINAIS

* Implementar apenas funcionalidades do MVP
* Código limpo e organizado
* UX simples e direta
* Foco total em conversão para WhatsApp
* Não implementar e-commerce ou pagamentos
* Todas as telas em Português (Brasil)

---

## 🧱 FRASE QUE DEFINE O PRODUTO

> “Um site que organiza pedidos, fortalece a marca e transforma visitas em orçamentos.”

---

Se quiser, no próximo passo eu posso:

* Ajustar isso para **virar um template padrão da KN Sites**
* Criar **texto comercial pra você vender esse site**
* Definir **preço ideal + mensalidade**
* Adaptar o prompt pra **Bolt / Ready / outra AI**

Só mandar 🚀


## 📋 INSTRUÇÕES
**FUNCIONALIDADES ESSENCIAIS:**
- Sistema de autenticação
- Dashboard responsivo
- Validação de formulários
- Estados de loading
- Tratamento de erros

Cole este prompt na Lovable para implementar as atualizações solicitadas.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://materialcoragem.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ffa5b7e-ed36-430a-a943-607b95d63437).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
