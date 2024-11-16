import { ROUTES } from "@/app/routes";
import { usePathname } from "next/navigation";

const LINKS = ROUTES.PRIVATE;
export const useRouteInfo = () => {
  const pathname = usePathname();
  const route = Object.values(LINKS).find((route) => pathname && route.match(pathname));
  return { ...route, href: new URL(pathname, process.env.NEXT_PUBLIC_APP_DOMAIN).href };
};
