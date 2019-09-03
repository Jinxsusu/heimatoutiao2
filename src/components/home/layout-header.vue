<template>
  <!-- 用的flex布局 -->
  <el-row type="flex" justify="space-between" class="layout-header">
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold icon"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="3">
      <!-- 属性不给:就相当于字符串 -->
      <img :src="userInfo.photo ? userInfo.photo :defaultImg" alt />
      <el-dropdown trigger="click" @command="handleMenuItem">
        <!-- 绑定handleMenuItem"事件 -->
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <!-- 监听中的command事件,并且给 l-dropdown属性 附上值区分不同的 -->
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">Git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
      // 要把本地图片的路径转成base64字符串,不然读不出来
    }
  },
  methods: {
    // 发送请求获取用户数据
    getUserInfo () {
      // 发送请求
      this.$axios({
        url: '/user/profile'
      })
        .then(res => {
          this.userInfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击退出以后 退出登录
    handleMenuItem (command) {
      if (command === 'account') {
        console.log('账户信息')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/82heimatoutiao'
        // 点击的话触发跳转到对应的git地址
      } else if (command === 'lgout') {
        // 退出
        window.localStorage.clear() // 清空本地缓存
        this.$router.push('/login') // 编程式导航跳转到登录页
      }
    }
  },
  created () {
    // 一进入页面就要获取
    // 数据获取以后才渲染页面所有用created这个钩子函数
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  padding: 8px 0;
  .left {
    display: flex;
    align-items: center;
    width: 300px;
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
