import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const urlSchema = z.object({
  originalUrl: z.string().url({ message: "Invalid URL format" })
});

export const validateUrl = (req: Request, res: Response, next: NextFunction): void => {
  const result = urlSchema.safeParse(req.body);
  if (!result.success) {
    return next(new Error(result.error.errors[0].message));
  }
  next();
};
