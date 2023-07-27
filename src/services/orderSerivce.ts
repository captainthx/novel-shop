import api from '@/services/client';
import type { BookCartRequest, BookCartResponse, ServerResponse } from '@/services/index';

const createOrder = (body: BookCartRequest): ServerResponse<BookCartResponse> =>
    api.post('/v1/orders', body);

const findOrderByUser = (status: string): ServerResponse<BookCartResponse[]> => api.get('/v1/orders/' + status);


export { createOrder, findOrderByUser };
