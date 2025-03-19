import { z } from "zod";

const userSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const validateUserInput = (body: { email?: string; password?: string }): string | null => {
  const result = userSchema.safeParse(body);
  if (!result.success) {
    return result.error.errors.map(err => `${err.message}`).join(", ");
  }
  return null;
};
