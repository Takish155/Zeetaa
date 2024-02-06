"use client";

import updateBioAction from "@/app/api/actions/user/settingActions/account/updateBioAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  bio: z
    .string()
    .min(1, { message: "minBioError" })
    .max(200, { message: "maxBioError" }),
});

type FormValues = z.infer<typeof schema>;

const useUpdateBio = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const response = await updateBioAction(data.bio);
    setMessage(response);
    setLoading(false);
  };

  return { register, handleSubmit, errors, loading, message, onSubmit };
};

export default useUpdateBio;
