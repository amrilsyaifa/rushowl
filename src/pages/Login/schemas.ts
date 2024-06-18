import { z, ZodType } from "zod"; // Add new import

export type FormData = {
  email: string;
  password: string;
};

export const LoginSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at least 20 characters" }),
});
