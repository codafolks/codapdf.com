import "server-only";
import type { Readable } from "node:stream";
import { env } from "@/constants/env.server";
import { logger } from "@/server/utils/logger";
import { DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { DeleteObjectCommandInput, GetObjectCommandInput, NotFound, PutObjectCommandInput, S3ServiceException } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: env.STORAGE_REGION,
  endpoint: env.STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: env.STORAGE_SECRET_ACCESS_KEY,
  },
});

const streamToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Array<Uint8Array> = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

const uploadFile = async (params: PutObjectCommandInput) => {
  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    const message = (error as S3ServiceException)?.$metadata;
    logger.child({ params, message }).error("File upload failed");
    throw new Error("File upload failed");
  }
};

const downloadFile = async (params: GetObjectCommandInput) => {
  try {
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    const message = (error as NotFound)?.$metadata?.httpStatusCode;
    if (message === 404) {
      logger.child({ params }).error("File not found");
    }
    return null;
  }
};

export const deleteFolder = async (params: DeleteObjectCommandInput) => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: params.Bucket,
      Prefix: params.Key,
    });
    const list = await s3Client.send(listCommand);
    if (list?.KeyCount && list.Contents) {
      // delete the files
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: params.Bucket,
        Delete: {
          Objects: list.Contents.map((item) => ({ Key: item.Key })), // array of keys to be deleted
          Quiet: false, // provides info on successful deletes
        },
      });
      let deleted = await s3Client.send(deleteCommand); // delete the files
      // log any errors deleting files
      if (deleted.Errors) {
        for (const error of deleted.Errors) {
          logger.child({ module: "deleteFolder" }).info(`${error.Key} could not be deleted - ${error.Code}`);
        }
      }
      const total = deleted?.Deleted?.length ?? 0;
      return `${total} files deleted.`;
    }
  } catch (error) {
    const message = (error as S3ServiceException)?.$metadata;
    logger.child({ params, message }).error("File delete failed");
    throw new Error("File delete failed");
  }
};

export { uploadFile, downloadFile, streamToString };
