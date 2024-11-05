import { getAuthorizationTokenFromHeader } from "@/server/actions/auth/getAuthorizationTokenFromHeader";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import { logger } from "@/server/utils/logger";
import { captureException } from "@sentry/nextjs";
import { isBefore, subDays } from "date-fns";
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

    const signupDate = user.createdAt;
    if(!signupDate) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const license = user.profile?.license;

    // if license is null, that means the user is not a customer and the sign up is less than 14 days
    // the user is still in the trial period with full access
    // otherwise, return unauthorized
    const isSignupWithin14Days = isBefore(signupDate, subDays(new Date(), 14));
    if (!license && isSignupWithin14Days) {
      return NextResponse.json({
        license: "PRO",
      });
    }
    
    return NextResponse.json({
      license,
    });
  } catch (error) {
    captureException(error);
    logger.child({ action: "api/auth/validate-token/#POST" }).info(error);
    return new NextResponse("Server error", { status: 500 });
  }
};
