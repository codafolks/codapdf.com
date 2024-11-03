import { getAuthorizationTokenFromHeader } from "@/server/actions/auth/getAuthorizationTokenFromHeader";
import { verifyJwt } from "@/server/actions/auth/verifyJwt";
import { db } from "@/server/database";
import { apiKeys } from "@/server/database/schemas/apiKeys";

import { captureException } from "@/utils/captureException";
import { checkUserLicense } from "@/utils/checkUserLicense";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const token = getAuthorizationTokenFromHeader(req);
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    const apiKey = await db.query.apiKeys.findFirst({
      where: eq(apiKeys.apiKey, token),
      with: {
        user: {
          with: {
            profile: true,
          },
        },
      },
    });

    if (apiKey) {
      const license = await checkUserLicense(apiKey.user.profile.id);
      if (!license) {
        return new Response("Unauthorized", { status: 401 });
      }
      return NextResponse.json(license);
    }

    const isValid = await verifyJwt(token);
    if (!isValid) {
      return new Response("Unauthorized", { status: 401 });
    }
    const license = await checkUserLicense(isValid.sub);
    if (!license) {
      return new Response("Unauthorized", { status: 401 });
    }
    return NextResponse.json(license);
  } catch (error) {
    captureException(error);
    return new NextResponse("Server error", { status: 500 });
  }
};
