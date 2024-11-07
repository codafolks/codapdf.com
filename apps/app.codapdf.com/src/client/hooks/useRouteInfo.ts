import { type PrivateRoute, ROUTES } from "@/app/routes";
import { usePathname } from "next/navigation";

const LINKS = ROUTES.PRIVATE;
export const useRouteInfo = (): PrivateRoute | undefined => {
  const pathname = usePathname();
  const route = Object.values(LINKS).find((route) => pathname && route.match(pathname));
  return route;
};
