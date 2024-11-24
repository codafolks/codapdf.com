const regex = /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi;

export const getAllStyleLinksFromHtml = (html: string) => {
  const matches = html.match(regex) ?? [];
  const results = matches.map((src) => ({
    src,
    srcUrl: src.match(RegExp(regex.source))?.[1] ?? "",
    srcRex: regex.source,
    type: "style",
  }));
  return results?.filter((e) => !!e) ?? [];
};
