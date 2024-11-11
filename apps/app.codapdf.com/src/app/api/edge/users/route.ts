import { saveSession } from "@/server/actions/auth/authSession";
import { getAuthorizationTokenFromHeader } from "@/server/actions/auth/getAuthorizationTokenFromHeader";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import { userDTO } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import { captureException } from "@/utils/captureException";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

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
    await saveSession(userDTO(user));
    return NextResponse.json({
      user: true,
    });
  } catch (error) {
    captureException(error);
    return NextResponse.json({
      user: false,
    });
  }
};
