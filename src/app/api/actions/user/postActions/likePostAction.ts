"use server";

import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const likePostAction = async (postId: string) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("No session found");
  }

  const user = await prisma?.user.findUnique({
    where: { email: session!.user!.email! },
  });

  const post = await prisma?.personPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (user?.likedPosts.includes(postId)) {
    await prisma?.user.update({
      where: { id: user?.id },
      data: {
        likedPosts: {
          set: user?.likedPosts.filter((id) => id !== postId),
        },
      },
    });
    await prisma?.personPost.update({
      where: { id: postId },
      data: {
        likeCount: (post.likeCount -= 1),
      },
    });

    revalidatePath("/en/home");
    return;
  }

  await prisma?.user.update({
    where: { id: user?.id },
    data: {
      likedPosts: {
        set: [...(user?.likedPosts || []), postId],
      },
    },
  });

  await prisma?.personPost.update({
    where: { id: postId },
    data: {
      likeCount: (post.likeCount += 1),
    },
  });

  revalidatePath("/en/home");
  return { message: "Post liked", status: "success" };
};

export default likePostAction;
