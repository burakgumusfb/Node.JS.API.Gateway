Hello,

With this repository, we can use the Express Gateway infrastructure to log requests and responses on Elastic Search through an API gateway. We can perform user authentication either through Redis or directly with JWT tokens and access microservices in this way.



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


And the content of the .env file is as follows, which you can modify with your own information:

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





