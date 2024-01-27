"use server";

import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

const updateBioAction = async (bio: string) => {
  try {
    const session = await getServerSession();
    const t = await getTranslations("SettingsPage");
    if (!session) throw new Error("Unauthorized");

    const user = await prisma?.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) throw new Error("Unauthorized");
    if (user.bio === bio) throw new Error(t("sameBioError"));

    await prisma?.user.update({
      where: { id: user.id },
      data: { bio: bio },
    });

    return { message: t("bioUpdatedSuccess"), status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default updateBioAction;
