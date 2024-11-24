import nunjucks from "nunjucks";

export const renderTemplateData = (html: string, data: Record<string, unknown>): string => {
  const engine = nunjucks.configure({ autoescape: true });
  return engine.renderString(html, data);
};
