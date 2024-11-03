import { getUserSession } from "@/server/actions/auth/authSession";
import { db } from "@/server/database";
import { templates } from "@/server/database/schemas/templates";
import { and, eq } from "drizzle-orm";

export const deleteTemplate = async (id: number) => {
  const { user } = await getUserSession();
  if (!user) throw new Error("Session not found");
  await db.delete(templates).where(and(eq(templates.id, id), eq(templates.userId, user.sub)));
  return {
    data: null,
    message: "Template deleted successfully",
  };
};
