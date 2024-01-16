"use server";

import { getServerSession } from "next-auth";

const showChatHistoryAction = async (username: string) => {
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
      username: username,
    },
  });
  if (!receiver) throw new Error("Receiver not found");

  const sentMessage = await prisma?.message.findMany({
    where: {
      senderId: user.id,
      receiverId: receiver.id,
    },
    include: { sender: true, receiver: true },
  });

  const receivedMessage = await prisma?.message.findMany({
    where: {
      senderId: receiver.id,
      receiverId: user.id,
    },
    include: { sender: true, receiver: true },
  });

  return [...sentMessage!, ...receivedMessage!].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );
};

export default showChatHistoryAction;
