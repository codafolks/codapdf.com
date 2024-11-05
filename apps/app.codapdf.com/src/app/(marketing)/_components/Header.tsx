"use client";
import { ROUTES } from "@/app/routes";
import { AppLogo } from "@/client/components/app/AppLogo";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const scrollSmoothTo = (id: string) => {
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
    <header className="p-4 lg:px-6 flex items-center border-b sticky top-0 left-0 w-full z-10 text-foreground bg-background">
      <Link
        className="flex items-center justify-center"
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
        <AppLogo className="h-6" />
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-gray-300 hover:underline underline-offset-4"
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
          className="text-sm font-medium hover:text-gray-300 hover:underline underline-offset-4"
          href="#pricing"
          scroll={false}
          onClick={(e) => {
            e.preventDefault();
            scrollSmoothTo("pricing");
          }}
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-300 hover:underline underline-offset-4"
          href={ROUTES.PUBLIC.DOCS.path}
          scroll={false}
        >
          Docs
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-300 hover:underline underline-offset-4"
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
