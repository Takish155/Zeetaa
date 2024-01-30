import z from "zod";

export const postFormSchema = z.object({
  post: z
    .string()
    .min(1, { message: "emptyPostMessageError" })
    .max(1000, { message: "maxPostMessageError" }),
  feedPrivacy: z.enum(["public", "private"]),
});

export type PostFormSchemaType = z.infer<typeof postFormSchema>;
