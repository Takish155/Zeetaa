import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "@/../prisma/prisma";

const feedLoaderAction = async () => {
  const session = await getServerSession();
  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  try {
    if (!session) redirect(`/${locale}/auth/signin`);

    const user = await prisma?.user.findUnique({
      where: { email: session!.user!.email! },
      include: { posts: { include: { author: true } } },
    });

    if (!user) {
      throw new Error(t("userNotFoundError"));
    }

    const friends = await prisma?.friendList.findMany({
      where: { OR: [{ user1Id: user.id }, { user2Id: user.id }] },
      select: {
        user1: {
          select: {
            posts: { include: { author: true } },
          },
        },
        user2: {
          select: {
            posts: { include: { author: true } },
          },
        },
      },
    });

    type AllPostsType = {
      id: string;
      content: string;
      author: User;
      private: boolean;
      likeCount: number;
      authorId: string;
      createdAt: Date;
      updatedAt: Date;
    };

    let allPosts: AllPostsType[] = [...user.posts];
    friends?.forEach((friend) => {
      allPosts = [
        ...allPosts,

        ...friend.user1.posts.filter(
          (post) => post.author.username !== user.username
        ),
        ...friend.user2.posts.filter(
          (post) => post.author.username !== user.username
        ),
      ];
    });

    return allPosts.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message, status: "error" };
    }
    return { message: "Something went wrong", status: "error" };
  }
};

export default feedLoaderAction;
