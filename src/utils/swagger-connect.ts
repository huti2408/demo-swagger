import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import YAML from "yamljs";
const options = YAML.load("swagger.yaml");

dotenv.config();

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Demo Swagger",
//       version: "1.0.0",
//       description: "Demo swagger with NodeJS",
//     },
//     servers: [
//       {
//         url: `http://localhost:${process.env.PORT}`,
//       },
//     ],
//   },
//   apis: ["src/routes/*.ts"],
// };
const specs = swaggerJsDoc(options);
export default specs;
