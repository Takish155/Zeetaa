"use server";
import { redirect } from "next/navigation";
import prisma from "@/../prisma/prisma";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";

const getUserDataAction = async () => {
  const session = await getServerSession();
  const locale = await getLocale();
  try {
    if (!session) redirect(`/${locale}/auth/signin`);
    const user = await prisma?.user.findUnique({
      where: { email: session!.user!.email! },
    });

    return { ...user, status: "success" };
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default getUserDataAction;
