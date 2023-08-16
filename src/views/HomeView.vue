<script setup lang="ts">
import { fetchNewBooks } from '@/services/globalService';
import type { Book, Pagination, PaginationResponse } from '@/services';
import { onBeforeMount, ref, watch, type Ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useLoadingBar, useMessage } from 'naive-ui';
import ShowBook from '@/components/ShowBook.vue';
import Banner from '@/components/Banner.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { refresh } from '@/services/authService';

const authStore = useAuthStore();
const { getToken, saveToken, hasToken } = authStore;
const token = authStore.token;
const urlImg = import.meta.env.VITE_IMAGEURL;
const listBookRef = ref<Book[]>([]);
const loadingBar = useLoadingBar();
const message = useMessage();
const page = ref<PaginationResponse>();

const paramPage = ref<Pagination>({
    page: 1,
    limit: 5,
});

let totalPage = ref<number>(0);

async function fetchBook() {
    loadingBar.start();
    try {
        const response = await fetchNewBooks({
            page: paramPage.value.page,
            limit: paramPage.value.limit,
        });
        if (response.status === 200 && response.data.code === 0) {
            loadingBar.finish();
            if (response.data.result) listBookRef.value = response.data.result;
            page.value = response.data.pagination;
            totalPage.value = page.value.records / page.value.limit;
            return listBookRef.value;
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

function handleNextPage(page: number) {
    paramPage.value.page = page;
    fetchBook();
    return paramPage.value.page;
}

async function refreshToken() {
    try {
        const res = await refresh(token?.refreshToken as string);
        if (res.status == 200 && res.data.code == 0) {
            if (res.data.result) saveToken(res.data.result);
            getToken();
            console.log('get refresh token success');
        }
    } catch (e: unknown) {
        if (typeof e === 'string') {
            console.error('error' + e);
        } else if (e instanceof Error) {
            console.error('error' + e.message);
        }
    }
}

async function checkExpiredToken() {
    const min = 60000;
    const cuurentTime = new Date().getTime() - min;
    const exprieToken: number = token?.accessExpire as number;
    if (cuurentTime > exprieToken) {
        await refreshToken();
    } else {
        console.log('token not expired');
    }
}

onMounted(() => {
    checkExpiredToken();
    const interval = setInterval(checkExpiredToken, 60 * 60 * 1000);

    onUnmounted(() => {
        clearInterval(interval);
    });
});

onBeforeMount(async () => {
    await fetchBook();
});
</script>

<template>
    <n-layout content-style="padding: 25px;" :native-scrollbar="false">
        <n-space vertical>
            <div class="title">
                <h2>{{ $t('page.recommend') }}</h2>
            </div>
            <Banner :list-book-ref="listBookRef" :url-img="urlImg" />

            <div class="title">
                <h2>{{ $t('page.new') }}</h2>
            </div>
            <show-book
                :list-book-ref="listBookRef"
                :total-page="totalPage"
                :handle-next-page="handleNextPage"
                :url-img="urlImg"
            />
        </n-space>
    </n-layout>
</template>
<style scoped>
.n-card {
    width: 280px;
    height: 350px;
}
</style>
