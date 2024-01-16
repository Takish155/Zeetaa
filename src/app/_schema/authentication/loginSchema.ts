import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Invalid username!" })
    .max(15, { message: "Invalid username!" }),
  password: z
    .string()
    .min(6, { message: "Invalid password!" })
    .max(30, { message: "Invalid password!" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
