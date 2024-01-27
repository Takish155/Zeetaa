import z from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().email({ message: "emailError" }),
  password: z
    .string()
    .min(6, { message: "invalidPasswordError" })
    .max(30, { message: "invalidPasswordError" }),
});

export type ChangeEmailSchemaType = z.infer<typeof changeEmailSchema>;
