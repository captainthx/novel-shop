<script setup lang="ts">
import {
    WalletOutline as Wallet,
    QrCodeOutline as QrCode,
    CashOutline as Cash,
} from '@vicons/ionicons5';
</script>

<template>
    <div class="title">
        <h1>{{$t('page.payment')}}</h1>
    </div>
    <div style="height: 75vh">
        <n-grid cols="3" x-gap="20" y-gap="20">
            <n-grid-item>
                <n-card :title="$t('page.credit')" embedded="true" hoverable>
                    <n-icon size="30">
                        <Wallet />
                    </n-icon>
                </n-card>
            </n-grid-item>

            <n-grid-item>
                <n-card :title="$t('page.bank')" embedded="true" hoverable>
                    <n-icon size="30">
                        <Cash />
                    </n-icon>
                </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card :title="$t('page.qrCode')" embedded="true" hoverable>
                    <n-icon size="30"> <QrCode /> </n-icon
                ></n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style scoped></style>
