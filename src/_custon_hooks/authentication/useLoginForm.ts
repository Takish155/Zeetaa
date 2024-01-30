import {
  LoginSchemaType,
  loginSchema,
} from "@/_schema/authentication/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const mutation = useMutation({
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
        redirect: false,
      }),
    onSettled: (res) => {
      if (!res?.ok) {
        setMessage({
          message: "credentialError",
          status: "error",
        });
      } else {
        router.push(`/${locale}/home`);
        router.refresh();
      }
    },
  });

  return { register, handleSubmit, errors, message, mutation };
};

export default useLoginForm;
