<template>
  <el-card class="material" v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- :http-request 实现自定义上传 -->
    <el-upload class="upload-btn" :http-request="uploadImg" action :show-file-list="false">
      <el-button size="middle" type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i
                class="el-icon-star-on"
                :style="{color:item.is_collected ? 'red' :''}"
                @click="collectoOrCancel(item)"
              ></i>
              <i class="el-icon-delete-solid" @click="delItem(item)"></i>
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
    // 上传图片
    uploadImg (params) {
      // 转换上传文件的类型
      let obj = new FormData() // 创建一个新的 FormData 对象。
      console.log(obj)
      obj.append('image', params.file)
      // FormData.append() 从向 FormData 中添加新的属性值，FormData 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。
      this.$axios({
        //   发送请求
        url: '/user/images',
        method: 'post',
        data: obj
      }).then(() => {
        this.getMaterial()
      })
    },
    // 删除数据
    delItem (item) {
      this.$confirm('您确定要删除此图片吗?', '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(() => {
          // 成功后 重新调用数据
          this.getMaterial()
        })
      })
      // 确定后发送请求
    },
    collectoOrCancel (item) {
      // 提示用户
      let msg = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${msg}收藏此图片吗?`, '提示').then(() => {
        // 确定后发送请求
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected } // 取反
        }).then(() => {
          this.getMaterial()
        })
      })
    },
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
        // console.log(res)
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
  position: relative;
  .upload-btn {
    position: absolute;
    right: 20px;
    top: 60px;
  }
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
