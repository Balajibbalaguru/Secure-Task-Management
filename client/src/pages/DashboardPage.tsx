import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Power, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";

export default function DashboardPage() {
    const navigate = useNavigate();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary">
                            <ShieldCheck className="size-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold tracking-tight">SecureTask</span>
                    </div>
                    <Button
                        id="logout-btn"
                        size="sm"
                        onClick={handleLogout}
                        className="gap-2 bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive hover:text-white hover:border-destructive transition-all duration-200 font-medium"
                    >
                        <Power className="size-4" />
                        Sign out
                    </Button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 mb-6"
                    >
                        <CheckSquare className="size-10 text-primary" />
                    </motion.div>

                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Welcome back, {user?.name ?? "there"}!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        You're authenticated. Your task dashboard is coming soon.
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
