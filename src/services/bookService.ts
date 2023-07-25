import api from '@/services/client';
import type { AxiosResponse } from 'axios';
import type { favorite } from '@/services/index';


const addFavorite = (data: favorite, token: string | undefined): Promise<AxiosResponse> =>
    api.post('/v1/books/favorite', data, { headers: { Authorization: 'Bearer ' + token } });

export { addFavorite };
