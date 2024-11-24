import { env } from "@/constants/env.server";
import { logger } from "@/server/utils/logger";
import { deleteFolder } from "@/server/utils/storage";
import type { S3ServiceException } from "@aws-sdk/client-s3";

export const deleteTemplateFolder = async (uuid: string) => {
  try {
    return await deleteFolder({
      Bucket: env.STORAGE_BUCKET_NAME,
      Key: `templates/${uuid}/`,
    });
  } catch (error) {
    const message = (error as S3ServiceException)?.$metadata ?? "File delete failed";
    logger.child({ module: "deleteTemplateFile" }).error(message);
    throw new Error("File delete failed");
  }
};
