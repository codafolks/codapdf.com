import type { UserSession } from "@/server/actions/auth/authSession";
import { logger } from "@/server/utils/logger";
import { jwtVerify } from "jose";

export async function verifyJwt(token: string): Promise<UserSession> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify<UserSession>(token, secret, {
      issuer: process.env.JWT_ISSUER, // issuer
      audience: process.env.JWT_AUDIENCE, // audience
    });

    if ("password" in decoded.payload) {
      throw new Error("Invalid token");
    }
    // check if the token is expired
    if (decoded.payload.exp && Date.now() >= decoded.payload.exp * 1000) {
      throw new Error("Token expired");
    }

    return decoded.payload;
  } catch (error) {
    logger.child({ action: "verifyJwt" }).error(error);
    throw new Error("Invalid token");
  }
}
