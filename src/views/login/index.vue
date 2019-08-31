<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单组件 el-form表单容器 -->
      <!-- 数据校验 首先要给el-form一个model属性 表示数据对象并绑定 -->
      <!-- 数据校验 首先要给el-form一个rules属性 表示数据规则并绑定 -->
      <!-- 整个表单的校验 先要用ref绑定这个对象  -->
      <el-form ref='abc' :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 表单项 prop绑定需要验证的字段名 但是不写loginForm.mobile -->
        <el-form-item prop="mobile" >
          <!-- 绑定数据对象中的mobile属性 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style='width:100%'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      if (value) {
        callback()// 如果value为true直接通过
      } else {
        callback(new Error('您必须同意'))// 如果不通过设置提示信息
      }
      //  自定义函数进行校验 (rule(当前规则),value(当前值),callback(回调函数))
    }
    return {
      loginForm: {// 数据对象
        mobile: '', // 手机号(数据对象),
        code: '', // 验证码,
        check: false // 将单选框设置成默认不选中
      },
      loginRules: {// 校验规则
        // key(字段名):value(数组对象=>多个=>一个字段上会有多个规则)
        mobile: [{
          required: true, // 必选项 后面的跟的是布尔值,true表示需要填
          message: '手机号不能为空'// 提示信息
        }, {
          pattern: /^1[3456789]\d{9}$/, // 用正则表达式限制输入内容的规则
          message: '手机号格式不正确'
        }],
        code: [{
          required: true, // 必选项 后面的跟的是布尔值,true表示需要填
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/, // 用正则表达式限制输入内容的规则
          message: '验证码必须为6位数字'
        }],
        check: [{
          // 自定义函数进行校验
          validator
        }]
      }
    }
  },
  methods: {
    // 给登录按钮添加事件
    login () {
      // 点击登录以后对整个表单进行验证
      // 通过的是el-form组件中的  validate方法
      // 参数为一个回调函数。该回调函数会在校验结束后被调用，
      // 并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise对象
      // Function(callback: Function(boolean, object))
      // console.log(this.$refs.abc)//获取到整个表单对象(dom对象)
      this.$refs.abc.validate(isOk => {
        if (isOk) {
          this.$message({ message: '成功',
            type: 'success' })
        } else {
          this.$message({ message: '手机号或者验证码错误',
            type: 'warning' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped >
//如果要用less格式写css就要在style标签上注明lang="less"
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
