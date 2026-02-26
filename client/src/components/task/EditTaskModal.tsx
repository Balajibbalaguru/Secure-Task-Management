import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateTask } from "@/hooks/use-tasks";
import type { Task } from "@/types/task";

const schema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
    description: z.string().max(1000, "Max 1000 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

interface EditTaskModalProps {
    task: Task | null;
    onClose: () => void;
}

export default function EditTaskModal({ task, onClose }: EditTaskModalProps) {
    const updateTask = useUpdateTask();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { title: task?.title ?? "", description: task?.description ?? "" },
    });

    useEffect(() => {
        if (task) {
            reset({ title: task.title, description: task.description });
        }
    }, [task, reset]);

    const onSubmit = (values: FormValues) => {
        if (!task) return;
        updateTask.mutate(
            { id: task._id, payload: { title: values.title, description: values.description ?? "" } },
            { onSuccess: onClose }
        );
    };

    return (
        <Dialog open={!!task} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
                    <div className="space-y-1.5">
                        <Label htmlFor="edit-task-title">
                            Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="edit-task-title"
                            {...register("title")}
                            className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        <AnimatePresence>
                            {errors.title && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="text-xs text-destructive"
                                >
                                    {errors.title.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="edit-task-description">Description</Label>
                        <textarea
                            id="edit-task-description"
                            rows={3}
                            {...register("description")}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        />
                    </div>

                    <DialogFooter className="gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            id="edit-task-submit"
                            type="submit"
                            disabled={updateTask.isPending}
                            className="gap-2"
                        >
                            {updateTask.isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Save className="size-4" />
                            )}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
