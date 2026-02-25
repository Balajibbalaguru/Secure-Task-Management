import type { Response } from "express";
import { HTTP_STATUS } from "../constants/http.js";

interface ApiResponse<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
}

const sendSuccess = <T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = HTTP_STATUS.OK
): void => {
    const payload: ApiResponse<T> = { success: true, message };
    if (data !== undefined) payload.data = data;
    res.status(statusCode).json(payload);
};

const sendError = (
    res: Response,
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): void => {
    const payload: ApiResponse = { success: false, message };
    res.status(statusCode).json(payload);
};

export { sendSuccess, sendError };
