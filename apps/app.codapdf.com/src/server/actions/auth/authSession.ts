import "server-only";
import { generateJwt } from "@/server/actions/auth/generateJwt";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import type { License } from "@/server/database/schemas/licenses";

import { convertUser2UserSession } from "@/server/actions/auth/convertUser2UserSession";
import type { UserDTO } from "@/server/actions/users/getUserById";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { isProductionEnvironment } from "@/utils/isProductionEnvironment";
import { captureException } from "@/utils/captureException";

export const authSessionConfig = {
  cookieName: "session",
  cookieOptions: {
    secure: isProductionEnvironment,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  } as ResponseCookie,
};

export type UserSession = {
  sub: number;
  email: string;
  license: License | null;
};

const saveCookie = async (token: string) => {
  const cookie = await cookies();
  cookie.set(authSessionConfig.cookieName, token, authSessionConfig.cookieOptions);
};

export const getSessionToken = async () => {
  const cookie = await cookies();
  const tokenSession = cookie.get(authSessionConfig.cookieName)?.value;
  if (!tokenSession) {
    return null;
  }
  return tokenSession;
};

export const convertUserInfoToToken = async (user: UserDTO) => {
  const sessionUser = convertUser2UserSession(user);
  const token = await generateJwt(sessionUser);
  return token;
};
export const saveSession = async (user: UserDTO) => {
  const token = await convertUserInfoToToken(user);
  await saveCookie(token);
};

export const destroySession = async () => {
  try {
    const cookie = await cookies();
    cookie.delete(authSessionConfig.cookieName);
  } catch (error) {
    captureException(error);
  }
};

export const getSession = async () => {
  const tokenSession = await getSessionToken();
  if (!tokenSession) {
    return { user: undefined };
  }
  const response = await fetch(`${process.env.APP_DOMAIN}/api/edge/users`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application",
      Authorization: `Bearer ${tokenSession}`,
    },
  });
  const data = await response.json();
  if (data.user) {
    const value = await verifyJwt(tokenSession);
    return { user: value };
  }
  return { user: undefined };
};

export const getUserSession = async () => {
  return await getSession();
};
