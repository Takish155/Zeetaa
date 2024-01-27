import { useOptimisticChatContext } from "@/_context/OptimisitcChatProvider";
import showChatHistoryAction from "@/app/api/actions/user/chatActions/showChatHistoryAction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const useChatHistory = (username: string) => {
  const [hasScrolled, setScrolled] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const { messages } = useOptimisticChatContext() || {};
  const { ref, inView } = useInView();
  const { data, isLoading, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ["chatHistory", username],
    queryFn: async ({ pageParam = 1 }) =>
      await showChatHistoryAction(username, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.status === "noPage") {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (data && inView) {
      fetchNextPage();
    }
  }, [data, inView, fetchNextPage]);

  useLayoutEffect(() => {
    if (data && chatEndRef.current && !hasScrolled) {
      chatEndRef.current.scrollIntoView();
      setScrolled(true);
    }

    if (messages?.length !== messageLength) {
      chatEndRef.current?.scrollIntoView();
      setMessageLength(messages?.length || 0);
    }
  }, [data, messages, hasScrolled, messageLength]);

  return { data, isLoading, refetch, chatEndRef, ref, chatSectionRef };
};

export default useChatHistory;
