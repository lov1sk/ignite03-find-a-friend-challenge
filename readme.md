# 🖥️ Projeto - API Find a Friend

Este é um projeto construido como proposta de um desafio do modulo de nodeJs do ignite, seu objetivo é fornecer uma api
para uma aplicação de adoção de animais. Nesta é possivel uma ong cadastrar animais que estão disponiveis para serem
adotados e ajuda-los a finalmente achar um lar.

Uma pessoa interessada na adoção pode filtrar pets que estão disponiveis para adoção em sua cidade, e filtrar por caracteristicas
que um pet tambem pode possuir, como: energia,nivel de independencia, porte e idade; lembrando que o unico filtro obrigatorio é de pets
que estão na mesma cidade que a pessoa que irá adotar.

Para enfim realizar a adoção, a pessoa escolhe o pet desejado, e entra em contato com a ong via whats-app.

### Executar o projeto

- Instalar dependencias

```bash
  npm init -y

  npm i
```

- Iniciar containers

```bash
  docker compose up -d
```

- Iniciar servidor

```bash
  npm run start:dev
```

### Tecnologias

<div style="display: inline_block">         
  <img align="center" height="30" width="40"  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />  
  <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />
  <img align="center" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />
</div><br/>

### Estrutura do projeto:

Toda a aplicação foi construida com NodeJs e com TypeScript e o core se encontra na pasta /src

| Pasta          | Descrição                                                                                               |
| :------------- | :------------------------------------------------------------------------------------------------------ |
| `use-cases`    | `As funcionalidades da aplicação, desconectada de frameworks ou camadas externas`                       |
| `repositories` | `Implementação da persistencia de dados da aplicação`                                                   |
| `lib`          | `Configuração da biblioteca PrismaORM`                                                                  |
| `http`         | `Implementação dos controllers da aplicação, assim como o middleware para lidar com a autenticação JWT` |
| `env`          | `Definição da tipagem e verificação das variaveis de ambiente`                                          |
| `utils`        | `Funções adicionais para ajudar nos testes`                                                             |
| `@types`       | `Definição da tipagem para a lib "@fastify/jwt"`                                                        |

Portanto, dentro do diretorio /prisma é possivel achar o schema no qual o banco de dados foi criado, como suas migrations e um ambiente
personalizado para rodar os testes end-to-end

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
