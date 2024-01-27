"use server";

import { getServerSession } from "next-auth";
import prisma from "@/../prisma/prisma";

const showFriendList = async () => {
  try {
    const session = await getServerSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

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
