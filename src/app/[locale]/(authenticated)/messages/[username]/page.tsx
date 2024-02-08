import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
import SendMessageSection from "./SendMessageSection";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
import getChatChannelAction from "@/app/api/actions/user/chatActions/getChatChannelAction";
import ChatHistory from "./ChatHistory";
import { OptimisticChatProvider } from "@/_context/OptimisitcChatProvider";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import styles from "./chat-page.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { username: string } }) => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/auth/signin`);
  const messages = await getMessages();
  const t = await getTranslations("MessagesPage");
  const chatChannel = await getChatChannelAction(params.username);
  const user = await getUserDataAction();

  if ("username" in user ? user?.username === params.username : "")
    throw new Error("You can't chat with yourself");

  return (
    <main className={styles.chatMain}>
      <Link passHref href={`/${locale}/profile/${params.username}`}>
        <h2>{params.username}</h2>
      </Link>
      <NextIntlClientProvider messages={pick(messages, "FieldError")}>
        <OptimisticChatProvider
          chatChannel={chatChannel as string}
          username={params.username}
        >
          <ChatHistory username={params.username} />
          <SendMessageSection sendButtonText={t("sendButtonText")} />
        </OptimisticChatProvider>
      </NextIntlClientProvider>
    </main>
  );
};

export default page;
