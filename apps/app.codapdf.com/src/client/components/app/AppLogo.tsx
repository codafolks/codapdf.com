"use client";
import { CodaPDFBlackLogo } from "@/client/assets/logos/CodaPDFBlackLogo";
import { CodaPDFWhiteLogo } from "@/client/assets/logos/CodaPDFWhiteLogo";
import { cn } from "@/client/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
type AppLogoProps = {
  className?: string;
};

export const AppLogo = ({ className }: AppLogoProps) => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>();
  /* NOTE: This is a workaround to avoid the hydration mismatch error when using next-themes 
    with SSR. This error occurs because the theme is not available on the server and the client
  */
  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);
  if (isDarkMode === undefined) return null;
  if (theme === "dark") {
    return <CodaPDFWhiteLogo className={cn(className)} />;
  }
  return <CodaPDFBlackLogo className={cn(className)} />;
};
