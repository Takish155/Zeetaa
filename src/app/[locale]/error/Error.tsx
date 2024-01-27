"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const t = useTranslations("Login");
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  useEffect(() => {
    if (errorMessage === "CredentialsSignin") {
      router.push(
        `/${params.locale}/auth/signin?errorMessage=${t("authenticationError")}`
      );
    }
  }, [router, errorMessage, params.locale, t]);

  return <div>Loading...</div>;
}
