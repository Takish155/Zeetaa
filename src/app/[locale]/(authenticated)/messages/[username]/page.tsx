import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
import SendMessageSection from "./SendMessageSection";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
import getChatChannelAction from "@/app/api/actions/user/chatActions/getChatChannelAction";
import ChatHistory from "./ChatHistory";
import { OptimisticChatProvider } from "@/_context/OptimisitcChatProvider";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
const page = async ({ params }: { params: { username: string } }) => {
  const messages = await getMessages();
  const locale = await getLocale();
  const t = await getTranslations("MessagesPage");
  const chatChannel = await getChatChannelAction(params.username);
  const user = await getUserDataAction();

  if ("username" in user ? user?.username === params.username : "")
    throw new Error("You can't chat with yourself");

  return (
    <main>
      <article>
        <h2>
          <Link href={`/${locale}/profile/${params.username}`}>
            {params.username}
          </Link>
        </h2>
        <NextIntlClientProvider messages={pick(messages, "FieldError")}>
          <OptimisticChatProvider
            chatChannel={chatChannel as string}
            username={params.username}
          >
            <ChatHistory username={params.username} />
            <SendMessageSection sendButtonText={t("sendButtonText")} />
          </OptimisticChatProvider>
        </NextIntlClientProvider>
      </article>
    </main>
  );
};

export default page;
