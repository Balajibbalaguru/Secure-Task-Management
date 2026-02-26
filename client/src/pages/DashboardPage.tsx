import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import Navbar from "@/components/layout/Navbar";
import TaskList from "@/components/task/TaskList";
import AddTaskModal from "@/components/task/AddTaskModal";
import { Toaster } from "sonner";

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [addOpen, setAddOpen] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-background">
            <Toaster position="top-center" richColors closeButton />

            <Navbar variant="app" />

            <main className="max-w-3xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start justify-between mb-8"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <ListTodo className="size-5 text-primary" />
                            <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Welcome back,{" "}
                            <span className="font-medium text-foreground">
                                {user?.name ?? "there"}
                            </span>
                            ! Here's what you have to do.
                        </p>
                    </div>

                    <Button
                        id="add-task-btn"
                        onClick={() => setAddOpen(true)}
                        className="gap-2 shrink-0"
                    >
                        <Plus className="size-4" />
                        <span className="hidden sm:inline">Add Task</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <TaskList />
                </motion.div>
            </main>

            <AddTaskModal open={addOpen} onOpenChange={setAddOpen} />
        </div>
    );
}
