<script setup lang="ts">
import type { Book } from '@/services';
defineProps<{
    listBookRef: Book[];
    totalPage: Number;
    handleNextPage: Function;
    urlImg: String;
}>();
</script>

<template>
    <n-grid cols="1 s:2 m:3 l:5" responsive="screen" :x-gap="12" :y-gap="12">
        <n-grid-item v-for="list in listBookRef" :key="list.id">
            <router-link :to="`/book/${list.id}`">
                <n-card hoverable>
                    <template #cover>
                        <img
                            alt="img book"
                            style="width: 100%; height: 300px"
                            :src="urlImg + list.imageName"
                        />
                    </template>
                    <n-ellipsis style="max-width: 240px">
                        {{ list.name }}
                    </n-ellipsis>
                    <br />
                    <b>type: {{ list.type }}</b>
                    <br />
                    <n-ellipsis style="max-width: 240px"> synopsis:{{ list.name }} </n-ellipsis>
                </n-card>
            </router-link>
        </n-grid-item>
    </n-grid>

    <n-space justify="end" style="margin-top: 15px">
        <n-pagination :page-count="totalPage" :on-update:page="handleNextPage">
            <template #prev> Go Prev </template>
            <template #next> Go Next </template>
        </n-pagination>
    </n-space>
</template>
