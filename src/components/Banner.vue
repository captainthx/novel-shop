<script setup lang="ts">
import type { Book } from '@/services';

defineProps<{
    listBookRef: Book[];
    urlImg: String;
}>();
</script>

<template>
    <n-carousel
        effect="custom"
        :transition-props="{ name: 'creative' }"
        show-arrow
        style="height: 300px"
    >
        <img
            alt="img banner"
            v-for="item in listBookRef"
            :key="item.id"
            class="carousel-img"
            :src="urlImg + item.imageName"
        />
    </n-carousel>
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
