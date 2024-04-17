<h1 align="center">
  A API Gympass é uma aplicação back-end desenvolvida durante o aprendizado do módulo API Node.js da formação Node.js da <a href="https://app.rocketseat.com.br/home">Rocketseat</a>.
</h1>

<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge" alt="License"></a>
</p>

---

## 📁 Sobre o projeto

A aplicação desenvolvida consiste em uma API de gympass para academias e foi aplicada boas práticas de código limpo, padrão de arquitetura e de projeto, SOLID e testes.
Foi de grande importância o desenvolvimento desta aplicação, pois foi o passo inicial para compreensão de conceitos fundamentais para me tornar um especialista em Node.Js.
Através das orientações do educador Diego Fernandes, consegui absorver vários fundamentos da tecnologia Node.Js.

---

## 📝 Regras da aplicação

- [X] Deve ser possível criar um usuário
- [X] Deve ser possível se autenticar
- [X] Deve ser possível obter o perfil de um usuário logado
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [X] Deve ser possível o usuário obter o seu histórico de check-ins
- [X] Deve ser possível o usuário buscar academias mais próximas (até 10km)
- [X] Deve ser possível o usuário buscar academias pelo nome
- [X] Deve ser possível o usuário realizar check-in em uma academia
- [X] Deve ser possível validar o check-in de um usuário
- [X] Deve ser possível cadastrar uma academia

---

## 📝 Regras de negócio

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado
- [X] O usuário não pode fazer 2 check-in no mesmo dia
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [X] O check-in só pode ser validado até 20 minutos após criado
- [X] O check-in só pode ser validado por admins
- [X] A academia só pode ser cadastrada por admins

---

## Requisitos

- Node.js versão 20 ou superior;
- Docker.

---

## 💻 Tecnologias

- Fastify
- Fastify JWT
- Prisma
- PostgreSQL
- Zod
- Docker
- JavaScript
- Typescript
- Dotenv
- Dayjs
- Vitest

---

## 💡 Utilização
1. Clone o projeto:

```
$ git clone https://github.com/JaasielAntunes/gympass-api-solid.git
```

2. Acesse a pasta do projeto:

```
$ cd gympass-api-solid
```

3. Instale as dependências:

```
$ npm install
```

4. Execute:

```
$ docker compose up -d
```

```
$ npm run migrate:run
```

5. Inicie o servidor:

```
$ npm run dev
```

## 💻 Rotas HTTP

### POST `/users`

Cadastrar usuário

#### Corpo da requisição

```json
{
    "name": "Teste",
    "email": "teste@gmail.com",
    "password": "123321"
}
```

### POST `/gyms`

Cadastrar academia

#### Corpo da requisição (informar token JWT)

```json
{
    "name": "Gym",
    "email": "gym@gmail.com",
    "password": "123321"
}
```

### POST `/sessions`

Login de usuário

#### Corpo da requisição

```json
{
    "email": "admin@gmail.com",
    "password": "123321"
}
```

### GET `/me` (Informar token JWT)

 Obter perfil de um usuário cadastrado.

### PATCH `/token/refresh`

Atualização de token JWT

#### Corpo da requisição

```json
{
    "email": "teste@gmail.com",
    "password": "123321"
}
```

---

## ✅ Sugestão
- Utilize o Postman ou Insomnia para testar as requisições.
---

<h4 align="center">
  Feito com ❤️ por Jaasiel Antunes - <a href="mailto:contato.jaasiel@gmail.com.com">Entre em contato!</a>
</h4>

<p align="center">
  <a href="https://www.linkedin.com/in/jaasiel-antunes-1517b41bb/">
    <img alt="Jaasiel Antunes" src="https://img.shields.io/badge/LinkedIn-Jaasiel-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
