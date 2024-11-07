import Link from "next/link";

export const Footer = () => (
  <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-background px-4 py-6 text-foreground sm:flex-row md:px-6">
    <p className="text-xs ">
      © {new Date().getFullYear()} {"<CodaPdf />"}. All rights reserved.
    </p>
    <nav className="flex gap-4 sm:ml-auto sm:gap-6">
      <Link className="text-xs underline-offset-4 hover:text-gray-300 hover:underline" href="/terms-of-service" prefetch>
        Terms of Service
      </Link>
      <Link className="text-xs underline-offset-4 hover:text-gray-300 hover:underline" href="/privacy-policy" prefetch>
        Privacy
      </Link>
    </nav>
  </footer>
);
