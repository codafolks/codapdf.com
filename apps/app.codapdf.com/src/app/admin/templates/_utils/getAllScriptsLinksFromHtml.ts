const regex = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*><\/script>/gi;
export const getAllScriptsLinksFromHtml = (html: string) => {
  const matches = html.match(new RegExp(regex)) ?? [];
  const results = matches.map((src) => ({
    src,
    srcUrl: src.match(RegExp(regex.source))?.[1] ?? "",
    srcRex: regex.source,
    type: "script",
  }));
  return results?.filter((e) => !!e) ?? [];
};

export const getAllJavascriptBetweenScriptTagFromHtml = (html: string) => {
  const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  const matches = html.match(new RegExp(regex)) ?? [];
  const results = matches.map((src) => ({
    src,
    srcUrl: src.match(RegExp(regex.source))?.[1] ?? "",
    srcRex: regex.source,
    type: "script",
  }));
  return results?.filter((e) => !!e) ?? [];
};
