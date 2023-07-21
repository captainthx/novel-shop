<script setup lang="ts">
import type { Component } from 'vue';
import { h, ref } from 'vue';
import list from '@/router/routerConfig';
import { NIcon, useMessage } from 'naive-ui';
import {
    BookmarkOutline as Bookmark,
    HomeOutline as Home,
    List as List,
    LogInOutline as Login,
    LogOutOutline as LogoutIcon,
    MoonOutline,
    Pencil as EditIcon,
    PersonCircleOutline as UserIcon,
    SearchOutline as Search,
    SunnyOutline,
} from '@vicons/ionicons5';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { active, lang } = storeToRefs(useUserStore());
const { toggleTheme } = useUserStore();
const { hasToken, getToken } = useAuthStore();
const message = useMessage();
const router = useRouter();
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

const handlingLogout = () => {
    window.localStorage.removeItem('token');
    message.success('logout success!');
    getToken();
    router.push('/login');
};

const bookOptions = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/mybook',
                    },
                },
                { default: () => 'favorite' }
            ),
        key: 'favorite',
        icon: renderIcon(List),
    },
];

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

// todo: search function
const msg = ref<string>('');
const find = () => {
    if (msg.value) {
        alert('find value');
        msg.value = '';
    }
};
</script>
<template>
    <n-layout-header class="header" :bordered="false">
        <n-space justify="space-between">
            <div>
                <n-space justify="space-between">
                    <router-link to="/">
                        <n-button text>
                            <n-icon :size="20">
                                <Home />
                            </n-icon>
                        </n-button>
                    </router-link>
                    <router-link v-for="item in list" :key="item.name" :to="item.path">
                        <n-button text style="font-size: larger">
                            {{ $t(`page.${item.name}`) }}
                        </n-button>
                    </router-link>
                    <div>
                        <n-dropdown :options="bookOptions">
                            <n-button text>
                                <n-icon size="25">
                                    <Bookmark />
                                </n-icon>
                            </n-button>
                        </n-dropdown>
                    </div>
                </n-space>
            </div>
            <div>
                <n-input round placeholder="Search " @keyup.enter="find" v-model:value="msg">
                    <template #suffix>
                        <n-button text>
                            <n-icon :size="30" @click="find">
                                <search />
                            </n-icon>
                        </n-button>
                    </template>
                </n-input>
            </div>
            <div>
                <n-space>
                    <div>
                        <n-space vertical style="width: 65px">
                            <n-select
                                v-model:value="$i18n.locale"
                                :options="langOptions"
                                size="small "
                            />
                        </n-space>
                    </div>
                    <div>
                        <div>
                            <n-switch v-model:value="active" @click="toggleTheme" size="medium">
                                <template #checked-icon>
                                    <n-icon :component="MoonOutline" />
                                </template>
                                <template #unchecked-icon>
                                    <n-icon :component="SunnyOutline" />
                                </template>
                            </n-switch>
                        </div>
                    </div>
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
            </div>
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
