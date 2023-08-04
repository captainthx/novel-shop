<script setup lang="ts">
import type { AddressResponse } from '@/services';
import { fetchAddress } from '@/services/userService';
import { NButton, NSpace, type DataTableColumns, useMessage, NIcon } from 'naive-ui';
import { h, onBeforeMount, ref } from 'vue';
import { DownloadOutline as Dowload, HomeOutline as Home } from '@vicons/ionicons5';

//TODO: add function download filebook &  send book to user
const message = useMessage();
const addressList = ref<AddressResponse[]>([]);
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
                                type: 'error',
                                onClick: () => {
                                    console.log('delete');
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
                                    console.log('edit');
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

onBeforeMount(() => {
    fetchAddressData();
});
</script>

<template>
    <n-layout-content content-style="padding: 25px; height: 75vh" :native-scrollbar="false">
        <n-data-table :columns="columns" :data="addressList" :bordered="false" />
    </n-layout-content>
</template>

<style scoped></style>
