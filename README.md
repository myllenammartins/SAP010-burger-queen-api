# Burger Queen - API com Node.js

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
* [4. Considerações gerais](#4-considerações-gerais)
* [5. Critérios de aceitação mínimos do projeto](#5-critérios-de-aceitação-mínimos-do-projeto)
* [6. Desenvolvedoras](#6-desenvolvedoras)

## 1. Prefácio

![Node.js logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)

Um pequeno restaurante de hamburgueres, que está crescendo, necessita de um
sistema para realizar pedidos usando um _tablet_, e que os enviem à
cozinha para que sejam preparados de forma ordenada e eficiente.

Este projeto tem duas áreas: interface (cliente) e API (servidor). Nosso
cliente nos solicitou que desenvolvêssemos uma API que pode integrar com a
interface, que outra equipe de desenvolvedores está trabalhando
simultaneamente

## 2. Resumo do projeto

Como API, nesse caso nos referimos a um _servidor web_, que é basicamente
um programa que _ouve_ o que acontece na aplicação através de uma porta de rede,
pela qual podemos enviar _requisições_ (_requests_) e obter _respostas_ (_responses_)
usando o protocolo HTTP (o HTTPS).

Um servidor web deve _lidar_ com as requisições que chegam e devolver respostas,
que serão enviadas de volta ao _cliente_. Quando falamos de _aplicações de servidor_,
isso implica uma arquitetura de _cliente/servidor_, onde o cliente é um programa
que faz requisições através de uma rede (por exemplo o navegador, o cURL, etc)
e o servidor é o programa que recebe essas requisições e as responde.

O [Node.js](https://nodejs.org/) nos permite criar servidores web super eficientes
de maneira relativamente simples, tudo isso usando JavaScript!

Neste projeto partimos de um _boilerplate_ que já contém uma série de
_endpoints_ (pontos de conexão ou URLs) e nos pedem para completar a aplicação.
Isto implica que teremos que começar a ler a implementação existente, e
familiarizar-nos com a _stack_ escolhida ([Node.js](https://nodejs.org/) e
[Express](https://expressjs.com/)) e complementá-la com um motor de banco de dados,
no qual escolhemos o 
[PostgreSQL](https://www.postgresql.org/).

O cliente nos deu um
[link](https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0)
para a documentação que especifica o comportamento esperado da API que
iremos expor por HTTP.
Lá podemos encontrar todos os detalhes que os _endpoints_ deve
implementar na aplicação, que parâmetros esperam, o que devem responder, etc.

O objetivo de aprendizagem principal foi adquirir experiência com o **Node.js**
como ferramenta para desenvolvimento de _aplicações de servidor_, junto com uma série
de outras ferramentas comumente utilizadas nesse contexto (Express como framework,
MongoDB, PostgreSQL ou MySQL como base de dados, containers de docker, etc).

Neste projeto, desenvolvemos um servidor web que deverá _servir_ `JSON`
através de uma conexão `HTTP`, e implantá-lo em um servidor na nuvem.

Neste, projeto, tivemos familiarização com conceitos como **rotas**
(_routes_), **URLs**, **HTTP** (verbos, request, response, headers, body, status
codes, etc), **JSON**, **JWT** (_JSON Web Tokens_), **conexão com uma base de dados**
(`PostgreSQL`), **variables de ambiente**, **deployment**,
**containers de `docker`**, etc.

## 3. Objetivos de aprendizagem


### Node.js

- [ ] **Instalar e usar módulos com npm**

  <details><summary>Links</summary><p>

  * [Sitio oficial de npm (em inglês)](https://www.npmjs.com/)
</p></details>

- [ ] **Configuração do package.json**

  <details><summary>Links</summary><p>

  * [package.json - Documentação oficial (em inglês)](https://docs.npmjs.com/files/package.json)
</p></details>

- [ ] **Configuração do npm-scripts**

  <details><summary>Links</summary><p>

  * [scripts - Documentação oficial (em inglês)](https://docs.npmjs.com/misc/scripts)
</p></details>

### JavaScript

- [ ] **Testes unitários (unit tests)**

  <details><summary>Links</summary><p>

  * [Introdução ao Jest - Documentação oficial](https://jestjs.io/docs/pt-BR/getting-started)
</p></details>

- [ ] **Testes assíncronos**

  <details><summary>Links</summary><p>

  * [Testando Código Assíncrono - Documentação oficial](https://jestjs.io/docs/pt-BR/asynchronous)
</p></details>

- [ ] **Uso de mocks e espiões**

  <details><summary>Links</summary><p>

  * [Simulações Manuais - Documentação oficial](https://jestjs.io/docs/pt-BR/manual-mocks)
</p></details>

- [ ] **Testes de integração (end-to-end)**

- [ ] **Módulos de ECMAScript (ES modules)**

  <details><summary>Links</summary><p>

  * [import - MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import)
  * [export - MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export)
</p></details>

- [ ] **Módulos de CommonJS**

  <details><summary>Links</summary><p>

  * [Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)
</p></details>

- [ ] **Uso de linter (ESLINT)**

- [ ] **Uso de identificadores descritivos (Nomenclatura e Semântica)**

### Controle de Versões (Git e GitHub)

- [ ] **Git: Instalação e configuração**

- [ ] **Git: Controle de versão com git (init, clone, add, commit, status, push, pull, remote)**

- [ ] **Git: Integração de mudanças entre ramos (branch, checkout, fetch, merge, reset, rebase, tag)**

- [ ] **GitHub: Criação de contas e repositórios, configuração de chave SSH**

- [ ] **GitHub: Implantação com GitHub Pages**

  <details><summary>Links</summary><p>

  * [Site oficial do GitHub Pages](https://pages.github.com/)
</p></details>

- [ ] **GitHub: Colaboração pelo Github (branches | forks | pull requests | code review | tags)**

- [ ] **GitHub: Organização pelo Github (projects | issues | labels | milestones | releases)**

### Express.js

- [ ] **Gerenciamento de rotas**

- [ ] **Uso e criação de middleware**

### Sequelize

### HTTP

- [ ] **Consulta ou solicitação (request) e resposta (response).**

  <details><summary>Links</summary><p>

  * [Visão geral do protocolo HTTP - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview)
  * [Mensagens HTTP - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Messages)
</p></details>

- [ ] **Cabeçalhos (headers)**

  <details><summary>Links</summary><p>

  * [Cabeçalhos HTTP - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
</p></details>

- [ ] **Corpo (body)**

  <details><summary>Links</summary><p>

  * [Mensagens HTTP / Corpo - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Messages#corpo)
</p></details>

- [ ] **Verbos HTTP**

  <details><summary>Links</summary><p>

  * [Métodos de requisição HTTP - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)
</p></details>

- [ ] **Códigos de status de HTTP**

  <details><summary>Links</summary><p>

  * [Códigos de status de respostas HTTP - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)
  * [The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)
</p></details>

- [ ] **Encodings e JSON**

  <details><summary>Links</summary><p>

  * [Introdução ao JSON - Documentação oficial](https://www.json.org/json-pt.html)
</p></details>

- [ ] **CORS (Cross-Origin Resource Sharing)**

  <details><summary>Links</summary><p>

  * [Cross-Origin Resource Sharing (CORS) - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
</p></details>

### Autenticação

- [ ] **JWT (JSON Web Token)**

- [ ] **Armazenamento e acesso de senhas**

### WebOps

- [ ] **Variáveis de ambiente**

- [ ] **Containers (Docker)**

- [ ] **Docker compose**

- [ ] **Cloud Functions**

### PostgreSQL

- [ ] **Cliente de terminal psql**

  <details><summary>Links</summary><p>

  * [psql - Docs (em inglês)](https://www.postgresql.org/docs/14/app-psql.html)
</p></details>

- [ ] **Tipos de dados**

  <details><summary>Links</summary><p>

  * [Chapter 8. Data Types - Docs (em inglês)](https://www.postgresql.org/docs/14/datatype.html)
</p></details>

- [ ] **Backup e restauração (backup/restore)**

  <details><summary>Links</summary><p>

  * [Chapter 26. Backup and Restore - Docs (em inglês)](https://www.postgresql.org/docs/14/backup.html)
</p></details>

### Bases de dados

- [ ] **Modelagem de dados**

- [ ] **Conexão**

### SQL

- [ ] **Criação e modificação de tabelas**

  <details><summary>Links</summary><p>

  * [SQL CREATE TABLE Statement - w3schools (em inglês)](https://www.w3schools.com/sql/sql_create_table.asp)
  * [CREATE TABLE Statement - PostgreSQL Docs (em inglês)](https://www.postgresql.org/docs/9.1/sql-createtable.html)
  * [ALTER TABLE Statement - PostgreSQL Docs (em inglês)](https://www.postgresql.org/docs/9.1/sql-altertable.html)
</p></details>

- [ ] **Operações CRUD (Create-Read-Update-Delete)**

  <details><summary>Links</summary><p>

  * [INSERT](https://www.postgresql.org/docs/9.5/sql-insert.html)
  * [SELECT](https://www.postgresql.org/docs/9.5/sql-select.html)
  * [UPDATE](https://www.postgresql.org/docs/9.1/sql-update.html)
  * [DELETE](https://www.postgresql.org/docs/8.1/sql-delete.html)
</p></details>

- [ ] **Exclusão de tabelas ou bancos de dados inteiros com DROP**

  <details><summary>Links</summary><p>

  * [DROP TABLE](https://www.postgresql.org/docs/8.2/sql-droptable.html)
  * [DROP DATABASE](https://www.postgresql.org/docs/8.2/sql-dropdatabase.html)
</p></details>

## 4. Considerações gerais

O projeto pode estar integrado com o projeto
[Burger Queen API client](../04-burger-queen-api-client), parte Frontend.

A lógica do projeto foi implementada totalmente em JavaScript (ES6).


Outro requisito da equipe de QA do nosso cliente é realizar
**testes _end-to-end_**, que usaremos para verificar o comportamento desde o
ponto de vista de HTTP, desde fora do servidor.

O _boilerplate_ já contém o setup e configuração
necessária para executar todos os tests _end-to-end_ com o comando `npm run test:e2e`.


## 5. Critérios de aceitação mínimos do projeto

### 5.1 API

Conforme estabelecido pela
[documentação](https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0)
entregue pelo nosso cliente, a API expõe os seguintes endpoints:

#### 5.1,1 `/`

* `GET /`

#### 5.1.2 `/auth`

* `POST /auth`

#### 5.1.3 `/users`

* `GET /users`
* `GET /users/:uid`
* `POST /users`
* `PATCH /users/:uid`
* `DELETE /users/:uid`

#### 5.1.4 `/products`

* `GET /products`
* `GET /products/:productid`
* `POST /products`
* `PATCH /products/:productid`
* `DELETE /products/:productid`

#### 5.1.5 `/orders`

* `GET /orders`
* `GET /orders/:orderId`
* `POST /orders`
* `PATCH /orders/:orderId`
* `DELETE /orders/:orderId`

### 5.2 CLI

O cliente solicitou que a aplicação tenha um comando **`npm start`**
que deve ser responsável por executar nossa aplicação node e que também possa
receber informações de configuração, como a porta a ser escutada, qual
banco de dados conectar, etc. Esses dados de configuração serão distintos entre os
diferentes ambientes (desenvolvimento, produção, ...). O _boilerplate_ já implementa
[o código necessário](config.js) para ler esta informação dos
[argumentos de invocação](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
e o
[ambiente](https://nodejs.org/docs/latest/api/process.html#process_process_env).

#### 5.2.1 Argumentos de linha de comando

Podemos especificar a porta onde a aplicação deve iniciar, passando um argumento
ao invocar nosso programa:

```sh
# Inicia a aplicação na porta 8888 usando npm
npm start 8888
```

#### 5.2.2 Variáveis de ambiente

Nossa aplicação usa as seguintes variáveis de ambiente:

* `PORT`: Se nenhuma porta for especificada como argumento da linha de comando
  podemos usar a variable de ambiente `PORT` para especificar a porta. Valor
  por padrão `8080`.
* `DB_URL`: A _string_ de conexão de _MongoDB_, _PostgreSQL_ ou _MySQL_. Quando
  executemos a aplicação em nosso computador (em ambiente de desenvolvimento),
  podemos usar um banco de dados local, mas em produção deveremos usar as
  instâncias configuradas com `docker-compose` (mais sobre isso na seção de
  **Deployment**).
* `JWT_SECRET`: Nossa aplicação implementa autenticação usando JWT (JSON
   Web Tokens). Para assinar (criptografar) e verificar (descriptografar) os tokens,
  nossa aplicação precisa de um segredo. Localmente, pode usar o valor
  padrão (`xxxxxxxx`), mas é muito importante usar um _segredo_ real
  na producção.
* `ADMIN_EMAIL`: Opcionalmente podemos especificar um email e password para
  o usuario admin (root). Se esses detalhes estiverem presentes, a aplicação se
  certificará que exista o usuário e que tenha permissões de administrador. Valor
  por padrão `admin@localhost`.
* `ADMIN_PASSWORD`: Se for especificado um `ADMIN_EMAIL`, devemos passar
  também uma senha para o usuário admin. Valor por padrão: `changeme`.

### 5.3 Implantação (Deployment)

Banco de dados: Postgresql

A aplicação esta configurada
com `docker-compose` para que possa ser implantada sem dificuldades em qualquer
ambiente.


Por outro lado, em relação a implantação, não é obrigatório usar
`docker-compose`, você pode escolher o provedor (ou provedores) que preferir junto
com o mecanismo de implantação e estratégia de hospedagem. Te recomendamos
explorar as seguintes opcões:

* [Glitch](https://glitch.com) é provavelmente a opção mais _simples_
(requer menos configuração) e nos permite hospedar o servidor web Express
importando nosso repositório do GitHub.
* [Vercel](https://vercel.com/) é uma opção semelhante ao Glitch, mas
focada em aplicativos web estáticos (como os construídos com React).
No entanto, o Vercel também nos permite implantar aplicativos node usando
[Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
* Se quiser explorar opções mais personalizadas e ver o docker do lado do
servidor, pode considerar provedores como
[AWS (Amazon Web Services)](https://aws.amazon.com/) ou
[GCP (Google Cloud Platform)](https://cloud.google.com/), ambos possuem algum tipo
de serviço experimental gratuito (_free tier_) assim como instâncias de servidores
virtuais (VPS), onde configuramos nosso próprio Docker ou serviços para implantar
aplicações em contêineres (por exemplo [Compute Engine](https://cloud.google.com/compute/docs/containers)
de GCP ou [Elastic Container Service](https://aws.amazon.com/ecs/) de AWS).
* Se quiser trabalhar com MongoDB, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
é uma opção muito boa para hospedar a base dados de produção, que
podemos usar em conjunto com qualquer uma das opções mencionadas acima.
* Se quiser trabalhar com MySQL, [ClearDB](https://www.cleardb.com/) é uma
boa opção para hospedar a base de dados de produção, que podemos usar em
conjunto com qualquer uma das opções mencionadas acima.

***
## 6. Desenvolvedoras

<center>

**Desenvolvido por:**
<br>
   Myllena M. Martins <br>
  [Linkedin](https://www.linkedin.com/in/myllenamirandamartins/) | [Github](https://github.com/myllenammartins)
  <br>
  Renata Ribeiro <br> 
  [Linkedin](https://www.linkedin.com/in/rbcribeiro/) | [Github](https://github.com/rbcribeiro)

</center>

***


<div align="center">

<br>
  <img align="center" alt="git" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" /> <img align="center" alt="Rafa-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"> <img align="center" alt="vscode" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" /> <img align="center" alt="Jest" height="30" width="40" src="https://www.svgrepo.com/show/353930/jest.svg" /> <img  align="center" alt="Node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> <img  align="center" alt="Swagger" height="30" width="40" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" /> <img  align="center" alt="Express" height="30" width="40" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" /> <img  align="center" alt="PostgreSQL" height="30" width="40" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" /> <img  align="center" alt="Sequelize" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original-wordmark.svg" />

</br>
