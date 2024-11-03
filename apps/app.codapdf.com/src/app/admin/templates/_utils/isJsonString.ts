export function isJsonString(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  return true;
}
