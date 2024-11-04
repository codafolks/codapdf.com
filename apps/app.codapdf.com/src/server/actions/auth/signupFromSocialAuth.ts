import { sendWelcomeEmail } from "@/server/actions/emails/sendWelcomeEmail";
import { getUserById } from "@/server/actions/users/getUserById";
import { db } from "@/server/database";
import { AuthProvider, authentications } from "@/server/database/schemas/authentications";
import { profiles, users } from "@/server/database/schemas/users";

type SignupFromSocialAuth = {
  email: string;
  name: string;
  picture?: string | null;
  provider: AuthProvider;
  providerId: string;
};
export const signupFromSocialAuth = async ({ email, name, picture, provider, providerId }: SignupFromSocialAuth) => {
  const newUser = await db.transaction(async (trx) => {
    // create a new user
    const [user] = await trx
      .insert(users)
      .values({
        email,
        name,
        image: picture,
      })
      .returning({
        id: users.id,
      })
      .execute();
    // create a new profile
    await trx
      .insert(profiles)
      .values({
        userId: user.id,
      })
      .execute();
    // create a new authentication
    await trx
      .insert(authentications)
      .values({
        provider,
        providerId,
        userId: user.id,
      })
      .execute();
    return user;
  });
  await sendWelcomeEmail({ email, name });
  const userDTO  = await getUserById(newUser.id);
  return  userDTO
};
