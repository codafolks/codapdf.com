import { env } from "@/constants/env.server";
import { uploadFile } from "@/server/utils/storage";
import { z } from "zod";

const contentTypeByExtension = (filename: string) => {
  const ext = filename.split(".").pop();
  switch (ext) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    default:
      return "text/plain";
  }
};

const InputZodSchema = z.object({
  uuid: z.string(),
  filename: z.string().refine((value) => value.includes("."), "Filename must include an extension"),
  content: z.string(),
});
type Input = z.infer<typeof InputZodSchema>;
export const uploadTemplateFile = async ({ uuid, filename, content }: Input) => {
  await uploadFile({
    Body: Buffer.from(content, "utf-8"),
    Bucket: env.STORAGE_BUCKET_NAME,
    Key: `templates/${uuid}/${filename}`,
    ContentType: contentTypeByExtension(filename),
  });
};
