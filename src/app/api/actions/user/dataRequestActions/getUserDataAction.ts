"use server";
import prisma from "../../../../../../prisma/prisma";

import { getServerSession } from "next-auth";

const getUserDataAction = async () => {
  const session = await getServerSession();

  const user = await prisma?.user.findUnique({
    where: { email: session!.user!.email! },
  });

  return user;
};

export default getUserDataAction;
