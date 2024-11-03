import { comparePassword } from "@/server/actions/auth/comparePassword";
import { userDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import type { AuthLoginInput } from "@/server/schemas/authZodSchema";
import { logger } from "@/server/utils/logger";
import { eq } from "drizzle-orm";

export const signIn = async (payload: AuthLoginInput) => {
  try {
    const { email, password } = payload;
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: { profile: true },
    });

    if (!user) {
      throw new Error("User not found");
    }
    if (!user.password) {
      throw new Error("This account has not been set up for password login");
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (isPasswordMatch) {
      return userDTO(user);
    }
    throw new Error("Invalid Email or Password");
  } catch (error) {
    logger.child({ action: "signIn" }).error(error);
    throw error;
  }
};
