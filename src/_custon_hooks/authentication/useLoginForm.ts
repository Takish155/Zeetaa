import {
  LoginSchemaType,
  loginSchema,
} from "@/_schema/authentication/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useLoginForm = (locale: string) => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) =>
      await signIn("credentials", {
        username: username,
        password: password,
      }),
    onSettled: (res) => {
      if (res?.error) {
        setMessage({
          message: "credentialError",
          status: "error",
        });
      }
    },
  });

  return { register, handleSubmit, errors, message, loginMutation };
};

export default useLoginForm;
