# Sistema de Indicação — Referral System

## 🧭 Visão Geral

O **Referral System** é uma aplicação web (SPA — *Single Page Application*) que implementa um sistema de **indicação de usuários com pontuação**. O sistema permite que novos usuários se cadastrem e, ao usarem um link de indicação de outro usuário, atribuam pontos a quem os indicou.

Este projeto foi desenvolvido para o **Desafio Técnico — Etapa 3**, demonstrando habilidades de desenvolvimento *full-stack*, boas práticas de código e domínio de CSS puro (sem frameworks visuais).

---

## 🧩 Estrutura do Projeto

```
ReferralSystem/
│
├── ReferralSystem-Back/        # API REST em Node.js + Prisma
│   ├── server.js               # Ponto de entrada da API
│   ├── package.json
│   ├── prisma/schema.prisma    # Modelagem do banco de dados
│
├── frontSystem-Front/          # Aplicação SPA em React + Vite
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Login/          # Formulários de cadastro e login
│   │   │   ├── ReferralProfile/ # Página de perfil com link de indicação
│   │   ├── Services/api.js     # Comunicação com a API
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── vite.config.js
│   ├── package.json
│
└── README.md                   # Este arquivo
```

---

## 🚀 Funcionalidades

## Funcionalidades Principais

### 1. Sistema de Links de Referência

O sistema permite a geração de links únicos de referência para cada usuário, possibilitando o rastreamento e atribuição de novos cadastros. Cada link contém um identificador único que vincula automaticamente novos usuários ao referenciador.

**Características:**

* Geração automática de links personalizados por usuário
* Identificadores únicos e seguros
* Rastreamento completo da origem dos cadastros
* Persistência das relações de referência no banco de dados

### 2. Interface Responsiva

A aplicação foi desenvolvida com abordagem mobile-first, garantindo experiência otimizada em todos os dispositivos e tamanhos de tela.

**Compatibilidade:**

* Smartphones (portrait e landscape)
* Tablets
* Desktops e monitores wide
* Adaptação automática de layouts e componentes

### 3. Validação de Dados em Tempo Real

Implementação de validações instantâneas durante o preenchimento de formulários, oferecendo feedback imediato ao usuário.

**Validações incluem:**

* Formato de e-mail
* Campos obrigatórios
* Padrão de senha
* Feedback visual imediato (cores, ícones, mensagens)

### 4. Sistema de Pontuação por Indicação

Mecanismo automático de recompensa para usuários que indicam novos membros através de seus links de referência.

**Funcionamento:**

* Quando um novo usuário se cadastra com um link de indicação, o usuário que o indicou recebe **+1 ponto**.
* Pontuação é atualizada ao recarregar a página.

### Cadastro e Login

* Cadastro com **nome, e-mail e senha**.
* Validação de e-mail e senha (mínimo 8 caracteres, letras e números).
* Validação de usuários ja cadastrados.

### Página de Perfil

* Exibe:

  * Nome do usuário.
  * Pontuação atual (inicialmente 0).
  * Link único de indicação.
  * Botão **“Copiar Link”** (usa `navigator.clipboard`).

### Sistema de Indicação

* Quando um novo usuário se cadastra com um link de indicação, o usuário que o indicou recebe **+1 ponto**.
* Pontuação é atualizada ao recarregar a página.

---

## ⚙️ Tecnologias Utilizadas

### Front-end

* **React + Vite** — criação da SPA com rápido *build* e *hot reload*.
* **JavaScript (ES6)** — manipulação de estado e comunicação com API.
* **CSS puro** — responsividade e estilização sem frameworks externos (conforme exigência do desafio).

### Back-end

* **Node.js + ****Expres****s** — servidor leve e rápido para APIs REST.
* **Prisma ORM** — abstração e manipulação do banco de dados.
* **Mongo db**— banco leve e fácil de configurar.

**Justificativas:**

* React e Vite foram escolhidos pela agilidade e modularidade na criação de SPAs.
* Prisma simplifica o acesso ao banco, mantendo segurança e clareza no schema.
* CSS puro destaca a capacidade técnica de estilização sem dependências visuais.

---

## 🧱 Banco de Dados

**Modelo (Prisma):**

```prisma
model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  email        String   @unique
  name         String
  senha        String
  codigoRef    String   @unique   // código único que o usuário pode compartilhar
  pontos       Int      @default(0) // pontos acumulados
}
```

**Lógica de Pontuação:**

* Ao criar um novo usuário com um `referralCode` válido, o sistema encontra o usuário original e incrementa sua pontuação em +1.

---

## 🔌 API — Endpoints Principais

### POST `/register`

Cria um novo usuário.

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "Senha123",
  "referralCode": "abc123" // opcional
}
```

### POST `/login`

Autentica um usuário existente.

```json
{
  "email": "joao@example.com",
  "password": "Senha123"
}
```

### GET `/user/:id`

Retorna informações do usuário logado.

```json
{
  "name": "João Silva",
  "score": 3,
  "referralCode": "abc123"
}
```

---

## 💻 Executando o Projeto Localmente

### 🔧 Pré-requisitos

* Node.js v16+
* npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/caiopacely/ReferralSystem.git
cd ReferralSystem
```

### 2. Inicie o Back-end

```bash
cd ReferralSystem-Back
npm install
npx prisma migrate dev --name init
npm start
```

Servidor disponível em: `http://localhost:4000`

### 3. Inicie o Front-end

```bash
cd ../frontSystem-Front
npm install
npm run dev
```

Aplicação disponível em: `http://localhost:5173`

---

## 🎨 Estilização e Responsividade

* Desenvolvido em **CSS puro**, com uso de *flexbox* e *media queries*.
* Responsivo para:

  * **Mobile:** até 480px
  * **Tablet:** até 1024px
  * **Desktop:** acima de 1024px

---

## 🧪 Testes e Validações

* **Front-end:**

  * Validação de e-mail com Regex.
  * Senha mínima de 8 caracteres contendo letras e números.
* **Back-end:**

  * Criptografia de senha com bcrypt.
  * Verificação de e-mail duplicado.

---

---

## 🤖 Colaboração com IA

Durante o desenvolvimento, ferramentas de IA foram utilizadas para **acelerar a escrita de código e documentação**, mantendo sempre revisão humana:

* **ChatGPT:** apoio na estruturação do README e geração de trechos de validação (regex, mensagens de erro) .
* **GitHub Copilot:** autocompletar funções repetitivas no front e back.

**Aprendizados:**

* A IA foi útil para acelerar a prototipagem, mas todas as decisões de arquitetura e regras de negócio foram revisadas manualmente.

---

## 🧠 Próximos Passos

* Adicionar atualização em tempo real (WebSockets).
* Criar dashboard administrativo de indicações.
* Implementar testes automatizados.
* Melhorar a segurança

---

> Desenvolvido por **Caio Pacely** — Projeto de Desafio Técnico — Sistema de Indicação (Referral System).
