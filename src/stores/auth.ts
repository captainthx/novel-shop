import {defineStore} from "pinia";
import {ref} from "vue";
import type {tokenPayload, TokenResponse} from "@/services";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<TokenResponse>();

    const saveToken = (response:TokenResponse) =>{
        window.localStorage.setItem("token", JSON.stringify(response))
    }

    const getToken = () =>{
        token.value = JSON.parse(<string>localStorage.getItem('token')) as TokenResponse;
    }
    const hasToken = (): boolean => {
        return token.value != null;
    }

    getToken()
    return {hasToken,getToken,saveToken,token}
})
