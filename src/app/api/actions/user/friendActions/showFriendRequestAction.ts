"use server";

import { getServerSession } from "next-auth";

const showFriendRequestAction = async () => {
  const session = await getServerSession();
  if (!session) {
    throw new Error();
  }

  const user = await prisma?.user.findUnique({
    where: { email: session?.user?.email! },
    include: {
      incomingFriendRequests: true,
    },
  });

  if (!user) {
    throw new Error();
  }

  return user.incomingFriendRequests;
};

export default showFriendRequestAction;
