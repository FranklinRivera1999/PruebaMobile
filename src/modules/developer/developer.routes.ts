import { Router } from "express";
import developerController from "./developer.controller";
const router = Router();
router.get("/", developerController.find);
router.post("/", developerController.create);
router.delete("/:id", developerController.delete);
router.patch("/:id",developerController.update)
export default router;
