import { db } from "@/server/database";
import { type Profile, type User, users } from "@/server/database/schemas/users";
import { eq } from "drizzle-orm";

export type UserDTO = {
  id: number;
  uuid: string;
  email: string;
  name: string;
  customerId: string | null;
  profile: Profile;
  hasPassword: boolean;
};

export const userDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    uuid: user.uuid,
    email: user.email,
    name: user.name,
    customerId: user.customerId,
    profile: user.profile,
    hasPassword: !!user.password,
  };
};

export const getUserById = async (id: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      profile: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return userDTO(user);
};
