import type { AxiosResponse } from 'axios';

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

export interface TokenPayload {
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

export interface PaginationResponse {
    pages: number;
    limit: number;
    records: number;
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
    pagination: PaginationResponse;
    result: T?;
    records: number;
}

export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export interface Book {
    id: number;
    name: string;
    type: string;
    synopsis: string;
    content: string;
    price: number;
    imageName: string;
}

export interface Address {
    line1: string;
    line2: string;
    zipCode: string;
}


export interface AddressResponse {
    id: number;
    line1: string;
    line2: string;
    zipCode: number;
}

