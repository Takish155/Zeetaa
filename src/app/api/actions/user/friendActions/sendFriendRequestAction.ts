"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const sendFriendRequestAction = async (userId: string) => {
  try {
    const session = await getServerSession();
    const t = await getTranslations("ProfilePage");
    const locale = await getLocale();

    if (!session) {
      throw new Error("Session not found");
    }

    const friendRequestSender = await prisma?.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (!friendRequestSender) {
      throw new Error("User not found");
    }

    const friendRequestReceiver = await prisma?.user.findUnique({
      where: { id: userId },
    });

    if (!friendRequestReceiver) {
      throw new Error("User not found");
    }

    if (friendRequestSender.id === friendRequestReceiver.id) {
      throw new Error("You cannot send a friend request to yourself");
    }

    const checkIfAlreadyFriends = await prisma?.friendList.findFirst({
      where: {
        OR: [
          {
            user1Id: friendRequestReceiver.id,
            user2Id: friendRequestSender.id,
          },
          {
            user1Id: friendRequestSender.id,
            user2Id: friendRequestReceiver.id,
          },
        ],
      },
    });

    if (checkIfAlreadyFriends) {
      throw new Error("Users are already friends");
    }

    const checkIfAlreadySentFriendRequest =
      await prisma?.friendRequest.findFirst({
        where: {
          senderId: friendRequestSender.id,
          receiverId: friendRequestReceiver.id,
        },
      });

    if (checkIfAlreadySentFriendRequest)
      throw new Error(t("friendRequestAlreadySentError"));

    const checkIfReceiverAlreadySentFriendRequest =
      await prisma?.friendRequest.findFirst({
        where: {
          senderId: friendRequestReceiver.id,
          receiverId: friendRequestSender.id,
        },
      });

    if (checkIfReceiverAlreadySentFriendRequest) {
      prisma?.friendList.create({
        data: {
          user1Id: friendRequestSender.id,
          user2Id: friendRequestReceiver.id,
        },
      });

      return { message: t("acceptedFriendRequestSuccess"), status: "success" };
    }
    await prisma?.friendRequest.create({
      data: {
        senderId: friendRequestSender.id,
        receiverId: friendRequestReceiver.id,
        senderUsername: friendRequestSender.username!,
      },
    });

    revalidatePath(`/${locale}/profile/${friendRequestReceiver.username}`);
    return { message: t("friendRequestSentSuccess"), status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default sendFriendRequestAction;
