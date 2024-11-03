import { Readable } from "stream";
import { env } from "@/constants/env.server";
import { downloadFile, streamToString } from "@/server/utils/storage";

export const downloadTemplateFiles = async (uuid: string, filesName: Array<string>) => {
  const template = await Promise.allSettled(
    filesName.map(async (filename) => {
      const file = await downloadFile({
        Bucket: env.STORAGE_BUCKET_NAME,
        Key: `templates/${uuid}/${filename}`,
      });
      if (file?.Body instanceof Readable) {
        const content = await streamToString(file.Body);
        return { filename, content };
      }
    }),
  );
  return template
    ?.filter((file) => file.status === "fulfilled")
    .map((file) => {
      return {
        filename: file?.value?.filename ?? "",
        content: file?.value?.content ?? "",
      };
    });
};
