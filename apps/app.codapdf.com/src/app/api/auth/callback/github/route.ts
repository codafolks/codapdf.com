import { ROUTES } from "@/app/routes";
import { authByGithub } from "@/server/actions/auth/authByGithub";
import { captureException } from "@/utils/captureException";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    await authByGithub(code);
    return Response.redirect(ROUTES.PUBLIC.REDIRECTING.href());
  } catch (error) {
    captureException(error);
    return Response.redirect(ROUTES.AUTH.LOGIN.href());
  }
};
