import { env } from "@/constants/env.server";
import { saveSession } from "@/server/actions/auth/authSession";
import { signupFromSocialAuth } from "@/server/actions/auth/signupFromSocialAuth";
import { getUserById } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { authentications } from "@/server/database/schemas/authentications";
import { users } from "@/server/database/schemas/users";
import { GitHubUser } from "@/server/types/GitHubUser";
import { GitHubUserEmail } from "@/server/types/GitHubUserEmail";
import { logger } from "@/server/utils/logger";

import { and, eq } from "drizzle-orm";

export const authByGithub = async (code: string | null) => {
  if (!code) {
    throw new Error("No code provided");
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to get token");
  }

  const tokenResponseData = await tokenResponse.json();
  const { access_token } = tokenResponseData;

  if (typeof access_token !== "string") {
    throw new Error("Failed to get access token");
  }

  // Fetch user info from GitHub
  const response = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to get user data");
  }

  const userData = (await response.json()) as GitHubUser;
  const emailResponse = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const emails = (await emailResponse.json()) as Array<GitHubUserEmail>;
  // Find the primary email (or any verified email)
  const primaryEmail = emails.find((email) => email.primary && email.verified)?.email ?? emails[0]?.email;
  const userName = userData.name;
  if (typeof primaryEmail !== "string" || typeof userName !== "string") {
    logger.child({ module: "authByGithub" }).warn("Failed to get primary email or name");
    throw new Error("Failed to get primary email or name");
  }

  const providerId = userData.id.toString();
  const provider = "github";
  const email = primaryEmail;
  const picture = userData.avatar_url;

  const auth = await db.query.authentications.findFirst({
    where: and(eq(authentications.providerId, providerId), eq(authentications.provider, provider)),
  });
  // check if user already exists in the database
  const user = await db.query.users.findFirst({
    where: eq(users.email, primaryEmail),
  });

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
    });
  }
  const userDTO = await getUserById(user.id);
  await saveSession(userDTO);
  return "Successfully authenticated";
};
