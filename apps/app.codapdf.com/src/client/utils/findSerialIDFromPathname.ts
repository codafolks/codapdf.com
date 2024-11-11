export const findSerialIDFromPathname = (pathname: string): Array<string> | undefined => {
  // Create a regular expression to match digits in the pathname
  const regex = /(\d+)/g;

  // Find all matches of the regex in the pathname
  const serialIds = pathname.match(regex);

  // Return the array of serial IDs
  return Array.isArray(serialIds) && serialIds.length > 0 ? serialIds : undefined;
};
