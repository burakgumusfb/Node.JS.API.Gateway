Hello,

With this repository, we can use the Express Gateway infrastructure to log requests and responses on Elastic Search through an API gateway. We can perform user authentication either through Redis or directly with JWT tokens and access microservices in this way.


The content of the .env file is as follows, which you can modify with your own information:

```bash
ELASTICSEARCH_HOST = "http://localhost:9200"
ELASTICSEARCH_USER = "elastic"
ELASTICSEARCH_PASSWORD = "changeme"
REDIS_HOST = "127.0.0.1"
REDIS_PORT = 6378
NODE_ENV = "dev"
NODE_PORT = 3000
JWT_SECRET = "9a9a7b4f89b2762c4f4af4c515802c12a4d4a7b3f9ba9f7d68a831821e86dbf8a22e0a7b530d71f16d0331d2d2a7bfe0f3c9dcecc48dd6850320db0c8bfe187"
USE_REDIS_FOR_AUTH = false
```

There are 6 projects in this repository:

1. api gateway
2. example-one-service
3. example-two-service
4. token-service
5. clients
6. lib

You need to run "npm install" command root project and  in all of these sub-projects.

```bash

root directory
    npm install
cd api-gateway 
    npm install
    cd ..
cd example-one-service
    npm install
    cd ..
cd example-two-service
    npm install
    cd ..
cd lib
    npm install
    cd ..
cd token-service
    npm install
    cd ..
root directory 
    npm start
```

You need to obtain an access token for 'example-one-service' because it is protected by custom-auth.


request:

```bash
 curl --location --request POST 'localhost:3000/token-service/create-token'
```
response:

```bash
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2WnF2X29DWkpueG9scGExNGdxZlcxYzZLT2dvb0RnUHhPaW9SUGl0b2hjUlJzM2EyQy1DampCTEUiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInNlc3Npb25JZCI6IkxvTnNkT0tUd2xTN1BfVjhkakNGNURtX1M2Uldmb056TmIyYjY2UkFmM25wbzBKb2E5Y1JxQzdGUDl4VE41aTd1dHBtRUJhRkV1dTJ3Y3FhLWtwdTc4Q005cVFBb1VNaW1BM1lhRTNuSkJpRkFwQ3RSWHM1bXItZU90a1dSOFhweloyVGNNVjUzUF9SYTlCSzJjSkdINTlvWTVraVRpemVORjdCcXo3NkpZTFdEaXJhRjBzdzkyZDhMc1RMa3V5UTh3WmFSYTJaZ2x3aUZhNVZBYU5RREdjd1NVU3FUN0lESUpPcVNQSWNOMHVCYVRlc2s0c0hBTXFHRjh2WFlvMmEiLCJpYXQiOjE2ODA0NDE1MjUsImV4cCI6MjYyNjUyMTUyNX0.QsUQoO291H6CcU--sR3vbejlt-7JZwvC3O3J_gM7ZaY",
    "token_type": "bearer"
}
```
Now, we can make requests to example-one-service as follows.

request:

```bash
 curl --location 'localhost:3000/example-one/hello' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2WnF2X29DWkpueG9scGExNGdxZlcxYzZLT2dvb0RnUHhPaW9SUGl0b2hjUlJzM2EyQy1DampCTEUiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInNlc3Npb25JZCI6IkxvTnNkT0tUd2xTN1BfVjhkakNGNURtX1M2Uldmb056TmIyYjY2UkFmM25wbzBKb2E5Y1JxQzdGUDl4VE41aTd1dHBtRUJhRkV1dTJ3Y3FhLWtwdTc4Q005cVFBb1VNaW1BM1lhRTNuSkJpRkFwQ3RSWHM1bXItZU90a1dSOFhweloyVGNNVjUzUF9SYTlCSzJjSkdINTlvWTVraVRpemVORjdCcXo3NkpZTFdEaXJhRjBzdzkyZDhMc1RMa3V5UTh3WmFSYTJaZ2x3aUZhNVZBYU5RREdjd1NVU3FUN0lESUpPcVNQSWNOMHVCYVRlc2s0c0hBTXFHRjh2WFlvMmEiLCJpYXQiOjE2ODA0NDE1MjUsImV4cCI6MjYyNjUyMTUyNX0.QsUQoO291H6CcU--sR3vbejlt-7JZwvC3O3J_gM7ZaY'
```
response:
```bash
   Hello, world! This is Example One, and you need to provide a JWT to access me.
```

request:
```bash
    curl --location 'localhost:3000/example-two/hello'
```
response:
```bash
   Hello World you can access to me without JWT Token or any Auth
```

```bash
.
|-- example-one-service
|   |-- package-lock.json
|   |-- package.json
|   |-- app.js
|-- clients
|   |-- elasticsearch.js
|   |-- transports
|   |   |-- elastichsearch-transports.js
|   |-- package-lock.json
|   |-- package.json
|   |-- redis-client.js
|-- .DS_Store
|-- api-gateway
|   |-- .DS_Store
|   |-- logger
|   |   |-- logger.js
|   |-- config
|   |   |-- gateway.config.yml
|   |   |-- .DS_Store
|   |   |-- system.config.yml
|   |   |-- models
|   |   |   |-- users.json
|   |   |   |-- credentials.json
|   |   |   |-- applications.json
|   |   |-- policies
|   |   |   |-- body-parser.js
|   |   |   |-- custom-auth.js
|   |   |   |-- logging.js
|   |   |   |-- morgan-logging.js
|   |   |-- manifests
|   |   |   |-- body-parser.js
|   |   |   |-- custom-auth.js
|   |   |   |-- morgan-logging-manifest.js
|   |   |   |-- logging-manifest.js
|   |-- Dockerfile
|   |-- package-lock.json
|   |-- package.json
|   |-- app.js
|-- token-service
|   |-- package-lock.json
|   |-- package.json
|   |-- app.js
|-- README.md
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- .env
|-- lib
|   |-- custom-error.js
|   |-- package-lock.json
|   |-- package.json
|   |-- jwt.js
|-- example-two-service
|   |-- package-lock.json
|   |-- package.json
|   |-- app.js
|-- app.js
```




