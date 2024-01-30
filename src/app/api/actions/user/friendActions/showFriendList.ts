"use server";

import { getServerSession } from "next-auth";
import prisma from "@/../prisma/prisma";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

const showFriendList = async () => {
  const locale = await getLocale();
  const session = await getServerSession();

  if (!session) {
    redirect(`/${locale}/auth/signin`);
  }
  try {
    const user = await prisma?.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
      include: {
        sentFriendRequests: { include: { user1: true, user2: true } },
        receivedFriendRequests: { include: { user1: true, user2: true } },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      sentFriendRequests: user.sentFriendRequests,
      receivedFriendRequests: user.receivedFriendRequests,
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default showFriendList;
