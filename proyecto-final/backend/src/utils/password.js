import bcrypt from "bcryptjs";

export const hashPassword = async (plain) => {
  const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  return await bcrypt.hash(plain, rounds);
};

export const comparePassword = async (plain, hash) => {
  return await bcrypt.compare(plain, hash);
};
