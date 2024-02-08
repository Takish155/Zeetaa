"use server";

import { getServerSession } from "next-auth";
import prisma from "@/../prisma/prisma";

const getChatChannelAction = async (username: string) => {
  try {
    const session = await getServerSession();
    if (!session) throw new Error("Not authenticated");

    const userAndReceiver = await prisma?.user.findUnique({
      where: {
        email: session!.user?.email!,
      },
    });
    if (!userAndReceiver) throw new Error("User not found");

    const sender = await prisma?.user.findUnique({
      where: {
        username,
      },
    });
    if (!sender) throw new Error("sender not found");

    const channelName = `${userAndReceiver.id}-${sender.id}`;
    return channelName;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default getChatChannelAction;
