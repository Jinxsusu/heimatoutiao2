<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:30px">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="searchForm">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="草稿失败"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total-info">共找到xxxx条符合条件的数据</div>
    <div class="article-list">
      <div v-for="(item,index ) in list" :key="index"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6],
      searchForm: {
        status: 5,
        dateRange: []
      }

    }
  }
}
</script>

<style>
</style>
