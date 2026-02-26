import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import TaskCard from "@/components/task/TaskCard";
import EditTaskModal from "@/components/task/EditTaskModal";
import { useTasks } from "@/hooks/use-tasks";
import type { Task } from "@/types/task";

type Filter = "all" | "active" | "completed";

const FILTERS: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
];

export default function TaskList() {
    const { data: tasks, isLoading, isError } = useTasks();
    const [filter, setFilter] = useState<Filter>("active");
    const [editTask, setEditTask] = useState<Task | null>(null);

    const filtered = (tasks ?? []).filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const totalCount = tasks?.length ?? 0;
    const completedCount = tasks?.filter((t) => t.completed).length ?? 0;

    return (
        <div className="flex flex-col flex-1 overflow-hidden gap-4">
            {/* Stats row */}
            {!isLoading && totalCount > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                    <span>
                        <span className="font-semibold text-foreground">{completedCount}</span> / {totalCount} completed
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : "0%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Filter tabs */}
            <div className="flex gap-1 mt-5 rounded-lg border bg-muted/30 p-1 w-fit">
                {FILTERS.map((f) => (
                    <button
                        key={f.value}
                        id={`filter-${f.value}`}
                        onClick={() => setFilter(f.value)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${filter === f.value
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto px-1 pb-4 space-y-3">
                {/* Loading skeletons */}
                {isLoading && (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-xl" />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {isError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive"
                    >
                        Failed to load tasks. Please refresh the page.
                    </motion.div>
                )}

                {/* Empty state */}
                {!isLoading && !isError && filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-muted/20 py-16 text-center"
                    >
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted/50">
                            <ClipboardList className="size-7 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">
                                {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
                            </p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {filter === "all"
                                    ? "Click \"Add Task\" to create your first task."
                                    : "Try switching to a different filter."}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Task cards */}
                {!isLoading && !isError && filtered.length > 0 && (
                    <AnimatePresence mode="popLayout">
                        <div className="space-y-3">
                            {filtered.map((task, i) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    index={i}
                                    onEdit={setEditTask}
                                />
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>

            <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />
        </div>
    );
}
