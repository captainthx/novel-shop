import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';



export const useUserStore = defineStore('user', () => {
    const theme = ref('light');
    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    }

    function active() {
        return theme.value === "light";
    }

    function toggleLang() {
        useI18n().locale = 'ja';
    }

    function activeLang() {
        return   useI18n().locale ;

    }


    return { theme, active, toggleTheme, toggleLang,activeLang };
});

