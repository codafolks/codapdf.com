import { ROUTES } from "@/app/routes";
import { authByGithub } from "@/server/actions/auth/authByGithub";
import { NextRequest } from "next/server";
import { captureException } from "@sentry/nextjs";
export const GET = (async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    await authByGithub(code);
    return Response.redirect(new URL(ROUTES.PRIVATE.DASHBOARD.path, req.url));
  } catch (error) {
    captureException(error);
    return Response.redirect(new URL(ROUTES.AUTH.LOGIN.path, req.url));
  }
});
