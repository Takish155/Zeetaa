"use server";

import { getServerSession } from "next-auth";
import prisma from "@/../prisma/prisma";

const searchUserAction = async (username: string) => {
  try {
    const user = await getServerSession();
    const query = await prisma?.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      include: { sentFriendRequests: true, receivedFriendRequests: true },
    });

    return query?.map((ele) => {
      if (ele.email === user?.user?.email) {
        return {
          ...ele,
          relationship: "user",
        };
      }
      return {
        ...ele,
        relationship: "others",
      };
    });
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default searchUserAction;
