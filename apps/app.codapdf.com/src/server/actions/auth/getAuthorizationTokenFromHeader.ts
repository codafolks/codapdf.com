import type { NextRequest } from "next/server";

export const getAuthorizationTokenFromHeader = (req: NextRequest | Request) => {
  const authorization = req.headers.get("Authorization");
  // token by regex
  return authorization?.replace(/^Bearer\s/, "") ?? "";
};
