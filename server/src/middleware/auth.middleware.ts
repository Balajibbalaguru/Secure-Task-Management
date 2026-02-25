import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/token.js";
import { sendError } from "../lib/response.js";
import { HTTP_STATUS } from "../constants/http.js";
import type { JwtPayload } from "../types/auth.types.js";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

const extractBearerToken = (authHeader: string | undefined): string | null => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    return authHeader.split(" ")[1] ?? null;
};

const protect = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = extractBearerToken(req.headers.authorization);

    if (!token) {
        sendError(res, "No token provided", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch {
        sendError(res, "Invalid or expired token", HTTP_STATUS.UNAUTHORIZED);
    }
};

export { protect };
