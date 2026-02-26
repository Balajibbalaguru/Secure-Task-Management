import { axiosInstance } from "@/lib/axiosInstance";
import type {
    Task,
    TasksApiResponse,
    TaskApiResponse,
    CreateTaskPayload,
    UpdateTaskPayload,
} from "@/types/task";

const getTasks = async (): Promise<Task[]> => {
    const { data } = await axiosInstance.get<TasksApiResponse>("/tasks");
    return data.data;
};

const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
    const { data } = await axiosInstance.post<TaskApiResponse>("/tasks", payload);
    return data.data;
};

const updateTask = async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const { data } = await axiosInstance.put<TaskApiResponse>(`/tasks/${id}`, payload);
    return data.data;
};

const deleteTask = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
};

export const taskService = { getTasks, createTask, updateTask, deleteTask };
