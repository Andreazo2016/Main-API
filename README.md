# [API] Main API

# Installing
Easy peasy lemon squeezy:
```
$ npm install
```

## Configuring
The application use just one database: [Postgres](https://www.postgresql.org/). For the fastest setup is recommended to use [docker](https://www.docker.com), see below how to setup the database.

### PostgresSQL
Store all application data. You can create a PostgresSQL container like so:
```
docker run \
  --name kuanto-kusta-desafio \
  -e POSTGRES_USER=kuantokusta \
  -e POSTGRES_PASSWORD="kuantokusta" \
  -e POSTGRES_DB=kuantokusta-db \
  -p 5432:5432 \
  -d \
  postgres
```

# Usage

Run migration first
```
$ npm run typeorm migration:run
```

To start up the app run:
```
$ npm run dev
```

## Error Handling
Instead of only throw a simple message and HTTP Status Code this API return friendly errors:
```json
{
  "statusCode": 400,
  "message": "You are already registered",
}
```



## Bearer Token
A few routes expect a Bearer Token in an `Authorization` header.

```
GET http://localhost:3000/shoppingcarts Authorization: Bearer <token>
```



## Routes
|route|HTTP Method|pagination|params|description|auth method
|:---|:---:|:---:|:---:|:---|:---:
|`/authenticate`|POST|:x:|Body  `email`, `password`.| return jwt token.|:x:
|`/users`|POST|:x:|Body  `name`, `email`, `password`.| create a user.|:x:
|`/users`|GET|:x:|:x:| List all users.|:x:
|`/users/:id`|DELETE|:x:| params user id |Delete a user.|:x:
|`/shoppingcarts/product`|POST|:x:|Body  `productId`, `price`.|insert one product into shopping cart.|Bearer
|`/shoppingcarts`|GET|:x:| - |Get ShoppingCart.|Bearer
|`/shoppingcarts/remove/product/:id`|DELETE|:x:| params product id |Remove the product from ShoppingCart.|Bearer
|`/products`|GET|:x:| - |List all Products.|Bearer


> Routes with `Bearer` as auth method expect an `Authorization` header.

### Requests

* `POST /authenticate`

Request body:
```json
{
	"email":"email@email.com",
	"password":"123321"
}
```
Response body:
```json
{
  "user": {
    "name": "user",
    "email": "email@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkN2QwYTdmLTllMzgtNDFkOC1iYjE5LTk2ZjIyOWY3ZjcxNyIsIm5hbWUiOiJBbmRlcnNvbiIsImlhdCI6MTYyMjk5NDkxMCwiZXhwIjoxNjIzMDgxMzEwfQ.0Ckp211-gjtvM2vQgXCuLd-Xo2pm0CwJnvMNYPOOf6s"
}
```


* `POST /users`

Request body:
```json
{
	"name":"user",
	"email":"email@email.com",
	"password":"123321"
}
```

* `GET /users`

Response body:
```json
[
  {
	"name":"user",
	"email":"email@email.com",
	"password":"123321"
  }
]
```
* `DELETE /users/:id`

Response body: status code 200



* `GET /products`

Response body:
```json
[
  {
    "id": "60bbb475ff0a1853c51d56d1",
    "name": "arroz",
    "price": 192
  },
  {
    "id": "60bbb4a5ff0a1853c51d56d2",
    "name": "arroz",
    "price": 192
  }
]
```

* `POST /shoppingcarts/product`

Request body:
```json
{
	"productId":"60bbb4d351eb3353ec6eb1fa",
	"price":20
}
```

* `GET /shoppingcarts`

Response body:
```json
{
  "userId": "8d7d0a7f-9e38-41d8-bb19-96f229f7f717",
  "shoppingCartId": "88f043c1-c5c7-4884-8953-28d06e96bca2",
  "totalQuantity": 2,
  "totalPrice": "40.00",
  "products": [
    {
      "productId": "60bbb4d351eb3353ec6eb1fa",
      "price": "40.00",
      "quantity": 2
    }
  ]
}

```

* `DELETE /shoppingcarts/remove/product/:id`

Response body: status code 200
