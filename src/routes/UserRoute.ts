import { Router } from "express";
import UserController from "../controllers/UserController";
import Authentication from "../middlewares/Authentication";

const router = Router();
router.get("/", UserController.GetAllUsers);
router.get("/:id", UserController.GetUser);
router.put("/:id", Authentication, UserController.UpdateUser);
router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
export default router;
