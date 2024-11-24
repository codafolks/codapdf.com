type TemplatePreviewProps = {
  html: string | null;
};

const css = `
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #eded;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }  
`;

const injectCss = (html: string) => {
  // try to find a style tag by regex
  const styleTag = /<style>(.*?)<\/style>/s.exec(html);
  // if style tag exists, append the css to it
  if (styleTag) {
    const [fullMatch, styleContent] = styleTag;
    const newStyleContent = styleContent + css;
    const newHtml = html.replace(fullMatch, `<style>${newStyleContent}</style>`);
    return newHtml;
  }
  // if no style tag exists, append a new one with the css
  return html.replace("</head>", `<style>${css}</style></head>`);
};
export const TemplatePreview = ({ html }: TemplatePreviewProps) => {
  const contentHtml = html ? injectCss(html) : null;
  const src = contentHtml ? URL.createObjectURL(new Blob([contentHtml], { type: "text/html" })) : null;

  if (!src) return null;

  return (
    <div className="flex overflow-hidden">
      <iframe
        itemRef="template-preview-iframe"
        src={src}
        title="TemplatePreview"
        id="template-preview-iframe"
        suppressHydrationWarning
        className="h-full w-full overflow-hidden"
      />
    </div>
  );
};
