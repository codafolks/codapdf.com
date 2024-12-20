import type { UserSession } from "@/server/actions/auth/authSession";
import type { UserDTO } from "@/server/actions/users/getUserById";

export const convertUser2UserSession = (user: UserDTO): UserSession => {
  return {
    sub: user.id,
    email: user.email,
    license: user?.profile?.license,
  };
};
