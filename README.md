# M6 E-Commerce

Uma Api feita para uma loja virtual de compra, venda e leilão de automóveis. Usuários podem se cadastrar e fazer login, existem dois tipos de usuários: comprador e anunciante. O comprador terá um CRUD para as informações do seu perfil e podera visualizar, comprar e adicionar feedbacks sobre os veículos. O anunciante terá um CRUD das informações do seu perfil e de seus produto.

# Como instalar e rodar a aplicação

1- Clone o repositório para a sua maquina

2- Instale todas as dependências necessárias

-   ex: `yarn`
-   ex: `npm install`

3- Crie um arquivo .env, siga o exemplo do arquivo .env.example e preencha os dados necessário

4- Rode as migrations

-   ex: `yarn typeorm migration:run -d src/data-source.ts`

5- Por fim é só rodar a aplicação com o comando `dev`

-   ex: `yarn dev`
-   ex: `npm run dev`

# Diagrama da Aplicação 


# Rotas

**BASE_URL: http://localhost:3001**

O workspace com todas as requisições se encontra na pasta raiz da aplicação para que se possa ser importada no insominia

## **Rotas de Produtos:**

1- Criação de Produto

-   POST /products
-   Não há necessidade de um token
-   Exemplo do corpo da requisição:

```json
{
    "title": "Carro",
    "year": 2004,
    "km": 2312,
    "price": 120000,
    "description": "Um carro muito bom e em bom estado",
    "vehicle_type": "Carro",
    "announcement_type": "Carro",
    "published": true,
    "cover_image": "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
    "images": [
"https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/02-images/cruze-sport6-rs-carros.jpg?imwidth=960",
              ]
}
```
2- Listagem dos Produtos

- GET /products
- Não há necessidade de um token
- Não é necessário um corpo da requisição

3- Listagem de um Produto específico

- GET /products/:product_id
- Não há necessidade de um token
- Não é necessário um corpo da requisição
