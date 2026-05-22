import bcrypt from "bcryptjs";
import { PASSWORD_SALT_ROUNDS } from "../constants";

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, PASSWORD_SALT_ROUNDS);
}

export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}