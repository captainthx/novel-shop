<script setup lang="ts">
import NavBar from '@/components/VueNavBar.vue';
import Footer from '@/components/VueFooter.vue';
import {useUserStore} from './stores/theme';
import {storeToRefs} from 'pinia';
import {darkTheme, lightTheme, useMessage} from 'naive-ui';
import {watchEffect} from 'vue'
import {useAuthStore} from '@/stores/auth'
import {refresh} from '@/services/authService'
import {useRouter} from "vue-router";

const {theme} = storeToRefs(useUserStore());
const {saveToken} = useAuthStore();
const {token} = storeToRefs(useAuthStore());
const router = useRouter();

async function checkTokenExp() {
    const accessExpire = token.value?.accessExpire
    if (accessExpire) {
        const cuurentTime = Date.now()
        if (cuurentTime > accessExpire) {
            try {
                const response = await refresh(token.value?.refreshToken);
                if (response != 200) {
                    console.log('response ', response.data.result)
                    return
                }
                saveToken(response.data.result);
                router.push('/')
            } catch (e) {
                router.push('/login')
            }
        }else{
            console.log("token ",token.value?.accessToken)
        }
    } else {
        console.log('token not found!')
    }

}

watchEffect(() => {
    setInterval(()=>{
        checkTokenExp()
    },720000)
})
</script>

<template>
    <n-config-provider :theme="theme === 'light' ? lightTheme : darkTheme">
        <n-loading-bar-provider>
            <n-message-provider>
                <NavBar/>
                <n-layout content-style="padding: 30px;" :native-scrollbar="false">
                    <RouterView/>
                </n-layout>
            </n-message-provider>
        </n-loading-bar-provider>
        <Footer/>
    </n-config-provider>
</template>

<style>
.title {
    text-align: center;
}

</style>
