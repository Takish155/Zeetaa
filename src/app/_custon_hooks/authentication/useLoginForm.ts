import {
  LoginSchemaType,
  loginSchema,
} from "@/app/_schema/authentication/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useLoginForm = () => {
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

  const onSubmit = async (data: LoginSchemaType) => {
    signIn("credentials", {
      username: data.username,
      password: data.password,
    });
  };

  return { register, handleSubmit, errors, message, onSubmit };
};

export default useLoginForm;
