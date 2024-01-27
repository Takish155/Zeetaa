import { getLocale } from "next-intl/server";

const formatTimeDifference = async (date: Date): Promise<string> => {
  const locale = await getLocale();

  const now = new Date();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return rtf.format(-diffInDays, "day");
  }
  if (diffInHours > 0) {
    return rtf.format(-(diffInHours % 24), "hour");
  }
  if (diffInMinutes > 0) {
    return rtf.format(-(diffInMinutes % 60), "minute");
  }
  return rtf.format(-diffInSeconds, "second");
};

export default formatTimeDifference;
