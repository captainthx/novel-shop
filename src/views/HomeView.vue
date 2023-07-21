<script setup lang="ts">
import { fetchAll } from '@/services/globalService';
import type { book } from '@/services';
import { onBeforeMount, ref } from 'vue';
import { useLoadingBar, useMessage } from 'naive-ui';

const urlImg = import.meta.env.VITE_APIURL + '/v1/global/';
const bookRef = ref<book[]>([]);
const loadingBar = useLoadingBar();
const errMessage = ref<string>('');
const message = useMessage();

async function fetchBook() {
    loadingBar.start();
    try {
        const response = await fetchAll({
            page: 1,
            limit: 10,
        });
        if (response.status === 200 && response.data.code === 0) {
            loadingBar.finish();
            if (response.data.result) bookRef.value.push(...response.data.result);
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
    return null;
}

onBeforeMount(() => {
    fetchBook();
});
</script>

<template>
    <n-layout content-style="padding: 25px;" :native-scrollbar="false">
        <n-space vertical>
            <div>
                <div></div>
                <div class="title">
                    <h2>{{ $t('page.recommend') }}</h2>
                </div>
                <div v-if="errMessage == ''">
                    <n-carousel
                        effect="custom"
                        :transition-props="{ name: 'creative' }"
                        show-arrow
                        style="height: 300px"
                    >
                        <img
                            v-for="item in bookRef"
                            :key="item.id"
                            class="carousel-img"
                            :src="urlImg + item.imageName"
                        />
                    </n-carousel>
                </div>

                <div class="title" v-if="errMessage == ''">
                    <h2>{{ $t('page.mostView') }}</h2>
                </div>

                <div>
                    <n-grid cols="4   m:4 l:5 xl:6  " responsive="screen" :x-gap="12" :y-gap="8">
                        <n-grid-item v-for="list in bookRef" :key="list.id">
                            <router-link :to="`/book/${list.id}`">
                                <n-card :embedded="true" hoverable :title="list.name">
                                    <template #cover>
                                        <img
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
                </div>
            </div>
        </n-space>
    </n-layout>
</template>
<style scoped>
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
