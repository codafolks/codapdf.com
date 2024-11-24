import { getSession } from "@/server/actions/auth/authSession";
import { getUserById } from "@/server/actions/users/getUserById";

export const getCurrentUser = async () => {
  const session = await getSession();
  if (!session.user) {
    return null;
  }
  const user = await getUserById(session.user.sub);
  return user;
};
