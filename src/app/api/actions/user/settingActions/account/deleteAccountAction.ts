"use server";

import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { getTranslations } from "next-intl/server";

const deleteAccountAction = async (password: string) => {
  const session = await getServerSession();
  const t = await getTranslations("SettingsPage");
  if (!session) {
    throw new Error("You must be logged in to delete your account");
  }

  const user = await prisma?.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.hashedPassword!
  );

  if (!isPasswordCorrect) {
    return { message: t("invalidPasswordError"), status: "error" };
  }

  await prisma?.user.delete({
    where: {
      email: session?.user?.email!,
    },
  });

  return { message: t("successMessage"), status: "success" };
};

export default deleteAccountAction;
