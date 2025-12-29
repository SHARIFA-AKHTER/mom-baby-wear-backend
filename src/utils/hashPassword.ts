import bcrypt from "bcrypt";
import config from "../config";


export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = Number(config.bcrypt_salt_round) || 10;
  return bcrypt.hash(password, saltRounds);
};