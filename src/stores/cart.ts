import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { book } from '@/services';

export const useCartStore = defineStore('cart', () => {
    const cart = ref<book[]>([]);
    const countCart = ref<number>(0);

    const addCartItem = (item: book) => {

        cart.value.push(item);
        countCart.value = cart.value.length;
    };

    const removeCartItem = (id: number) => {
        cart.value.filter((item) => item.id !== id);
    };




    return { addCartItem, countCart, removeCartItem };

});
