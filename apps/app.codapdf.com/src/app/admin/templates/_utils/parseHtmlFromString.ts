export const parseHtmlFromString = (htmlString: string) => {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html");
};
