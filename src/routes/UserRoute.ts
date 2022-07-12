import { Router } from "express";
const router = Router();
router.get("/");
router.get("/:id");
router.put("/:id");
router.post("/");
router.delete("/:id");
export default router;
