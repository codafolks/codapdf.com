import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export const isMobile = () => {
  if (typeof window === "undefined" || !window?.innerWidth) return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
};

export function useIsMobile() {
  const [mobile, setMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setMobile(() => isMobile());
    };
    mql.addEventListener("change", onChange);
    setMobile(isMobile());
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!mobile;
}
