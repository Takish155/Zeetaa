import {
  ChangeEmailSchemaType,
  changeEmailSchema,
} from "@/_schema/settingsSchema/changeEmailSchema";
import changeEmailAction from "@/app/api/actions/user/settingActions/account/changeEmailAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useChangeEmail = () => {
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(changeEmailSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangeEmailSchemaType) =>
      await changeEmailAction(data),
    onSettled: (res) => {
      if (res?.status === "success") {
        setTimeout(() => {
          signOut();
        }, 5000);
      }
      setMessage(res!);
    },
  });

  return { register, handleSubmit, errors, mutation, message };
};

export default useChangeEmail;
