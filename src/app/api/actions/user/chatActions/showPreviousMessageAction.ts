"use server";

import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "@/../prisma/prisma";

const showPreviousMessage = async () => {
  const session = await getServerSession();
  const locale = await getLocale();
  try {
    const user = await prisma?.user.findUnique({
      where: {
        email: session!.user?.email!,
      },
    });
    if (!user) throw new Error("User not found");
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default showPreviousMessage;
