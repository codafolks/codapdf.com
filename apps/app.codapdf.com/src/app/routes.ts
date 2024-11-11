import { findSerialIDFromPathname } from "@/client/utils/findSerialIDFromPathname";
import { isSamePath } from "@/client/utils/isSamePath";
const ROUTES = {
  PRIVATE: {
    DASHBOARD: {
      pathname: "/dashboard",
      title: "Dashboard",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.DASHBOARD.pathname);
      },
      header: "Welcome to <CodaPdf />",
    },
    SETTINGS: {
      pathname: "/settings",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.SETTINGS.pathname);
      },
      title: "Settings",
      header: "Settings",
    },
    ACCOUNT_SETTINGS: {
      pathname: "/settings/account",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.ACCOUNT_SETTINGS.pathname);
      },
      title: "Account",
      header: "Account Settings",
    },
    ACCOUNT_BILLING: {
      pathname: "/settings/billing",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.ACCOUNT_BILLING.pathname);
      },
      title: "Billing",
      header: "Billing",
    },
    TEMPLATES: {
      pathname: "/templates",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES.pathname);
      },
      title: "Templates",
      header: "Templates",
    },
    TEMPLATES_SAMPLE: {
      pathname: (id: string) => "/templates/sample/${id}",
      match: (pathname: string) => {
        const id = pathname.split("/").pop();
        if (!id) return false;
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES_SAMPLE.pathname(id));
      },
      title: "Templates",
      header: "Templates",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    TEMPLATES_CREATE: {
      pathname: "/templates/create",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES_CREATE.pathname);
      },
      title: "New Template",
      header: "New Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    TEMPLATES_EDIT: {
      pathname: (id: number) => "/templates/edit/${id}",
      match: (pathname: string) => {
        const ids = findSerialIDFromPathname(pathname);
        if (!ids) return false;
        const [id] = ids;
        return isSamePath(pathname, ROUTES.PRIVATE.TEMPLATES_EDIT.pathname(Number(id)));
      },
      title: "Edit Template",
      header: "Edit Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    API_KEYS: {
      pathname: "/api-keys",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.PRIVATE.API_KEYS.pathname);
      },
      title: "API Keys",
      header: "API Keys",
    },
  },
  AUTH: {
    LOGIN: {
      pathname: "/auth/login",
      title: "Login",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.AUTH.LOGIN.pathname);
      },
    },
    SIGNUP: {
      pathname: "/auth/signup",
      title: "Register",
      match: (pathname: string) => {
        return isSamePath(pathname, ROUTES.AUTH.SIGNUP.pathname);
      },
    },
    FORGOT_PASSWORD: {
      pathname: "/auth/forgot-password",
      title: "Register",
      match: (pathname: string) => pathname === ROUTES.AUTH.FORGOT_PASSWORD.pathname,
    },
  },
  PUBLIC: {
    GITHUB: {
      pathname: "/api/auth/github",
    },
    GOOGLE: {
      pathname: "/api/auth/google",
    },
    DOCS: {
      pathname: "/docs",
      title: "Documentation",
      match: (pathname: string) => pathname === ROUTES.PUBLIC.DOCS.pathname,
    },
  },
} as const;

type PrivateRoute = (typeof ROUTES.PRIVATE)[keyof typeof ROUTES.PRIVATE];

export { ROUTES };
export type { PrivateRoute };
