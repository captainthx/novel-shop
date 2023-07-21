import type { AxiosResponse } from "axios";

export interface LoginData {
    username: string;
    password: string;

}


export interface RegisterData {
    username: string;
    password: string;
    email: string;
}

export interface RefreshBody {
    token: string;
}


export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;


export interface AuthState {
    token?: string;
    refresh?: string;
    payload?: TokenPayload;
    refreshPayload: TokenPayload;

}

export interface tokenPayload {
    iss: number;
    sub: string;
    id: number;
    exp: number;
    iat: number;
}

export interface Pagination {
    page: number;
    limit: number;
}


export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    accessExpire: number;
    refreshExpire: number;
}

export interface ApiResponse<T> {
    code: number;
    description: string;
    result: T?;
    records: number;
}


export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export interface book {
    id: number;
    name: string;
    type: string;
    synopsis: string;
    content: string;
    price: number;
    imageName: string;

}

export interface favorite {
    booId: number;
    userId: number;
}


