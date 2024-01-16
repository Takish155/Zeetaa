"use server";

import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

const cancelSentFriendRequestAction = async (friendRequestId: string) => {
  const session = await getServerSession();
  const locale = await getLocale();

  const sessionUser = await prisma?.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!sessionUser) {
    throw new Error("User not found");
  }

  const friendRequest = await prisma?.friendRequest.findUnique({
    where: { id: friendRequestId },
    include: { receiver: true },
  });

  if (!friendRequest) {
    throw new Error("Friend request not found");
  }

  if (friendRequest.senderId !== sessionUser?.id) {
    throw new Error("You are not allowed to do this");
  }

  const cancelSentFriendRequest = await prisma?.friendRequest.delete({
    where: { id: friendRequestId },
  });

  revalidatePath(`/${locale}/profile/${friendRequest.receiver.username}`);
};

export default cancelSentFriendRequestAction;
