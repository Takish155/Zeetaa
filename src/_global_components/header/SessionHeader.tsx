import React from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";

const SessionHeader = async ({ locale }: { locale: string }) => {
  const t = await getTranslations("Header");
  const userData = await getUserDataAction();
  return (
    <>
      <li>
        <Link href={`/${locale}/home`}>{t("home")}</Link>
      </li>
      <li>
        <Link href={`/${locale}/notifications`}>{t("notifications")}</Link>
      </li>
      <li>
        <Link href={`/${locale}/friends`}>{t("friends")}</Link>
      </li>
      {"username" in userData && (
        <li>
          <Link href={`/${locale}/profile/${userData?.username}`}>
            {t("profile")}
          </Link>
        </li>
      )}

      <li>
        <Link href={`/${locale}/settings`} data-test="settings">
          {t("settings")}
        </Link>
      </li>
      <SignOutButton />
    </>
  );
};

export default SessionHeader;
