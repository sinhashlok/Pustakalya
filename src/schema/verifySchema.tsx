import { z } from "zod";

export const loginSchema = z.object({
  code: z.string().length(4),
});
