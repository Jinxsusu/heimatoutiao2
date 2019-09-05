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
          <!-- 作用域插件
            obj是子组件传过来的属性的集合
          里边有row column $index 和store的数据-->
          <el-button type="text" size="small">修改评论</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            type="text"
            size="small"
            :style="{color: obj.row.comment_status ? '#E6A23C':'#409EFF'}"
          >{{obj.row.comment_status ? '关闭评论' :'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:15px 0">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.page"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1, // 当前页码
        pageSize: 10, // 当前每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 当页面上的页码改变传给newPageta中的page数据
      // 传给后台 后台再将需要的数据重新拉一遍渲染到列表中
      // 所以params 传入当前的page 和 pageSize
      // 然后调用方法重新拉取数据
      this.page.page = newPage
      this.getComments()
    },

    // 打开关闭评论 改变文章状态
    openOrClose (row) {
      // 传入参数是 当前文章的状态 发请求取反 这个参数是通过作用域插槽获得的
      let msg = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${msg}评论`, '提示').then(() => {
        // 提示成功以后发送请求
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() }, // id数字较大要进行设置
          data: { allow_comment: !row.comment_status } // 取反
        }).then(res => {
          this.getComments() // 成功之后重新调用 拉取数据
        })
      })
    },
    formatter (row) {
      // formatter 是el-table-colum的方法(属性)可以设置自定义显示内容
      // 传入的参数是row, column, cellValue, index这几个
      // 根据传入参数的状态来确定返回的内容
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      // 发送请求获取数据
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.page,
          per_page: this.pageSize
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
