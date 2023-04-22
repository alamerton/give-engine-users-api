import { Router } from "express";
import UserController from "../controllers/User.controller";

const router = Router();

router.get("/", UserController.index);

export default router;
