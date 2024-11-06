import { type PaperValue, paperSizes } from "@/app/(main)/templates/_data/paperSizes";

type SetPageCss = {
  html: string;
  paper?: PaperValue;
};

export const setPageCss = ({ html, paper = "auto" }: SetPageCss) => {
  const cssSize = paperSizes[paper].cssSize;
  if (html) {
    const style = `
      /* [CUSTOM_PAGE_STYLE] */
        /* paper: ${paper}*/
        @page {
          ${cssSize}; 
        }
      /* [/CUSTOM_PAGE_STYLE] */
    `;
    const htmlWithoutCustomStyle = html.replace(/\/\* \[CUSTOM_PAGE_STYLE\] \*\/([\s\S]*?)\/\* \[\/CUSTOM_PAGE_STYLE\] \*\//g, "");
    const convertedHtml = new DOMParser().parseFromString(htmlWithoutCustomStyle, "text/html");
    const styleTag = convertedHtml?.head?.querySelector("style:first-of-type");
    if (styleTag) {
      styleTag.textContent += style;
    }
    const htmlString = new XMLSerializer().serializeToString(convertedHtml);
    return htmlString;
  }
  return html;
};
