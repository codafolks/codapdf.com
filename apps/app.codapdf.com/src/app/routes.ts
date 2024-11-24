import { findSerialIDFromPathname } from "@/client/utils/findSerialIDFromPathname";
import { isSamePath } from "@/client/utils/isSamePath";
import { env } from "@/constants/env.client";

const ROUTES = {
  PRIVATE: {
    DASHBOARD: {
      pathname: () => "/dashboard",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.DASHBOARD.pathname()}`;
      },
      title: "Dashboard",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.DASHBOARD.pathname());
      },
      header: "Welcome to <CodaPdf />",
    },
    SETTINGS: {
      pathname: () => "/settings",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.SETTINGS.pathname()}`;
      },
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.SETTINGS.pathname());
      },
      title: "Settings",
      header: "Settings",
    },
    ACCOUNT_SETTINGS: {
      pathname: () => "/settings/account",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.ACCOUNT_SETTINGS.pathname()}`;
      },
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.ACCOUNT_SETTINGS.pathname());
      },
      title: "Account",
      header: "Account Settings",
    },
    ACCOUNT_BILLING: {
      pathname: () => "/settings/billing",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.ACCOUNT_BILLING.pathname()}`;
      },
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.ACCOUNT_BILLING.pathname());
      },
      title: "Billing",
      header: "Billing",
    },
    TEMPLATES: {
      pathname: () => "/templates",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.TEMPLATES.pathname()}`;
      },
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES.pathname());
      },
      title: "Templates",
      header: "Templates",
    },
    TEMPLATES_SAMPLE: {
      pathname: (id: string) => `/templates/sample/${id}`,
      params: ["id"],
      href: (id: string) => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.TEMPLATES_SAMPLE.pathname(id)}`;
      },
      match: (pathname: string) => {
        const id = pathname.split("/").pop();
        if (!id) return false;
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES_SAMPLE.pathname(id));
      },
      title: "Templates",
      header: "Templates",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    },
    TEMPLATES_CREATE: {
      pathname: () => "/templates/create",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.TEMPLATES_CREATE.pathname()}`;
      },
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES_CREATE.pathname());
      },
      title: "New Template",
      header: "New Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    },
    TEMPLATES_EDIT: {
      pathname: (id: number) => `/templates/edit/${id}`,
      params: ["id"],
      href: (id: number) => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.TEMPLATES_EDIT.pathname(id)}`;
      },
      match: (pathname: string) => {
        const ids = findSerialIDFromPathname(pathname);
        if (!ids) return false;
        const [id] = ids;
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES_EDIT.pathname(Number(id)));
      },
      title: "Edit Template",
      header: "Edit Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    },
    API_KEYS: {
      pathname: () => "/api-keys",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PRIVATE.API_KEYS.pathname()}`;
      },
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.API_KEYS.pathname());
      },
      title: "API Keys",
      header: "API Keys",
    },
  } as const,
  AUTH: {
    LOGIN: {
      pathname: () => "/login",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.AUTH.LOGIN.pathname()}`;
      },
      title: "Login",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.AUTH.LOGIN.pathname());
      },
    },
    SIGNUP: {
      pathname: () => "/signup",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.AUTH.SIGNUP.pathname()}`;
      },
      title: "Register",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.AUTH.SIGNUP.pathname());
      },
    },
    FORGOT_PASSWORD: {
      pathname: () => "/forgot-password",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.AUTH.FORGOT_PASSWORD.pathname()}`;
      },
      title: "Register",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.AUTH.FORGOT_PASSWORD.pathname());
      },
    },
  },
  PUBLIC: {
    GITHUB: {
      pathname: () => "/api/auth/github",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PUBLIC.GITHUB.pathname()}`;
      },
    },
    GOOGLE: {
      pathname: () => "/api/auth/google",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PUBLIC.GOOGLE.pathname()}`;
      },
    },
    DOCS: {
      pathname: () => "/docs",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PUBLIC.DOCS.pathname()}`;
      },
      title: "Documentation",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PUBLIC.DOCS.pathname());
      },
    },
    REDIRECTING: {
      pathname: () => "/redirecting",
      href: () => {
        return `${env.APP_DOMAIN}${ROUTES.PUBLIC.REDIRECTING.pathname()}`;
      },
      title: "Redirecting",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PUBLIC.REDIRECTING.pathname());
      },
    },
    INDEX: {
      pathname: () => "/",
      href: () => {
        return `${env.SITE_DOMAIN}${ROUTES.PUBLIC.INDEX.pathname()}`;
      },
      title: "Home",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PUBLIC.INDEX.pathname());
      },
    },
  },
} as const;

type PrivateRoute = (typeof ROUTES.PRIVATE)[keyof typeof ROUTES.PRIVATE];

export { ROUTES };
export type { PrivateRoute };
