"use client";

import { Button } from "@/client/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ButtonUpdateThemeProps = {
  className?: string;
};
export const ButtonUpdateTheme = ({ className }: ButtonUpdateThemeProps) => {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>();
  /* NOTE: This is a workaround to avoid the hydration mismatch error when using next-themes 
    with SSR. This error occurs because the theme is not available on the server and the client
  */

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  if (isDarkMode === undefined) return null;
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(isDarkMode ? "light" : "dark")} className={className}>
      {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
};
