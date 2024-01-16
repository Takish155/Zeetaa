"use server";

import { getServerSession } from "next-auth";

const sendMessageAction = async (username: string, message: string) => {
  var Pusher = require("pusher");
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

  await prisma?.message.create({
    data: {
      senderId: user.id,
      receiverId: receiver.id,
      content: message,
    },
  });

  const channelName =
    user.id < receiver.id
      ? `${user.id}-${receiver.id}`
      : `${receiver.id}-${user.id}`;

  const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
    cluster: "ap3",
    useTLS: true,
  });

  pusher.trigger(channelName, "newMessage", {
    message: `${JSON.stringify("refetch")}\n\n`,
  });
};

export default sendMessageAction;
