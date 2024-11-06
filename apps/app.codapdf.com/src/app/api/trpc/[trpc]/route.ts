import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext, createTRPCPublicContext } from "@/server/trpc/contextTrpc";
import { appRouter } from "@/server/trpc/trpcServer";
import type { NextRequest, NextResponse } from "next/server";

const allowedUrls = ["auth.login", "auth.signup", "auth.forgotPassword", "auth.resetPassword", "stripe.prices", "contact.submit"];

const isStripePrices = (pathname: string) => {
  return pathname.includes("stripe.prices");
};

const checkUrlByRegex = (pathname: string) => {
  const regex = new RegExp(allowedUrls.join("|"));
  return regex.test(pathname);
};

const handler = (req: NextRequest, res: NextResponse) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => {
      const pathname = req.nextUrl.pathname;
      if (checkUrlByRegex(pathname)) {
        return createTRPCPublicContext({ req, res });
      }
      return createTRPCContext({ req, res });
    },
  });
};
export { handler as GET, handler as POST };
