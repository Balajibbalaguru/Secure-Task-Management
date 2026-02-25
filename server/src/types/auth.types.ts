export interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface AuthenticatedUser {
    id: string;
    name: string;
    email: string;
}
