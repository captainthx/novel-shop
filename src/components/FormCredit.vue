<script setup lang="ts">
import type { CreditForm } from '@/services';
import { useMessage, type FormRules, type FormInst, type FormValidationError } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter();
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const formCredit = ref<CreditForm>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
});

const rules: FormRules = {
    cardName: [
        { required: true, message: 'cardName is required' },
        { min: 4, max: 10, message: 'cardName length should be 4 to 10' },
        { trigger: ['input', 'blur'] },
    ],
    cardNumber: [
        { required: true, message: 'cardNumber is required' },
        { min: 4, max: 20, message: 'cardNumber length should be 6 to 20' },
        { trigger: ['input', 'blur'] },
    ],
    expiryDate: [
        { required: true, message: 'expiryDate is required' },
        { min: 4, max: 20, message: 'expiryDate length should be 6 to 20' },
        { trigger: ['input', 'blur'] },
    ],
    securityCode: [
        { required: true, message: 'securityCode is required' },
        { min: 3, max: 20, message: 'securityCode length should be 3 to 20' },
        { trigger: ['input', 'blur'] },
    ],
};

// TODO: add payment api
function next(e: MouseEvent) {
    e.preventDefault();
    console.log(formRef.value);

    formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            console.log(formCredit.value);
            try {
                message.info('payment successful!');
                route.push('/book/list');
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
</script>

<template>
    <n-form
        ref="formRef"
        :model="formCredit"
        :rules="rules"
        style="width: 300px; padding-top: 15px"
        @submit="next"
    >
        <n-form-item path="cardName" label="Cardname">
            <n-input v-model:value="formCredit.cardName" type="text" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="cardNumber" label="Cardnumber">
            <n-input v-model:value="formCredit.cardNumber" type="text" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="expiryDate" label="Expirydate">
            <n-input v-model:value="formCredit.expiryDate" type="text" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="securityCode" label="Securitycode">
            <n-input v-model:value="formCredit.securityCode" type="text" @keydown.enter.prevent />
        </n-form-item>
        <n-button type="primary" block secondary attr-type="submit"> Next </n-button>
    </n-form>
</template>
