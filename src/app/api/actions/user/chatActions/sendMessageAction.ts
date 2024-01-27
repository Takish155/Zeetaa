"use server";

import { getServerSession } from "next-auth";

const sendMessageAction = async (username: string, message: string) => {
  try {
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

    const channelName = `${receiver.id}-${user.id}`;

    const pusher = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
      secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
      cluster: "ap3",
      useTLS: true,
    });

    pusher.trigger(channelName, "newMessage", {
      message: `${JSON.stringify(message)}\n\n`,
    });

    return { status: "success", sentMessage: message };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default sendMessageAction;
