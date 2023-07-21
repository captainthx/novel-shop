<script setup lang="ts">
import { listbook } from '@/data';
import { ref } from 'vue';

const bookRef = ref();
</script>

<template>
    <div class="title">
        <h1>book view</h1>
    </div>

    <div>
        <n-grid cols="4   m:4 l:5 xl:6  " responsive="screen" :x-gap="12" :y-gap="8">
            <n-grid-item v-for="list in listbook" :key="list.id">
                <router-link :to="`/book/${list.id}`">
                    <n-card :title="list.name" embedded="true" hoverable>
                        <template #cover>
                            <img
                                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                            /> </template
                        >{{ list.content }}
                    </n-card>
                </router-link>
            </n-grid-item>
        </n-grid>
    </div>
</template>
