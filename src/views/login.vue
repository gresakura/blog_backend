<template>
  <div class="loginScreen">
    <div class="container">
      <div class="header_title">
        <h1 class="name">sakura</h1>
        <span class="description">欢迎来到个人博客后台</span>
      </div>
      <div class="botton_content">
        <img class="image" :src="login_img" alt="" />
        <div class="input_Info">
          <span class="Welcome">欢迎登录后台系统</span>
          <el-form
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="40px"
            :model="formData"
          >
            <el-form-item prop="account" label="账号">
              <el-input
                prefix-icon="el-icon-user"
                v-model="formData.account"
                clearable
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input
                prefix-icon="el-icon-lock"
                show-password
                v-model="formData.password"
                type="password"
                clearable
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btnLogin" type="primary" @click="handleLogin('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import login_img from '@/assets/images/login-left.png'
import { login } from '@/api/user'

export default {
  name: 'LoginView',
  data() {
    const accountRules = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账户不能为空'))
      } else {
        callback()
      }
    }

    const passwordRules = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }

    return {
      login_img,
      formData: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ validator: accountRules, trigger: 'blur' }],
        password: [{ validator: passwordRules, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('user/login', {
              ...this.formData
            })
            .then(() => {
              this.$notify.success({
                title: '登入成功', // 通知标题
                message: '欢迎回来', // 通知内容
                duration: 2000, // 显示时间，单位为毫秒，默认4500
                position: 'top-right' // 位置，可选 top-right, top-left, bottom-right, bottom-left
              })
              // 登录成功后跳转页面，优先跳转重定向路由
              const redirect = this.$route.query.redirect || '/'
              this.$router.push(redirect)
            })
            .catch(error => {
              // this.$notify.error({
              //   title: '登录失败',
              //   message: error.message || '请检查账号密码是否正确',
              //   duration: 2000,
              // })
            })
        } else {
          this.$notify.error({
            title: '账户或密码为空',
            message: '请输入账户和密码',
            duration: 2000
          })
          return false
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.loginScreen {
  width: 100%;
  min-height: 100vh;
  background: rgb(42, 44, 44);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 500px;
    background: rgb(42, 44, 44);
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    .header_title {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 55px;
      padding: 0 20px;

      .name {
        color: rgb(210, 198, 191);
        margin-right: 10px; // 添加右侧间距
      }

      .description {
        font-size: 13px;
        color: rgb(210, 198, 191);
      }
    }

    .botton_content {
      display: flex;
      flex-direction: row;
      flex: 1;
      overflow: hidden;

      .image {
        width: 50%; // 修改为百分比宽度
        object-fit: cover;
        padding: 40px;
      }

      .input_Info {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        padding: 0 20px;

        .Welcome {
          color: rgb(210, 198, 191);
          padding-bottom: 35px;
          font-size: 18px;
        }

        .el-form {
          .el-form-item {
            margin-bottom: 20px;

            .el-form-item__label {
              color: rgb(210, 198, 191);
            }

            .el-input {
              .el-input__inner {
                background-color: rgba(255, 255, 255, 0.1);
                border: none;
                color: rgb(210, 198, 191);
              }
            }
          }

          .el-button {
            width: 100%;
            // background-color: rgb(210, 198, 191);
            border: none;
            color: rgb(42, 44, 44);
          }
        }
      }
    }
  }
}

.el-form {
  ::v-deep .el-form-item__label {
    color: rgb(210, 198, 191) !important;
  }
}

.btnLogin {
  color: white !important;
}
</style>
