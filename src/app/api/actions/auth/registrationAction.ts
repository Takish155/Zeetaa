"use server";

import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/app/_schema/authentication/registrationSchema";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";

export const registrationAction = async (data: RegistrationSchemaType) => {
  const t = await getTranslations("RegistrationAction");
  const safeData = registrationSchema.safeParse(data);

  if (!safeData.success) {
    return { message: t("safeDataError"), status: "error" };
  }

  const usernameExist = await prisma?.user.findUnique({
    where: { username: safeData.data.username },
  });

  if (usernameExist) {
    return { message: t("usernameExistError"), status: "error" };
  }

  const emailExist = await prisma?.user.findUnique({
    where: { email: safeData.data.email },
  });

  if (emailExist) {
    return { message: t("emailExistError"), status: "error" };
  }

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
};
