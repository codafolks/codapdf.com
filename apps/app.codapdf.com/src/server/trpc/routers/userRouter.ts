import { userDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { licensesZodSchema } from "@/server/database/schemas/licenses";

import { profiles, userZodSchema, users } from "@/server/database/schemas/users";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { checkUserLicense } from "@/utils/checkUserLicense";
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
  update: protectedProcedure.input(userZodSchema.pick({ name: true })).mutation(({ input, ctx }) => {
    const id = ctx.user.id;
    const payload = input;
    return db.update(users).set(payload).where(eq(users.id, id)).execute();
  }),
  updateUserLicense: protectedProcedure.input(z.object({ license: licensesZodSchema })).mutation(({ input, ctx }) => {
    const userId = ctx.user.id;
    const payload = input;
    return db.update(profiles).set(payload).where(eq(profiles.userId, userId)).execute();
  }),
  getUserLicense: protectedProcedure.query(async ({ ctx }) => {
    const license = await checkUserLicense(ctx.user.id);
    return license;
  }),
};
