"use server";

import { getServerSession } from "next-auth";

const searchUserAction = async (username: string) => {
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
};

export default searchUserAction;
