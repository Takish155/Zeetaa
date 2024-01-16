"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const deletePostAction = async (postId: string) => {
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

  if (!post || !user) {
    throw new Error("Post not found");
  }

  if (post.authorId !== user.id) {
    return { message: "You can't delete this post", status: "error" };
  }

  await prisma?.personPost.delete({
    where: { id: postId },
  });

  revalidatePath("/en/home");
  return { message: "Post deleted", status: "success" };
};

export default deletePostAction;
