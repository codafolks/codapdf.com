import "server-only";

import { getCurrentUser } from "@/server/actions/auth/getCurrentUser";
import { getUserById } from "@/server/actions/users/getUserById";
import { checkToken } from "@/server/trpc/checkToken";
import type { NextRequest, NextResponse } from "next/server";

type CreateClientContextTrpc = {
  req: NextRequest;
  res: NextResponse;
};
export const createTRPCContext = async ({ req }: CreateClientContextTrpc) => {
  const userToken = await checkToken(req);
  const user = await getUserById(userToken.sub);
  return {
    user,
    req,
  };
};

export const createTRPCPublicContext = ({ req, res }: CreateClientContextTrpc) => {
  return {
    req,
    res,
  };
};

export const createTRPCEmptyContext = async () => {
  const user = await getCurrentUser();
  return {
    user,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
export type TRPCPublicContext = ReturnType<typeof createTRPCPublicContext>;
export type TRPCEmptyContext = Awaited<ReturnType<typeof createTRPCEmptyContext>>;
