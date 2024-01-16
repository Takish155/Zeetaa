import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

const page = async ({ children }: { children: ReactNode }) => {
  const t = await getTranslations("MessagesPage");
  return (
    <main>
      <h2>{t("header")}</h2>
      <nav>
        <h2>{t("friendHeading")}</h2>
        <ul>{}</ul>
      </nav>
      <article>{children}</article>
    </main>
  );
};

export default page;
