import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const urlSchema = z.object({
  originalUrl: z.string().url({ message: "Invalid URL format" })
});

export const validateUrl = (req: Request, res: Response, next: NextFunction) => {
  const result = urlSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors[0].message });
  }
  next();
};