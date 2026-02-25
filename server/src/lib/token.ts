import jwt from "jsonwebtoken";
import type { JwtPayload, TokenPair } from "../types/auth.types.js";

const getAccessSecret = (): string => {
    const secret = process.env["JWT_SECRET"];
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return secret;
};

const getRefreshSecret = (): string => {
    const secret = process.env["JWT_REFRESH_SECRET"];
    if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");
    return secret;
};

const createAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, getAccessSecret(), {
        expiresIn: (process.env["JWT_EXPIRES_IN"] ?? "7d") as jwt.SignOptions["expiresIn"],
    });
};

const createRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, getRefreshSecret(), {
        expiresIn: (process.env["JWT_REFRESH_EXPIRES_IN"] ?? "30d") as jwt.SignOptions["expiresIn"],
    });
};

const createTokenPair = (payload: JwtPayload): TokenPair => ({
    accessToken: createAccessToken(payload),
    refreshToken: createRefreshToken(payload),
});

const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, getAccessSecret()) as JwtPayload;
};

const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, getRefreshSecret()) as JwtPayload;
};

export {
    createAccessToken,
    createRefreshToken,
    createTokenPair,
    verifyAccessToken,
    verifyRefreshToken,
};
