import { generateApiKeyJwt } from "@/server/actions/auth/generateJwt";
import { db } from "@/server/database";
import { apiKeyZodCreateSchema, apiKeys } from "@/server/database/schemas/apiKeys";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { eq } from "drizzle-orm";

export const apiKeyRouter = {
  create: protectedProcedure.input(apiKeyZodCreateSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const key = await generateApiKeyJwt();
    const payload = {
      ...input,
      userId,
      apiKey: key,
    };

    const response = await db
      .insert(apiKeys)
      .values(payload)
      .returning({
        name: apiKeys.name,
        uuid: apiKeys.uuid,
        apiKey: apiKeys.apiKey,
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
    const response = await db.select().from(apiKeys).where(eq(apiKeys.userId, userId));
    return {
      data: response,
      message: "API Keys fetched successfully",
    };
  }),
};
