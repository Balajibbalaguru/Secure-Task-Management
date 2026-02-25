import axios from "axios";

const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

const getAccessToken = (): string | null => localStorage.getItem(TOKEN_KEY);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_KEY);
        }
        return Promise.reject(error);
    }
);

export { axiosInstance, TOKEN_KEY, REFRESH_KEY };
