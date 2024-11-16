import crypto from "node:crypto";
import { env } from "@/constants/env.server";
import { cookies } from "next/headers";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GET = async () => {
  const cookie = await cookies();
  // generate a random key with 16 bytes
  const state = crypto.randomBytes(16).toString("hex");
  cookie.set("oauth_state", state, { httpOnly: true, secure: false });

  const params = {
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "profile email",
    state,
    access_type: "offline",
    prompt: "consent",
  };
  const query = new URLSearchParams(params).toString();
  const authUrl = `${GOOGLE_AUTH_URL}?${query}`;
  return Response.redirect(authUrl);
};
