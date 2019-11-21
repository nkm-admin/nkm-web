<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <el-card class="setting-wrapper" shadow="never">
          <template #header>
            <i class="el-icon-s-operation"></i>
            <span>个人设置</span>
          </template>
          <ul class="list-wrapper">
            <li
              v-for="(item, index) in settingList"
              :key="index"
              :class="['item c-pointer', active === index && 'is-active']"
              @click="_toggle(index)"
            >
              {{ item }}
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="17">
        <el-card shadow="never">
          <template #header>
            <h2 class="title f-s-18px">{{ title }}</h2>
          </template>
          <template>
            <el-form v-show="title === '基本设置'" ref="infoForm" :model="formModel" :rules="formRules">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="昵称" prop="displayName">
                    <el-input v-model="formModel.displayName"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formModel.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="_updateInfo">更新基本信息</el-button>
              </el-form-item>
            </el-form>

            <el-form v-show="title === '安全设置'" ref="security" :model="securityForm" :rules="securityRules">
              <el-row>
                <el-col :span="12">
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
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { matchName, matchEmail, matchPassword } from '@/utils/regexp'
import API from '@/api'
export default {
  name: 'PersonalCenter',
  data () {
    return {
      settingList: ['基本设置', '安全设置'],
      active: 0,
      title: '基本设置',
      formModel: {
        displayName: '',
        email: '',
        avatar: ''
      },
      formRules: {
        displayName: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              !matchName(value) ? cb('名称格式不正确，只能包含英文字母、数字、汉字') : cb()
            },
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              !matchEmail(value) ? cb('邮箱格式不正确') : cb()
            },
            trigger: 'blur'
          }
        ]
      },
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
  computed: {
    ...mapState('authen', ['userInfo'])
  },
  created () {
    this.formModel.displayName = this.userInfo.displayName
    this.formModel.email = this.userInfo.email
  },
  methods: {
    _toggle (i) {
      this.active = i
      this.title = this.settingList[i]
      this.$refs.infoForm.resetFields()
      this.$refs.security.resetFields()
    },

    // 更新基本信息
    _updateInfo () {
      this.$refs.infoForm.validate(async valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          await API.updateInfo(this.formModel)
          this.$store.commit('authen/UPDATE', {
            displayName: this.formModel.displayName,
            email: this.formModel.email
          })
          window.common.showMessage({
            message: '信息更新成功',
            type: 'success'
          })
          window.common.hideLoading()
        }
      })
    },

    // 修改密码
    _updatePassword () {
      this.$refs.security.validate(async valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          await API.modifyPassword({
            password: this.securityForm.password
          })
          window.common.showMessage({
            message: '密码修改成功',
            type: 'success'
          })
          window.common.hideLoading()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-wrapper {
  /deep/ .el-card__body {
    padding: 10px 0;
  }
  .list-wrapper {
    .item {
      padding: 10px 20px;

      &.is-active {
        background: #F2FAFE;
        color: #5999EB;
      }
    }
  }

  .btn-upload {
    position: relative;
    width: 100%;
    height: 90px;
    border: 1px dashed $color-border;
    border-radius: 5px;
    box-sizing: border-box;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 30px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
