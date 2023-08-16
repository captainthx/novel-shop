import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import naive from 'naive-ui';
import { createI18n } from 'vue-i18n';
import th from '@/locale/thTh.ts';
import ja from '@/locale/jaJa.ts';
import en from '@/locale/enUs.ts';
import { setupErrorHandler } from '@/errorHandler';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: true,
    messages: {
        th: th,
        ja: ja,
        en: en,
    },
});

setupErrorHandler(router);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(naive);
app.use(i18n);

app.mount('#app');
