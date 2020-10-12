<template>
  <div class="container">
    <div class="form-wrapper">
      <div class="logo align-center">
        <img src="../../assets/images/logo.png" width="60" alt="">
      </div>
      <el-form ref="form" :model="formModel" :rules="formRules" size="medium">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="formModel.loginName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formModel.password" type="password" :maxlength="16" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" :error="captchaErrorMsg">
          <el-input v-model="formModel.captcha" maxlength="4" @keyup.enter.native="_login">
            <template #append>
              <!-- eslint-disable-next-line -->
              <div class="c-pointer" v-html="svgCaptcha" @click="_getCaptcha"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="_login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { matchLoginName, matchPassword } from '@/utils/regexp'
export default {
  name: 'Login',
  data () {
    return {
      svgCaptcha: '',
      captchaToken: '',
      captchaErrorMsg: '',
      formModel: {
        loginName: '',
        password: '',
        captcha: ''
      },
      formRules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              return matchLoginName(value) ? cb() : cb('用户名格式不正确，只能包含字母与数字')
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              return matchPassword(value) ? cb() : cb('密码格式不正确')
            },
            trigger: 'blur'
          }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('authen', ['login', 'getCaptcha']),

    // 初始化，获取验证码
    async init () {
      let { token, image } = await this.getCaptcha()
      this.svgCaptcha = image
      this.captchaToken = token
    },

    // 切换验证码
    async _getCaptcha () {
      let { image } = await this.getCaptcha({
        token: this.captchaToken
      })
      this.svgCaptcha = image
    },

    _login () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          window.common.showLoading('登录中...')
          this.login({
            ...this.formModel,
            token: this.captchaToken
          }).then(async () => {
            window.common.showLoading('正在加载数据字典...')
            await this.$store.dispatch('system/dictionary/getTree')
            window.common.hideLoading()
            this.$router.replace({ name: 'Dashboard' })
          }).catch(error => {
            this._valid(error)
          })
        }
      })
    },

    _valid ({ code, message }) {
      if (code === '10010') this.captchaErrorMsg = message
      this._getCaptcha()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .form-wrapper {
    width: 350px;
    padding: 20px;
    background-color: var(--color-background-content);
    border-radius: $border-radius;
    box-shadow: $box-shadow;
  }
  .logo {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
