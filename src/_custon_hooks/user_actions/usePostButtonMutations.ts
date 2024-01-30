import deletePostAction from "@/app/api/actions/user/postActions/deletePostAction";
import likePostAction from "@/app/api/actions/user/postActions/likePostAction";
import { useMutation } from "@tanstack/react-query";

const usePostButtonMutations = () => {
  const likeMutation = useMutation({
    mutationFn: async ({ postId }: { postId: string }) =>
      await likePostAction(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ postId }: { postId: string }) =>
      await deletePostAction(postId),
  });

  return { likeMutation, deleteMutation };
};

export default usePostButtonMutations;
