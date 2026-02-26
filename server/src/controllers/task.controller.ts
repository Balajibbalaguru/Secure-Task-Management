import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { TaskModel } from "../models/task.model.js";
import { sendSuccess, sendError } from "../lib/response.js";
import { HTTP_STATUS } from "../constants/http.js";
import type { CreateTaskBody, UpdateTaskBody } from "../types/task.types.js";
import mongoose from "mongoose";

const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, description = "" } = req.body as CreateTaskBody;
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    if (!title || title.trim().length === 0) {
        sendError(res, "Title is required", HTTP_STATUS.BAD_REQUEST);
        return;
    }

    const task = await TaskModel.create({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        userId,
    });

    sendSuccess(res, "Task created successfully", task, HTTP_STATUS.CREATED);
};

const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    const tasks = await TaskModel.find({ userId }).sort({ createdAt: -1 });

    sendSuccess(res, "Tasks retrieved successfully", tasks);
};

const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        sendError(res, "Invalid task ID", HTTP_STATUS.BAD_REQUEST);
        return;
    }

    const task = await TaskModel.findById(id);

    if (!task) {
        sendError(res, "Task not found", HTTP_STATUS.NOT_FOUND);
        return;
    }

    if (task.userId.toString() !== userId) {
        sendError(res, "Forbidden: you do not own this task", HTTP_STATUS.FORBIDDEN);
        return;
    }

    const { title, description, completed } = req.body as UpdateTaskBody;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (completed !== undefined) task.completed = completed;

    await task.save();

    sendSuccess(res, "Task updated successfully", task);
};

const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, "Unauthorized", HTTP_STATUS.UNAUTHORIZED);
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        sendError(res, "Invalid task ID", HTTP_STATUS.BAD_REQUEST);
        return;
    }

    const task = await TaskModel.findById(id);

    if (!task) {
        sendError(res, "Task not found", HTTP_STATUS.NOT_FOUND);
        return;
    }

    if (task.userId.toString() !== userId) {
        sendError(res, "Forbidden: you do not own this task", HTTP_STATUS.FORBIDDEN);
        return;
    }

    await task.deleteOne();

    sendSuccess(res, "Task deleted successfully");
};

export { createTask, getTasks, updateTask, deleteTask };
