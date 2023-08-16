<script setup lang="ts">
import { ref } from 'vue';
import { useMessage, type FormInst, type FormRules, type FormValidationError } from 'naive-ui';
import type { LoginData } from '@/services';
import { login } from '@/services/authService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const formRef = ref<FormInst | null>(null);

const message = useMessage();
const router = useRouter();
const { getToken, saveToken } = useAuthStore();

const loginFrom = ref<LoginData>({
    username: '',
    password: '',
});

const rules: FormRules = {
    username: [
        { required: true, message: 'username is required' },
        { min: 4, max: 10, message: 'username length should be 4 to 10' },
        { trigger: ['input', 'blur'] },
    ],
    password: [
        { required: true, message: 'password is required' },
        { min: 4, max: 20, message: 'password length should be 6 to 20' },
        { trigger: ['input', 'blur'] },
    ],
};

const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            try {
                const response = await login(loginFrom.value);
                if (response.status == 200 && response.data.code == 0) {
                    if (response.data.result) saveToken(response.data.result);
                    message.info('login successful!');
                    getToken();
                    router.push('/');
                    return;
                }
            } catch (e: unknown) {
                if (typeof e === 'string') {
                    message.error('error' + e);
                } else if (e instanceof Error) {
                    message.error('error' + e.message);
                }
            }
        } else {
            message.error('Invalid');
        }
    });
};
</script>

<template>
    <n-layout content-style="padding: 24px; height: 75vh " :native-scrollbar="false">
        <n-space justify="center">
            <n-card>
                <template #header>
                    <h3 style="text-align: center">login</h3>
                </template>
                <n-form ref="formRef" :model="loginFrom" :rules="rules">
                    <n-form-item-row path="username" label="username">
                        <n-input v-model:value="loginFrom.username" />
                    </n-form-item-row>
                    <n-form-item-row path="password" label="password">
                        <n-input v-model:value="loginFrom.password" type="password" />
                    </n-form-item-row>
                </n-form>
                <n-button block @click="handleLogin"> Sign In </n-button>
            </n-card>
        </n-space>
    </n-layout>
</template>
