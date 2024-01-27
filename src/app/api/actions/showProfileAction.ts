"use server";

import { getServerSession } from "next-auth";
import prisma from "@/../prisma/prisma";

const showProfileAction = async (username: string) => {
  try {
    const session = await getServerSession();

    const getUserInfo = await prisma?.user.findUnique({
      where: { username },
    });

    const getFeedsByUser = await prisma?.personPost.findMany({
      where: { authorId: getUserInfo?.id, private: false },
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    const getFeedsByUserPrivate = await prisma?.personPost.findMany({
      where: { authorId: getUserInfo?.id },
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    if (getUserInfo?.email !== session?.user?.email && session) {
      const sessionUser = await prisma?.user.findUnique({
        where: { email: session?.user?.email! },
      });

      if (!sessionUser) {
        throw new Error("User not found");
      }

      const checkIfUserAlreadyReceivedFriendRequest =
        await prisma?.friendRequest.findFirst({
          where: {
            senderId: getUserInfo?.id,
            receiverId: sessionUser?.id,
          },
        });

      if (checkIfUserAlreadyReceivedFriendRequest) {
        return {
          userInfo: getUserInfo,
          userFeeds: getFeedsByUser,
          relationship: "receivedFriendRequest",
          friendRequestId: checkIfUserAlreadyReceivedFriendRequest?.id,
        };
      }

      const checkIfUserAlreadySentFriendRequest =
        await prisma?.friendRequest.findFirst({
          where: {
            senderId: sessionUser?.id,
            receiverId: getUserInfo?.id,
          },
        });

      if (checkIfUserAlreadySentFriendRequest) {
        return {
          userInfo: getUserInfo,
          userFeeds: getFeedsByUser,
          relationship: "alreadySentFriendRequest",
          friendRequestId: checkIfUserAlreadySentFriendRequest?.id,
        };
      }

      const checkIfAlreadyFriends = await prisma?.friendList.findFirst({
        where: {
          OR: [
            { user1Id: getUserInfo?.id, user2Id: sessionUser.id },
            { user1Id: sessionUser.id, user2Id: getUserInfo?.id },
          ],
        },
      });

      if (checkIfAlreadyFriends) {
        return {
          userInfo: getUserInfo,
          userFeeds: getFeedsByUserPrivate,
          relationship: "friend",
          friendId: checkIfAlreadyFriends?.id,
        };
      }

      return {
        userInfo: getUserInfo,
        userFeeds: getFeedsByUser,
        relationship: "stranger",
      };
    }

    return {
      userInfo: getUserInfo,
      userFeeds: session ? getFeedsByUserPrivate : getFeedsByUser,
      relationship: session ? "self" : "unthnenticated",
    };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default showProfileAction;
