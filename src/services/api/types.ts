export interface LoginRequest {
    userName: string;
    password: string;
}

export interface User {
    id: string;
    userName: string;
    email?: string;
    role?: string;
}

export interface LoginResponse {
    accessToken   ?: string;
    user?: string;
    name?:string;
    userName?:string;
    email?:string;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}
