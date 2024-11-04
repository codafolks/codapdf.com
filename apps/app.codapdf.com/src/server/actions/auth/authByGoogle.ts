import { env } from "@/constants/env.server";
import { saveSession } from "@/server/actions/auth/authSession";
import { sendWelcomeEmail } from "@/server/actions/emails/sendWelcomeEmail";
import { getUserById } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { authentications } from "@/server/database/schemas/authentications";
import { profiles, users } from "@/server/database/schemas/users";
import { GoogleResponseToken } from "@/server/types/GoogleResponseToken";
import { GoogleUserInfoResponseSuccess } from "@/server/types/GoogleUserInfoResponseSuccess";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";

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

  const tokenResponseData = (await tokenResponse.json()) as GoogleResponseToken;
  if (!tokenResponseData || "error" in tokenResponseData) {
    throw new Error("Failed to get token");
  }

  const { access_token } = tokenResponseData;

  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get user data");
  }

  const userData = (await response.json()) as GoogleUserInfoResponseSuccess;

  // Find the primary email (or any verified email)
  const primaryEmail = userData.email;
  const userName = userData.name;

  if (typeof primaryEmail !== "string" || typeof userName !== "string") {
    throw new Error("Failed to get primary email or name");
  }

  const providerId = userData.id;
  const provider = "google";
  const email = primaryEmail;

  const auth = await db.query.authentications.findFirst({
    where: and(eq(authentications.providerId, providerId), eq(authentications.provider, provider)),
  });
  // check if user already exists in the database
  const user = await db.query.users.findFirst({
    where: eq(users.email, primaryEmail),
  });

  if (!user) {
    const newUser = await db.transaction(async (trx) => {
      // create a new user
      const [user] = await trx
        .insert(users)
        .values({
          email,
          name: userName,
          image: userData.picture,
        })
        .returning({
          id: users.id,
        }).execute();
      // create a new profile
      await trx.insert(profiles).values({
        userId: newUser.id,
      }).execute();
      // create a new authentication
      await trx.insert(authentications).values({
        provider,
        providerId,
        userId: newUser.id,
      }).execute();
      return user;
    });
    const userDTO = await getUserById(newUser.id);
    await saveSession(userDTO);
    await sendWelcomeEmail({ email, name: userName });
    return "Successfully authenticated";
  }
  // create a new authentication if it doesn't exist
  if (!auth) {
    await db.insert(authentications).values({
      provider,
      providerId,
      userId: user.id,
    });
  }
  const userDTO = await getUserById(user.id);
  await saveSession(userDTO);
  return "Successfully authenticated";
};
