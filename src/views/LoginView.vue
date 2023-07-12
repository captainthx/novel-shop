<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import type { LoginData, RegisterData } from '@/services';
import { login, register } from '@/services/authService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// const signupForm = ref(null);

const message = useMessage();
const router = useRouter();
const { getToken, saveToken } = useAuthStore();

const loginFrom = ref<LoginData>({
    username: '',
    password: '',
});
const registerFrom = ref<RegisterData>({
    username: '',
    password: '',
    email: '',
});

const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    const response = await login(loginFrom.value);
    if (response.status == 200) {
        message.info('login successful!'), saveToken(response.data.result);
        getToken();
        router.push('/');
        return;
    } else {
        clearForm();
        message.error('login Fail! ', response.data);
    }
};

const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();
    const response = await register(registerFrom.value);
    if (response.status == 200) {
        message.success('registert successful! please login!');
    } else {
        message.error('register fail! someting wrong! try again');
        clearForm();
    }
};

function clearForm() {
    loginFrom.value = {
        username: '',
        password: '',
    };
    registerFrom.value = {
        username: '',
        email: '',
        password: '',
    };
}
</script>

<template>
    <n-layout content-style="padding: 24px; height: 75vh " :native-scrollbar="false">
        <n-space justify="center">
            <n-card>
                <n-tabs
                    class="card-tabs"
                    default-value="signin"
                    size="large"
                    animated
                    pane-wrapper-style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
                >
                    <n-tab-pane name="signin" tab="Sign in">
                        <n-form ref="signupForm " :model="loginFrom">
                            <n-form-item-row label="Username">
                                <n-input v-model:value="loginFrom.username" />
                            </n-form-item-row>
                            <n-form-item-row label="Password">
                                <n-input v-model:value="loginFrom.password" type="password" />
                            </n-form-item-row>
                        </n-form>
                        <n-button type="primary" block secondary @click="handleLogin">
                            Sign In
                        </n-button>
                    </n-tab-pane>
                    <n-tab-pane name="signup" tab="Sign up">
                        <n-form :model="registerFrom">
                            <n-form-item-row label="Username">
                                <n-input v-model:value="registerFrom.username" />
                            </n-form-item-row>
                            <n-form-item-row label="email">
                                <n-input v-model:value="registerFrom.email" />
                            </n-form-item-row>
                            <n-form-item-row label="Password">
                                <n-input v-model:value="registerFrom.password" />
                            </n-form-item-row>
                        </n-form>
                        <n-button type="primary" block secondary strong @click="handleRegister">
                            Sign up</n-button
                        >
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </n-space>
    </n-layout>
</template>
