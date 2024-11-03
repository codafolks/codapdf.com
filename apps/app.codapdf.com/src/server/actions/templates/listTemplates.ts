import { env } from "@/constants/env.server";
import { getUserSession } from "@/server/actions/auth/authSession";
import { db } from "@/server/database";
import { templates } from "@/server/database/schemas/templates";
import { eq } from "drizzle-orm";

export const listTemplates = async () => {
  const { user } = await getUserSession();
  if (!user) throw new Error("User not found");
  const response = await db.select().from(templates).where(eq(templates.userId, user.sub));
  return {
    data: response.map((template) => ({
      ...template,
      thumbnail: `${env.STORAGE_URL_DOMAIN}/templates/${template.uuid}/${template.thumbnail}`,
    })),
    message: "Templates fetched successfully",
  };
};
