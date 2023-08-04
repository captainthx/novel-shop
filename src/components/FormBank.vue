<script setup lang="ts">
import type { FormInst, UploadCustomRequestOptions } from 'naive-ui';
import type { FileInfo } from 'naive-ui/es/upload/src/interface';
import { ref } from 'vue';

const imageFile = ref<FileInfo>();
const formRef = ref<FormInst | null>(null);
const customRequest = ({ file }: UploadCustomRequestOptions) => {
    imageFile.value = file;
};

const model = ref({
    imageName: '',
    fullName: '',
    datetimeValue: null,
});

function confrim(e: MouseEvent) {
    e.preventDefault();
    if (imageFile.value?.file) model.value.imageName = imageFile.value?.file?.name;
    console.log(model.value);
}

const emit = defineEmits<{
    close: [value: boolean];
}>();

//TODO: add submit api confrim transfer
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
                            v-model:value="model.fullName"
                            placeholder="ชื่อ-สกุล(เจ้าของบัญชี)"
                        />
                    </n-form-item>
                    <n-form-item label="วันและเวลาที่โอน" path="datetimeValue">
                        <n-date-picker
                            v-model:value="model.datetimeValue"
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
