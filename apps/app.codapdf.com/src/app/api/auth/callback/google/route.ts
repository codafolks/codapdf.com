import { ROUTES } from "@/app/routes";
import { authByGoogle } from "@/server/actions/auth/authByGoogle";
import { captureException } from "@/utils/captureException";

import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    await authByGoogle(code, state);
    return Response.redirect(new URL("/redirecting", req.nextUrl));
  } catch (error) {
    captureException(error);
    return Response.redirect(ROUTES.AUTH.LOGIN.pathname());
  }
};
