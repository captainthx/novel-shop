<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {fetchAll} from '@/services/bookService'
import {useAuthStore} from '@/stores/auth'
import type {book} from "@/services";
import {onBeforeMount, ref} from "vue";
import {useLoadingBar} from "naive-ui";
import VueError from "@/components/VueError.vue";

const {token} = storeToRefs(useAuthStore());
const urlImg = import.meta.env.VITE_APIURL + "/v1/img/"
const bookRef = ref<Array<book>>();
const loadingBar = useLoadingBar()
const errMessage = ref<string>('');

async function fetchBook() {
    loadingBar.start();
    try {
        const response = await fetchAll(token.value?.accessToken, {
            page: 1,
            limit: 10
        });
        if (response.status == 200) {
            bookRef.value = response.data.result;
            loadingBar.finish();
        }
    } catch (e) {
        loadingBar.error();
        errMessage.value = e.response.data.text
    }
}



onBeforeMount(() => {
    fetchBook()
})

</script>

<template>
    <div class="title">
        <h2>{{ $t('page.recommend') }}</h2>
    </div>

    <div>
        <n-carousel
                effect="custom"
                :transition-props="{ name: 'creative' }"
                show-arrow
                style="height: 300px"
        >
            <img v-for="item in bookRef" :key="item.id"
                    class="carousel-img"
                    :src="urlImg+item.imageName"
            />
        </n-carousel>
    </div>
    <div class="title">
        <h2>{{ $t('page.mostView') }}</h2>
    </div>
    <n-layout content-style="padding: 25px;" :native-scrollbar="false">
        <div>
            <n-grid cols="4   m:4 l:5 xl:6  " responsive="screen" :x-gap="12" :y-gap="8">
                <n-grid-item v-for="list in bookRef" :key="list.id">
                    <router-link :to="`/book/${list.id}`">
                        <n-card embedded="true" hoverable :title="list.name">
                            <template #cover>
                                <img style="width: 100% ; height: 300px" :src="urlImg+list.imageName"/>
                            </template>
                            <p>{{ list.type }}</p>
                            <b>{{ list.synopsis }}</b>
                        </n-card>
                    </router-link>
                </n-grid-item>
            </n-grid>
        </div>
<!--        <div v-if="bookRef == null">-->
<!--            <VueError :error="errMessage"/>-->
<!--        </div>-->
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
