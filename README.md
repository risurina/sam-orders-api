# Orders API

Orders API

## Setup in Local Machine

To run on local machine, you need the following tools:

- AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
- Node.js - [Install Node.js 16](https://nodejs.org/en/), including the npm package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).
- Yarn - I prepared to use yarn.

To build the application for the first time, run the following in your shell:

```bash
docker network create -d bridge sam-orders-api#run this one time
docker-compose up -d #run docker-compose for local dynamodb
.script/init-order-db.sh #this will generate tables in local dynamodb

cp env.example.json env.json #copy env.json

yarn #install node modules
yarn start #build the app then start local API
#Result
Mounting CatalogsApiFunction at http://127.0.0.1:3000/v1/catalogs [GET]
Mounting CatalogsApiFunction at http://127.0.0.1:3000/v1/catalogs/{id} [GET]
Mounting OrdersApiFunction at http://127.0.0.1:3000/v1/orders [POST]
Mounting OrdersApiFunction at http://127.0.0.1:3000/v1/orders/{id} [GET]

#Note: Dynamo Stream can only test in development
```

To deploy the application. First, setup the AWS credentials in [github secret](https://github.com/Azure/actions-workflow-samples/blob/master/assets/create-secrets-for-GitHub-workflows.md):

- setup GitHub action secrets:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION
AWS_ACCOUNT_ID
```

- To deploy:
  - development - commit or merge pr to `develop` branch
  - staging - commit or merge pr to the `main` branch
  - production - create a [release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository?tool=webui) in GitHub
