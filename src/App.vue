<script setup lang="ts">
import NavBar from '@/components/VueNavBar.vue';
import Footer from '@/components/VueFooter.vue';
import { useUserStore } from './stores/theme';
import { storeToRefs } from 'pinia';
import { darkTheme, lightTheme } from 'naive-ui';

const { theme } = storeToRefs(useUserStore());
</script>

<template>
    <n-config-provider :theme="theme === 'light' ? lightTheme : darkTheme">
        <n-loading-bar-provider>
            <n-message-provider>
                <n-notification-provider>
                    <NavBar />
                    <n-layout content-style="padding: 30px;" :native-scrollbar="false">
                        <RouterView />
                    </n-layout>
                </n-notification-provider>
            </n-message-provider>
        </n-loading-bar-provider>
        <Footer />
    </n-config-provider>
</template>

<style>
.title {
    text-align: center;
}
</style>
