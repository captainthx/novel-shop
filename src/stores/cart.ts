import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { BookCart } from '@/services';

export const useCartStore = defineStore('cart', () => {
    const cart = ref<BookCart[]>([]);
    const countCart = ref<number>(0);

    const addCartItem = (item: BookCart) => {
        cart.value.push(item);
        countCart.value = cart.value.length;

    };

    const countItems = () => {
        countCart.value++;
    };

    const clearItem = () => {
        cart.value = [];
        countCart.value = 0;
    };

    const removeCartItem = (id: number) => {
        cart.value.filter((item) => item.id !== id);
    };

    const getCart = () => {
        return countCart.value;
    };

    return { countCart, addCartItem, removeCartItem, countItems, clearItem, getCart };
});
