export const renderTemplateData = (html: string, data: Record<string, unknown>): string => {
  // Helper function to resolve nested properties using dot notation
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  function resolvePath(obj: any, path: string): any {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
  }

  // Handle loops: {% for itemName in listName %}
  const loopPattern = /{% for (\w+) in (\w+) %}([\s\S]*?){% endfor %}/g;

  // Process loops first
  let renderedHtml = html.replace(loopPattern, (_, itemName, listName, innerHtml) => {
    const list = resolvePath(data, listName);
    if (Array.isArray(list)) {
      return list
        .map((item) => {
          const itemData = { [itemName]: item };
          // Replace variables within the loop body using itemData and data
          return innerHtml.replace(/{{\s*([\w.]+)\s*}}/g, (__: string, key: string) => {
            return resolvePath({ ...data, ...itemData }, key);
          });
        })
        .join("");
    }
    return "";
  });

  // Replace simple variables outside of loops
  renderedHtml = renderedHtml.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
    return resolvePath(data, key);
  });

  return renderedHtml;
};
