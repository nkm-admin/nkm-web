<template>
  <el-dialog title="新增用户" :visible="value" @close="_reset">
    <el-form ref="form" :model="formModel" :rules="formRules" label-width="100px">
      <el-form-item label="登录账号" prop="loginName">
        <el-input v-model="formModel.loginName"></el-input>
      </el-form-item>
      <el-form-item label="账号名称" prop="displayName">
        <el-input v-model="formModel.displayName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="formModel.password" type="password" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item label="选择头像" prop="avatar">
        <div class="avatar-wrapper flex">
          <div
            v-for="(item, index) in avatarList"
            :key="index"
            :class="['avatar-list', selectedAvatarIndex === index && 'is-selected el-icon-success']"
            @click="_selectAvatar(index)"
          >
            <img :src="item" width="50">
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_save">保存</el-button>
        <el-button @click="_reset">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { matchPassword, matchName, matchLoginName } from '@/utils/regexp'
import { md5 } from '@/utils/crypto'
export default {
  name: 'Registered',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      avatarList: [],
      selectedAvatarIndex: 0,
      formModel: {
        loginName: '',
        displayName: '',
        password: '',
        email: '',
        avatar: ''
      },
      formRules: {
        loginName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              !matchLoginName(value) ? cb('账号格式不正确，只能包含英文字母和数字') : cb()
            },
            trigger: 'blur'
          }
        ],
        displayName: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              !matchName(value) ? cb('名称格式不正确，只能包含英文字母、数字、汉字') : cb()
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            validator (rule, value, cb) {
              value.length < 6 ? cb('用户密码不能少于6位') : cb()
            },
            trigger: 'blur'
          },
          {
            validator (rule, value, cb) {
              !matchPassword(value) ? cb('密码格式不正确，只能包含数字、字母和,./!@#$*&-符号') : cb()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this._loadAvatar()
  },
  methods: {
    ...mapActions('system/user', ['registered']),

    // 加载本地头像图片
    _loadAvatar () {
      const context = require.context('@/assets/images/avatar', false, /\.png$/)
      context.keys().forEach(path => {
        this.avatarList.push(context(path))
      })
    },

    // 选择头像
    _selectAvatar (i) {
      this.selectedAvatarIndex = i
    },

    _save () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          await this.registered({
            ...this.formModel,
            avatar: this.avatarList[this.selectedAvatarIndex],
            password: md5(this.formModel.password)
          })
          window.common.hideLoading()
          this._reset()
          this.$emit('on-success', true)
        }
      })
    },

    _reset () {
      this.$refs.form.resetFields()
      this.selectedAvatarIndex = 0
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  flex-wrap: wrap;

  .avatar-list {
    position: relative;
    margin: 0 5px 5px 0;

    &.is-selected {
      &:before {
        position: absolute;
        top: 0;
        right: 0;
        color: $color-success;
      }
    }
  }
}
</style>
