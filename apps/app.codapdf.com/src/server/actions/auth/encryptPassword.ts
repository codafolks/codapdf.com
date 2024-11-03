import bcrypt from "bcrypt";

export async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10; // Define the strength of the encryption
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
