export const isSameURL = (pathname: string, path: string, domain: string): boolean => {
  const url = new URL(pathname, domain);
  return url.href === path;
};
