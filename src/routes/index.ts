import PostRouter from "./PostRoute";
import UserRouter from "./UserRoute";
import specs from "../utils/swagger-connect";
import swaggerUI from "swagger-ui-express";

const router = (app) => {
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
