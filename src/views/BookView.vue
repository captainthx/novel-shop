<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { fetchAll } from '@/services/globalService';
import type { Book, Pagination, PaginationResponse } from '@/services';
import { useLoadingBar, useMessage } from 'naive-ui';

const urlImg = import.meta.env.VITE_APIURL + '/v1/global/';
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
            <n-grid cols="1  s:2 m:3 l:4 " responsive="screen" :x-gap="8" :y-gap="12">
                <n-grid-item v-for="list in listBookRef" :key="list.id">
                    <router-link :to="`/book/${list.id}`">
                        <n-card :embedded="true" hoverable :title="list.name">
                            <template #cover>
                                <img
                                    style="width: 100%; height: 200px"
                                    :src="urlImg + list.imageName"
                                />
                            </template>
                            <b>type: {{ list.type }}</b>
                            <br />
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
    width: 330px;
    height: 350px;
}
</style>
