<script setup lang="ts">
let date = new Date().getFullYear();
</script>

<template>
    <n-layout-footer bordered style="padding: 10px">
        <h3>©{{ date }} yotsuki. All rights reserved.</h3>
    </n-layout-footer>
</template>

<style scoped>
h3 {
    text-align: center;
}
</style>
