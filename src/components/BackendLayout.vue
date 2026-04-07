<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Sidebar />
      <el-container>
        <el-header>
            <Navbar />
        </el-header>
        <el-main class="main-content">
            <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

</script>
<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
    .main-container {
        height: 100%;
        .el-header {
            height: 74px !important;
        }
        .main-container {
            height: 100%;
        }
        .content-container {
            padding: 20px;
            min-height: calc(100% - 74px);
            background-color: #fcfcfc;
        }
    }
    
}
</style>
