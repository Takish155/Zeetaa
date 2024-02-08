"use server";

import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "@/../prisma/prisma";

const showChatHistoryAction = async (username: string, pageNumber: number) => {
  const session = await getServerSession();
  const locale = await getLocale();

  try {
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

    const messages = await prisma?.message.findMany({
      orderBy: { createdAt: "desc" },
      skip: (pageNumber - 1) * 6,
      take: 6,
      where: {
        OR: [
          {
            senderId: user.id,
            receiverId: receiver.id,
          },
          {
            senderId: receiver.id,
            receiverId: user.id,
          },
        ],
      },
      include: { sender: true, receiver: true },
    });

    if (messages?.length === 0)
      return {
        status: "noPage",
        data: null,
      };

    return {
      status: "success",
      data: messages,
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default showChatHistoryAction;
