import z from "zod";

export const changeUsernameSchema = z.object({
  newUsername: z
    .string()
    .min(4, { message: "usernameMinError" })
    .max(15, { message: "usernameMaxError" }),
  password: z
    .string()
    .min(6, { message: "invalidPasswordError" })
    .max(30, { message: "invalidPasswordError" }),
});

export type ChangeUsernameSchemaType = z.infer<typeof changeUsernameSchema>;
