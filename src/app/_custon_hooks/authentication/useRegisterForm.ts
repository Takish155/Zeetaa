import { registrationAction } from "@/app/api/actions/auth/registrationAction";
import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/app/_schema/authentication/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useRegisterForm = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationSchemaType) => {
    const response = await registrationAction(data);
    setMessage(response);
    if (response.status === "success") {
      signIn("credentials", {
        username: data.username,
        password: data.password,
      });
    }
    setLoading(false);
  };

  return { register, handleSubmit, errors, message, onSubmit, loading };
};

export default useRegisterForm;
