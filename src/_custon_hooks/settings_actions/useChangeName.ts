import {
  ChangeNameSchemaType,
  changeNameSchema,
} from "@/_schema/settingsSchema/changeNameSchema";
import changeNameAction from "@/app/api/actions/user/settingActions/account/changeNameAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useChangeName = () => {
  const [message, setMessage] = useState({
    status: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeNameSchemaType>({
    resolver: zodResolver(changeNameSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangeNameSchemaType) =>
      await changeNameAction(data),
    onSettled: (res) => {
      setMessage(res!);
      if (res?.status === "success") {
        reset();
      }
    },
  });

  return { register, handleSubmit, errors, mutation, message };
};

export default useChangeName;
