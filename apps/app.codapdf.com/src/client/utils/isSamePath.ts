import { env } from "@/constants/env.client";

function getPathnameAndSearch(urlStr: string): string {
  let url: URL;
  try {
    // Try parsing as an absolute URL
    url = new URL(urlStr);
  } catch (e) {
    // If it fails, treat it as a relative URL
    url = new URL(urlStr, env.APP_DOMAIN);
  }
  return url.pathname + url.search;
}

export const isSamePath = (pathname1: string, pathname2: string): boolean => {
  return getPathnameAndSearch(pathname1) === getPathnameAndSearch(pathname2);
};
