import deleteAccountAction from "@/app/api/actions/user/settingActions/account/deleteAccountAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(6).max(30),
});

type FormValues = z.infer<typeof schema>;

const useDeleteAccount = () => {
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

  const onSubmit = async (password: string) => {
    setLoading(true);
    const response = await deleteAccountAction(password);
    if (response?.status === "error") {
      setLoading(false);
    }
    setMessage({
      message: response.message,
      status: response.status,
    });
    if (response.status === "success") {
      setTimeout(() => {
        signOut();
      }, 5000);
    }
  };

  return { register, handleSubmit, errors, onSubmit, loading, message };
};

export default useDeleteAccount;
