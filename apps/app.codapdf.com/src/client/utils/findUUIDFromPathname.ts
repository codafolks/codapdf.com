// reference: https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
// UUID regex pattern
const uuidPattern = /\b[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\b/g;
const findUUIDSFromPathname = (pathname: string) => {
  // Find all matches in the input string
  const uuids = pathname.match(uuidPattern);
  return uuids || [];
};

export { findUUIDSFromPathname, uuidPattern };
