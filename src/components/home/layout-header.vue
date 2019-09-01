<template>
  <!-- 用的flex布局 -->
  <el-row type="flex" justify="space-between" class="layout-header">
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold icon"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="3">
      <img src="../../assets/img/avatar.jpg" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          苏苏
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>Git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-header {
  padding: 8px 0;
  .left {
    display: flex;
    align-items: center;
    .icon {
      font-size: 22px;
      margin-right: 3px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      margin-right: 5px;
      width: 35px;
      height: 35px;
    }
  }
}
</style>
