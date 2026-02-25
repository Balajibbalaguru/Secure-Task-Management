import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TOKEN_KEY, REFRESH_KEY } from "@/lib/axiosInstance";
import type { User } from "@/types/auth";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setAuth: (user, accessToken, refreshToken) => {
                localStorage.setItem(TOKEN_KEY, accessToken);
                localStorage.setItem(REFRESH_KEY, refreshToken);
                set({ user, accessToken, refreshToken, isAuthenticated: true });
            },

            clearAuth: () => {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(REFRESH_KEY);
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
            },
        }),
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export { useAuthStore };
