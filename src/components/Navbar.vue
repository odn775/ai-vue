<template> 
    <div class="navbar" >
        <div class="flex-box">
            <el-button  @click="handleCollapse">
                <el-icon><Expand /></el-icon>
            </el-button>
            <p class="page-title">{{ route.meta.title }}</p>
        </div>
        <div class="flex-box">
            <el-dropdown @command="handleCommand">
                <div class="flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <p class="user-name">admin</p>
                    <el-icon><ArrowDown /></el-icon>
                </div>
              <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>   
              </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { Expand, ArrowDown } from '@element-plus/icons-vue'
import { useAdminStore } from '../stores/admin'
import { useRouter, useRoute } from 'vue-router'
import {ElMessageBox} from 'element-plus'
import { logout } from '../api/admin'

const router = useRouter()
const route = useRoute()

const handleCommand = (command) => {
   if(command === 'logout'){
    // 退出登录
    ElMessageBox.confirm('确定退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        //确认退出登录
        logout().then(() => {
            //清除token和userInfo
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            // 退出登录后，跳转到登录页
            router.push('/auth/login')
        })
    })
   }
}
const handleCollapse = () => {
    useAdminStore().toggleCollapsed()
}
</script>
<style lang="scss" scoped>
.navbar{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-color: #f5f5f5;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .flex-box{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .page-title{
        margin-left: 20px;
        font-size: 26px;
        font-weight: bold;
        color: #333;
    }
}

</style>