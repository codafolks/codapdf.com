import { getUserSession } from "@/server/actions/auth/authSession";
import { deleteTemplateFolder } from "@/server/actions/templates/deleteTemplateFolder";
import { uploadTemplateFile } from "@/server/actions/templates/uploadTemplateFile";
import { uploadTemplateThumbnail } from "@/server/actions/templates/uploadTemplateThumbnail";
import { db } from "@/server/database";
import { type TemplateOnSavePayload, templates } from "@/server/database/schemas/templates";
import { eq } from "drizzle-orm";

export const saveTemplate = async (input: TemplateOnSavePayload) => {
  const { user } = await getUserSession();
  const filesName = input.filesName;
  const files = input.files;

  const payload = {
    id: input.id,
    name: input.name,
    description: input.description,
    filesName,
    userId: user?.sub,
    uuid: input.uuid,
  };

  const returning = {
    id: templates.id,
    name: templates.name,
    uuid: templates.uuid,
    userId: templates.userId,
    filesName: templates.filesName,
    description: templates.description,
    thumbnail: templates.thumbnail,
    createdAt: templates.createdAt,
    updatedAt: templates.updatedAt,
  } as const;

  const response = await db.transaction(async (trx) => {
    if (payload.id) {
      const [{ uuid }] = await trx.select({ uuid: templates.uuid }).from(templates).where(eq(templates.id, payload.id));
      await deleteTemplateFolder(uuid);
    }
    let [transaction] = payload?.id
      ? await trx.update(templates).set(payload).where(eq(templates.id, payload.id)).returning(returning)
      : await trx.insert(templates).values(payload).returning(returning);
    const uuid = transaction.uuid;
    if (!uuid) throw new Error("Template UUID not found");
    await Promise.all(files.map(({ filename, content }) => uploadTemplateFile({ uuid, filename, content })));
    if (input.thumbnail) {
      await uploadTemplateThumbnail(uuid, input.thumbnail);
      await trx.update(templates).set({ thumbnail: "thumbnail.jpg" }).where(eq(templates.uuid, uuid)).returning(returning);
    }
    return { ...transaction, files };
  });
  return {
    data: response,
    message: "Template saved successfully",
  };
};
