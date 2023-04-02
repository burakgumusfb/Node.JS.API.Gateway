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


There are 6 projects in this repository:

1. api gateway
2. example-one-service
3. example-two-service
4. token-service
5. clients
6. lib

You need to run "npm install" command root project and  in all of these sub-projects.

```bash

root:
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
root : npm start
```

