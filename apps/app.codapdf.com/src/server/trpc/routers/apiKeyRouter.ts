import { generateApiKeyJwt } from "@/server/actions/auth/generateJwt";
import { db } from "@/server/database";
import { type ApiKey, apiKeyZodCreateSchema, apiKeys } from "@/server/database/schemas/apiKeys";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { eq } from "drizzle-orm";

export const apiKeyRouter = {
  create: protectedProcedure.input(apiKeyZodCreateSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const payload = {
      ...input,
      userId,
    };
    const response = await db
      .insert(apiKeys)
      .values(payload)
      .returning({
        name: apiKeys.name,
        uuid: apiKeys.uuid,
        createdAt: apiKeys.createdAt,
        updatedAt: apiKeys.updatedAt,
      })
      .execute();
    return {
      data: response[0],
      message: "API Key created",
    };
  }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const data = (await db.select().from(apiKeys).where(eq(apiKeys.userId, userId))) as unknown as Array<ApiKey>;
    const response = (await Promise.all(
      data.map(async (row) => ({
        ...row,
        token: await generateApiKeyJwt(row),
      })),
    )) as Array<ApiKey & { token: string }>;
    return {
      data: response,
      message: "API Keys fetched successfully",
    };
  }),
};
