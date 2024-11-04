import { env } from "@/constants/env.server";
import { saveSession } from "@/server/actions/auth/authSession";
import { signupFromSocialAuth } from "@/server/actions/auth/signupFromSocialAuth";
import { getUserById } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { authentications } from "@/server/database/schemas/authentications";
import { users } from "@/server/database/schemas/users";
import { GoogleResponseToken } from "@/server/types/GoogleResponseToken";
import { GoogleUserInfoResponseSuccess } from "@/server/types/GoogleUserInfoResponseSuccess";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export const authByGoogle = async (code: string | null, state: string | null) => {
  if (!code || !state) {
    throw new Error("No code or state provided");
  }
  const cookie = await cookies();
  const oauthState = cookie.get("oauth_state")?.value;

  if (state !== oauthState) {
    throw new Error("Invalid state");
  }

  cookie.delete("oauth_state");

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    }),
  });

  const tokenResponseData = await tokenResponse.json() as GoogleResponseToken;
  if (!tokenResponseData || "error" in tokenResponseData) {
    throw new Error("Failed to get token");
  }

  const { access_token } = tokenResponseData;

  if(typeof access_token !== "string") {
    throw new Error("Failed to get access token");
  }

  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get user data");
  }

  const userData = (await response.json()) as GoogleUserInfoResponseSuccess;
  const userName = userData.name;
  const provider = "google";
  const email = userData.email;
  const picture = userData?.picture;
  const providerId = userData.id;

  const isEmail = await z.string().email().parseAsync(email);
  if (!email || !isEmail || !userName) {
    throw new Error("Failed to get primary email or name");
  }
  
  const auth = await db.query.authentications.findFirst({
    where: and(eq(authentications.providerId, providerId), eq(authentications.provider, provider)),
  }).execute();
  // check if user already exists in the database
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  }).execute();

  if (!user?.id) {
    const userDTO = await signupFromSocialAuth({ email, name: userName, provider, providerId, picture });
    await saveSession(userDTO);
    return "Successfully authenticated";
  }
  // create a new authentication if it doesn't exist
  if (!auth?.id) {
    await db.insert(authentications).values({
      provider,
      providerId,
      userId: user.id,
    }).execute();
  }
  const userDTO = await getUserById(user.id);
  await saveSession(userDTO);
  return "Successfully authenticated";
};
