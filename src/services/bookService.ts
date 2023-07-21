import api from '@/services/client';
import type { AxiosResponse } from 'axios';
import type { favorite } from '@/services/index';

// const fetchAll = (token: string | undefined, params: Pagination): Promise<AxiosResponse> =>
//     api.get('/v1/books/', { params, headers: { Authorization: "Bearer " + token } });

// const fetchById = (bookId: number, token: string | undefined): Promise<AxiosResponse> =>
//     api.get(`/v1/books/` + bookId, { headers: { Authorization: "Bearer " + token } });

const addFavorite = (data: favorite, token: string | undefined): Promise<AxiosResponse> =>
    api.post('/v1/books/favorite', data, { headers: { Authorization: 'Bearer ' + token } });

export { fetchById, addFavorite };
