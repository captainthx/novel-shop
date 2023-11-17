import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useUserStore = defineStore('user', () => {
    const theme = ref('light');
    const i18n = useI18n();

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    }

    function active() {
        return theme.value === 'light';
    }

    function toggleLang() {
        i18n.locale.value = 'ja';
    }

    function activeLang() {
        return useI18n().locale.value;
    }

    return { theme, active, toggleTheme, toggleLang, activeLang };
});
