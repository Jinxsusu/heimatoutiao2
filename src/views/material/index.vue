<template>
  <el-card class="material" v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" style="margin:10px 0" justify="center">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all', // 设置tob标签默认选中all的一栏
      list: [],
      page: {
        page: 1,
        pageSize: 12,
        total: 0
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    // 切换标签
    changeTab () {
      // 每次切换完标签以后 当前页面改成1
      this.page.page = 1
      this.getMaterial()
    },
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        console.log(res)
        this.loading = false // 响应数据之后 改成false
        this.page.total = res.data.total_count
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 5px;

    .img-card {
      width: 160px;
      height: 160px;
      margin: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
      }
    }
  }
}
</style>
