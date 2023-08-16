<script setup lang="ts">
import router from '@/router';
import type { Address, AddressResponse } from '@/services';
import { type FormInst, useMessage, type FormRules, type FormValidationError } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

import { createAddress, fetchAddress } from '@/services/userService';

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const showModal = ref(false);
const addressList = ref<AddressResponse[]>([]);
const modelRef = ref<Address>({
    line1: '',
    line2: '',
    zipCode: '',
});
const rules: FormRules = {
    line1: [
        { required: true, message: 'line1 is required' },
        { min: 4, max: 10, message: 'line1 length should be 4 to 10' },
        { trigger: ['input', 'blur'] },
    ],
    line2: [
        { required: true, message: 'line2 is required' },
        { min: 4, max: 10, message: 'line2 length should be 4 to 10' },
        { trigger: ['input', 'blur'] },
    ],
    zipcode: [
        { required: true, message: 'zipcode is required' },
        { min: 4, max: 9999, message: 'zipcode length should be 4 to 10' },
        { trigger: ['input', 'blur'] },
    ],
};

function openModal() {
    showModal.value = true;
}

async function handleSubmit(e: MouseEvent) {
    e.preventDefault();

    formRef.value?.validate(async (error: Array<FormValidationError> | undefined) => {
        if (!error) {
            try {
                const response = await createAddress(modelRef.value);
                if (response.status == 200 && response.data.code == 0) {
                    message.success('create address Successfully');
                    clearForm();
                    fetchAddressData();
                    return;
                }

                if (response.data.code == 230) {
                    message.error('address is full!');
                    clearForm();
                    showModal.value = false;
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
}

async function fetchAddressData() {
    try {
        const response = await fetchAddress();
        if (response.status == 200 && response.data.code == 0) {
            if (response.data.result) addressList.value = response.data.result;
            return;
        }
    } catch (e: unknown) {
        if (typeof e === 'string') {
            message.error('error' + e);
        } else if (e instanceof Error) {
            message.error('error' + e.message);
        }
    }
}

function clearForm() {
    modelRef.value = {
        line1: '',
        line2: '',
        zipCode: '',
    };
}

onBeforeMount(() => {
    fetchAddressData();
});
</script>

<template>
    <div class="title">
        <h2>book address</h2>
    </div>
    <div style="height: 70vh">
        <n-layout content-style="padding: 25px;" :native-scrollbar="false">
            <n-space vertical>
                <n-card hoverable v-for="list in addressList" :key="list.id">
                    <p>Line1: {{ list.line1 }}</p>
                    <p>Line2: {{ list.line2 }}</p>
                    <p>zipCode: {{ list.zipCode }}</p>
                </n-card>

                <n-space justify="end">
                    <n-button @click="openModal" :disabled="addressList.length == 3">
                        Add
                    </n-button>
                    <n-modal
                        v-model:show="showModal"
                        preset="card"
                        title="Add address"
                        style="width: 400px"
                    >
                        <n-form ref="formRef" :model="modelRef" :rules="rules">
                            <n-form-item path="line1" label="line1">
                                <n-input v-model:value="modelRef.line1" @keydown.enter.prevent />
                            </n-form-item>
                            <n-form-item path="line2" label="line2">
                                <n-input v-model:value="modelRef.line2" @keydown.enter.prevent />
                            </n-form-item>
                            <n-form-item path="zipCode" label="zipcode">
                                <n-input v-model:value="modelRef.zipCode" @keydown.enter.prevent />
                            </n-form-item>
                        </n-form>
                        <div style="display: flex; justify-content: flex-end">
                            <n-button round @click="handleSubmit">submit</n-button>
                        </div>
                    </n-modal>
                </n-space>
            </n-space>
        </n-layout>
    </div>
</template>

<style scoped></style>
