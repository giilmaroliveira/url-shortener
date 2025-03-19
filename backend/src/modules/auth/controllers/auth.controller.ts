import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import logger from "../../../config/logger";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body || {};
      const user = await AuthService.registerUser(email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      logger.error(`Error creating new user ${error}`);
      const errMsg = error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ error: errMsg });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body || {};
      const token = await AuthService.loginUser(email, password);
      res.status(200).json(token);
    } catch (error) {
      logger.error(`Error logging in ${error}`);
      const errMsg = error instanceof Error ? error.message : "Invalid credentials";
      res.status(401).json({ error: errMsg });
    }
  }
}

export default AuthController;