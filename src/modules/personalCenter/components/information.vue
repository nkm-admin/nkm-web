<template>
  <div class="information">
    <el-form ref="infoForm" :model="formModel" :rules="formRules">
      <el-row :gutter="30" type="flex" justify="space-between">
        <el-col :span="8">
          <el-form-item label="昵称" prop="displayName">
            <el-input v-model="formModel.displayName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formModel.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="头像" class="avatar-text"></el-form-item>
          <p class="m-b-10px">
            <img :src="formModel.avatar" width="90" height="90" class="avatar" />
          </p>
          <el-upload
            action=""
            :disabled="uploadLoading"
            :show-file-list="false"
            :on-change="_chooseFile"
            :http-request="_uploadHeadPortrait"
          >
            <el-button icon="el-icon-camera" :loading="uploadLoading">上传头像</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="_updateInfo">更新基本信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { matchName, matchEmail } from '@/utils/regexp'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Information',
  data () {
    return {
      file: {},
      uploadLoading: false,
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
      }
    }
  },
  computed: {
    ...mapState('authen', ['userInfo'])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('personalCenter', ['upload', 'updateInfo']),

    init () {
      this.formModel.displayName = this.userInfo.displayName
      this.formModel.email = this.userInfo.email
      this.formModel.avatar = this.userInfo.avatar
    },

    _chooseFile ({ raw }) {
      this.file = raw
    },

    async _uploadHeadPortrait () {
      try {
        this.uploadLoading = true
        let [{ url }] = await this.upload({
          file: this.file,
          type: 'account'
        })
        this.uploadLoading = false
        this.formModel.avatar = url
      } catch (error) {
        this.uploadLoading = false
      }
    },

    // 更新基本信息
    _updateInfo () {
      this.$refs.infoForm.validate(async valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          await this.updateInfo(this.formModel)
          this.$store.commit('authen/UPDATE', this.formModel)
          this.$refs.infoForm.resetFields()
          this.init()
          window.common.showMessage({
            message: '信息更新成功',
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
/deep/ .avatar-text {
  margin-bottom: 0;
}

.avatar {
  border-radius: 8px;
}
</style>
