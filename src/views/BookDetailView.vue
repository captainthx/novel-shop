<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchById } from '@/services/globalService';
import { useLoadingBar, useMessage } from 'naive-ui';
import type { Book } from '@/services';
import { CartOutline } from '@vicons/ionicons5';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useNotification } from 'naive-ui';

const { token } = storeToRefs(useAuthStore());
const { countCart } = storeToRefs(useCartStore());
const { addCartItem } = useCartStore();
const paramId = Number(useRoute().params.id);
const urlImg = import.meta.env.VITE_IMAGEURL;
const quatityItem = ref<number>(0);

const listBookRef = ref<Book>({
    id: 0,
    name: '',
    type: '',
    synopsis: '',
    content: '',
    price: 0,
    imageName: '',
});
const loadingBar = useLoadingBar();
const message = useMessage();
const notification = useNotification();

async function fetchBookById() {
    loadingBar.start();
    try {
        const response = await fetchById(paramId);
        if (response.status == 200 && response.data.code == 0) {
            if (response.data.result) listBookRef.value = response.data.result;

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

async function addCart() {
    if (token.value == null) {
        notification.error({
            title: 'Add to cart',
            meta: 'Please login',
            duration: 1000,
        });
        return;
    }
    try {
        addCartItem({
            bookId: listBookRef.value.id,
            name: listBookRef.value.name,
            price: listBookRef.value.price,
            quantity: quatityItem.value++,
            status: 'pending',
        });
        notification.success({
            title: 'Add to cart',
            meta: 'Add  to cart success',
            duration: 200,
        });
    } catch (e: unknown) {
        if (typeof e === 'string') {
            message.error('error' + e);
        } else if (e instanceof Error) {
            notification.error({
                title: 'Add to cart',
                meta: 'Please login',
                duration: 2000,
            });
        }
    }
}
// const tokenData = JSON.parse(atob(token.value?.accessToken.split('.')[1])) as tokenPayload;

onBeforeMount(async () => {
    if (paramId) await fetchBookById();
});
</script>

<template>
    <n-layout v-if="listBookRef.id != 0" content-style="padding: 24px; " :native-scrollbar="false">
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
                <h1>{{ listBookRef.name }}</h1>
            </div>
            <div>
                <n-space justify="center">
                    <n-card style="align-items: center" hoverable>
                        <template #cover>
                            <img
                                style="margin-left: auto; margin-right: auto"
                                :src="urlImg + listBookRef.imageName"
                            />
                        </template>
                        <h3>price: {{ listBookRef.price }} ฿</h3>
                    </n-card>
                </n-space>
                <div>
                    <h3>content</h3>
                    <br />
                    <p>{{ listBookRef.content }}</p>
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
p {
    text-indent: 1rem;
    font-size: medium;
}
</style>
