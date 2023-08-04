<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NIcon, NSpace, useMessage, type DataTableColumns, NButton } from 'naive-ui';
import type { BookCartRequest, AddressResponse } from '@/services';
import { createOrder } from '@/services/orderSerivce';
import { fetchAddress } from '@/services/userService';
import { useCartStore } from '@/stores/cart';
import { h, onBeforeMount, ref } from 'vue';
import {
    TrashBinOutline as TrashBin,
    RemoveOutline as Remove,
    AddOutline as Add,
} from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

const { cart } = storeToRefs(useCartStore());
const { removeQuantityItem, addCartItem, removeCartItem, clearCart } = useCartStore();
const loading = ref(false);
const message = useMessage();
const router = useRouter();
const addressList = ref<AddressResponse[]>([]);
const select = ref<AddressResponse>();

async function confrim() {
    router.push('/payment');
    // try {
    //     const res = await createOrder(cart.value);
    //     if (res.status == 200 && res.data.code == 0) {
    //         message.success('Confrim Order Success');
    //         loading.value = false;
    //         clearCart();
    //     }
    // } catch (e: unknown) {
    //     if (typeof e === 'string') {
    //         console.error(e);
    //     } else if (e instanceof Error) {
    //         console.error(e.message);
    //     }
    // }
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

const columns: DataTableColumns<BookCartRequest> = [
    {
        title: 'Name',
        key: 'name',
        titleAlign: 'center',
        align: 'center',
    },
    {
        title: 'Quantity',
        key: 'quantity',
        titleAlign: 'center',
        align: 'center',
    },
    {
        title: 'Price',
        key: 'price',
        titleAlign: 'center',
        align: 'center',
    },
    {
        title: 'Total',
        key: 'total',
        titleAlign: 'center',
        render(row) {
            return row.price * row.quantity;
        },
    },
    {
        title: 'Action',
        key: 'Action',
        render(row) {
            return h(
                NSpace,
                { style: { justify: 'space-between' } },
                {
                    default: () => [
                        h(
                            NButton,
                            {
                                onClick: () => {
                                    removeQuantityItem(row);
                                    if (row.quantity == 0) removeCartItem(row.bookId);
                                },
                                text: true,
                            },
                            {
                                default: () => h(NIcon, { size: 20 }, { default: () => h(Remove) }),
                            }
                        ),
                        h(
                            NButton,
                            {
                                onClick: () => {
                                    addCartItem(row);
                                },
                                text: true,
                            },
                            {
                                default: () => h(NIcon, { size: 20 }, { default: () => h(Add) }),
                            }
                        ),
                        h(
                            NButton,
                            {
                                onClick: () => {
                                    removeCartItem(row.bookId);
                                },
                                text: true,
                            },
                            {
                                default: () =>
                                    h(NIcon, { size: 20 }, { default: () => h(TrashBin) }),
                            }
                        ),
                    ],
                }
            );
        },
    },
];
onBeforeMount(() => {
    fetchAddressData();
});
</script>

<template>
    <n-layout-content content-style="padding: 25px; height: 75vh" :native-scrollbar="false">
        <h2 style="text-align: center">Book Cart</h2>
        <n-space vertical>
            <n-select
                filterable
                v-model:value="select"
                placeholder="select address"
                :options="
                    addressList.map((item) => ({
                        label: item.line1 + ' ' + item.line2 + ' ' + item.zipCode,
                        value: item.id + '' + item.line1 + ' ' + item.line2 + ' ' + item.zipCode,
                    }))
                "
                :loading="loading"
                clearable
                remote
                :clear-filter-after-select="false"
            />
        </n-space>
        <n-data-table :columns="columns" :data="cart" :bordered="false" />
        <n-space justify="end" style="margin-top: 15px">
            <n-popconfirm @positive-click="confrim">
                <template #trigger>
                    <n-button round>confirm</n-button>
                </template>
                Are you sure for confirm orders!.
            </n-popconfirm>
        </n-space>
    </n-layout-content>
</template>

<style scoped></style>
