import { env } from "@/constants/env.server";
import { getSessionToken } from "@/server/actions/auth/authSession";

type ConvertHtmlToPDF = {
  html: string;
};

export const convertHtmlToPDF = async ({ html }: ConvertHtmlToPDF) => {
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
    body: JSON.stringify({ html }),
  });
  const data = (await response.json()) as { file_url: string };
  return data;
};
