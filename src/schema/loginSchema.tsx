import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Enter Email").email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
