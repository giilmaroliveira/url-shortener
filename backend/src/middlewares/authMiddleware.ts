import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

const SECRET = env.JWT_SECRET;

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    req.user = { id: decoded.userId }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}

export default authMiddleware;