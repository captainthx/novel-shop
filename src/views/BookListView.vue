<script setup lang="ts">
import type { AddressResponse, DeliveryRequest } from '@/services';
import { fetchAddress } from '@/services/userService';
import {
    NButton,
    NSpace,
    type DataTableColumns,
    useMessage,
    NIcon,
    type FormInst,
    type FormRules,
    type FormValidationError,
} from 'naive-ui';
import { h, onBeforeMount, ref } from 'vue';
import { DownloadOutline as Dowload, HomeOutline as Home } from '@vicons/ionicons5';
import { PDFDocument, rgb } from 'pdf-lib';
import { createDelivery } from '@/services/deliveryService';

//TODO: add function download filebook &  send book to user
const message = useMessage();
const addressList = ref<AddressResponse[]>([]);
const formRef = ref<FormInst | null>();
const select = ref<AddressResponse>();
const formDelivery = ref<DeliveryRequest>({
    addressId: 0,
    fullname: '',
    phone: 0,
});
const showModal = ref<boolean>(false);

const columns: DataTableColumns = [
    {
        title: 'bookName',
        key: 'bookName',
    },
    {
        title: 'actions',
        key: 'actions',
        render() {
            return h(
                NSpace,
                { style: { justify: 'space-between' } },
                {
                    default: () => [
                        h(
                            NButton,
                            {
                                onClick: () => {
                                    downloadFile;
                                },
                                text: true,
                            },
                            {
                                default: () =>
                                    h(NIcon, { size: 20 }, { default: () => h(Dowload) }),
                            }
                        ),
                        h(
                            NButton,
                            {
                                onClick: () => {
                                    sendBook;
                                },
                                text: true,
                            },
                            {
                                default: () => h(NIcon, { size: 20 }, { default: () => h(Home) }),
                            }
                        ),
                    ],
                }
            );
        },
    },
];
const rules: FormRules = {
    fullName: [
        {
            required: true,
            min: 4,
            max: 10,
            message: 'Please input username',
        },
        {
            trigger: ['input', 'blur'],
        },
    ],
    phone: [
        {
            required: true,
            max: 10,
            message: 'Please input password',
        },
        {
            trigger: ['input', 'blur'],
        },
    ],
};
async function downloadFile() {
    const pdfDoc = await PDFDocument.create();
    //TODO: bookName
    pdfDoc.setTitle('My Document');

    //set page size defualt A4
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    //TODO: set content book
    page.drawText('heloword', {
        x: 50,
        y: height - 50,
        size: 16,
        color: rgb(0, 0, 0),
    });

    const pagebBytes = await pdfDoc.save();

    //TODO: set file name form bookName
    const filename = 'test.pdf';

    const blob = new Blob([pagebBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    URL.revokeObjectURL(url);
}

async function sendBook(e: MouseEvent) {
    e.preventDefault();
    showModal.value = true;
    formRef.value?.validate(async (error: Array<FormValidationError> | undefined) => {
        if (!error) {
            try {
                //TODO: add function sendbook
                if (select.value) formDelivery.value.addressId = select.value.id;
                const res = await createDelivery(formDelivery.value);
                if (res.status == 200 && res.data.code == 0) {
                    message.success('request Successfully');
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
//TODO: add function sendbook

onBeforeMount(() => {
    fetchAddressData();
});
</script>

<template>
    <n-layout-content content-style="padding: 25px; height: 75vh" :native-scrollbar="false">
        <n-data-table :columns="columns" :data="addressList" :bordered="false" />
        <n-modal
            style="width: 50vw"
            v-model:show="showModal"
            class="custom-card"
            title="Delivery "
            preset="card"
            :bordered="false"
            size="large"
        >
            <n-select
                style="padding-bottom: 5px"
                filterable
                v-model:value="select"
                placeholder="select address"
                :options="
                    addressList.map((item) => ({
                        label: item.line1 + ' ' + item.line2 + ' ' + item.zipCode,
                        value: item.id + '' + item.line1 + ' ' + item.line2 + ' ' + item.zipCode,
                    }))
                "
                clearable
                remote
                :clear-filter-after-select="false"
            />
            <n-form ref="formRef" :model="formDelivery" :rules="rules">
                <n-form-item path="fullname" label="fullName">
                    <n-input v-model:value="formDelivery.fullname" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="phone" label="phone">
                    <n-input v-model:value="formDelivery.phone" @keydown.enter.prevent />
                </n-form-item>
            </n-form>
        </n-modal>
    </n-layout-content>
</template>

<style scoped></style>
