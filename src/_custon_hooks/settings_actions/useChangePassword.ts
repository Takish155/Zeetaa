import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "@/_schema/settingsSchema/changePasswordSchema";
import changePasswordAction from "@/app/api/actions/user/settingActions/account/changePasswordAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useChangePassword = () => {
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordSchemaType) =>
      await changePasswordAction(data),
    onSettled: (res) => {
      setMessage(res!);
      if (res?.status === "success") {
        reset();
      }
    },
  });

  return { register, handleSubmit, errors, mutation, message };
};

export default useChangePassword;
