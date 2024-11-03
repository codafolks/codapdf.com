import { userDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { licensesZodSchema } from "@/server/database/schemas/licenses";

import { profiles, userZodSchema, users } from "@/server/database/schemas/users";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = {
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users
      .findFirst({
        where: eq(users.id, ctx.user.id),
        with: {
          profile: true,
        },
      })
      .execute();
    if (!user) {
      throw new Error("User not found");
    }
    return userDTO(user);
  }),
  update: protectedProcedure.input(userZodSchema).mutation(({ input, ctx }) => {
    const id = ctx.user.id;
    const payload = input;
    return db.update(profiles).set(payload).where(eq(profiles.userId, id)).execute();
  }),
  updateUserLicense: protectedProcedure.input(z.object({ license: licensesZodSchema })).mutation(({ input, ctx }) => {
    const userId = ctx.user.id;
    const payload = input;
    return db.update(profiles).set(payload).where(eq(profiles.userId, userId)).execute();
  }),
  getUserLicense: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const profile = await db.query.profiles
      .findFirst({
        where: eq(profiles.userId, userId),
      })
      .execute();
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile.license;
  }),
};
