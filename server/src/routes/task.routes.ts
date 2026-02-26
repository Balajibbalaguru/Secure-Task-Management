import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const taskRouter = Router();

taskRouter.use(protect);

taskRouter.get("/", getTasks);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export { taskRouter };
