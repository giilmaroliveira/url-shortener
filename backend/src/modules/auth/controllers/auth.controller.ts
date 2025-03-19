import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import logger from "../../../config/logger";
import { validateUserInput } from "../validators/user.validator";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const validationError = validateUserInput(req.body);
      if (validationError) return res.status(400).json({ error: validationError });

      const { email, password } = req.body;
      const user = await AuthService.registerUser(email, password);

      return res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      logger.error("Error creating new user", { email: req.body?.email, error: error instanceof Error ? error.message : error });
      return res.status(400).json({ error: error instanceof Error ? error.message : "Something went wrong" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validationError = validateUserInput(req.body);
      if (validationError) return res.status(400).json({ error: validationError });

      const { email, password } = req.body;
      const token = await AuthService.loginUser(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      logger.error("Error logging in", { email: req.body?.email, error: error instanceof Error ? error.message : error });
      return res.status(401).json({ error: "Invalid credentials" });
    }
  }
}

export default AuthController;
