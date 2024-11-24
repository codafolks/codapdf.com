import { env } from "@/constants/env.server";
import { getSessionToken } from "@/server/actions/auth/authSession";

type ConvertHtmlToPDF = {
  html: string;
  data: Record<string, unknown>;
};

export const convertHtmlToPDF = async ({ html, data }: ConvertHtmlToPDF) => {
  const token = await getSessionToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${env.SERVICES_DOMAIN}/html2pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ html, data }),
  });
  return (await response.json()) as { file_url: string };
};
