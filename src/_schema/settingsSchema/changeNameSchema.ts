import z from "zod";

export const changeNameSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "firstNameMinError" })
    .max(30, { message: "firstNameMaxError" }),
  lastName: z
    .string()
    .min(2, { message: "lastNameMinError" })
    .max(30, { message: "lastNameMaxError" }),
  password: z
    .string()
    .min(6, { message: "invalidPasswordError" })
    .max(30, { message: "invalidPasswordError" }),
});

export type ChangeNameSchemaType = z.infer<typeof changeNameSchema>;
