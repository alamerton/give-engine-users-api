import { Router } from "express";
import UserController from "../controllers/User.controller";

const router = Router();

router.get("/", UserController.getAll);
router.post("/create", UserController.create);
router.post("/signIn", UserController.signIn)

export default router;
