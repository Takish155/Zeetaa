"use server";

import { getServerSession } from "next-auth";

const showNotificationAction = async (type: string) => {
  try {
    const session = await getServerSession();
    if (!session) {
      throw new Error();
    }

    const user = await prisma?.user.findUnique({
      where: { email: session?.user?.email! },
      select: {
        incomingFriendRequests: true,
        receivedMessages: { include: { sender: true } },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const incomingFriendRequests = user.incomingFriendRequests.map(
      (request) => {
        return {
          ...request,
          type: "friendrequest",
        };
      }
    );

    const sentMessages = user.receivedMessages.map((request) => {
      return {
        ...request,
        type: "messages",
        senderUsername: request.sender.username,
      };
    });

    if (type === "all") {
      return [...incomingFriendRequests, ...sentMessages].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    if (type === "friendrequest") {
      return incomingFriendRequests.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    if (type === "messages") {
      return sentMessages.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default showNotificationAction;
