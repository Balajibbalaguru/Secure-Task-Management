import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Power } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

interface NavbarAppProps {
    variant: "app";
}

interface NavbarLogoProps {
    variant: "logo";
}

type NavbarProps = NavbarAppProps | NavbarLogoProps;

export default function Navbar(props: NavbarProps) {
    const navigate = useNavigate();
    const { clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        navigate("/login", { replace: true });
    };

    if (props.variant === "logo") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex justify-between mb-8"
            >
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/30">
                        <ShieldCheck className="size-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SecureTask</span>
                </div>
            </motion.div>
        );
    }

    return (
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="w-full px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary">
                        <ShieldCheck className="size-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold tracking-tight">SecureTask</span>
                </div>

                <button
                    id="logout-btn"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-white"
                >
                    <Power className="size-3.5" />
                    <span className="hidden sm:inline">Sign out</span>
                </button>
            </div>
        </header>
    );
}
