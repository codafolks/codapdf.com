"use server";
import { getSession } from "@/server/actions/auth/authSession";
import { comparePassword } from "@/server/actions/auth/comparePassword";
import { encryptPassword } from "@/server/actions/auth/encryptPassword";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import type { AccountUpdatePasswordInput } from "@/server/schemas/accountUpdatePasswordZodSchema";
import { eq } from "drizzle-orm";

export const updateAccountPassword = async (payload: AccountUpdatePasswordInput) => {
  const { currentPassword, password } = payload;

  const session = await getSession();
  if (!session?.user) {
    throw new Error("Session no found");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.sub),
  });
  if (!user?.password) {
    throw new Error("User not found");
  }
  const isValidPassword = await comparePassword(currentPassword, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  const newHashedPassword = await encryptPassword(password);
  await db.update(users).set({ password: newHashedPassword }).where(eq(users.id, session.user.sub)).execute();
  return { success: true, message: "Password updated" };
};
