import { TRPCError } from "@trpc/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";

type Method = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
type AllowMethodPostProcedure = {
  ctx: {
    req: {
      method: string;
    };
  };
  next: () => NextMiddlewareResult;
};
export const checkMethodAllowed =
  (allowedMethod: Method) =>
  async (opts: AllowMethodPostProcedure): Promise<NextMiddlewareResult> => {
    const currentMethod = opts.ctx.req.method;
    if (currentMethod !== allowedMethod) {
      throw new TRPCError({
        code: "METHOD_NOT_SUPPORTED",
        message: "Method not allowed",
      });
    }
    return await opts.next();
  };
