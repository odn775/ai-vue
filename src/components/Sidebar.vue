<template> 
    <el-sidebar :width="isCollapsed ? '64px' : '264px'"  >
        <el-menu
        :collapse="isCollapsed"
        :collapse-transition="false"
        default-active="2"
        class="menu-style"
      
        >
        <div class=" brand">
            <el-image style="width: 50px; height: 50px; margin-right: 10px;" :src="iconUrl" alt="robot-logo"/>
            <div v-show="!isCollapsed" class="info-card">
                <h1 class="brand-title">心理AI助手</h1>
                <h1 class="brand-subtitle">管理后台</h1>
            </div>
        </div>

       <el-menu-item @click="selectMenu" v-for = "item in router.options.routes[0].children" :key="item.path" :index="item.path">
            <el-icon><component :is="item.meta.icon"></component></el-icon>
             <span>{{item.meta.title}}</span>
         </el-menu-item>
        
      </el-menu>

    </el-sidebar>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import { computed } from 'vue'
const router = useRouter()
const iconUrl = new URL('../assets/images/机器人.png', import.meta.url).href
const isCollapsed = computed(() => useAdminStore().isCollapsed)
const selectMenu = (key) => {
    const currentRoute = router.options.routes[0]
    router.push(`${currentRoute.path}/${key.index}`)
}
</script>
<style lang="scss" scoped>
.menu-style {
    height: 100%;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: #fff;
        border-bottom: 1px solid #f0f0f0;
    .info-card {
        .brand-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
         }
        .brand-subtitle {
            font-size: 14px;
            color: #666;
        }

    }
}
}


</style>