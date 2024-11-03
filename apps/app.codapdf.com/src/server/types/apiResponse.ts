import { type ZodType, z } from "zod";

export const makeApiResponse = <T>(schema: ZodType<T>, message: string) => {
  return z.object({
    data: schema,
    message: z.string().default(message),
  });
};

export type ApiResponse<T> = {
  data: T | null;
  message?: string;
};
