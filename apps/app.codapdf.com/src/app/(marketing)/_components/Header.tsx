"use client";
import { ROUTES } from "@/app/routes";
import { AppLogo } from "@/client/components/app/AppLogo";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import { Button } from "@/client/components/ui/button";
import { isMobile } from "@/client/hooks/useIsMobile";
import { scrollSmoothTo } from "@/client/utils/scrollSmoothTo";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const getContainer = () => document.getElementById("marketing-layout");
const callBackScroll = () => {
  if (isMobile()) {
    document.getElementById("navigation")?.classList.toggle("hidden");
  }
};

const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const id = e.currentTarget.getAttribute("data-id");
  if (id) {
    scrollSmoothTo({
      id,
      container: getContainer(),
      callBack: callBackScroll,
    });
  }
};
export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 left-0 z-10 flex w-full flex-col border-b bg-background px-6 py-2 text-foreground md:flex-row md:items-center">
      <Button
        className="self-end md:hidden"
        variant="ghost"
        onClick={() => {
          document.getElementById("navigation")?.classList.add("flex");
          document.getElementById("navigation")?.classList.toggle("hidden");
        }}
      >
        <AlignJustify className="h-6 w-6" />
      </Button>
      <Link
        className="hidden md:flex"
        href="#home"
        data-id="home"
        onClick={(e) => {
          e.preventDefault();
          // if not on home page, redirect to home page
          if (pathname !== "/") {
            router.push("/#home");
          } else {
            scrollSmoothTo({
              id: "home",
              container: getContainer(),
              callBack: callBackScroll,
            });
          }
        }}
      >
        <AppLogo className="h-4 md:h-6" />
      </Link>
      <nav
        className="mt-4 hidden flex-col items-center p-2 md:mt-auto md:ml-auto md:flex md:flex-1 md:flex-row md:justify-end"
        id="navigation"
      >
        <Button variant="link" asChild>
          <Link href="#features" scroll={false} onClick={onClick} data-id="features">
            Features
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="#pricing" scroll={false} onClick={onClick} data-id="pricing">
            Pricing
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link href={ROUTES.PUBLIC.DOCS.href()} scroll={false}>
            Docs
          </Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="#contact" scroll={false} onClick={onClick} data-id="contact">
            Contact
          </Link>
        </Button>
        <ButtonUpdateTheme />
      </nav>
    </header>
  );
};
