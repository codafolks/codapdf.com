import { ROUTES } from "@/app/routes";
import { env } from "@/constants/env.server";
import { authByGoogle } from "@/server/actions/auth/authByGoogle";
import { captureException } from "@sentry/nextjs";
import { NextRequest } from "next/server";

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
    return new Response(reload, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    })
  } catch (error) {
    captureException(error);
    return Response.redirect(`${env.APP_DOMAIN}/${ROUTES.AUTH.LOGIN.path}`);
  }
};
