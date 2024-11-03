type ScrollSmoothTo = {
  id: string;
  container: HTMLElement | null;
  callBack?: () => void;
  threadHold?: number;
};
export const scrollSmoothTo = ({ id, container, callBack, threadHold = 40 }: ScrollSmoothTo) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (element && container) {
    // Scroll to the top of the element with margin top of 20px
    container.scrollTo({
      top: element.offsetTop - threadHold,
      behavior: "smooth",
    });
  }
  callBack?.();
};
