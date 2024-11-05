import { ROUTES } from "@/app/routes";
import { env } from "@/constants/env.server";
import { authByGithub } from "@/server/actions/auth/authByGithub";
import { captureException } from "@/utils/captureException";
import type { NextRequest } from "next/server";

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
    await authByGithub(code);
    return new Response(reload, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    captureException(error);
    const redirectUrl = `${env.APP_DOMAIN}/${ROUTES.AUTH.LOGIN.path}`;
    return Response.redirect(redirectUrl);
  }
};
