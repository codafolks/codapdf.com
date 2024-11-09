import { encryptPassword } from "@/server/actions/auth/encryptPassword";
import { getUserById } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { authentications } from "@/server/database/schemas/authentications";
import { profiles, users } from "@/server/database/schemas/users";
import type { AuthSignupInput } from "@/server/schemas/authZodSchema";
import { logger } from "@/server/utils/logger";
import { eq } from "drizzle-orm";

export const signUp = async (payload: AuthSignupInput) => {
  try {
    const hashedPassword = await encryptPassword(payload.password);
    const user = db.transaction(async (trx) => {
      const [newUser] = await trx
        .insert(users)
        .values({ ...payload, password: hashedPassword })
        .returning();
      await trx.insert(profiles).values({ userId: newUser.id });
      const savedUser = await trx.query.users.findFirst({
        where: eq(users.id, newUser.id),
        with: { profile: true },
      });
      if (!savedUser) {
        throw new Error("Something went wrong");
      }
      await trx.insert(authentications).values({
        provider: "email",
        providerId: savedUser.email,
        userId: savedUser.id,
      });
      return await getUserById(savedUser.id);
    });

    return user;
  } catch (error) {
    logger.child({ action: "signUp" }).error(error);
    throw error;
  }
};
