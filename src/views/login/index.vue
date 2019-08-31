<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单组件 el-form表单容器 -->
      <el-form style="margin-top:20px">
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped >
// 如果要用less格式写css就要在style标签上注明lang="less"
//默认情况下vue单文件的style样式是全局的(如果类名相同的话就会覆盖掉)
//解决方法:在style标签上加上scoped属性就只会对当前组件上的html起作用
//scoped和插槽上的scoped-slot没有任何关系
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  width: 100%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 350px;
    .logo {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
