"use server";
import { getSession } from "@/server/actions/auth/authSession";
import { generateJwt } from "@/server/actions/auth/generateJwt";

export const getCurrentToken = async () => {
  const session = await getSession();
  if (!session.user) {
    return null;
  }
  const token = await generateJwt(session.user);
  return token;
};
