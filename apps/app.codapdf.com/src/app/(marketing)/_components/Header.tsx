"use client";
import { ROUTES } from "@/app/routes";
import { AppLogo } from "@/client/components/app/AppLogo";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import { Button } from "@/client/components/ui/button";
import { useIsMobile } from "@/client/hooks/useIsMobile";
import { cn } from "@/client/lib/utils";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const scrollSmoothTo = (id: string) => {
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
    if (isMobile) {
      document.getElementById("navigation")?.classList.toggle("hidden");
    }
  };
  return (
    <header className="sticky top-0 left-0 z-10 flex w-full flex-col border-b bg-background px-4 py-2 text-foreground md:flex-row md:items-center lg:px-6">
      <Button
        className="self-end md:hidden"
        variant="ghost"
        onClick={() => {
          document.getElementById("navigation")?.classList.toggle("hidden");
        }}
      >
        <AlignJustify className="h-6 w-6" />
      </Button>
      <Link
        className="hidden items-center justify-center p-2 md:flex"
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
      <nav
        className={cn("mt-4 hidden flex-col items-center p-2 md:mt-auto md:ml-auto md:flex-1 md:flex-row md:justify-end", {
          flex: isMobile,
          "md:flex": !isMobile,
        })}
        id="navigation"
      >
        <Button variant="link" asChild>
          <Link
            href="#features"
            scroll={false}
            onClick={(e) => {
              e.preventDefault();
              scrollSmoothTo("features");
            }}
          >
            Features
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link
            href="#pricing"
            scroll={false}
            onClick={(e) => {
              e.preventDefault();
              scrollSmoothTo("pricing");
            }}
          >
            Pricing
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link href={ROUTES.PUBLIC.DOCS.path} scroll={false}>
            Docs
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link
            href="#contact"
            scroll={false}
            onClick={(e) => {
              e.preventDefault();
              scrollSmoothTo("contact");
            }}
          >
            Contact
          </Link>
        </Button>
        <ButtonUpdateTheme />
      </nav>
    </header>
  );
};
