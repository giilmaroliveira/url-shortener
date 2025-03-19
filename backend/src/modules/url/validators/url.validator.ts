import { z } from "zod";

const urlSchema = z.object({
  originalUrl: z
    .string({ required_error: "OriginalUrl is required" })
    .url({ message: "Invalid URL format" })
});

export const validateUrlInput = (body: { originalUrl: string }): string | null => {
  const result = urlSchema.safeParse(body);
  if (!result.success) {
    return result.error.errors.map(err => `${err.message}`).join(", ");
  }
  return null;
};
