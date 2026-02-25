import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../lib/hash.js";
import { createTokenPair } from "../lib/token.js";
import { sendSuccess, sendError } from "../lib/response.js";
import { HTTP_STATUS } from "../constants/http.js";
import type { RegisterBody, LoginBody } from "../types/auth.types.js";

const buildUserPayload = (id: string, email: string) => ({
    userId: id,
    email,
});

const register = async (req: AuthRequest, res: Response): Promise<void> => {
    const { name, email, password } = req.body as RegisterBody;

    if (!name || !email || !password) {
        sendError(res, "Name, email and password are required", HTTP_STATUS.BAD_REQUEST);
        return;
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
        sendError(res, "Email is already registered", HTTP_STATUS.CONFLICT);
        return;
    }

    const hashed = await hashPassword(password);
    const user = await UserModel.create({ name, email, password: hashed });

    const tokens = createTokenPair(buildUserPayload(user.id as string, user.email));

    sendSuccess(
        res,
        "Registration successful",
        { user, ...tokens },
        HTTP_STATUS.CREATED
    );
};

const login = async (req: AuthRequest, res: Response): Promise<void> => {
    const { email, password } = req.body as LoginBody;

    if (!email || !password) {
        sendError(res, "Email and password are required", HTTP_STATUS.BAD_REQUEST);
        return;
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        sendError(res, "Invalid credentials", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        sendError(res, "Invalid credentials", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    const tokens = createTokenPair(buildUserPayload(user.id as string, user.email));

    sendSuccess(res, "Login successful", { user, ...tokens });
};

const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
        sendError(res, "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    const user = await UserModel.findById(req.user.userId);
    if (!user) {
        sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
        return;
    }

    sendSuccess(res, "User fetched successfully", { user });
};

export { register, login, getMe };
