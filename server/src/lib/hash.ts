import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

const hashPassword = async (plainText: string): Promise<string> => {
    return bcrypt.hash(plainText, SALT_ROUNDS);
};

const comparePassword = async (
    plainText: string,
    hashed: string
): Promise<boolean> => {
    return bcrypt.compare(plainText, hashed);
};

export { hashPassword, comparePassword };
