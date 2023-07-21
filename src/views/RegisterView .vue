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

const registerFrom = ref<RegisterData>({
    username: '',
    password: '',
    email: '',
});

const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();

    const response = await register(registerFrom.value);
    if (response.status == 200) {
        router.push('/');
        message.success('registert successful! please login!');
        clearForm();
        return;
    } else {
        message.error('register fail! someting wrong! try again');
    }
};

function clearForm() {
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
            <n-card title="register">
                <template #header>
                    <h3 style="text-align: center">register</h3>
                </template>
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
            </n-card>
        </n-space>
    </n-layout>
</template>
