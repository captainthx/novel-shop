<script setup lang="ts">
import type { Component } from 'vue';
import { h } from 'vue';
import list from '@/router/routerConfig';
import { NIcon, useMessage } from 'naive-ui';
import {
    CashOutline as Cash,
    HomeOutline as Home,
    LogInOutline as Login,
    LogOutOutline as LogoutIcon,
    MoonOutline,
    Pencil as EditIcon,
    PersonCircleOutline as UserIcon,
    SunnyOutline,
    ListOutline as NavList,
    BookOutline as Book,
} from '@vicons/ionicons5';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import { useIsMobile } from '@/responseDivice';
import { useI18n } from 'vue-i18n';

// const { toggleTheme, active } = useUserStore();
const { hasToken, getToken } = useAuthStore();
const { theme, toggleTheme } = useUserStore();
const message = useMessage();
const router = useRouter();
const isMobile = useIsMobile();
const i18n = useI18n();

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon),
        });
    };
};
const options = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'profile',
                    },
                },
                { default: () => 'profile' }
            ),
        key: 'profile',
        icon: renderIcon(UserIcon),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'edit',
                    },
                },
                { default: () => 'edit' }
            ),
        key: 'edit',
        icon: renderIcon(EditIcon),
    },
    {
        label: 'logout',
        key: 'logout',
        icon: renderIcon(LogoutIcon),
        props: { onClick: () => handlingLogout() },
    },
];

const navOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/',
                    },
                },
                { default: () => 'home' }
            ),
        key: 'home',
        icon: renderIcon(Home),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: 'book',
                    },
                },
                { default: () => 'book' }
            ),
        key: 'book',
        icon: renderIcon(Book),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: 'payment',
                    },
                },
                { default: () => 'payment' }
            ),
        key: 'payment',
        icon: renderIcon(Cash),
    },
];

const handlingLogout = () => {
    window.localStorage.removeItem('token');
    message.success('logout success!');
    getToken();
    router.push('/login');
};

const langOptions = [
    {
        label: 'EN',
        value: 'en',
    },
    {
        label: 'JA',
        value: 'ja',
    },
    {
        label: 'TH',
        value: 'th',
    },
];
</script>
<template>
    <n-layout-header class="header" :bordered="false">
        <n-space justify="space-between">
            <n-button text v-if="isMobile">
                <n-icon size="25">
                    <n-dropdown :options="navOptions">
                        <n-button text>
                            <n-icon size="25">
                                <NavList />
                            </n-icon>
                        </n-button>
                    </n-dropdown>
                </n-icon>
            </n-button>
            <n-space v-else>
                <router-link to="/">
                    <n-button text>
                        <n-icon :size="20">
                            <Home />
                        </n-icon>
                    </n-button>
                </router-link>
                <router-link v-for="item in list" :key="item.name" :to="item.path">
                    <n-button text style="font-size: larger">
                        {{ $t(`page.${String(item.name)}`) }}
                    </n-button>
                </router-link>
            </n-space>
            <n-space>
                <n-space vertical style="width: 65px">
                    <n-select
                        v-model:value="i18n.locale.value"
                        :options="langOptions"
                        size="small "
                    />
                </n-space>
                <n-switch v-model="theme" @click="toggleTheme" size="medium">
                    <template #checked-icon>
                        <n-icon :component="MoonOutline" />
                    </template>
                    <template #unchecked-icon>
                        <n-icon :component="SunnyOutline" />
                    </template>
                </n-switch>
                <div v-if="hasToken()">
                    <n-dropdown :options="options">
                        <n-button text>
                            <n-icon size="25">
                                <UserIcon />
                            </n-icon>
                        </n-button>
                    </n-dropdown>
                </div>
                <div v-else>
                    <router-link to="/login">
                        <n-button text>
                            <n-icon size="25">
                                <Login />
                            </n-icon>
                        </n-button>
                    </router-link>
                </div>
            </n-space>
        </n-space>
    </n-layout-header>
</template>
<style>
a {
    text-decoration: none;
}

.header {
    height: 64px;
    padding: 20px;
    margin: auto;
}

.router-link-exact-active {
    font-size: larger;
    font-weight: 600;
}
</style>
