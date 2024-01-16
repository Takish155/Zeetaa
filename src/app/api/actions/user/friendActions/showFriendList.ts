"use server";

import { getServerSession } from "next-auth";

const showFriendList = async () => {
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
};

export default showFriendList;
