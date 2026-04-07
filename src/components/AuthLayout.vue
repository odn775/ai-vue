<template> 
    <div class="auth-layout">
        <div class="left-section">
            <div class="content">
                <h2 class="title">心理AI助手 </h2>
                <p class="text">提供专业的心理咨询和帮助</p>
                <div class="robot">
                    <el-image style="width: 90px; height: 90px;" :src="iconUrl" alt="心理AI助手"> </el-image>
                </div>
            </div>
        </div>
        <div class="right-section">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const iconUrl = new URL('../assets/images/robot-fill.png', import.meta.url).href
</script>
<style lang="scss" scoped>
.auth-layout {
    display: flex;
    .left-section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background: linear-gradient(90deg, rgb(74, 156, 140) 0%, rgb(61, 138, 122) 100%) rgba(74, 156, 140, 0.95);
        height: 100vh;
        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .title {
                margin-bottom: 20px;
                font-size: 40px;
                font-weight: bold;
                color: #fff;
            }
            .text {
                margin-bottom: 20px;
                width: 460px;
                font-size: 20px;
                color: #fff;
                text-align: center;
            }
            .robot {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 160px;
                height: 160px;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.2);
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1),inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
        }
    }
    .right-section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100vh;
        background-color: #fff;
    }
}
</style>

