import { encryptPassword } from "@/server/actions/auth/encryptPassword";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import type { AuthResetPasswordInput } from "@/server/schemas/authZodSchema";
import { eq } from "drizzle-orm";

export const resetPassword = async (payload: AuthResetPasswordInput) => {
  const user = await verifyJwt(payload.token);
  if (!user) {
    throw new Error("Invalid token");
  }
  const hashedPassword = await encryptPassword(payload.password);
  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.email, user.email))
    .execute();
  return { message: "Password updated successfully" };
};
