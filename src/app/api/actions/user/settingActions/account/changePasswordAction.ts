"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "@/_schema/settingsSchema/changePasswordSchema";
import prisma from "@/../prisma/prisma";

const changePasswordAction = async (formData: ChangePasswordSchemaType) => {
  try {
    const t = await getTranslations("PersonalDetailsPage");
    const data = changePasswordSchema.safeParse(formData);
    if (!data.success) throw new Error(data.error.message);

    const session = await getServerSession();
    const locale = await getLocale();

    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(
      formData.oldPassword,
      user.hashedPassword!
    );

    if (!passwordMatch) throw new Error(t("oldPasswordError"));
    if (data.data.newPassword !== data.data.confirmNewPassword)
      throw new Error(t("passwordDontMatchError"));
    if (data.data.newPassword === data.data.oldPassword)
      throw new Error(t("samePasswordError"));

    const newPassword = await bcrypt.hash(data.data.newPassword, 10);
    await prisma?.user.update({
      where: { id: user.id },
      data: { hashedPassword: newPassword },
    });

    return { message: t("passwordChangedSuccess"), status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default changePasswordAction;
