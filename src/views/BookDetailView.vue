<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {fetchById,addFavorite} from '@/services/bookService'
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {book, tokenPayload} from "@/services";
import {useLoadingBar, useMessage} from "naive-ui";

const {token} = storeToRefs(useAuthStore());
const paramId = Number(useRoute().params.id);
const bookRef = ref<book>();
const loadingBar = useLoadingBar()
const urlImg = import.meta.env.VITE_APIURL + "/v1/img/"
const message = useMessage()

async function fetchBookById() {
    loadingBar.start()
    try {
        const response = await fetchById(paramId, token.value?.accessToken);
        if (response.status == 200) {
            bookRef.value = response.data.result;
            loadingBar.finish()
        }
    } catch (e) {
        console.log(e.response.data.text)
    }
}
const tokenData = JSON.parse(atob(token.value?.accessToken.split(".")[1])) as tokenPayload ;

async function handleClick() {
    try {
        const response = await addFavorite({userId:tokenData.id,booId:paramId},token.value?.accessToken);

        if (response.status != 200){

        }
    }catch (e) {
        console.log(e)
    }
    message.info('add to favorite')
}


onBeforeMount(() => {
    fetchBookById();
})
</script>

<template>
    <n-layout content-style="padding: 24px; " :native-scrollbar="false">
        <div>
            <n-space justify="end">
                <n-button @click="handleClick">
                    Click Me
                </n-button>
            </n-space>
        </div>

        <div class="title">
            <h1>{{ bookRef?.name }}</h1>
        </div>
        <div>
            <n-space justify="center">
                <n-card embedded="true" style="align-items: center; " hoverable>
                    <template #cover>
                        <img style="width: 100%; height: 400px" :src="urlImg+bookRef?.imageName"/>
                    </template>
                    <h1 style="text-align: center"> synopsis</h1>
                    <h2> {{ bookRef?.synopsis }}</h2>
                </n-card>
            </n-space>
        </div>
        <div>
        </div>
    </n-layout>

</template>

<style scoped>


</style>
