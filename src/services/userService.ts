import api from '@/services/client';
import type { Address, AddressResponse, ServerResponse } from '@/services/index';

const createAddress = (body: Address): ServerResponse<AddressResponse> =>
    api.post('/v1/address', body);

const fetchAddress = (): ServerResponse<AddressResponse[]> => api.get('/v1/address');

export { createAddress, fetchAddress };
