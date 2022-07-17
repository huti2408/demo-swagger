import PostRouter from "./PostRoute";
import UserRouter from "./UserRoute";
import specs from "../utils/swagger-connect";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const SwaggerYaml = YAML.load("swagger.yaml");
const router = (app) => {
  /**
   * @swagger
   * components:
   *  schemas:
   *    Post:
   *      type: object
   *      required:
   *          - title
   *          - content
   *          - author_id
   *      properties:
   *          title:
   *              type: string
   *              description: Title of post
   *              example: This is title string
   *          subcontent:
   *              type: string
   *              description: Sub content of post
   *              example: This is sub-content string
   *          content:
   *              type: string
   *              description: Full content of post
   *              example: This is full content string
   *          author_id:
   *              type: string
   *              example: 1
   *    User:
   *      type: object
   *      properties:
   *        username:
   *            type: string
   *            example: huutin123
   *        password:
   *            type: string
   *            example: mypassword
   *        name:
   *            type: string
   *            example: Huu Tin
   */

  /**
   * @openapi
   * /:
   *   get:
   *     description: Welcome to swagger-jsdoc!
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.use("/posts", PostRouter);
  app.use("/users", UserRouter);
};
export default router;
