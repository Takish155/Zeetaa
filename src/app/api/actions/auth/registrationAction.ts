"use server";

import { getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";
import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/_schema/authentication/registrationSchema";

export const registrationAction = async (data: RegistrationSchemaType) => {
  const t = await getTranslations("RegistrationAction");
  try {
    const safeData = registrationSchema.safeParse(data);
    if (!safeData.success) throw new Error(t("safeDataError"));

    const usernameExist = await prisma?.user.findUnique({
      where: { username: safeData.data.username },
    });

    if (usernameExist) throw new Error(t("usernameExistError"));

    const emailExist = await prisma?.user.findUnique({
      where: { email: safeData.data.email },
    });

    if (emailExist) throw new Error(t("emailExistError"));

    const hashedPassword = await bcrypt.hash(safeData.data.password, 10);

    await prisma?.user.create({
      data: {
        username: safeData.data.username,
        email: safeData.data.email,
        firstName: safeData.data.firstName,
        lastName: safeData.data.lastName,
        hashedPassword: hashedPassword,
      },
    });

    return { message: t("registrationSuccess"), status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};
