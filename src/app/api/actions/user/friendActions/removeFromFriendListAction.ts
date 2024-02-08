"use server";

import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import prisma from "@/../prisma/prisma";

const removeFromFriendListAction = async (friendListId: string) => {
  try {
    const session = await getServerSession();
    const locale = await getLocale();
    if (!session) {
      throw new Error("Session not found");
    }

    const user = await prisma?.user.findUnique({
      where: {
        email: session!.user?.email!,
      },
      include: { sentFriendRequests: true, receivedFriendRequests: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const friendList = await prisma?.friendList.findUnique({
      where: {
        id: friendListId,
      },
      include: { user1: true, user2: true },
    });

    if (!friendList) {
      throw new Error("Friend list not found");
    }

    if (
      !user.sentFriendRequests.find(
        (friendRequest) => friendRequest.id === friendListId
      ) &&
      !user.receivedFriendRequests.find(
        (friendRequest) => friendRequest.id === friendListId
      )
    ) {
      throw new Error("Friend not found");
    }

    await prisma?.friendList.delete({
      where: {
        id: friendListId,
      },
    });

    revalidatePath(`${locale}/friends`);
    revalidatePath(`${locale}/profile/${friendList?.user1.username}`);
    revalidatePath(`${locale}/profile/${friendList?.user2.username}`);
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default removeFromFriendListAction;
