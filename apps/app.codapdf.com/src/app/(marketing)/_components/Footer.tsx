import Link from "next/link";

export const Footer = () => (
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background text-foreground">
    <p className="text-xs ">
      © {new Date().getFullYear()} {"<CodaPdf />"}. All rights reserved.
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link
        className="text-xs hover:underline underline-offset-4  hover:text-gray-300"
        href="/terms-of-service"
        prefetch
      >
        Terms of Service
      </Link>
      <Link className="text-xs hover:underline underline-offset-4  hover:text-gray-300" href="/privacy-policy" prefetch>
        Privacy
      </Link>
    </nav>
  </footer>
);
