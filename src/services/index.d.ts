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


export interface book {
    id: number;
    imageName: string;
    name: string;
    synopsis: string;
    type: string;
}

export interface favorite {
    booId: number;
    userId: number;
}