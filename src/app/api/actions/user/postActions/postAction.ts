"use server";

import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const postAction = async (message: string, feed: string) => {
  const session = await getServerSession();
  const t = await getTranslations("HomePage");

  if (!session) {
    throw new Error(t("noSessionError"));
  }

  if (message.length < 1) {
    return { message: t("emptyMessageError"), status: "error" };
  }

  if (message.length > 1000) {
    return { message: t("longMessageError"), status: "error" };
  }

  if (feed !== "public" && feed !== "private") {
    return { message: t("invalidFeedError"), status: "error" };
  }

  const user = await prisma?.user.findUnique({
    where: { email: session!.user!.email! },
  });

  if (!user) {
    throw new Error(t("userNotFoundError"));
  }

  await prisma?.user.update({
    where: { email: session!.user!.email! },
    data: {
      posts: {
        create: {
          content: message,
          private: feed === "private" ? true : false,
        },
      },
    },
  });

  revalidatePath("/en/home");
  return { message: t("postSuccess"), status: "success" };
};

export default postAction;
