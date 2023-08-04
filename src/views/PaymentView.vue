<script setup lang="ts">
import {
    WalletOutline as Wallet,
    QrCodeOutline as QrCode,
    CashOutline as Cash,
} from '@vicons/ionicons5';
import { ref } from 'vue';
import FormBank from '@/components/FormBank.vue';
import FormCredit from '@/components/FormCredit.vue';

const active = ref<string>('');

function isOpen(key: string) {
    active.value = key;
}

function close() {
    active.value = '';
}
</script>

<template>
    <n-layout-content content-style="padding: 25px; height: 75vh" :native-scrollbar="false">
        <n-space vertical>
            <div class="title">
                <h1>{{ $t('page.payment') }}</h1>
            </div>
            <n-space justify="center">
                <n-card
                    :title="$t('page.credit')"
                    embedded="true"
                    hoverable="true"
                    @click="isOpen('credit')"
                >
                    <n-icon size="30">
                        <Wallet />
                    </n-icon>
                </n-card>
                <n-card
                    :title="$t('page.qrCode')"
                    embedded="true"
                    hoverable="true"
                    @click="isOpen('qr')"
                >
                    <n-icon size="30"> <QrCode /> </n-icon
                ></n-card>
                <n-card
                    :title="$t('page.bank')"
                    embedded="true"
                    hoverable="true"
                    @click="isOpen('bank')"
                >
                    <n-icon size="30"> <Cash /> </n-icon
                ></n-card>
                <n-space justify="end">
                    <FormCredit v-show="active === 'credit'" />
                </n-space>
                <n-spcae justify="end">
                    <n-image
                        v-show="active === 'qr'"
                        title="QR payment"
                        width="150"
                        height="150"
                        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                        :previewed-img-props="{ style: { border: '8px solid white' } }"
                    />
                </n-spcae>
                <n-space justify="end">
                    <FormBank v-show="active === 'bank'" @close="close" />
                </n-space>
            </n-space>
        </n-space>
    </n-layout-content>
</template>

<style scoped>
.n-card {
    width: 150px;
    height: 150px;
}
</style>
