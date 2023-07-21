import api from '@/services/client';
import type { pagination, ServerResponse, book } from '@/services/index';

const fetchAll = (params: pagination): ServerResponse<book[]> =>
    api.get('/v1/global/books', { params });

const fetchById = (bookId: number): ServerResponse<book> => api.get(`/v1/global/books/` + bookId);

export { fetchAll, fetchById };
