import { getAllImagesLinksFromHtml } from "@/app/(main)/templates/_utils/getAllImagesLinksFromHtml";
import {
  getAllJavascriptBetweenScriptTagFromHtml,
  getAllScriptsLinksFromHtml,
} from "@/app/(main)/templates/_utils/getAllScriptsLinksFromHtml";
import { useUser } from "@/client/queries/users";
import { License } from "@/server/database/schemas/licenses";

const getMessage = ({ license, html }: { license?: License | null; html: string | null }) => {
  if (!html) return null;
  const scriptLinks = getAllScriptsLinksFromHtml(html);
  const javascriptCode = getAllJavascriptBetweenScriptTagFromHtml(html);
  const imageLinks = getAllImagesLinksFromHtml(html);
  if (license === "HOBBY" && (scriptLinks.length || imageLinks.length)) {
    return "Your plan doesn't support templates with images or javascript code. Please upgrade your plan to use this feature.";
  }

  if (license === "BASIC" && (scriptLinks.length || javascriptCode.length)) {
    return "Your plan doesn't support templates with javascript code. Please upgrade your plan to use this feature.";
  }
  return null;
};

export const useCheckPlanTemplateSupport = (html: string | null) => {
  const { data: user } = useUser();
  const license = user?.profile?.license;
  const message = getMessage({
    license,
    html,
  });

  return { message };
};
