import { Router } from "express";
import UserController from "../controllers/User.controller";
import User from "../models/User";

const router = Router();

router.get("/", UserController.getAll);
router.post("/", UserController.create);

export default router;
