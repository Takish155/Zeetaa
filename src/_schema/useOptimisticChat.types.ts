import { UseMutationResult } from "@tanstack/react-query";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";

export type ChatMessage = {
  content: string;
  sender: string;
  date: Date;
  status: string;
};

export type OptimistiChatTypes = {
  messages: ChatMessage[];
  mutation: UseMutationResult<
    | {
        status: string;
        sentMessage: string;
        message?: undefined;
      }
    | {
        message: string;
        status: string;
        sentMessage?: undefined;
      },
    Error,
    {
      message: string;
    },
    void
  >;
  register: UseFormRegister<{
    message: string;
  }>;
  reset: UseFormReset<{
    message: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      message: string;
    },
    undefined
  >;
  errors: FieldErrors<{
    message: string;
  }>;
};
