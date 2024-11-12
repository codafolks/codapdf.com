import { db } from "@/server/database";
import { users } from "@/server/database/schemas/users";
import { addDays, differenceInDays, toDate } from "date-fns";
import { eq } from "drizzle-orm";

export const checkUserLicense = async (userId: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      profile: true,
    },
  });

  if (!user?.profile || !user?.createdAt || !user) {
    return null;
  }

  const license = user.profile.license;
  const signupDate = toDate(user.createdAt);
  const finalDate = addDays(signupDate, 14);

  const daysLeft = differenceInDays(finalDate, new Date());
  // if license is null, that means the user is not a customer and the sign up is less than 14 days
  // the user is still in the trial period with full access
  // otherwise, return unauthorized

  if (typeof license !== "string" && daysLeft >= 0) {
    return {
      isTrial: true,
      daysLeft,
      license: "PRO",
      userId,
    };
  }

  if (typeof license !== "string" && daysLeft < 0) {
    return {
      isTrial: true,
      daysLeft: 0,
      license,
      userId,
    };
  }

  return {
    isTrial: false,
    license,
    userId,
  };
};
