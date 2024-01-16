"use server";

import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

const rejectFriendRequestAction = async (friendRequestId: string) => {
  const t = await getTranslations("NotificationPage");
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) {
    throw new Error();
  }

  const user = await prisma?.user.findUnique({
    where: { email: session?.user?.email! },
  });

  const friendRequest = await prisma?.friendRequest.findUnique({
    where: { id: friendRequestId },
  });

  if (!user || !friendRequest) {
    throw new Error();
  }

  if (friendRequest.receiverId !== user.id) {
    throw new Error();
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
};

export default rejectFriendRequestAction;
