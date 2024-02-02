import React from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";

const iconStyles: React.CSSProperties = {
  marginRight: "0.6rem",
  width: "1.5rem",
  height: "1.5rem",
};

const SessionHeader = async ({ locale }: { locale: string }) => {
  const t = await getTranslations("Header");
  const userData = await getUserDataAction();
  return (
    <>
      <li>
        <HomeIcon />
        <Link href={`/${locale}/home`}>{t("home")}</Link>
      </li>
      <li>
        <NotificationsIcon />
        <Link href={`/${locale}/notifications`}>{t("notifications")}</Link>
      </li>
      <li>
        <PeopleIcon />
        <Link href={`/${locale}/friends`}>{t("friends")}</Link>
      </li>
      {"username" in userData && (
        <li>
          <AccountBoxIcon />
          <Link href={`/${locale}/profile/${userData?.username}`}>
            {t("profile")}
          </Link>
        </li>
      )}

      <li>
        <SettingsIcon />
        <Link href={`/${locale}/settings`} data-test="nav-settings">
          {t("settings")}
        </Link>
      </li>
      <SignOutButton />
    </>
  );
};

export default SessionHeader;
