<template>
    <div class="page-head">
        <p class="page-title">{{ props.title }}</p>
        <div class="action-button">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: '页面标题'
    }
})
</script>
<style lang="scss" scoped>
.page-head {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-title {
        font-size: 24px;
        color: #333;
    }
}
</style>
