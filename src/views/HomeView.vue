<script setup lang="ts">
import { fetchNewBooks } from '@/services/globalService';
import type { Book, Pagination, PaginationResponse } from '@/services';
import { onBeforeMount, ref } from 'vue';
import { useLoadingBar, useMessage } from 'naive-ui';

const urlImg = import.meta.env.VITE_APIURL + '/v1/global/';
const bookRef = ref<Book[]>([]);
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
            if (response.data.result) bookRef.value = response.data.result;
            page.value = response.data.pagination;
            totalPage.value = page.value.records / page.value.limit;
            return bookRef.value;
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
    <n-layout content-style="padding: 25px;" :native-scrollbar="false">
        <n-space vertical>
            <div class="title">
                <h2>{{ $t('page.recommend') }}</h2>
            </div>
            <n-carousel
                effect="custom"
                :transition-props="{ name: 'creative' }"
                show-arrow
                style="height: 300px"
            >
                <img
                    alt="img banner"
                    v-for="item in bookRef"
                    :key="item.id"
                    class="carousel-img"
                    :src="urlImg + item.imageName"
                />
            </n-carousel>
            <div class="title">
                <h2>{{ $t('page.new') }}</h2>
            </div>
            <n-grid cols="1 s:2 m:3 l:5" responsive="screen" :x-gap="12" :y-gap="12">
                <n-grid-item v-for="list in bookRef" :key="list.id">
                    <router-link :to="`/book/${list.id}`">
                        <n-card :embedded="true" hoverable :title="list.name">
                            <template #cover>
                                <img
                                    alt="img book"
                                    style="width: 100%; height: 300px"
                                    :src="urlImg + list.imageName"
                                />
                            </template>
                            <b>type: {{ list.type }}</b
                            ><br />
                            <b>synopsis: {{ list.synopsis }}</b>
                        </n-card>
                    </router-link>
                </n-grid-item>
            </n-grid>
            <n-space justify="end">
                <n-pagination :page-count="totalPage" :on-update:page="handleNextPage">
                    <template #prev> Go Prev </template>
                    <template #next> Go Next </template>
                </n-pagination>
            </n-space>
        </n-space>
    </n-layout>
</template>
<style scoped>
.n-card {
    width: 280px;
    height: 350px;
}
.carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
}

:deep(.creative-enter-from),
:deep(.creative-leave-to) {
    opacity: 0;
    transform: scale(0.8);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
    transition: all 0.3s ease;
}
</style>
