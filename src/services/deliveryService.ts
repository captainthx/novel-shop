import type { DeliveryRequest, DeliveryResponse, ServerResponse } from ".";
import api from "./client";


const createDelivery = (body: DeliveryRequest): ServerResponse<DeliveryResponse> =>
    api.post('/delivery', body);

const history = (): ServerResponse<DeliveryResponse[]> =>
    api.get('/delivery');


export { createDelivery, history };