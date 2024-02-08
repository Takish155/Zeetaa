"use client";

import React from "react";
import styles from "./footer.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

export const Footer = () => {
  const path = useParams<{ locale: string }>();
  const router = useRouter();
  const pathName = usePathname();

  if (!pathName.includes(`/${path.locale}/messages`)) {
    return (
      <footer className={styles.footer}>
        <section className={styles.footerSection}>
          <p>Copyright © 2023. Zeetaa All Rights Reserved.</p>
          <section>
            <h3>Language | 言語</h3>
            <select
              defaultValue={path.locale}
              onChange={(e) => {
                if (path.locale === e.target.value) return;
                router.push("/" + e.target.value);
              }}
            >
              <option value={"en"}>English</option>
              <option value={"ja"}>Japanese</option>
            </select>
          </section>
        </section>
        <section style={{ width: "100vw" }}>
          <Link
            href="https://github.com/Takish155/Zeetaa"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon
              sx={{ fontSize: "3rem", width: "100%", marginTop: "1rem" }}
            />
          </Link>
        </section>
      </footer>
    );
  }
};
