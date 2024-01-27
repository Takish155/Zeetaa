"use server";

import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const postAction = async (message: string, feed: string) => {
  try {
    const session = await getServerSession();
    const t = await getTranslations("HomePage");

    if (!session) {
      throw new Error(t("noSessionError"));
    }

    if (message.length < 1) throw new Error(t("emptyMessageError"));

    if (message.length > 1000) throw new Error(t("longMessageError"));

    if (feed !== "public" && feed !== "private")
      throw new Error(t("invalidFeedError"));

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
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default postAction;
