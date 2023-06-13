# Motors shop - Backend

## Sumário

-   [1. Resumo](#1-resumo)
-   [2. Rodando locamente](#2-rodando-locamente)
    -   [2.1. Criando banco de dados](#21-criando-banco-de-dados)
    -   [2.2. Crie um arquivo env](#22-crie-um-arquivo-env)
    -   [2.3. Instale as dependências](#23-instale-as-dependências)
    -   [2.4. Execute as migrações](#24-execute-as-migrações-para-realizar-a-persistência-de-dados)
    -   [2.5. Rode a API](#25-rode-a-api)
    -   [2.6 Usando a API](#26-usando-a-api)
-   [3. Rotas](#3-rotas)
    -   [Users](#users)
    -   [Products](#products)
    -   [Comments](#comments)
-   [4. Frontend](#4-frontend)

## 1. Resumo

Uma Api feita para uma loja virtual de compra, venda e leilão de automóveis. Usuários podem se cadastrar e fazer login, existem dois tipos de usuários: comprador e anunciante. O comprador terá um CRUD para as informações do seu perfil e podera visualizar, comprar e adicionar feedbacks sobre os veículos. O anunciante terá um CRUD das informações do seu perfil e de seus produtos.

url base (deploy): https://motors-shop-api.onrender.com

A aplicação possui cinco tabelas:

-   **users**
-   **addresses**
-   **products**
-   **images**
-   **comments**

### Diagrama da Aplicação

<img src="diagrama-de-entidades.png">

## 2. Rodando locamente

### 2.1. Criando banco de dados

Certifique-se de ter o postgresql instalado e funcionando. Entre no seu usuário com o comando:

```shell
psql -U nome_de_usuario
```

E o use o comando abaixo para criar o banco de dados:

```shell
CREATE DATABASE nome_do_banco_de_dados
```

Substitua o "nome_de_usuario" pelo nome do seu usuário e "nome_do_banco_de_dados" pelo nome desejado

### 2.2. Crie um arquivo .env

Clone o arquivo .env.example e edite ele com os seus dados,<br/>
Em seguida renomeie a copia para .env

### 2.3. Instale as dependências

Após fazer o clone do projeto instale as dependências:

```shell
npm install
```

### 2.4. Execute as migrações para realizar a persistência de dados

As migrações vão moldar o banco de dados existente e deixá-lo pronto para o uso

```shell
npm run typeorm migration:run -- -d dist/data-source
```

### 2.5. Rode a api

```shell
npm run dev
```

### 2.6. Usando a API

A aplicação estará hospedada em http://localhost:port (port é configurado no .env, Ex: 8000)

## 3. Rotas

### Users

`POST /users`

-   Não há necessidade de um token
-   Tem verificação de email e cpf únicos
-   Todos os campos são obrigatórios

```json
{
    "name": "Erick Marchetti",
    "email": "erick@gmail.com",
    "password": "1234",
    "cpf": "54437747003",
    "phone": "992448644",
    "birthdate": "2000-11-05",
    "description": "cool description",
    "isAdvertiser": true,
    "address": {
        "cep": "56302305",
        "state": "Pernambuco",
        "city": "Recife",
        "street": "Astorga",
        "number": "111",
        "complement": "Perto do estádio"
    }
}
```

resposta:

`Created 201`

```json
{
    "id": "8c0aa24a-e2ec-45e8-8e02-c2fd3b2e73b5",
    "email": "erick@gmail.com",
    "name": "Erick Marchetti",
    "cpf": "23456789",
    "phone": "219851516",
    "birthdate": "2000-11-05",
    "description": "cool description",
    "isAdvertiser": true,
    "address": {
        "id": "9a708710-ef41-4e43-a2bb-af9c824d6ddd",
        "cep": "56302305",
        "state": "Pernambuco",
        "city": "Recife",
        "street": "Astorga",
        "number": "111",
        "complement": "Perto do estádio"
    }
}
```

<br/>

`POST /users/login`

-   Não há necessidade de um token

```json
{
    "email": "erick@gmail.com",
    "password": "1234"
}
```

resposta:

`OK 200`

```json
{
    "id": "a817404d-510b-44f5-ae0e-563f364148ec",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhODE3NDA0ZC01MTBiLTQ0ZjUtYWUwZS01NjNmMzY0MTQ4ZWMiLCJpYXQiOjE2NzA2MTQzMzIsImV4cCI6MTY3MDcwMDczMn0.dZsS67gpon_UE3R3lYM6kxTZk72fhPmk6O_f11OKF8k"
}
```

<br/>

`GET /users/:user_id`

-   Precisa de um token
-   Apenas o dono do usuário pode acessar suas informações
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`OK 200`

```json
{
    "id": "8c0aa24a-e2ec-45e8-8e02-c2fd3b2e73b5",
    "email": "erick@gmail.com",
    "name": "Erick Marchetti",
    "cpf": "23456789",
    "phone": "219851516",
    "birthdate": "2000-11-05",
    "description": "cool description",
    "isAdvertiser": true,
    "address": {
        "id": "9a708710-ef41-4e43-a2bb-af9c824d6ddd",
        "cep": "56302305",
        "state": "Pernambuco",
        "city": "Recife",
        "street": "Astorga",
        "number": "111",
        "complement": "Perto do estádio"
    },
    "products": []
}
```

<br/>

`GET /users/:user_id/profile`

-   Não há necessidade de um token
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`OK 200`

```json
{
    "id": "8c0aa24a-e2ec-45e8-8e02-c2fd3b2e73b5",
    "name": "Erick Marchetti",
    "isAdvertiser": true,
    "products": []
}
```

<br/>

`PATCH /users/:user_id`

-   Precisa de um token
-   Apenas o dono do usuário pode atualizar suas informações
-   Todos os campos são opcionais
-   Pelo menos um campo deve ser mandado
-   Tem verificação de email e cpf únicos

```json
{
    "name": "Erick Marchetti",
    "email": "erick@gmail.com",
    "password": "1234",
    "cpf": "54437747003",
    "phone": "992448644",
    "birthdate": "2000-11-05",
    "description": "cool description",
    "isAdvertiser": true,
    "address": {
        "cep": "56302305",
        "state": "Pernambuco",
        "city": "Recife",
        "street": "Astorga",
        "number": "111",
        "complement": "Perto do estádio"
    }
}
```

resposta:

`OK 200`

```json
{
    "message": "Usuário atualizado com sucesso"
}
```

<br/>

`DELETE /users/:user_id`

-   Precisa de um token
-   Apenas o dono do usuário pode deletar suas informações
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`No content 204`

```json
No content
```

<br/>

### Products

`POST /products`

-   Precisa de um token
-   Todos os campos são obrigatórios
-   O campo "price" deve ser preenchido com o valor em centavos
-   O campo "vehicle_type" aceita os valores: "Carro" ou "Moto" apenas
-   O campo "announcement_type" aceita os valores: "Venda" ou "Leilão" apenas

```json
{
    "title": "Volkswagen",
    "year": 2004,
    "km": 2312,
    "price": 12000000,
    "description": "Um carro muito bom e em bom estado",
    "vehicle_type": "Carro",
    "announcement_type": "Venda",
    "published": true,
    "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
    "images": [
        "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960"
    ]
}
```

resposta:

`Created 201`

```json
{
    "id": "e0711cf5-606f-4a67-8b29-57895b55f884",
    "title": "Volkswagen",
    "year": 2004,
    "km": 2312,
    "price": 12000000,
    "description": "Um carro muito bom e em bom estado",
    "vehicle_type": "Carro",
    "announcement_type": "Venda",
    "published": true,
    "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
    "user": {
        "id": "8c0aa24a-e2ec-45e8-8e02-c2fd3b2e73b5",
        "email": "erick@gmail.com",
        "name": "Erick Marchetti",
        "cpf": "23456789",
        "phone": "219851516",
        "birthdate": "2000-11-05",
        "description": "cool description",
        "isAdvertiser": true
    }
}
```

<br/>

`GET /products`

-   Não há necessidade de um token
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`OK 200`

```json
[
    {
        "id": "e0711cf5-606f-4a67-8b29-57895b55f884",
        "title": "Volkswagen",
        "year": 2004,
        "km": 2312,
        "price": 12000000,
        "description": "Um carro muito bom e em bom estado",
        "vehicle_type": "Carro",
        "announcement_type": "Venda",
        "published": true,
        "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
        "user": {
            "id": "8c0aa24a-e2ec-45e8-8e02-c2fd3b2e73b5",
            "email": "erick@gmail.com",
            "name": "Erick Marchetti",
            "cpf": "23456789",
            "phone": "219851516",
            "birthdate": "2000-11-05",
            "description": "cool description",
            "isAdvertiser": true
        }
    },
    {
        "id": "045fece8-c260-4cdd-9360-1e090719c812",
        "title": "Scooter",
        "year": 2004,
        "km": 2312,
        "price": 500000,
        "description": "Uma moto muito boa e em bom estado",
        "vehicle_type": "Moto",
        "announcement_type": "Venda",
        "published": true,
        "cover_image": "https://www.honda.com.br/motos/sites/hda/files/2022-09/forza_site_cor%20cinza_grande_2.png",
        "user": {
            "id": "0e3dd4ac-db6e-48c3-8776-0bb3bbab7a42",
            "email": "fernando@gmail.com",
            "name": "Fernando",
            "cpf": "13544635542",
            "phone": "219851516",
            "birthdate": "2000-11-05",
            "description": "cool description",
            "isAdvertiser": true
        }
    }
]
```

<br/>

`GET /products/:product_id`

-   Não há necessidade de um token
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`OK 200`

```json
{
    "id": "e0711cf5-606f-4a67-8b29-57895b55f884",
    "title": "Volkswagen",
    "year": 2004,
    "km": 2312,
    "price": 12000000,
    "description": "Um carro muito bom e em bom estado",
    "vehicle_type": "Carro",
    "announcement_type": "Venda",
    "published": true,
    "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
    "user": {
        "id": "8c0aa24a-e2ec-45e8-8e02-c2fd3b2e73b5",
        "email": "erick@gmail.com",
        "name": "Erick Marchetti",
        "cpf": "23456789",
        "phone": "219851516",
        "birthdate": "2000-11-05",
        "description": "cool description",
        "isAdvertiser": true
    },
    "comments": [],
    "images": [
        {
            "id": "c5e3ad7a-19f7-487a-8c52-8104c905700a",
            "url": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960"
        }
    ]
}
```

<br/>

`PATCH /product/:product_id`

-   Precisa de um token
-   Apenas o dono do produto pode atualizar suas informações
-   Todos os campos são opcionais
-   Pelo menos um campo deve ser mandado

```json
{
    "title": "Volkswagen",
    "year": 2004,
    "km": 2312,
    "price": 12000000,
    "description": "Um carro muito bom e em bom estado",
    "vehicle_type": "Carro",
    "announcement_type": "Venda",
    "published": true,
    "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
    "images": [
        "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960"
    ]
}
```

resposta:

`OK 200`

```json
{
    "id": "e0711cf5-606f-4a67-8b29-57895b55f884",
    "title": "Volkswagen",
    "year": 2004,
    "km": 2312,
    "price": 12000000,
    "description": "Um carro muito bom e em bom estado",
    "vehicle_type": "Carro",
    "announcement_type": "Venda",
    "published": true,
    "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
    "images": [
        {
            "id": "c5e3ad7a-19f7-487a-8c52-8104c905700a",
            "url": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960"
        }
    ]
}
```

<br/>

`DELETE /products/:product_id`

-   Precisa de um token
-   Apenas o dono do produto pode deletar suas informações
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`No content 204`

```json
No content
```

<br/>

### Comments

`POST /comments/product_id`

-   Precisa de um token
-   Todos os campos são obrigatórios

```json
{
    "comment": "Ótimo estado"
}
```

resposta:

`Created 201`

```json
{
    "id": "09f03840-19f1-469e-beaf-fa995b2ea3ff",
    "comment": "Ótimo estado",
    "created_at": "2023-01-11T16:20:56.998Z"
}
```

<br/>

`PATCH /comments/:comment_id`

-   Precisa de um token
-   Apenas o dono do comentário pode atualizar suas informações

```json
{
    "comment": "Ótimo estado Update"
}
```

resposta:

`OK 200`

```json
{
    "message": "Comentário atualizado com sucesso"
}
```

<br/>

`DELETE /comments/:comment_id`

-   Precisa de um token
-   Apenas o dono do comentário pode deletar suas informações
-   Não há necessidade de mandar um body na requisição

```json
No body
```

resposta:

`No content 204`

```json
No content
```

<br/>

## 4. Frontend

Para ter acessa ao front end do projeto clique <a href="https://github.com/projeto-final-m6-t11-grupo-12/frontend" target="_blank">aqui</a>
