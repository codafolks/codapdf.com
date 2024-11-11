import { findSerialIDFromPathname } from "@/client/utils/findSerialIDFromPathname";
import { isSameURL } from "@/client/utils/isSameURL";
import { env } from "@/constants/env.client";
const app_domain = env.APP_DOMAIN;
const docs_domain = env.DOCS_DOMAIN;
const ROUTES = {
  PRIVATE: {
    DASHBOARD: {
      path: `${app_domain}/dashboard`,
      title: "Dashboard",
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.DASHBOARD.path, app_domain);
      },
      header: "Welcome to <CodaPdf />",
    },
    SETTINGS: {
      path: `${app_domain}/settings`,
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.SETTINGS.path, app_domain);
      },
      title: "Settings",
      header: "Settings",
    },
    ACCOUNT_SETTINGS: {
      path: `${app_domain}/settings/account`,
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.ACCOUNT_SETTINGS.path, app_domain);
      },
      title: "Account",
      header: "Account Settings",
    },
    ACCOUNT_BILLING: {
      path: `${app_domain}/settings/billing`,
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.ACCOUNT_BILLING.path, app_domain);
      },
      title: "Billing",
      header: "Billing",
    },
    TEMPLATES: {
      path: `${app_domain}/templates`,
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.TEMPLATES.path, app_domain);
      },
      title: "Templates",
      header: "Templates",
    },
    TEMPLATES_SAMPLE: {
      path: (id: string) => `${app_domain}/templates/sample/${id}`,
      match: (pathname: string) => {
        const id = pathname.split("/").pop();
        if (!id) return false;
        return isSameURL(pathname, ROUTES.PRIVATE.TEMPLATES_SAMPLE.path(id), app_domain);
      },
      title: "Templates",
      header: "Templates",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    TEMPLATES_CREATE: {
      path: `${app_domain}/templates/create`,
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.TEMPLATES_CREATE.path, app_domain);
      },
      title: "New Template",
      header: "New Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    TEMPLATES_EDIT: {
      path: (id: number) => `${app_domain}/templates/edit/${id}`,
      match: (pathname: string) => {
        const ids = findSerialIDFromPathname(pathname);
        if (!ids) return false;
        const [id] = ids;
        return isSameURL(pathname, ROUTES.PRIVATE.TEMPLATES_EDIT.path(Number(id)), app_domain);
      },
      title: "Edit Template",
      header: "Edit Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    API_KEYS: {
      path: `${app_domain}/api-keys`,
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.PRIVATE.API_KEYS.path, app_domain);
      },
      title: "API Keys",
      header: "API Keys",
    },
  },
  AUTH: {
    LOGIN: {
      path: `${app_domain}/auth/login`,
      title: "Login",
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.AUTH.LOGIN.path, app_domain);
      },
    },
    SIGNUP: {
      path: `${app_domain}/auth/signup`,
      title: "Register",
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.AUTH.SIGNUP.path, app_domain);
      },
    },
    FORGOT_PASSWORD: {
      path: `${app_domain}/auth/forgot-password`,
      title: "Register",
      match: (pathname: string) => {
        return isSameURL(pathname, ROUTES.AUTH.FORGOT_PASSWORD.path, app_domain);
      },
    },
  },
  PUBLIC: {
    GITHUB: {
      path: `${app_domain}/api/auth/github`,
    },
    GOOGLE: {
      path: `${app_domain}/api/auth/google`,
    },
    DOCS: {
      path: `${docs_domain}/docs`,
      title: "Documentation",
      match: (pathname: string) => pathname === ROUTES.PUBLIC.DOCS.path,
    },
  },
} as const;

type PrivateRoute = (typeof ROUTES.PRIVATE)[keyof typeof ROUTES.PRIVATE];

export { ROUTES };
export type { PrivateRoute };
