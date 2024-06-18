import { z, ZodType } from "zod"; // Add new import

export type FormData = {
  email: string;
  password: string;
};

export const LoginSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Minimum password is 8" })
    .max(20, { message: "Maximum password is 20" }),
});
