import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import logger from "../../../config/logger";
import { validateUserInput } from "../validators/user.validator";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;

    this.registerUser = this.registerUser.bind(this);
    this.login = this.login.bind(this);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const validationError = validateUserInput(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const { email, password } = req.body;
      const user = await this.authService.registerUser(email, password);

      res.status(201).json({ id: user.id, email: user.email });
      return;
    } catch (error) {
      logger.error("Error creating new user", { email: req.body?.email, error: error instanceof Error ? error.message : error });
      res.status(400).json({ error: error instanceof Error ? error.message : "Something went wrong" });
      return;
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const validationError = validateUserInput(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const { email, password } = req.body;
      const token = await this.authService.loginUser(email, password);

      res.status(200).json(token);
      return;
    } catch (error) {
      logger.error("Error logging in", { email: req.body?.email, error: error instanceof Error ? error.message : error });
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
  }
}

export default AuthController;
