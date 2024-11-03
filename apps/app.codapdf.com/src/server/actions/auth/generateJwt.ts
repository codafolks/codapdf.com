"use server";
import { type UserSession, getSession } from "@/server/actions/auth/authSession";
import type { ApiKey } from "@/server/database/schemas/apiKeys";
import { SignJWT } from "jose";

export async function generateJwt(user: UserSession): Promise<string> {
  if ("password" in user) {
    throw new Error("User object should not contain password");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({
    sub: String(user.sub),
    email: user.email,
    license: user.license,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string) // issuer
    .setAudience(process.env.JWT_AUDIENCE as string) // audience
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME as string) // to
    .sign(secret);
  return token;
}

export async function generateResetPasswordJwt(email: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string) // issuer
    .setAudience(process.env.JWT_AUDIENCE as string) // audience
    .setExpirationTime("1h") // to
    .sign(secret);
  return token;
}

export async function generateApiKeyJwt(apiKey: ApiKey): Promise<string> {
  const { user } = await getSession();
  if (!user) throw new Error("No session user found");
  if ("password" in user) {
    throw new Error("User object should not contain password");
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({
    apiKeyId: apiKey.uuid,
    sub: String(user.sub),
    license: user.license,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string) // issuer
    .setAudience(process.env.JWT_AUDIENCE as string) // audience
    .sign(secret);
  return token;
}
