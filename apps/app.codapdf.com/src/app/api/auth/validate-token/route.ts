import { getAuthorizationTokenFromHeader } from "@/server/actions/auth/getAuthorizationTokenFromHeader";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import { logger } from "@/server/utils/logger";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = getAuthorizationTokenFromHeader(req);
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const isValid = await verifyJwt(token);
    if (!isValid) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await db.query.users.findFirst({
      where: eq(users.id, isValid.sub),
      with: {
        profile: true,
      },
    });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const license = user.profile?.license;
    return NextResponse.json({
      license,
    });
  } catch (error) {
    logger.child({ action: "api/auth/validate-token/#POST" }).info(error);
    return new NextResponse("Server error", { status: 500 });
  }
};
