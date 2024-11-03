import html2canvas from "html2canvas";
export const generateTemplateThumbnail = (): Promise<string> => {
  const iframe = document.getElementById("template-preview-iframe") as HTMLIFrameElement;

  return new Promise((resolve, reject) => {
    const contentDocument = iframe?.contentDocument;
    iframe.onload = () => {
      // Access the iframe's document
      const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;
      if (!iframeDocument) {
        reject("Failed to access iframe document");
      }

      const iframeBody = iframeDocument?.body as HTMLBodyElement;

      if (!iframeBody) {
        reject("Failed to access iframe body");
      }

      // Use html2canvas to capture the iframe's body
      html2canvas(iframeBody)
        .then((canvas) => {
          // Optionally, resize the canvas to create a thumbnail
          const thumbnailWidth = 300; // Desired thumbnail width
          const scale = thumbnailWidth / canvas.width;
          const thumbnailHeight = canvas.height * scale;

          const thumbnailCanvas = document.createElement("canvas");
          thumbnailCanvas.width = thumbnailWidth;
          thumbnailCanvas.height = thumbnailHeight;

          const ctx = thumbnailCanvas.getContext("2d") as CanvasRenderingContext2D;
          ctx.drawImage(canvas, 0, 0, thumbnailWidth, thumbnailHeight);

          // Convert canvas to image
          const image = thumbnailCanvas.toDataURL("image/png");
          resolve(image);
        })
        .catch(() => {
          reject("Failed to generate thumbnail");
        });
    };
    // If the iframe is already loaded, trigger onload manually
    if (iframe && contentDocument?.readyState === "complete") {
      iframe.onload(new Event("load"));
    }
  });
};
