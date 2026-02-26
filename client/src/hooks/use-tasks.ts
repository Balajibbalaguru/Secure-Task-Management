import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import type { CreateTaskPayload, UpdateTaskPayload } from "@/types/task";
import { toast } from "sonner";

export const TASKS_QUERY_KEY = ["tasks"] as const;

export const useTasks = () => {
    return useQuery({
        queryKey: TASKS_QUERY_KEY,
        queryFn: taskService.getTasks,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateTaskPayload) => taskService.createTask(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
            toast.success("Task created!");
        },
        onError: () => {
            toast.error("Failed to create task. Please try again.");
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
            taskService.updateTask(id, payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
        },
        onError: () => {
            toast.error("Failed to update task. Please try again.");
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
            toast.success("Task deleted.");
        },
        onError: () => {
            toast.error("Failed to delete task. Please try again.");
        },
    });
};
