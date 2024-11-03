import { IconProps } from "@/client/types";
import React from "react";
export const CodaPDFBlackLogo = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        id="Layer_1"
        x={0}
        y={0}
        viewBox="0 0 291.6 42.1"
        ref={ref}
        {...props}
        suppressHydrationWarning
      >
        <style suppressHydrationWarning>{".st0{fill:#474747}"}</style>
        <g id="Preto">
          <path d="M55.3 38.2c-2.3 1.1-5 1.6-8.1 1.6-2.8 0-5.3-.5-7.7-1.4-2.4-.9-4.4-2.2-6.1-3.9s-3.1-3.7-4.1-6-1.5-4.9-1.5-7.7.5-5.5 1.5-7.8 2.4-4.3 4.2-6c1.8-1.7 3.8-2.9 6.2-3.8s4.9-1.3 7.7-1.3c2.5 0 5 .4 7.5 1.4 2.5.9 4.5 2.2 6 4L55 13c-.8-1.1-1.9-1.9-3.2-2.5-1.3-.5-2.7-.8-4.1-.8-1.5 0-2.9.3-4.2.8s-2.4 1.3-3.3 2.3c-.9 1-1.6 2.1-2.1 3.5s-.8 2.8-.8 4.4.2 3.1.8 4.5 1.2 2.5 2.1 3.5 2 1.7 3.2 2.3c1.3.5 2.6.8 4.1.8 1.7 0 3.2-.3 4.5-1 1.3-.7 2.3-1.6 3.1-2.6l6.1 5.7c-1.6 1.8-3.5 3.2-5.9 4.3z" />
          <path d="M88.7 26c0 2.1-.4 4-1.1 5.6-.8 1.7-1.8 3.1-3.1 4.3-1.3 1.2-2.8 2.1-4.5 2.7-1.7.6-3.5 1-5.4 1s-3.7-.3-5.4-1c-1.7-.6-3.2-1.5-4.5-2.7-1.3-1.2-2.3-2.6-3-4.3-.8-1.7-1.1-3.5-1.1-5.6s.4-3.9 1.1-5.6 1.8-3.1 3-4.2c1.3-1.1 2.8-2 4.5-2.6 1.7-.6 3.5-.9 5.4-.9s3.8.3 5.4.9 3.2 1.5 4.5 2.6c1.3 1.1 2.3 2.6 3.1 4.2.8 1.7 1.1 3.5 1.1 5.6zm-8 0c0-.8-.1-1.6-.4-2.4-.3-.8-.7-1.5-1.2-2.1-.5-.6-1.1-1.1-1.9-1.5-.8-.4-1.6-.6-2.6-.6s-1.8.2-2.6.6c-.8.4-1.4.9-1.9 1.5s-.9 1.3-1.1 2.1c-.2.8-.4 1.6-.4 2.4s.1 1.6.4 2.4c.2.8.6 1.5 1.2 2.1.5.6 1.1 1.1 1.9 1.5.8.4 1.6.6 2.6.6s1.8-.2 2.6-.6c.8-.4 1.4-.9 1.9-1.5s.9-1.3 1.2-2.1c.2-.8.3-1.6.3-2.4zM111.2 38.8v-3.3h-.1c-.8 1.3-2 2.3-3.5 3-1.5.7-3.1 1-4.8 1-1.9 0-3.6-.4-5.1-1.1-1.5-.8-2.8-1.7-3.8-3-1-1.2-1.8-2.7-2.4-4.3-.5-1.6-.8-3.3-.8-5.1s.3-3.5.8-5.1c.6-1.6 1.4-3 2.4-4.2 1-1.2 2.3-2.2 3.8-2.9 1.5-.7 3.1-1.1 5-1.1s3.4.4 4.7 1.1 2.3 1.5 3 2.3h.1V2.8h8.3v36h-7.6zm-.3-12.7c0-.8-.1-1.6-.4-2.4-.3-.8-.7-1.5-1.2-2.1-.5-.6-1.2-1.1-1.9-1.5-.8-.4-1.6-.6-2.6-.6s-1.8.2-2.6.6c-.8.4-1.4.9-1.9 1.5s-.9 1.3-1.2 2.1c-.2.8-.4 1.6-.4 2.4s.1 1.6.4 2.4.6 1.5 1.2 2.1 1.1 1.1 1.9 1.5c.8.4 1.6.6 2.6.6s1.8-.2 2.6-.6c.8-.4 1.4-.9 1.9-1.5s.9-1.3 1.2-2.1.4-1.6.4-2.4zM123.1 16.9c1.5-1.4 3.2-2.5 5.2-3.2 2-.7 4-1.1 6.1-1.1s3.9.3 5.4.8c1.5.5 2.7 1.3 3.6 2.4s1.6 2.5 2 4.2.6 3.7.6 6v12.8h-7.6v-2.7h-.1c-.6 1-1.6 1.9-2.9 2.4-1.3.6-2.7.9-4.2.9-1 0-2.1-.1-3.2-.4s-2.1-.7-3-1.3-1.6-1.4-2.2-2.4c-.6-1-.9-2.3-.9-3.8 0-1.8.5-3.3 1.5-4.4s2.3-2 3.9-2.6 3.3-1 5.3-1.2c1.9-.2 3.8-.3 5.6-.3v-.4c0-1.3-.4-2.2-1.3-2.8s-2-.9-3.3-.9c-1.2 0-2.3.2-3.4.8-1.1.5-2.1 1.1-2.8 1.8l-4.3-4.6zm15.3 10.8h-1.1c-.9 0-1.8 0-2.8.1-.9.1-1.8.2-2.5.5-.7.2-1.3.6-1.8 1-.5.5-.7 1.1-.7 1.8 0 .5.1.9.3 1.2s.5.6.8.8.7.3 1.2.4c.4.1.9.1 1.3.1 1.7 0 3-.5 3.9-1.4s1.4-2.2 1.4-3.8v-.7zM178 13.9c0 2.1-.4 3.9-1.2 5.3s-1.8 2.6-3.2 3.5c-1.3.9-2.9 1.5-4.6 1.9-1.7.4-3.5.6-5.4.6h-4.3v13.6h-8.7v-36h13.2c2 0 3.8.2 5.5.6s3.2 1 4.5 1.9c1.3.9 2.3 2 3 3.4s1.2 3.1 1.2 5.2zm-8.7 0c0-.9-.2-1.5-.5-2.1-.3-.5-.8-1-1.4-1.3-.6-.3-1.2-.5-2-.6-.7-.1-1.5-.1-2.3-.1h-3.8v8.5h3.7c.8 0 1.6-.1 2.3-.2.8-.1 1.4-.4 2-.7.6-.3 1.1-.8 1.4-1.4.4-.5.6-1.2.6-2.1zM214.9 20.7c0 3.2-.6 5.9-1.8 8.2s-2.7 4.2-4.6 5.7c-1.9 1.5-4.1 2.6-6.5 3.3-2.4.7-4.9 1-7.3 1h-13.4v-36h13c2.6 0 5.1.3 7.5.9 2.5.6 4.7 1.6 6.6 3 1.9 1.4 3.5 3.2 4.7 5.5 1.2 2.1 1.8 5 1.8 8.4zm-9.1 0c0-2-.3-3.7-1-5.1-.7-1.3-1.5-2.4-2.6-3.2-1.1-.8-2.4-1.4-3.8-1.7s-2.9-.5-4.4-.5h-4.3v21.1h4.1c1.6 0 3.1-.2 4.5-.5 1.4-.4 2.7-.9 3.8-1.8 1.1-.8 2-1.9 2.6-3.3.8-1.4 1.1-3 1.1-5zM227.2 10.2v7.4h13.9v7.2h-13.9v14h-8.6v-36h23.7v7.4h-15.1zM247.6 41.4l-5.8-1.9L257.5 0l5.8 2-15.7 39.4z" />
          <path
            d="m110.5 2.8 8.4 36v-36zM181.2 38.8l15.1-.1s19.4-.4 18.5-19.3c-3.4 3.5-8.8 5.8-10 6.3-3.1 5.2-6.9 5-9.2 5.2l-5.8.4h-8.5l-.1 7.5zM267.5 2.3v7L291.6 26v-7.9z"
            className="st0"
          />
          <path d="m291.6 18.1-24.1 14.1v7L291.6 26z" />
          <path d="M24.1 2.3v7L0 26v-7.9z" className="st0" />
          <path d="m0 18.1 24.1 14.1v7L0 26zM55.3 38.2c-2.3 1.1-5 1.6-8.1 1.6-2.8 0-5.3-.5-7.7-1.4-2.4-.9-4.4-2.2-6.1-3.9s-3.1-3.7-4.1-6-1.5-4.9-1.5-7.7.5-5.5 1.5-7.8 2.4-4.3 4.2-6c1.8-1.7 3.8-2.9 6.2-3.8s4.9-1.3 7.7-1.3c2.5 0 5 .4 7.5 1.4 2.5.9 4.5 2.2 6 4L55 13c-.8-1.1-1.9-1.9-3.2-2.5-1.3-.5-2.7-.8-4.1-.8-1.5 0-2.9.3-4.2.8s-2.4 1.3-3.3 2.3c-.9 1-1.6 2.1-2.1 3.5s-.8 2.8-.8 4.4.2 3.1.8 4.5 1.2 2.5 2.1 3.5 2 1.7 3.2 2.3c1.3.5 2.6.8 4.1.8 1.7 0 3.2-.3 4.5-1 1.3-.7 2.3-1.6 3.1-2.6l6.1 5.7c-1.6 1.8-3.5 3.2-5.9 4.3z" />
          <path d="M88.7 26c0 2.1-.4 4-1.1 5.6-.8 1.7-1.8 3.1-3.1 4.3-1.3 1.2-2.8 2.1-4.5 2.7-1.7.6-3.5 1-5.4 1s-3.7-.3-5.4-1c-1.7-.6-3.2-1.5-4.5-2.7-1.3-1.2-2.3-2.6-3-4.3-.8-1.7-1.1-3.5-1.1-5.6s.4-3.9 1.1-5.6 1.8-3.1 3-4.2c1.3-1.1 2.8-2 4.5-2.6 1.7-.6 3.5-.9 5.4-.9s3.8.3 5.4.9 3.2 1.5 4.5 2.6c1.3 1.1 2.3 2.6 3.1 4.2.8 1.7 1.1 3.5 1.1 5.6zm-8 0c0-.8-.1-1.6-.4-2.4-.3-.8-.7-1.5-1.2-2.1-.5-.6-1.1-1.1-1.9-1.5-.8-.4-1.6-.6-2.6-.6s-1.8.2-2.6.6c-.8.4-1.4.9-1.9 1.5s-.9 1.3-1.1 2.1c-.2.8-.4 1.6-.4 2.4s.1 1.6.4 2.4c.2.8.6 1.5 1.2 2.1.5.6 1.1 1.1 1.9 1.5.8.4 1.6.6 2.6.6s1.8-.2 2.6-.6c.8-.4 1.4-.9 1.9-1.5s.9-1.3 1.2-2.1c.2-.8.3-1.6.3-2.4zM111.2 38.8v-3.3h-.1c-.8 1.3-2 2.3-3.5 3-1.5.7-3.1 1-4.8 1-1.9 0-3.6-.4-5.1-1.1-1.5-.8-2.8-1.7-3.8-3-1-1.2-1.8-2.7-2.4-4.3-.5-1.6-.8-3.3-.8-5.1s.3-3.5.8-5.1c.6-1.6 1.4-3 2.4-4.2 1-1.2 2.3-2.2 3.8-2.9 1.5-.7 3.1-1.1 5-1.1s3.4.4 4.7 1.1 2.3 1.5 3 2.3h.1V2.8h8.3v36h-7.6zm-.3-12.7c0-.8-.1-1.6-.4-2.4-.3-.8-.7-1.5-1.2-2.1-.5-.6-1.2-1.1-1.9-1.5-.8-.4-1.6-.6-2.6-.6s-1.8.2-2.6.6c-.8.4-1.4.9-1.9 1.5s-.9 1.3-1.2 2.1c-.2.8-.4 1.6-.4 2.4s.1 1.6.4 2.4.6 1.5 1.2 2.1 1.1 1.1 1.9 1.5c.8.4 1.6.6 2.6.6s1.8-.2 2.6-.6c.8-.4 1.4-.9 1.9-1.5s.9-1.3 1.2-2.1.4-1.6.4-2.4zM123.1 16.9c1.5-1.4 3.2-2.5 5.2-3.2 2-.7 4-1.1 6.1-1.1s3.9.3 5.4.8c1.5.5 2.7 1.3 3.6 2.4s1.6 2.5 2 4.2.6 3.7.6 6v12.8h-7.6v-2.7h-.1c-.6 1-1.6 1.9-2.9 2.4-1.3.6-2.7.9-4.2.9-1 0-2.1-.1-3.2-.4s-2.1-.7-3-1.3-1.6-1.4-2.2-2.4c-.6-1-.9-2.3-.9-3.8 0-1.8.5-3.3 1.5-4.4s2.3-2 3.9-2.6 3.3-1 5.3-1.2c1.9-.2 3.8-.3 5.6-.3v-.4c0-1.3-.4-2.2-1.3-2.8s-2-.9-3.3-.9c-1.2 0-2.3.2-3.4.8-1.1.5-2.1 1.1-2.8 1.8l-4.3-4.6zm15.3 10.8h-1.1c-.9 0-1.8 0-2.8.1-.9.1-1.8.2-2.5.5-.7.2-1.3.6-1.8 1-.5.5-.7 1.1-.7 1.8 0 .5.1.9.3 1.2s.5.6.8.8.7.3 1.2.4c.4.1.9.1 1.3.1 1.7 0 3-.5 3.9-1.4s1.4-2.2 1.4-3.8v-.7zM178 13.9c0 2.1-.4 3.9-1.2 5.3s-1.8 2.6-3.2 3.5c-1.3.9-2.9 1.5-4.6 1.9-1.7.4-3.5.6-5.4.6h-4.3v13.6h-8.7v-36h13.2c2 0 3.8.2 5.5.6s3.2 1 4.5 1.9c1.3.9 2.3 2 3 3.4s1.2 3.1 1.2 5.2zm-8.7 0c0-.9-.2-1.5-.5-2.1-.3-.5-.8-1-1.4-1.3-.6-.3-1.2-.5-2-.6-.7-.1-1.5-.1-2.3-.1h-3.8v8.5h3.7c.8 0 1.6-.1 2.3-.2.8-.1 1.4-.4 2-.7.6-.3 1.1-.8 1.4-1.4.4-.5.6-1.2.6-2.1zM214.9 20.7c0 3.2-.6 5.9-1.8 8.2s-2.7 4.2-4.6 5.7c-1.9 1.5-4.1 2.6-6.5 3.3-2.4.7-4.9 1-7.3 1h-13.4v-36h13c2.6 0 5.1.3 7.5.9 2.5.6 4.7 1.6 6.6 3 1.9 1.4 3.5 3.2 4.7 5.5 1.2 2.1 1.8 5 1.8 8.4zm-9.1 0c0-2-.3-3.7-1-5.1-.7-1.3-1.5-2.4-2.6-3.2-1.1-.8-2.4-1.4-3.8-1.7s-2.9-.5-4.4-.5h-4.3v21.1h4.1c1.6 0 3.1-.2 4.5-.5 1.4-.4 2.7-.9 3.8-1.8 1.1-.8 2-1.9 2.6-3.3.8-1.4 1.1-3 1.1-5zM227.2 10.2v7.4h13.9v7.2h-13.9v14h-8.6v-36h23.7v7.4h-15.1zM247.6 41.4l-5.8-1.9L257.5 0l5.8 2-15.7 39.4z" />
          <path
            d="m110.5 2.8 8.4 36v-36zM181.2 38.8l15.1-.1s19.4-.4 18.5-19.3c-3.4 3.5-8.8 5.8-10 6.3-3.1 5.2-6.9 5-9.2 5.2l-5.8.4h-8.5l-.1 7.5zM267.5 2.3v7L291.6 26v-7.9z"
            className="st0"
          />
          <path d="m291.6 18.1-24.1 14.1v7L291.6 26z" />
          <path d="M24.1 2.3v7L0 26v-7.9z" className="st0" />
          <path d="m0 18.1 24.1 14.1v7L0 26z" />
        </g>
      </svg>
    );
  },
);
CodaPDFBlackLogo.displayName = "CodaPDFBlackLogo";
