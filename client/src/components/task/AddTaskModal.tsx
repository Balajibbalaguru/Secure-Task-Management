import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Loader2 } from "lucide-react";
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
import { useCreateTask } from "@/hooks/use-tasks";

const schema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Max 200 characters"),
    description: z.string().max(1000, "Max 1000 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

interface AddTaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
    const createTask = useCreateTask();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { title: "", description: "" },
    });

    const onSubmit = (values: FormValues) => {
        createTask.mutate(
            { title: values.title, description: values.description ?? "" },
            {
                onSuccess: () => {
                    reset();
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
                    <div className="space-y-1.5">
                        <Label htmlFor="task-title">
                            Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="task-title"
                            placeholder="e.g. Buy groceries"
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
                        <Label htmlFor="task-description">Description</Label>
                        <textarea
                            id="task-description"
                            placeholder="Optional details..."
                            rows={3}
                            {...register("description")}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        />
                        <AnimatePresence>
                            {errors.description && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="text-xs text-destructive"
                                >
                                    {errors.description.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <DialogFooter className="gap-2 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => { reset(); onOpenChange(false); }}
                        >
                            Cancel
                        </Button>
                        <Button
                            id="create-task-submit"
                            type="submit"
                            disabled={createTask.isPending}
                            className="gap-2"
                        >
                            {createTask.isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Plus className="size-4" />
                            )}
                            Create Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
