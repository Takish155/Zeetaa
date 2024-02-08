"use client";

import Link from "next/link";
import React from "react";
import styles from "@/app/[locale]/(authenticated)/settings/settings.module.css";
import { useTranslations } from "next-intl";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { usePathname } from "next/navigation";

const SettingsNav = ({ locale }: { locale: string }) => {
  const t = useTranslations("SettingsPage");
  const path = usePathname();

  return (
    <nav className={styles.settingsNav}>
      <ul>
        <li
          style={{
            backgroundColor: path === `/${locale}/settings` ? "gray" : "",
          }}
        >
          <Link passHref href={`/${locale}/settings`}>
            <AdminPanelSettingsIcon />
            <p>{t("account")}</p>
          </Link>
        </li>
        <li
          style={{
            backgroundColor:
              path === `/${locale}/settings/personal_details` ? "gray" : "",
          }}
        >
          <Link
            data-test="nav-details"
            href={`/${locale}/settings/personal_details`}
          >
            <SettingsApplicationsIcon />
            <p>{t("personalDetails")}</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SettingsNav;
