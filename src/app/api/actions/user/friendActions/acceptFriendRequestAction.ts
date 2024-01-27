"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import prisma from "@/../prisma/prisma";

const acceptFriendRequestAction = async (friendRequestId: string) => {
  try {
    const session = await getServerSession();
    const t = await getTranslations("NotificationPage");
    const locale = await getLocale();

    if (!session) {
      throw new Error("Session not found");
    }

    const user = await prisma?.user.findUnique({
      where: { email: session?.user?.email! },
    });

    const friendRequest = await prisma?.friendRequest.findUnique({
      where: { id: friendRequestId },
    });

    if (!user || !friendRequest) {
      throw new Error("User or friend request not found");
    }

    if (friendRequest.receiverId !== user.id) {
      throw new Error("User is not the receiver of the friend request");
    }

    const checkIfAlreadyFriends = await prisma?.friendList.findFirst({
      where: {
        user1Id: user.id,
        user2Id: friendRequest.senderId,
        OR: [{ user1Id: friendRequest.senderId, user2Id: user.id }],
      },
    });

    if (checkIfAlreadyFriends) {
      throw new Error("Users are already friends");
    }

    await prisma?.friendRequest.delete({
      where: { id: friendRequestId },
    });

    await prisma?.friendList.create({
      data: {
        user1Id: user.id,
        user2Id: friendRequest.senderId,
      },
    });

    revalidatePath(`/${locale}/friends`);
    revalidatePath(`/${locale}/profile/${friendRequest.senderUsername}`);
    return {
      message: `${friendRequest.senderUsername} ${t(
        "friendRequestAcceptedSuccess"
      )}`,
      status: "success",
      action: "acceptFriendRequest",
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default acceptFriendRequestAction;
