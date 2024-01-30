import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const t = await getTranslations("SettingsPage");
  return (
    <main>
      <h2>{t("header")}</h2>
      <nav>
        <ul>
          <li>
            <Link href={`/${params.locale}/settings`}>{t("account")}</Link>
          </li>
          <li>
            <Link
              data-test="nav-details"
              href={`/${params.locale}/settings/personal_details`}
            >
              {t("personalDetails")}
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default layout;
