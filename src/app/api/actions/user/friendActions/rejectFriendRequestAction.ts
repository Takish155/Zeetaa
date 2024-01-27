"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const rejectFriendRequestAction = async (friendRequestId: string) => {
  try {
    const t = await getTranslations("NotificationPage");
    const locale = await getLocale();
    const session = await getServerSession();
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

    await prisma?.friendRequest.delete({
      where: { id: friendRequestId },
    });

    revalidatePath(`/${locale}/profile/${user.username}}`);
    return {
      message: `${friendRequest.senderUsername}${t(
        "friendRequestRejectedSuccess"
      )}`,
      status: "success",
      action: "rejectFriendRequest",
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default rejectFriendRequestAction;
