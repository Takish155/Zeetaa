"use client";

import useOptimisticChat from "@/_custon_hooks/user_actions/useOptimisticChat";
import { OptimistiChatTypes } from "@/_schema/useOptimisticChat.types";
import { ReactNode, createContext, useContext } from "react";

const OptimisticChatContext = createContext<OptimistiChatTypes | null>(null);

export const OptimisticChatProvider = ({
  children,
  chatChannel,
  username,
}: {
  children: ReactNode;
  chatChannel: string;
  username: string;
}) => {
  const OptimisticChatState = useOptimisticChat(chatChannel, username);
  return (
    <OptimisticChatContext.Provider value={OptimisticChatState}>
      {children}
    </OptimisticChatContext.Provider>
  );
};

export const useOptimisticChatContext = () => useContext(OptimisticChatContext);
