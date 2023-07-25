import api from '@/services/client';
import type { Pagination, ServerResponse, Book } from '@/services/index';

const fetchAll = (params: Pagination): ServerResponse<Book[]> =>
    api.get('/v1/global/books', { params });

const fetchByType = (type: string, params: Pagination): ServerResponse<Book[]> =>
    api.get('/v1/global/books/type', { params: { type, params } });

const fetchNewBooks = (params: Pagination): ServerResponse<Book[]> =>
    api.get('/v1/global/books/new', { params });

const fetchById = (bookId: number): ServerResponse<Book> => api.get(`/v1/global/books/` + bookId);

export { fetchAll, fetchByType, fetchNewBooks, fetchById };
