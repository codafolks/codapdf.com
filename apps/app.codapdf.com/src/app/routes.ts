import { findSerialIDFromPathname } from "@/client/utils/findSerialIDFromPathname";
const ROUTES = {
  PRIVATE: {
    DASHBOARD: {
      path: "/dashboard",
      title: "Dashboard",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.DASHBOARD.path,
      header: "Welcome to <CodaPdf />",
    },
    SETTINGS: {
      path: "/settings",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.SETTINGS.path,
      title: "Settings",
      header: "Settings",
    },
    ACCOUNT_SETTINGS: {
      path: "/settings/account",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.ACCOUNT_SETTINGS.path,
      title: "Account",
      header: "Account Settings",
    },
    ACCOUNT_BILLING: {
      path: "/settings/billing",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.ACCOUNT_BILLING.path,
      title: "Billing",
      header: "Billing",
    },
    TEMPLATES: {
      path: "/templates",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.TEMPLATES.path,
      title: "Templates",
      header: "Templates",
    },
    TEMPLATES_SAMPLE: {
      path: (id: string) => `/templates/sample/${id}`,
      match: (pathname: string) => {
        const id = pathname.split("/").pop();
        if (!id) return false;
        return pathname === ROUTES.PRIVATE.TEMPLATES_SAMPLE.path(id);
      },
      title: "Templates",
      header: "Templates",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    TEMPLATES_CREATE: {
      path: "/templates/create",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.TEMPLATES_CREATE.path,
      title: "New Template",
      header: "New Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    TEMPLATES_EDIT: {
      path: (id: number) => `/templates/edit/${id}`,
      match: (pathname: string) => {
        const ids = findSerialIDFromPathname(pathname);
        if (!ids) return false;
        const [id] = ids;
        return pathname === `/templates/edit/${id}`;
      },
      title: "Edit Template",
      header: "Edit Template",
      parent: () => ROUTES.PRIVATE.TEMPLATES,
    } as const,
    API_KEYS: {
      path: "/api-keys",
      match: (pathname: string) => pathname === ROUTES.PRIVATE.API_KEYS.path,
      title: "API Keys",
      header: "API Keys",
    },
  },
  AUTH: {
    LOGIN: {
      path: "/auth/login",
      title: "Login",
      match: (pathname: string) => pathname === ROUTES.AUTH.LOGIN.path,
    },
    SIGNUP: {
      path: "/auth/signup",
      title: "Register",
      match: (pathname: string) => pathname === ROUTES.AUTH.SIGNUP.path,
    },
    FORGOT_PASSWORD: {
      path: "/auth/forgot-password",
      title: "Register",
      match: (pathname: string) => pathname === ROUTES.AUTH.FORGOT_PASSWORD.path,
    },
  },
  PUBLIC: {
    GITHUB: {
      path: "/api/auth/github",
    },
    GOOGLE: {
      path: "/api/auth/google",
    },
    DOCS: {
      path: "/docs",
      title: "Documentation",
      match: (pathname: string) => pathname === ROUTES.PUBLIC.DOCS.path,
    },
  },
} as const;

type PrivateRoute = (typeof ROUTES.PRIVATE)[keyof typeof ROUTES.PRIVATE];

export { ROUTES };
export type { PrivateRoute };
