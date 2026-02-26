export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    completed?: boolean;
}

export interface TaskApiResponse {
    success: boolean;
    message: string;
    data: Task;
}

export interface TasksApiResponse {
    success: boolean;
    message: string;
    data: Task[];
}
