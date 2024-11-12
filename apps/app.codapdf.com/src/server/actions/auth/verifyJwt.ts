import type { UserSession } from "@/server/actions/auth/authSession";
import { db } from "@/server/database";
import { apiKeys } from "@/server/database/schemas/apiKeys";
import { captureException } from "@/utils/captureException";
import { eq } from "drizzle-orm";

import { jwtVerify } from "jose";

export async function verifyJwt(token: string): Promise<UserSession> {
  try {
    const key = await db.query.apiKeys.findFirst({
      where: eq(apiKeys.apiKey, token),
      with: {
        user: {
          with: {
            profile: true,
          },
        },
      },
    });
    if (key) {
      return {
        sub: key.userId,
        email: key.user.email,
        license: key.user.profile?.license || null,
      };
    }
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
    captureException(error);
    throw new Error("Invalid token");
  }
}
