import { authMiddleware } from "@/server/actions/auth/authMiddleware";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  return await authMiddleware({ request });
};
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
