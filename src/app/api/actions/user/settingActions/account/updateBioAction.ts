"use server";

import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

const updateBioAction = async (bio: string) => {
  const session = await getServerSession();
  const t = await getTranslations("SettingsPage");
  if (!session) throw new Error("Unauthorized");

  const user = await prisma?.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) throw new Error("Unauthorized");
  if (user.bio === bio) return { message: t("sameBioError"), status: "error" };

  await prisma?.user.update({
    where: { id: user.id },
    data: { bio: bio },
  });

  return { message: t("bioUpdatedSuccess"), status: "success" };
};

export default updateBioAction;
