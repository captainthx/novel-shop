<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchById } from '@/services/globalService';

import { useLoadingBar, useMessage } from 'naive-ui';
import type { book } from '@/services';
import { CartOutline } from '@vicons/ionicons5';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useNotification } from 'naive-ui';

const { token } = storeToRefs(useAuthStore());
const { countCart } = storeToRefs(useCartStore());
const paramId = Number(useRoute().params.id);
const bookRef = ref<book>({
    id: 0,
    name: '',
    type: '',
    synopsis: '',
    content: '',
    price: 0,
    imageName: '',
});
const { addCartItem } = useCartStore();
const loadingBar = useLoadingBar();
const urlImg = import.meta.env.VITE_APIURL + '/v1/global/';
const message = useMessage();
const notification = useNotification();

async function fetchBookById() {
    loadingBar.start();
    try {
        const response = await fetchById(paramId);
        if (response.status == 200 && response.data.code == 0) {
            if (response.data.result) bookRef.value = response.data.result;

            loadingBar.finish();
        }
    } catch (e: unknown) {
        if (typeof e === 'string') {
            message.error('error' + e);
        } else if (e instanceof Error) {
            message.error('error' + e.message);
        }
        loadingBar.error();
    }
}

function addCart() {
    if (token.value == null) {
        notification.error({
            title: 'Add to cart',
            meta: 'Please login',
            duration: 2000,
        });
        return;
    }
    addCartItem(bookRef.value);
    notification.success({
        title: 'Add to cart',
        meta: 'Add to cart success',
        duration: 500,
    });
}
// const tokenData = JSON.parse(atob(token.value?.accessToken.split('.')[1])) as tokenPayload;

onBeforeMount(() => {
    fetchBookById();
});
</script>

<template>
    <n-layout content-style="padding: 24px; " :native-scrollbar="false">
        <n-space vertical>
            <div>
                <n-space style="padding-top: 25px" justify="end">
                    <n-button text>
                        <n-badge :value="countCart" color="green">
                            <n-icon :size="30" @click="addCart()">
                                <CartOutline />
                            </n-icon>
                        </n-badge>
                    </n-button>
                </n-space>
            </div>
            <div class="title">
                <h1>{{ bookRef.name }}</h1>
            </div>
            <div>
                <n-space justify="center">
                    <n-card style="align-items: center" hoverable>
                        <template #cover>
                            <img
                                style="margin-left: auto; margin-right: auto"
                                :src="urlImg + bookRef.imageName"
                            />
                        </template>
                        <h3>price: {{ bookRef.price }} ฿</h3>
                    </n-card>
                </n-space>
                <div>
                    <h2 class="content">content</h2>
                    <br />
                    <p class="content">{{ bookRef.content }}</p>
                </div>
            </div>
        </n-space>
    </n-layout>
</template>
<style scoped>
.n-card {
    width: 300px;
}
.content {
    text-align: center;
    font-weight: 700;
}
</style>
