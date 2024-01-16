import postAction from "@/app/api/actions/user/postActions/postAction";
import { FormEvent, useState } from "react";

const usePostForm = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const [feedPrivacy, setFeedPrivacy] = useState<"public" | "private">(
    "public"
  );

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    message: string,
    feed: string
  ) => {
    e.preventDefault();
    setLoading(true);
    const response = await postAction(message, feed);
    setMessage({
      message: response.message,
      status: response.status,
    });
    setLoading(false);
    setPost("");
    setFeedPrivacy("public");
  };

  return {
    message,
    loading,
    onSubmit,
    post,
    setPost,
    feedPrivacy,
    setFeedPrivacy,
  };
};

export default usePostForm;
