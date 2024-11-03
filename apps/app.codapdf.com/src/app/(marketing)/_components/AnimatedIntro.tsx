"use client";
import Lottie from "lottie-react";
import animatedWhiteLogo from "@/app/(marketing)/_data/animatedWhiteLogo.json";
import animatedBlackLogo from "@/app/(marketing)/_data/animatedBlackLogo.json";
import { useEffect, useState } from "react";
import { cn } from "@/client/lib/utils";

const isAnimated = typeof window !== "undefined" && window.localStorage.getItem("animated") === "true";
const theme = typeof window !== "undefined" && window.localStorage.getItem("coda-theme");
export const AnimatedIntro = () => {
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
    <div
      className={cn(
        "h-screen w-screen fixed top-0 left-0 bg-background z-50 flex items-center justify-center  transition-opacity duration-500 ease-out",
        animation,
      )}
    >
      <Lottie animationData={animatedLogo} loop={false} />
    </div>
  );
};
