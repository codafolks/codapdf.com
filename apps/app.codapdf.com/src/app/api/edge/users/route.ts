import { saveSession } from "@/server/actions/auth/authSession";
import { getAuthorizationTokenFromHeader } from "@/server/actions/auth/getAuthorizationTokenFromHeader";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import { logger } from "@/server/utils/logger";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

// POST /api/edge/users
// @desc: check if user is  authenticated and valid
export const POST = async (req: NextRequest) => {
  try {
    const token = getAuthorizationTokenFromHeader(req);
    const payload = await verifyJwt(token);
    const userId = payload?.sub;
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        profile: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    await saveSession(user);
    const response = NextResponse.json({
      user: true,
    });
    // set cache for 1 hour for this route
    response.headers.set("Cache-Control", "public, max-age=3600");
    return response;
  } catch (error) {
    logger.child({ action: "api/users/#GET" }).info(error);
    return NextResponse.json({
      user: false,
    });
  }
};
