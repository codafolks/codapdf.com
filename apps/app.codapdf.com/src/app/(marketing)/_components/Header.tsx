"use client";
import { ROUTES } from "@/app/routes";
import { AppLogo } from "@/client/components/app/AppLogo";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const scrollSmoothTo = (id: string) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const element = document.getElementById(id);
  const container = document.getElementById("marketing-layout");
  if (element && container) {
    // Scroll to the top of the element with margin top of 20px
    container.scrollTo({
      top: element.offsetTop - 40,
      behavior: "smooth",
    });
  }
};
export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 z-10 flex h-full flex-col border-b bg-background p-4 text-foreground md:sticky md:w-full md:flex-col md:items-center lg:px-6">
      <Link
        className="flex items-center justify-center "
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          // if not on home page, redirect to home page
          if (pathname !== "/") {
            router.push("/#home");
          } else {
            scrollSmoothTo("home");
          }
        }}
      >
        <AppLogo className="h-4 md:h-6" />
      </Link>
      <nav className="ml-auto flex flex-col gap-4 sm:gap-6 ">
        <Link
          className="font-medium text-sm underline-offset-4 hover:text-gray-300 hover:underline"
          href="#features"
          scroll={false}
          onClick={(e) => {
            e.preventDefault();
            scrollSmoothTo("features");
          }}
        >
          Features
        </Link>
        <Link
          className="font-medium text-sm underline-offset-4 hover:text-gray-300 hover:underline"
          href="#pricing"
          scroll={false}
          onClick={(e) => {
            e.preventDefault();
            scrollSmoothTo("pricing");
          }}
        >
          Pricing
        </Link>
        <Link className="font-medium text-sm underline-offset-4 hover:text-gray-300 hover:underline" href={ROUTES.PUBLIC.DOCS.path} scroll={false}>
          Docs
        </Link>
        <Link
          className="font-medium text-sm underline-offset-4 hover:text-gray-300 hover:underline"
          href="#contact"
          scroll={false}
          onClick={(e) => {
            e.preventDefault();
            scrollSmoothTo("contact");
          }}
        >
          Contact
        </Link>
      </nav>
      <ButtonUpdateTheme />
    </header>
  );
};
