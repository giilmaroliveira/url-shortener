import { Router } from "express";
import AuthController from "./controllers/auth.controller";

const router = Router();
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.login);

export default router;