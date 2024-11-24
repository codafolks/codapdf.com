import { ROUTES } from "@/app/routes";

export const GET = () => {
  const buildSitemap = () => {
    const urls = Object.values(ROUTES.PRIVATE)
      .map((route) => {
        const hasParams = "params" in route;
        if (typeof route.pathname === "function" && !hasParams) {
          return route.href();
        }
        return "";
      })
      .filter(Boolean);

    const publicUrls = Object.values(ROUTES.PUBLIC)
      .map((route) => {
        if (typeof route.pathname === "function") {
          return route.href();
        }
        return "";
      })
      .filter(Boolean);

    const allUrls = [...urls, ...publicUrls];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls.map((url) => `<url><loc>${url}</loc></url>`).join("\n  ")}
    </urlset>`;
    return sitemap;
  };

  return new Response(buildSitemap(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
