"use server";

import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { getLocale, getTranslations } from "next-intl/server";

import { revalidatePath } from "next/cache";
import {
  ChangeUsernameSchemaType,
  changeUsernameSchema,
} from "@/_schema/settingsSchema/changeUsernameSchema";
import prisma from "@/../prisma/prisma";

const changeUsernameAction = async (data: ChangeUsernameSchemaType) => {
  try {
    const form = changeUsernameSchema.safeParse(data);
    if (!form.success) throw new Error(form.error.message);

    const locale = await getLocale();

    const session = await getServerSession();
    const t = await getTranslations("PersonalDetailsPage");
    if (!session)
      throw new Error("You must be logged in to change your username");

    console.log(session!.user?.email!);
    const user = await prisma?.user.findUnique({
      where: { email: session!.user?.email! },
    });
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.hashedPassword!
    );
    if (!passwordMatch) throw new Error(t("incorrectPasswordError"));

    if (data.newUsername === user.username)
      throw new Error(t("sameUsernameError"));

    const usernameExists = await prisma?.user.findUnique({
      where: { username: data.newUsername },
    });

    if (usernameExists) throw new Error(t("usernameExistsError"));

    await prisma?.user.update({
      where: { id: user.id },
      data: { username: data.newUsername },
    });

    revalidatePath(`/${locale}/settings/personal_details`);

    return {
      message: t("usernameChangedSuccess"),
      status: "success",
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default changeUsernameAction;
