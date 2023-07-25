<script setup lang="ts">
import { ref } from 'vue';
import { useMessage, type FormRules, type FormInst, type FormValidationError } from 'naive-ui';
import type { RegisterData } from '@/services';
import { signup } from '@/services/authService';
import { useRouter } from 'vue-router';

const message = useMessage();
const router = useRouter();
const formRef = ref<FormInst | null>(null);

const registerFrom = ref<RegisterData>({
    username: '',
    password: '',
    email: '',
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
    email: [
        { required: true, message: 'email is required' },
        { type: 'email', message: 'email is invalid' },
        { trigger: ['input', 'blur'] },
    ],
};

const handleRegister = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            try {
                const response = await signup(registerFrom.value);
                if (response.status == 200 && response.data.code == 0) {
                    message.success('registert successful! please login!');
                    setTimeout(() => {
                        router.push('/login');
                    }, 1000);
                }
            } catch (e: unknown) {
                if (typeof e === 'string') {
                    message.error('error' + e);
                } else if (e instanceof Error) {
                    message.error('error' + e.message);
                }
            }
        } else {
            // console.log(errors);
            message.error('Invalid');
        }
    });
};
</script>

<template>
    <n-layout content-style="padding: 24px; height: 75vh " :native-scrollbar="false">
        <n-space justify="center">
            <n-card title="register">
                <template #header>
                    <h3 style="text-align: center">register</h3>
                </template>
                <n-form ref="formRef" :model="registerFrom" :rules="rules">
                    <n-form-item-row path="username" label="username">
                        <n-input v-model:value="registerFrom.username" />
                    </n-form-item-row>
                    <n-form-item-row path="email" label="email">
                        <n-input v-model:value="registerFrom.email" />
                    </n-form-item-row>
                    <n-form-item-row path="password" label="password">
                        <n-input
                            v-model:value="registerFrom.password"
                            show-password-on="click"
                            type="password"
                        />
                    </n-form-item-row>
                </n-form>
                <n-button type="primary" block secondary strong @click="handleRegister">
                    Sign up</n-button
                >
            </n-card>
        </n-space>
    </n-layout>
</template>
