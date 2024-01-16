import showChatHistoryAction from "@/app/api/actions/user/chatActions/showChatHistoryAction";
import { useQuery } from "@tanstack/react-query";
import Pusher from "pusher-js";
import { useEffect } from "react";

const useChatSection = (username: string, chatChannel: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["chatHistory", username],
    queryFn: async () => await showChatHistoryAction(username),
  });

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "ap3",
    });

    var channel = pusher.subscribe(chatChannel);
    channel.bind("newMessage", function () {
      refetch();
    });
  }, [chatChannel]);

  return { data, isLoading, refetch };
};

export default useChatSection;
