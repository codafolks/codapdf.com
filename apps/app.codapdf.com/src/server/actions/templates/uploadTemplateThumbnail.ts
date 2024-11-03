import { env } from "@/constants/env.server";
import { uploadFile } from "@/server/utils/storage";

const convertBase64toBuffer = (image: string) => {
  const base64String = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64String, "base64");
  return buffer;
};

export const uploadTemplateThumbnail = async (uuid: string, thumbnail: string) => {
  await uploadFile({
    Body: convertBase64toBuffer(thumbnail),
    Bucket: env.STORAGE_BUCKET_NAME,
    Key: `templates/${uuid}/thumbnail.jpg`,
    ContentType: "image/jpeg",
    ACL: "public-read",
  });
};
