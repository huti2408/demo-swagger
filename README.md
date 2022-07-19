# Swagger by NodeJS

## Installation

### Requirements

-   [Express](https://www.npmjs.com/package/express)
-   [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
-   [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
-   yamljs (To read YAML file)

### Run

```bash
$ git clone https://github.com/thayphaphuti/demo-swagger.git
$ cd demo-swagger
$ npm install
$ npm start

```

## Set Up Swagger

### Installation

First, you have to set up your basic api with [Express](https://www.npmjs.com/package/express). Then install:

```bash
npm install swagger-jsdoc swagger-ui-express yamljs

```

#### Swagger-JSDoc

To Config your Swagger (you can config it with JSON file or YAML file)

-   In my repo, i used YAML file to config

```bash
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
            title: "Demo Swagger",
            version: "1.0.0",
            description: "Demo swagger with NodeJS",
            },
            servers: [
            {
                url: `http://localhost:4000`,
            },
            ],
        },
        apis: ["src/routes/*.ts"],
    };
    const specs = swaggerJsDoc(options);
```

-   `definintion` is config for your swagger.
-   `apis` is define that will call all your endpoint apis in folder routes.

#### Swagger UI Express

This is just about display UI Swagger

```bash
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
```

All set up is done. You can follow these structures to create your own endpoint API in your Swagger:

-   [Basic Structure](https://swagger.io/docs/specification/basic-structure/)
-   [Example Structure](https://editor.swagger.io/)
