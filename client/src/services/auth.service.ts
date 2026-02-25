import { axiosInstance } from "@/lib/axiosInstance";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/register", payload);
    return data;
};

const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/login", payload);
    return data;
};

const getMe = async (): Promise<AuthResponse["data"]["user"]> => {
    const { data } = await axiosInstance.get<{ success: boolean; data: { user: AuthResponse["data"]["user"] } }>("/auth/me");
    return data.data.user;
};

export const authService = { register, login, getMe };
