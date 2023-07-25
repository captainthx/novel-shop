import api from '@/services/client';
import type { Address, AddressResponse, ServerResponse } from '@/services/index';


const createAddress = (body: Address,): ServerResponse<AddressResponse> =>
    api.post('/v1/users/address', body);

const fetchAddress = (): ServerResponse<AddressResponse[]> =>
    api.get('/v1/users/address');

export { createAddress, fetchAddress };
