import zod from "zod";

export const chatSchema = zod.object({
  message: zod
    .string()
    .min(1, { message: "noMessageError" })
    .max(150, { message: "maxMessageError" }),
});

export type ChatSchemaType = zod.infer<typeof chatSchema>;
