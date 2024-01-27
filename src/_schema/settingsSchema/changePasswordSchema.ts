import z from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "invalidPasswordError" })
      .max(30, { message: "invalidPasswordError" }),
    newPassword: z
      .string()
      .min(6, { message: "passwordMinError" })
      .max(30, { message: "passwordMaxError" }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "confirmPasswordError",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
