<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIcon, type DataTableColumns, NButton } from 'naive-ui';
import type { BookCart, BookCartResponse } from '@/services';
import { useCartStore } from '@/stores/cart';
import { h, onBeforeMount, ref } from 'vue';
import { findOrderByUser } from '@/services/orderSerivce';
import { TrashBinOutline as TrashBin } from '@vicons/ionicons5';
const itemCart = ref<BookCartResponse[]>([]);

const status = 'pending';

async function fetchOrderList() {
    try {
        const res = await findOrderByUser(status);
        if (res.status == 200 && res.data.code == 0) {
            if (res.data.result) itemCart.value = res.data.result;
        }
    } catch (e: unknown) {
        if (typeof e === 'string') {
            console.error(e);
        } else if (e instanceof Error) {
            console.error(e.message);
        }
    }
}

async function removeItem(id: number) {
    console.log(id);
}

const columns: DataTableColumns<BookCartResponse> = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        key: 'price',
    },
    {
        title: 'Total',
        key: 'total',
        render(row) {
            return row.price * row.quantity;
        },
    },
    {
        title: 'Action',
        key: 'Action',
        render(row) {
            return h(
                NButton,
                {
                    onClick: () => {
                        removeItem(row.bookId);
                    },
                    text: true,
                },
                {
                    default: () => h(NIcon, { size: 20 }, { default: () => h(TrashBin) }),
                }
            );
        },
    },
];
onBeforeMount(() => {
    fetchOrderList();
});
</script>

<template>
    <n-layout-content content-style="padding: 25px; height: 75vh" :native-scrollbar="false">
        <h2 style="text-align: center">Book Cart</h2>
        <n-data-table :columns="columns" :data="itemCart" :bordered="false" />
    </n-layout-content>
</template>

<style scoped></style>
