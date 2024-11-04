import { ROUTES } from "@/app/routes";
import { authByGithub } from "@/server/actions/auth/authByGithub";
import { NextRequest } from "next/server";
import { captureException } from "@sentry/nextjs";
import { env } from "process";
export const GET = (async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    await authByGithub(code);
    const redirectUrl = `${env.APP_DOMAIN}/${ROUTES.PRIVATE.DASHBOARD.path}`;
    return Response.redirect(redirectUrl);
  } catch (error) {
    captureException(error);
    const redirectUrl = `${env.APP_DOMAIN}/${ROUTES.AUTH.LOGIN.path}`;
    return Response.redirect(redirectUrl);
  }
});
