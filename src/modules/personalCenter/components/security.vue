<template>
  <div class="security">
    <el-form ref="security" :model="securityForm" :rules="securityRules">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="新密码" prop="password">
            <el-input v-model="securityForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="vPassword">
            <el-input v-model="securityForm.vPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_updatePassword">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { matchPassword } from '@/utils/regexp'
import { mapActions } from 'vuex'
import { md5 } from '@/utils/crypto'
export default {
  name: 'Security',
  data () {
    return {
      securityForm: {
        password: '',
        vPassword: ''
      },
      securityRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              value.length < 6 ? cb('用户密码不能少于6位') : cb()
            },
            trigger: 'blur'
          },
          {
            validator (rule, value, cb) {
              !matchPassword(value) ? cb('密码格式不正确，只能包含数字、字母和,./!@#$*&等符号') : cb()
            },
            trigger: 'blur'
          }
        ],
        vPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              this.securityForm.vPassword !== this.securityForm.password ? cb('两次密码输入不一致') : cb()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions('personalCenter', ['modifyPassword']),
    // 修改密码
    _updatePassword () {
      this.$refs.security.validate(async valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          await this.modifyPassword({
            password: md5(this.securityForm.password)
          })
          window.common.showMessage({
            message: '密码修改成功',
            type: 'success'
          })
          window.common.hideLoading()
          this.$refs.security.resetFields()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
