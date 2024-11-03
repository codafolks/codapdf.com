"use server";
import { getSession } from "@/server/actions/auth/authSession";
import { comparePassword } from "@/server/actions/auth/comparePassword";
import { encryptPassword } from "@/server/actions/auth/encryptPassword";
import { userDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { authentications } from "@/server/database/schemas/authentications";
import { users } from "@/server/database/schemas/users";
import type {
  AccountSetPasswordInput,
  AccountUpdatePasswordInput,
} from "@/server/schemas/accountUpdatePasswordZodSchema";
import { eq } from "drizzle-orm";

export const updateAccountPassword = async (payload: AccountUpdatePasswordInput | AccountSetPasswordInput) => {
  const password = payload.password;
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Session no found");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.sub),
    with: { profile: true },
  });
  if (!user) throw new Error("User not found");
  const user_dto = userDTO(user);

  if (user_dto.hasPassword) {
    const currentPassword = payload.currentPassword as string;
    const isValidPassword = await comparePassword(currentPassword, user.password as string);
    if (!isValidPassword) {
      throw new Error("Invalid current password");
    }
  }
  if (!user_dto.hasPassword) {
    await db
      .insert(authentications)
      .values({
        userId: user.id,
        provider: "email",
        providerId: user.email,
      })
      .execute();
  }
  const newHashedPassword = await encryptPassword(password);
  await db.update(users).set({ password: newHashedPassword }).where(eq(users.id, session.user.sub)).execute();
  return { success: true, message: "Password updated" };
};
