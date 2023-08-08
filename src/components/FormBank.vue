<script setup lang="ts">
import type { BankPayment } from '@/services';
import type { FormInst, UploadCustomRequestOptions } from 'naive-ui';
import type { FileInfo } from 'naive-ui/es/upload/src/interface';
import { createBankPayment } from '@/services/bankService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const imageFile = ref<FileInfo>();
const formRef = ref<FormInst | null>(null);
const customRequest = ({ file }: UploadCustomRequestOptions) => {
    imageFile.value = file;
};
const model = ref<BankPayment>({
    nameAccount: '',
    transferDate: 0,
});
const formData = new FormData();

async function confrim(e: MouseEvent) {
    e.preventDefault();
    if (imageFile.value?.file) formData.append('file', imageFile.value?.file as File);
    formData.append('request', JSON.stringify(model.value));
    try {
        const res = await createBankPayment(formData);
        if (res.status === 200 && res.data.code == 0) {
            router.push('/book/list');
        }
    } catch (e: unknown) {
        if (typeof e === 'string') {
            console.error('error' + e);
        } else if (e instanceof Error) {
            console.error('error' + e.message);
        } else {
            console.error('Invalid');
        }
    }
}
const emit = defineEmits<{
    close: [value: boolean];
}>();

//TODO: add submit api confrim transfer
//FIXME: Imgage bannk & number bank
</script>

<template>
    <div>
        <n-card closable @close="emit('close', false)">
            <n-space vertical align="center">
                <n-card hoverable style="width: 200px">
                    <template #cover>
                        <img
                            style="width: 100%; height: 200px"
                            src="https://www.isranews.org/article/images/2022/Fei/12/kbank-0712-main-logo.jpg"
                        />
                    </template>
                </n-card>
                <p>test-123-42312-4343</p>
                <n-form @submit="confrim" ref="formRef" label-placement="left" :label-width="160">
                    <n-form-item label="หลักฐานการโอน" path="uploadValue">
                        <n-upload :custom-request="customRequest">
                            <n-button>Upload file</n-button>
                        </n-upload>
                    </n-form-item>
                    <n-form-item label="ชื่อ-สกุล" path="name">
                        <n-input
                            v-model:value="model.nameAccount"
                            placeholder="ชื่อ-สกุล(เจ้าของบัญชี)"
                        />
                    </n-form-item>
                    <n-form-item label="วันและเวลาที่โอน" path="datetimeValue">
                        <n-date-picker
                            v-model:value="model.transferDate"
                            type="datetime"
                            placeholder="วันและเวลาตามสลิป"
                        />
                    </n-form-item>
                    <n-button type="primary" attr-type="submit" block secondary> confrim </n-button>
                </n-form>
            </n-space>
        </n-card>
    </div>
</template>

<style scoped></style>
