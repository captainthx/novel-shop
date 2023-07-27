<script setup lang="ts">
import { fetchNewBooks } from '@/services/globalService';
import type { Book, Pagination, PaginationResponse } from '@/services';
import { onBeforeMount, ref } from 'vue';
import { useLoadingBar, useMessage } from 'naive-ui';
import ShowBook from '@/components/ShowBook.vue';
import Banner from '@/components/Banner.vue';

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
