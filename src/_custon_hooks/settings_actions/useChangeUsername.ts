import {
  ChangeUsernameSchemaType,
  changeUsernameSchema,
} from "@/_schema/settingsSchema/changeUsernameSchema";
import changeUsernameAction from "@/app/api/actions/user/settingActions/account/changeUsernameAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useChangeUsername = () => {
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangeUsernameSchemaType>({
    resolver: zodResolver(changeUsernameSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangeUsernameSchemaType) =>
      await changeUsernameAction(data),
    onSettled: (res) => {
      if (res?.status === "success") reset();
      setMessage(res!);
    },
  });

  return { register, handleSubmit, errors, mutation, message };
};

export default useChangeUsername;
