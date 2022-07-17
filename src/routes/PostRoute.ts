import { Router } from "express";
import PostController from "../controllers/PostController";
const router = Router();
router.get("/", PostController.GetAllPosts);
router.get("/:id", PostController.GetPost);
router.put("/:id", PostController.UpdatePost);
router.post("/", PostController.CreatePost);
router.delete("/:id", PostController.DeletePost);
export default router;
