<template>
    <n-layout content-style="padding: 25px; height: 80vh" :native-scrollbar="false">
        <n-result
            status="404"
            title="404 Not Found"
            description="You know life is always ridiculous."
        >
            <template #footer>
                <n-button>Find Something Funny</n-button>
            </template>
        </n-result>
    </n-layout>
</template>
