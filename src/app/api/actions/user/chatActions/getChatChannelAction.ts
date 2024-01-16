"use server";

import { getServerSession } from "next-auth";

const getChatChannelAction = async (username: string) => {
  const session = await getServerSession();
  if (!session) throw new Error("Not authenticated");

  const user = await prisma?.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });
  if (!user) throw new Error("User not found");

  const receiver = await prisma?.user.findUnique({
    where: {
      username,
    },
  });
  if (!receiver) throw new Error("Receiver not found");

  const channelName =
    user.id < receiver.id
      ? `${user.id}-${receiver.id}`
      : `${receiver.id}-${user.id}`;

  return channelName;
};

export default getChatChannelAction;
