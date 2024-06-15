import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Enter full name")
    .max(20, "Restrict name to 20 characters"),
  email: z.string().min(1, "Enter Email").email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
