<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column width="450" prop="title" label="标题"></el-table-column>
      <el-table-column prop="comment_status" :formatter="formatter" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <!-- obj是子组件传过来的属性的集合
          里边有row column $index 和store的数据-->
          <el-button type="text" size="small">修改评论</el-button>
          <el-button
            type="text"
            size="small"
            :style="{color: obj.row.comment_status ? '#E6A23C':'#409EFF'}"
          >{{obj.row.comment_status ? '关闭评论' :'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formatter (row) {
      // formatter 是el-table-colum的方法(属性)可以设置自定义显示内容
      // 传入的参数是row, column, cellValue, index这几个
      // 根据传入参数的状态来确定返回的内容
      return row.comment_status ? '正常' : '关闭'
    },
    getCommnets () {
      // 发送请求获取数据
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getCommnets()
  }
}
</script>

<style>
</style>
