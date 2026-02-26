import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import Navbar from "@/components/layout/Navbar";

const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const containerVariants: any = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any`
const fieldVariants: any = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.08 + 0.2, duration: 0.4, ease: "easeOut" },
    }),
};

export default function LoginPage() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: authService.login,
        onSuccess: (res) => {
            setAuth(res.data.user, res.data.accessToken, res.data.refreshToken);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                setServerError(err.response?.data?.message ?? "Login failed. Try again.");
            } else {
                setServerError("Something went wrong.");
            }
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        setServerError(null);
        mutate(values);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/6 blur-3xl" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <Navbar variant="logo" />

                <div className="rounded-2xl border bg-card shadow-xl shadow-black/5 p-8 backdrop-blur-sm">
                    <motion.div
                        custom={0}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-6"
                    >
                        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Sign in to your account to continue
                        </p>
                    </motion.div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id="login-form">
                            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                    <Input
                                                        id="login-email"
                                                        placeholder="you@example.com"
                                                        type="email"
                                                        autoComplete="email"
                                                        className="pl-9"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                    <Input
                                                        id="login-password"
                                                        placeholder="••••••••"
                                                        type={showPassword ? "text" : "password"}
                                                        autoComplete="current-password"
                                                        className="pl-9 pr-10"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        id="toggle-password-visibility"
                                                        onClick={() => setShowPassword((p) => !p)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            {serverError && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
                                >
                                    {serverError}
                                </motion.p>
                            )}

                            <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                                <Button
                                    id="login-submit-btn"
                                    type="submit"
                                    size="lg"
                                    disabled={isPending}
                                    className="w-full mt-2 font-semibold"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Signing in…
                                        </>
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </Form>

                    <motion.p
                        custom={4}
                        variants={fieldVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center text-sm text-muted-foreground mt-6"
                    >
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            id="go-to-register"
                            className="text-primary font-medium hover:underline underline-offset-4"
                        >
                            Create one
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}
