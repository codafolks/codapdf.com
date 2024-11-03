import { ROUTES } from "@/app/routes";
import { authByGoogle } from "@/server/actions/auth/authByGoogle";
import { logger } from "@/server/utils/logger";
import { NextRequest, NextResponse } from "next/server";

// NOTE: This is a workaround to redirect the user to the dashboard after google login. For some reason, the Response.redirect() function is not working.
const reload = `
  <h3>Redirecting...</h3>
  <script>
    setTimeout(() => {
      window.location.href = "${ROUTES.PRIVATE.DASHBOARD.path}";
    }, 1000);
  </script>
`;

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    await authByGoogle(code, state);
    return new NextResponse(reload, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    logger.child({ module: "authByGithub" }).error(error);
    return Response.redirect(new URL(ROUTES.AUTH.LOGIN.path, req.url));
  }
};
