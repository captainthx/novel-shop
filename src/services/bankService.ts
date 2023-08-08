import api from '@/services/client';
import type { PaymentHistory, ServerResponse } from '@/services/index';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const { token } = storeToRefs(useAuthStore());

const createBankPayment = (formData: FormData): ServerResponse<void> =>
    api.post('/v1/bank/payment', formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token.value?.accessToken}`, } });

const paymentHistory = (): ServerResponse<PaymentHistory[]> =>
    api.get('/v1/bank/payment');

export { createBankPayment, paymentHistory };