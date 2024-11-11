import { env } from "@/constants/env.client";
export const isSamePath = (pathname1: string, pathname2: string): boolean => {
  if (pathname1 === pathname2) return true;
  // remove domain from pathname if it exists
  const _pathname1 = pathname1.startsWith(env.APP_DOMAIN) ? pathname1.replace(env.APP_DOMAIN, "") : pathname1;
  const _pathname2 = pathname2.startsWith(env.APP_DOMAIN) ? pathname2.replace(env.APP_DOMAIN, "") : pathname2;
  return _pathname1 === _pathname2;
};
