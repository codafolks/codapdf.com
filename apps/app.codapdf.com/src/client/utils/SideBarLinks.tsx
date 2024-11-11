import { ROUTES } from "@/app/routes";
import { CodeXml, CreditCard, LayoutDashboardIcon, Lock, UserIcon } from "lucide-react";
import type { JSX } from "react";

const LINKS = ROUTES.PRIVATE;
export type SideBarRoute = {
  pathname: string;
  title: string;
  header: string;
  icon: JSX.Element;
  createRoutePath?: SideBarRoute;
  subRoutes?: Array<SideBarRoute>;
};

const SIDEBAR_ROUTES = [
  {
    pathname: LINKS.DASHBOARD.pathname(),
    title: LINKS.DASHBOARD.title,
    header: LINKS.DASHBOARD.header,
    icon: <LayoutDashboardIcon className="size-5" data-route={LINKS.DASHBOARD.pathname()} />,
  },
  {
    pathname: LINKS.TEMPLATES.pathname(),
    title: LINKS.TEMPLATES.title,
    header: LINKS.TEMPLATES.header,
    icon: <CodeXml className="size-5" data-route={LINKS.TEMPLATES.pathname()} />,
    createRoutePathname: {
      pathname: LINKS.TEMPLATES_CREATE.pathname(),
    },
  },
  {
    pathname: LINKS.API_KEYS.pathname(),
    title: LINKS.API_KEYS.title,
    header: LINKS.API_KEYS.header,
    icon: <Lock className="size-5" data-route={LINKS.API_KEYS.pathname()} />,
  },
  {
    pathname: LINKS.ACCOUNT_SETTINGS.pathname(),
    title: LINKS.ACCOUNT_SETTINGS.title,
    header: LINKS.ACCOUNT_SETTINGS.header,
    icon: <UserIcon className="size-5" data-route={LINKS.ACCOUNT_SETTINGS.pathname()} />,
  },
  {
    pathname: LINKS.ACCOUNT_BILLING.pathname(),
    title: LINKS.ACCOUNT_BILLING.title,
    icon: <CreditCard className="size-5" data-route={LINKS.ACCOUNT_BILLING.pathname()} />,
  },
] as Array<SideBarRoute>;

export { SIDEBAR_ROUTES };
