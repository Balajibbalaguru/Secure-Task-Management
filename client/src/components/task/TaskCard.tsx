import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2, Clock, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import type { Task } from "@/types/task";

interface TaskCardProps {
    task: Task;
    index: number;
    onEdit: (task: Task) => void;
}

export default function TaskCard({ task, index, onEdit }: TaskCardProps) {
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const toggleComplete = () => {
        updateTask.mutate({ id: task._id, payload: { completed: !task.completed } });
    };

    const handleDelete = () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
        }
        deleteTask.mutate(task._id);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20, scale: 0.97 }}
            transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                delay: index * 0.04,
            }}
            onClick={!updateTask.isPending ? toggleComplete : undefined}
            className={`group relative rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer ${task.completed
                ? "border-border/50 opacity-70"
                : "border-border hover:border-primary/30"
                }`}
        >
            <div className="flex items-start gap-3">
                {/* Toggle Complete */}
                <button
                    id={`toggle-task-${task._id}`}
                    onClick={(e) => { e.stopPropagation(); toggleComplete(); }}
                    disabled={updateTask.isPending}
                    className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors duration-150 disabled:opacity-50"
                    aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                    {updateTask.isPending && updateTask.variables?.id === task._id ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : task.completed ? (
                        <CheckCircle2 className="size-5 text-primary" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleComplete(); }}
                            disabled={updateTask.isPending}
                            className={`font-medium leading-snug break-words text-left cursor-pointer disabled:cursor-not-allowed transition-colors duration-150 ${task.completed ? "line-through text-muted-foreground" : "text-foreground hover:text-primary"}`}
                        >
                            {task.title}
                        </button>
                        {task.completed && (
                            <span className="inline-flex shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                Done
                            </span>
                        )}
                    </div>
                    {task.description && (
                        <p className="mt-1 text-sm text-muted-foreground break-words line-clamp-2">
                            {task.description}
                        </p>
                    )}
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground/70">
                        <Clock className="size-3" />
                        <span>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                    <Button
                        id={`edit-task-${task._id}`}
                        size="icon"
                        variant="ghost"
                        className="size-8 hover:bg-accent"
                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                        aria-label="Edit task"
                    >
                        <Pencil className="size-3.5" />
                    </Button>
                    <Button
                        id={`delete-task-${task._id}`}
                        size="icon"
                        variant="ghost"
                        className={`size-8 transition-colors ${confirmDelete
                            ? "bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                            : "hover:bg-destructive/10 hover:text-destructive"
                            }`}
                        onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                        disabled={deleteTask.isPending && deleteTask.variables === task._id}
                        aria-label={confirmDelete ? "Confirm delete" : "Delete task"}
                    >
                        {deleteTask.isPending && deleteTask.variables === task._id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            <Trash2 className="size-3.5" />
                        )}
                    </Button>
                </div>
            </div>


        </motion.div>
    );
}
