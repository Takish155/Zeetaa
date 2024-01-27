"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import {
  ChangeNameSchemaType,
  changeNameSchema,
} from "@/_schema/settingsSchema/changeNameSchema";
import prisma from "@/../prisma/prisma";

const changeNameAction = async (formData: ChangeNameSchemaType) => {
  try {
    const data = changeNameSchema.safeParse(formData);
    if (!data.success) throw new Error(data.error.message);

    const locale = await getLocale();
    const session = await getServerSession();
    if (!session) redirect(`/${locale}/auth/signin`);

    const t = await getTranslations("PersonalDetailsPage");

    const user = await prisma?.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });
    if (!user) throw new Error("User not found");
    if (
      user.firstName === formData.firstName &&
      user.lastName === formData.lastName
    )
      throw new Error(t("sameNameError"));

    const passwordMatch = await bcrypt.compare(
      formData.password,
      user.hashedPassword!
    );
    if (!passwordMatch) throw new Error(t("incorrectPasswordError"));

    await prisma?.user.update({
      where: {
        email: session.user?.email!,
      },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
    });

    revalidatePath(`/${locale}/settings/personal_details`);
    return { message: t("nameChangedSuccess"), status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default changeNameAction;
