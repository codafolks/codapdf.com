import { ROUTES } from "@/app/routes";
import { CodeXml, CreditCard, LayoutDashboardIcon, Lock, UserIcon } from "lucide-react";
import type { JSX } from "react";

const LINKS = ROUTES.PRIVATE;
export type SideBarRoute = {
  path: string;
  title: string;
  header: string;
  icon: JSX.Element;
  createRoutePath?: SideBarRoute;
  subRoutes?: Array<SideBarRoute>;
};

const SIDEBAR_ROUTES = [
  {
    path: LINKS.DASHBOARD.path,
    title: LINKS.DASHBOARD.title,
    header: LINKS.DASHBOARD.header,
    icon: <LayoutDashboardIcon className="size-5" data-route={LINKS.DASHBOARD.path} />,
  },
  {
    path: LINKS.TEMPLATES.path,
    title: LINKS.TEMPLATES.title,
    header: LINKS.TEMPLATES.header,
    icon: <CodeXml className="size-5" data-route={LINKS.TEMPLATES.path} />,
    createRoutePath: {
      path: LINKS.TEMPLATES_CREATE.path,
    },
  },
  {
    path: LINKS.API_KEYS.path,
    title: LINKS.API_KEYS.title,
    header: LINKS.API_KEYS.header,
    icon: <Lock className="size-5" data-route={LINKS.API_KEYS.path} />,
  },
  {
    path: LINKS.ACCOUNT_SETTINGS.path,
    title: LINKS.ACCOUNT_SETTINGS.title,
    header: LINKS.ACCOUNT_SETTINGS.header,
    icon: <UserIcon className="size-5" data-route={LINKS.ACCOUNT_SETTINGS.path} />,
  },
  {
    path: LINKS.ACCOUNT_BILLING.path,
    title: LINKS.ACCOUNT_BILLING.title,
    icon: <CreditCard className="size-5" data-route={LINKS.ACCOUNT_BILLING.path} />,
  },
] as Array<SideBarRoute>;

export { SIDEBAR_ROUTES };
