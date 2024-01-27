import { ChatSchemaType, chatSchema } from "@/_schema/chatSchema";
import { ChatMessage } from "@/_schema/useOptimisticChat.types";
import sendMessageAction from "@/app/api/actions/user/chatActions/sendMessageAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useOptimisticChat = (chatChannel: string, username: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const mutation = useMutation({
    mutationFn: async ({ message }: ChatSchemaType) =>
      await sendMessageAction(username, message),
    onMutate: ({ message }) => {
      reset();
      setMessages((prevChat) => [
        ...prevChat,
        {
          content: message,
          sender: "You",
          date: new Date(),
          status: "pending",
        },
      ]);
    },
    onSuccess: (res) => {
      const messageIndex = messages.findIndex(
        (msg) => msg.content === res.sentMessage
      );
      setMessages((prevMessage) => {
        const newMessages = [...prevMessage];
        newMessages[messageIndex].status = "sent";
        return newMessages;
      });
    },
    onError: () => {
      const messageIndex = messages.findIndex(
        (msg) => msg.status === "pending"
      );
      setMessages((prevMessage) => {
        const newMessages = [...prevMessage];
        newMessages[messageIndex].status = "failed";
        return newMessages;
      });
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatSchemaType>({
    resolver: zodResolver(chatSchema),
  });

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "ap3",
    });

    var channel = pusher.subscribe(chatChannel);
    channel.bind("newMessage", function (message: { message: string }) {
      const parsedMessage = JSON.parse(message.message);
      setMessages((prevChat) => [
        ...prevChat,
        {
          content: parsedMessage,
          sender: username,
          date: new Date(),
          status: "",
        },
      ]);
    });

    return () => {
      pusher.unbind("newMessage");
      pusher.unsubscribe(chatChannel);
    };
  }, [chatChannel, username]);

  return { messages, mutation, register, reset, handleSubmit, errors };
};

export default useOptimisticChat;
