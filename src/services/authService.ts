import { RegisterData, book, register } from './index.d';
import api from '@/services/client';
import type { LoginData, RefreshBody, ServerResponse, TokenResponse } from "@/services/index";
import type { AxiosResponse } from "axios";


const login = (body: LoginData): Promise<AxiosResponse> =>
    api.post('/v1/auth/signin', body);


const register = (body: RegisterData): Promise<AxiosResponse> =>
    api.post('/v1/auth/signup', body);


const refresh = (refreshToken: string | undefined): Promise<AxiosResponse> =>
    api.post('v1/auth/refresh', refreshToken);


export { login, register, refresh };