import { PostFormSchemaType, postFormSchema } from "@/_schema/postFormSchema";
import postAction from "@/app/api/actions/user/postActions/postAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

const usePostForm = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostFormSchemaType>({
    resolver: zodResolver(postFormSchema),
  });

  const postMutation = useMutation({
    mutationFn: async ({ post, feedPrivacy }: PostFormSchemaType) =>
      await postAction(post, feedPrivacy),
    onSuccess: (res) => {
      setMessage(res);
      reset();
    },
  });

  return {
    message,
    register,
    errors,
    handleSubmit,
    postMutation,
  };
};

export default usePostForm;
