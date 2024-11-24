"use server";
import { type UserSession, getSession } from "@/server/actions/auth/authSession";
import { type JWTPayload, SignJWT } from "jose";
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
    .setExpirationTime("1h")
    .sign(secret);
  return token;
}

async function getSecretKey() {
  const secretKeyBase64 = process.env.JWT_SECRET as string;
  const keyData = Uint8Array.from(atob(secretKeyBase64), (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, true, ["sign", "verify"]);
}

export async function generateApiKeyJwt(): Promise<string> {
  const { user } = await getSession();
  if (!user) throw new Error("No session user found");
  if ("password" in user) {
    throw new Error("User object should not contain password");
  }
  const secretKeyData = await getSecretKey();
  const jwt = await new SignJWT(user as unknown as JWTPayload).setProtectedHeader({ alg: "HS256" }).sign(secretKeyData);
  const apiKeyJwt = `CpdfA${jwt}`.slice(0, 39);
  return apiKeyJwt;
}
