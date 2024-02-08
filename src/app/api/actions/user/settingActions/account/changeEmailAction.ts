"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";
import {
  ChangeEmailSchemaType,
  changeEmailSchema,
} from "@/_schema/settingsSchema/changeEmailSchema";
import { redirect } from "next/navigation";
import prisma from "@/../prisma/prisma";

const changeEmailAction = async (data: ChangeEmailSchemaType) => {
  try {
    const t = await getTranslations("PersonalDetailsPage");
    const locale = await getLocale();

    const formData = changeEmailSchema.safeParse(data);
    if (!formData.success) throw new Error(formData.error.message);

    const session = await getServerSession();

    if (session.user?.email === data.newEmail)
      throw new Error(t("sameEmailError"));

    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.hashedPassword!
    );
    if (!passwordMatch) throw new Error(t("incorrectPasswordError"));

    const emailExists = await prisma?.user.findUnique({
      where: { email: data.newEmail },
    });

    if (emailExists)
      return {
        message: t("emailExistsError"),
        status: "error",
      };

    await prisma?.user.update({
      where: { id: user.id },
      data: { email: data.newEmail },
    });

    return {
      message: t("emailChangedSuccess"),
      status: "success",
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default changeEmailAction;
