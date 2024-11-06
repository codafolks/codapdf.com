"use client";
import animatedBlackLogo from "@/app/(marketing)/_data/animatedBlackLogo.json";
import animatedWhiteLogo from "@/app/(marketing)/_data/animatedWhiteLogo.json";
import { cn } from "@/client/lib/utils";
import Lottie from "lottie-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const isAnimated = typeof window !== "undefined" && window.localStorage.getItem("animated") === "true";

export const AnimatedIntro = () => {
  const { theme } = useTheme();
  const [hidden, setHidden] = useState(isAnimated);
  const [animation, setAnimation] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setAnimation("opacity-0");
      setTimeout(() => {
        setHidden(true);
        window.localStorage.setItem("animated", "true");
      }, 100);
    }, 2000);
  }, []);

  if (hidden) return null;
  const animatedLogo = theme === "dark" ? animatedWhiteLogo : animatedBlackLogo;
  return (
    <div className={cn("h-screen w-screen fixed top-0 left-0 bg-background z-50 flex items-center justify-center  transition-opacity duration-500 ease-out", animation)}>
      <Lottie animationData={animatedLogo} loop={false} />
    </div>
  );
};
