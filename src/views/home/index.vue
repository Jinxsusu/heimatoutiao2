<template>
  <!-- container 布局 -->
  <!-- 外层容器 -->
  <el-container>
    <!-- 侧边栏容器 -->
    <el-aside style="width:200px;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 头部侧边栏 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main style="margin:0;padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style lang="less">
</style>
