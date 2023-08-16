import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { BookCartRequest } from '@/services';

export const useCartStore = defineStore('cart', () => {
    const cart = ref<BookCartRequest[]>([]);
    const countCart = ref<number>(0);

    const addCartItem = (item: BookCartRequest) => {

        const existhingItem = cart.value.find((e) => e.bookId === item.bookId);
        if (existhingItem) {
            existhingItem.quantity++;
        } else {
            cart.value.push({ ...item, quantity: 1 });
        }
        increedItems();
    };

    const removeQuantityItem = (item: BookCartRequest) => {
        reduceItems();
        const existhingItem = cart.value.find((e) => e.bookId === item.bookId);
        if (existhingItem) {
            existhingItem.quantity--;
        }

    };

    const clearCart = () => {
        cart.value = [];
        countCart.value = 0;
    };

    const increedItems = () => {
        countCart.value++;
    };

    const reduceItems = () => {
        countCart.value--;
    };



    const removeCartItem = (bookId: number) => {
        cart.value = cart.value.filter(item => item.bookId !== bookId);
        reduceItems();

    };


    return { cart, countCart, addCartItem, removeCartItem, reduceItems, removeQuantityItem, clearCart };
});
