<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { fetchAll } from '@/services/globalService';
import type { Book, Pagination } from '@/services';
import { useLoadingBar, useMessage } from 'naive-ui';
import ShowBook from '@/components/ShowBook.vue';

const urlImg = import.meta.env.VITE_IMAGEURL;
const listBookRef = ref<Book[]>([]);
const loadingBar = useLoadingBar();
const message = useMessage();
const paramPage = ref<Pagination>({
    page: 1,
    limit: 10,
});
let totalPage = ref<number>(0);

async function fetchBook() {
    loadingBar.start();
    try {
        const response = await fetchAll({
            page: paramPage.value.page,
            limit: paramPage.value.limit,
        });
        if (response.status === 200 && response.data.code === 0) {
            loadingBar.finish();
            if (response.data.result) listBookRef.value = response.data.result;
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

onBeforeMount(() => {
    fetchBook();
});
</script>

<template>
    <n-layout>
        <n-space vertical>
            <div class="title">
                <h1>All Book</h1>
            </div>
            <ShowBook
                :list-book-ref="listBookRef"
                :url-img="urlImg"
                :total-page="totalPage"
                :handle-next-page="handleNextPage"
            />
        </n-space>
    </n-layout>
</template>
<style scoped>
.n-card {
    width: 330px;
    height: 350px;
}
</style>
