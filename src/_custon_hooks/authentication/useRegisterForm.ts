import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/_schema/authentication/registrationSchema";
import { registrationAction } from "@/app/api/actions/auth/registrationAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useRegisterForm = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const [status, setStatus] = useState<"IDLE" | "LOADING">("IDLE");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationSchemaType) => {
    setStatus("LOADING");
    const response = await registrationAction(data);
    setMessage(response);
    if (response.status === "success") {
      signIn("credentials", {
        username: data.username,
        password: data.password,
      });
      return;
    }
    window.scrollTo(0, 0);
    setStatus("IDLE");
  };

  return { register, handleSubmit, errors, message, onSubmit, status };
};

export default useRegisterForm;
