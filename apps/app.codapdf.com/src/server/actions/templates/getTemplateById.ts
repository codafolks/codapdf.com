import { downloadTemplateFiles } from "@/server/actions/templates/downloadTemplateFiles";
import { db } from "@/server/database";
import { templates } from "@/server/database/schemas/templates";
import { eq } from "drizzle-orm";

export const getTemplateById = async (id: number) => {
  const response = await db.select().from(templates).where(eq(templates.id, id));
  const template = response[0];
  const files = await downloadTemplateFiles(template.uuid, template.filesName);
  return {
    data: {
      ...template,
      files,
    },
    message: "Template fetched successfully",
  };
};
