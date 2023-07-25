import { type RegisterData } from './index.d';
import api from '@/services/client';
import type { LoginData, ServerResponse, TokenResponse } from '@/services/index';

const login = (body: LoginData): ServerResponse<TokenResponse> => api.post('/v1/auth/signin', body);

const signup = (body: RegisterData): ServerResponse<void> => api.post('/v1/auth/signup', body);

const refresh = (refreshToken: string | undefined): ServerResponse<TokenResponse> =>
    api.post('v1/auth/refresh', refreshToken);

export { login, signup, refresh };
