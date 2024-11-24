import { ROUTES } from "@/app/routes";
import { getSessionToken } from "@/server/actions/auth/authSession";
import { logger } from "@/server/utils/logger";
import { type NextRequest, NextResponse } from "next/server";
const PRIVATE = Object.values(ROUTES.PRIVATE).map((route) => route);
const AUTH = Object.values(ROUTES.AUTH).map((route) => route);

const checkIfPrivate = (pathname: string) => {
  for (const route of PRIVATE) {
    if (route.match(pathname)) {
      return true;
    }
  }
};

const checkIfAuth = (pathname: string) => {
  for (const route of AUTH) {
    if (route.match(pathname)) {
      return true;
    }
  }
};

const getMiddlewareSession = async () => {
  const token = await getSessionToken();
  try {
    if (token) {
      const response = await fetch(`${process.env.APP_DOMAIN}/api/edge/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!response.ok || typeof response?.json !== "function") {
        return { user: null };
      }
      const data = await response.json();
      if (data.user) return { user: data.user };
    }
    return { user: null };
  } catch (error) {
    logger.child({ action: "getMiddlewareSession" }).warn(error);
    return { user: null };
  }
};

export async function authMiddleware({ request }: { request: NextRequest }) {
  try {
    const method = request.method;
    const currentDomain = new URL(request.url).origin;
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next({ request });

    if (checkIfPrivate(pathname) && method === "GET") {
      const { user } = await getMiddlewareSession();
      if (!user) return Response.redirect(ROUTES.AUTH.LOGIN.href());
    }
    if (checkIfAuth(pathname) && method === "GET") {
      const { user } = await getMiddlewareSession();
      if (user) return Response.redirect(ROUTES.PRIVATE.DASHBOARD.href());
    }
    // make sure the marking site is redirecting to the correct domain
    if (pathname === "/" && method === "GET" && currentDomain !== process.env.SITE_DOMAIN) {
      return Response.redirect(ROUTES.PUBLIC.INDEX.href());
    }
    return response;
  } catch (error) {
    logger.child({ action: "authMiddleware" }).warn(error);
    return NextResponse.error();
  }
}
