<script setup lang="ts">
const data  = defineProps<{
    error:string
}>();

</script>

<template>
    <n-result status="error" title="Error" :description="data.error">
        <template #footer>
        </template>
    </n-result>
</template>