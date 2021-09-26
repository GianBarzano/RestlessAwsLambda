# Serverless Framework Node HTTP API on AWS

Projeto Serverless Framework implementando um AWS Lambda, acessado atravez de um API Gatway, para realizar um CRUD de funcionários.

## Usage
### Recursos da API.
  - Cadastro de funcionários:
    - Requisição:
      - Endpoint: "/funcionarios"
      - Method: POST
      - Corpo
        ```
        {
          idade: Integer,
          nome: String,
          cargo: String
        }
        ```
    - Resposta:
      - Status: 201
      - Corpo:
        ```
        {
          funcionario: {
            id: String
            idade: Integer,
            nome: String,
            cargo: String
          }
        }
        ```

  - Atualização de funcionários:
    - Requisição:
      - Endpoint: "/funcionarios/{id}"
      - Method: PUT
      - Corpo
        ```
        {
          id: String,
          idade: Integer,
          nome: String,
          cargo: String
        }
        ```
    - Resposta:
      - Status: 200
      - Corpo:
        ```
        {
          funcionario: {
            id: String
            idade: Integer,
            nome: String,
            cargo: String
          }
        }
        ```
  - Busca de funcionário:
    - Requisição:
      - Endpoint: "/funcionarios/{id}"
      - Method: GET
    - Resposta:
      - Status: 200
      - Corpo:
        ```
        {
          funcionario: {
            id: String
            idade: Integer,
            nome: String,
            cargo: String
          }
        }
        ```
  - Excluir funcionário:
    - Requisição:
      - Endpoint: "/funcionarios/{id}"
      - Method: DELETE
    - Resposta:
      - Status: 200
  - Listagem de funcionários:
    - Requisição:
      - Endpoint: "/funcionarios"
      - Method: GET
      - Query Parameters:
        - lastqryid: String.(Passado quando não foram retornados todos os registros. Utilizado para paginação)
    - Resposta:
      - Status: 200
      - Corpo:
        ```
        {
          dados: {
            lista: [{
              id: String
              idade: Integer,
              nome: String,
              cargo: String
            }](Listagem de dados),
            count: Integer(Quantidade de itens retornados),
            lastqryid: String(Quando retornado, existem mais itens a serem listados)
          }
        }
        ```

### Configurar credenciais da AWS
  - Instale serverless globalmente: 
    ```
    $ npm i -g serverless
    ```
  - Configurar credenciais
    ```
    $ serverless config credentials -o --provider aws --key=USER_AWS_KEY --secret USER_AWS_SECRET
    ```

### Deploy

```
$ npm run deploy
```

Após rodar o comando, o terminal deve imprimir ficar parecido com o exemplo abaixo:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node-http-api.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: serverless-http-api
stage: dev
region: us-east-1
stack: serverless-http-api-dev
resources: 12
api keys:
  None
endpoints:
  ANY - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: serverless-http-api-dev-hello
layers:
  None
```

### Testes

Para executar os testes, rode o comando abaixo.
```
$ npm run test
```

Caso deseje rotar um arquivo de testes específico, rode passe o nome por parâmetro, conforme exemplo abaixo.

```
$ npm run test -- utilitarios.test.js
```