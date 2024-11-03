import { ROUTES } from "@/app/routes";
import { authByGithub } from "@/server/actions/auth/authByGithub";
import { logger } from "@/server/utils/logger";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    await authByGithub(code);
    return Response.redirect(new URL(ROUTES.PRIVATE.DASHBOARD.path, req.url));
  } catch (error) {
    logger.child({ module: "authByGithub" }).error(error);
    return Response.redirect(new URL(ROUTES.AUTH.LOGIN.path, req.url));
  }
};
