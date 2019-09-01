<template>
  <!-- container 布局 -->
  <!-- 外层容器 -->
  <el-container>
    <!-- 侧边栏容器 -->
    <el-aside style="width:200px">
      <layout-aside ></layout-aside>
    </el-aside>
    <el-container>
      <!-- 头部侧边栏 -->
      <el-header>头部</el-header>
      <!-- 主要区域 -->
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style lang="less">
</style>
