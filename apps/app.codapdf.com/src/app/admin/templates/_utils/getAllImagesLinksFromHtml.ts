const regex = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
export const getAllImagesLinksFromHtml = (html: string) => {
  const matches = html.match(new RegExp(regex)) ?? [];
  const results = matches.map((src) => ({
    src,
    srcUrl: src.match(RegExp(regex.source))?.[1]?.match(/(http|https):\/\/[^ "]+/g)?.[0] ?? "",
    srcRex: regex.source,
    type: "image",
  }));
  return results?.filter((e) => !!e) ?? [];
};
