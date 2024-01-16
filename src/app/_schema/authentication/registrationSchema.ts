import z from "zod";

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be more than 2 letters" })
      .max(30, { message: "First name must be less than 30 letters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be more than 2 letters" })
      .max(30, { message: "Last name must be less than 30 letters" }),
    username: z
      .string()
      .min(4, { message: "Username must be more than 4 letters" })
      .max(15, { message: "Username must be less than 15 letters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be more than 6 letters" })
      .max(30, { message: "Password must be less than 30 letters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
