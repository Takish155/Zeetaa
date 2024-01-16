import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const t = useTranslations("SettingsPage");
  return (
    <main>
      <h2>{t("header")}</h2>
      <nav>
        <ul>
          <li>
            <Link href={`/${params.locale}/settings`}>{t("account")}</Link>
          </li>
          <li>
            <Link href={`/${params.locale}/settings/personal_details`}>
              {t("personalDetails")}
            </Link>
          </li>
          <li>
            <Link href={`/${params.locale}/settings/security`}>
              {t("security")}
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default layout;
