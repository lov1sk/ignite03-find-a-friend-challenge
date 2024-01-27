# 🖥️ Projeto - API Find a Friend

Este é um projeto construido como proposta de um desafio do modulo de nodeJs do ignite, seu objetivo é fornecer uma api
para uma aplicação de adoção de animais. Nesta é possivel uma ong cadastrar animais que estão disponiveis para serem
adotados e ajuda-los a finalmente achar um lar.

Uma pessoa interessada na adoção pode filtrar pets que estão disponiveis para adoção em sua cidade, e filtrar por caracteristicas
que um pet tambem pode possuir, como: energia,nivel de independencia, porte e idade; lembrando que o unico filtro obrigatorio é de pets
que estão na mesma cidade que a pessoa que irá adotar.

Para enfim realizar a adoção, a pessoa escolhe o pet desejado, e entra em contato com a ong via whats-app.

### Tecnologias

<div style="display: inline_block">         
  <img align="center" height="30" width="40"  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />  
  <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />
  <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />
</div><br/>

## Instalação

1. Clone o repositorio:

```bash
  git clone https://github.com/Fernanda-Kipper/desafio-backend-uber.git
```

2. Instale as dependencias

```bash
  npm i
```

3. Preencha as variaveis de ambiente .env

## Uso da API

1. Iniciar containers

```bash
  docker compose up -d
```

2. Iniciar servidor

```bash
  npm run start:dev
```

3. Realizar requisições a API usando o endereço base http://localhost:"SuaPorta"/"endpoint"

## Endpoints

### POST Autenticação de ongs

```bash
  POST /ongs/sign-in - Atraves do e-mail e senha, realiza autenticação da ong e devolve um token jwt para o cliente, assim como seta um http cookie para o refresh token.
```

```json
{
  "email": "test@example.com",
  "password": "test"
}
```

### PATCH Refresh

```bash
  PATCH /ongs/refresh - Atraves do e-mail e senha, realiza a atualização do token jwt de curta duração.
```

```json
{}
```

### POST Cadastro de ongs

```bash
  POST /ongs - Cadastra uma nova ong na aplicação
```

```json
{
  "name": "Teste",
  "city": "Teste",
  "address": "Rua teste",
  "zipcode": "00000000",
  "email": "test@example.com",
  "password": "test",
  "whatsapp": "11 999999999"
}
```

### GET Buscar pets

```bash
  GET /pets?city=test&size=test&independece=test - Busca pets com base em filtros passados.
```

### GET Busca um pet especifico

```bash
  GET /pets/:id - Busca pets com base em um id.
```

### GET Entrar em contato com a ong para adotar um pet

```bash
  GET /pets/:id/adopt - Com base em um pet, busca dados da ong para entrar em contato
```

### POST Criar pet

```bash
  POST /ongs/:id/pets - Com base em no id de uma ong, cria um novo pet
```

obs: Essa rota precisa que a ong esteja autenticada

```json
"name": "Pet 01",
"about": "A new Pet",
"age": "Child",
"energy": "Low",
"size": "Small",
"independence": "Low",
"ong_id": "ong-1",
```
