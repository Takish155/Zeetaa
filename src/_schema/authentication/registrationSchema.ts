import z from "zod";

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "firstNameMinError" })
      .max(30, { message: "firstNameMaxError" }),
    lastName: z
      .string()
      .min(2, { message: "lastNameMinError" })
      .max(30, { message: "lastNameMaxError" }),
    username: z
      .string()
      .min(4, { message: "usernameMinError" })
      .max(15, { message: "usernameMaxError" }),
    email: z.string().email({ message: "emailError" }),
    password: z
      .string()
      .min(6, { message: "passwordMinError" })
      .max(30, { message: "passwordMaxError" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirmPasswordError",
    path: ["confirmPassword"],
  });

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
