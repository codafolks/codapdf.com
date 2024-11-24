export const paperSizes = {
  auto: {
    value: "auto",
    label: "Auto",
    description: "Automatically determine the size based on the content",
    cssSize: "size: auto",
    pixelSize: { width: "auto", height: "auto" },
  },
  letter: {
    value: "letter",
    label: "Letter 8.5in x 11in",
    description: "Standard US letter size",
    cssSize: "size: 8.5in 11in",
    pixelSize: { width: 816, height: 1056 },
  },
  legal: {
    value: "legal",
    label: "Legal 8.5in x 14in",
    description: "US legal size paper, commonly used for contracts",
    cssSize: "size: 8.5in 14in",
    pixelSize: { width: 816, height: 1344 },
  },
  tabloid: {
    value: "tabloid",
    label: "Tabloid 11in x 17in",
    description: "Used for larger documents like posters or charts",
    cssSize: "size: 11in 17in",
    pixelSize: { width: 1056, height: 1632 },
  },
  ledger: {
    value: "ledger",
    label: "Ledger 17in x 11in",
    description: "Common in accounting, landscape orientation of tabloid",
    cssSize: "size: 17in 11in",
    pixelSize: { width: 1632, height: 1056 },
  },
  a0: {
    value: "a0",
    label: "A0 33.1in x 46.8in",
    description: "Largest size in the A series, used for posters",
    cssSize: "size: 33.1in 46.8in",
    pixelSize: { width: 3178, height: 4493 },
  },
  a1: {
    value: "a1",
    label: "A1 23.4in x 33.1in",
    description: "Typically used for technical drawings or posters",
    cssSize: "size: 23.4in 33.1in",
    pixelSize: { width: 2246, height: 3178 },
  },
  a2: {
    value: "a2",
    label: "A2 16.54in x 23.4in",
    description: "Often used for drawings, diagrams, or calendars",
    cssSize: "size: 16.54in 23.4in",
    pixelSize: { width: 1587, height: 2246 },
  },
  a3: {
    value: "a3",
    label: "A3 11.7in x 16.54in",
    description: "Common size for diagrams and large tables",
    cssSize: "size: 11.7in 16.54in",
    pixelSize: { width: 1123, height: 1587 },
  },
  a4: {
    value: "a4",
    label: "A4 8.27in x 11.7in",
    description: "Standard international paper size, used worldwide",
    cssSize: "size: 8.27in 11.7in",
    pixelSize: { width: 794, height: 1123 },
  },
  a5: {
    value: "a5",
    label: "A5 5.83in x 8.27in",
    description: "Used for small booklets, flyers, and brochures",
    cssSize: "size: 5.83in 8.27in",
    pixelSize: { width: 560, height: 794 },
  },
  a6: {
    value: "a6",
    label: "A6 4.13in x 5.83in",
    description: "Often used for postcards or small notepads",
    cssSize: "size: 4.13in 5.83in",
    pixelSize: { width: 397, height: 560 },
  },
};

export type PaperSize = typeof paperSizes;
export type PaperValue = keyof PaperSize;
