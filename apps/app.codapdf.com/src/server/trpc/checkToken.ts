import type { UserSession } from "@/server/actions/auth/authSession";
import { getAuthorizationTokenFromHeader } from "@/server/actions/auth/getAuthorizationTokenFromHeader";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";

import { TRPCError } from "@trpc/server";

export const checkToken = async (req: Request): Promise<UserSession> => {
  const token = getAuthorizationTokenFromHeader(req);
  const payload = await verifyJwt(token);
  const user = payload;
  if (!user.sub) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid Token",
    });
  }
  return user;
};
