<template>
  <div class="container">
    <el-button type="primary" icon="el-icon-plus" class="m-b-15px" @click="isShowRegistered = true">新增用户</el-button>
    <registered v-model="isShowRegistered" @on-success="init" />
    <el-table :data="list" border class="w-100">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="loginName" label="登录账号"></el-table-column>
      <el-table-column prop="displayName" label="用户名称"></el-table-column>
      <el-table-column label="账号状态" width="100" align="center">
        <template v-slot="{ row }">
          <x-dot-tag v-if="row.status === 1" type="success">启用</x-dot-tag>
          <x-dot-tag v-else-if="row.status === 2" type="danger">禁用</x-dot-tag>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="150">
        <template v-slot="{ row }">{{ row.registeredTime | formatDate }}</template>
      </el-table-column>
      <el-table-column label="最后登录" width="150">
        <template v-slot="{ row }">{{ row.lastLoginTime | formatDate }}</template>
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template v-slot="{ row }">
          <template v-if="row.isSystemAdmin">
            <el-link type="primary" size="mini" @click="_allocationRole(row)">分配角色</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" size="mini" @click="_resetPassword(row.id)">重置密码</el-link>
          </template>
          <template v-else>
            <el-link type="primary" size="mini" @click="_allocationRole(row)">分配角色</el-link>
            <el-divider direction="vertical"></el-divider>
            <template>
              <el-link
                v-if="row.status === 1"
                type="primary"
                size="mini"
                :loading="row.btnLoading"
                @click="_modifyStatus(row, 2)"
              >
                禁用
              </el-link>
              <el-link
                v-else-if="row.status === 2"
                type="primary"
                size="mini"
                :loading="row.btnLoading"
                @click="_modifyStatus(row, 1)"
              >
                启用
              </el-link>
            </template>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" size="mini" @click="_modifyStatus(row, 3)">删除</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" size="mini" @click="_resetPassword(row.id)">重置密码</el-link>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色分配开始 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.isShow"
      @close="_reset"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="100px">
        <el-form-item label="选择角色" prop="role">
          <el-checkbox-group v-model="roleForm.role">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.code">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_saveRole">保存</el-button>
          <el-button @click="_reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 角色分配结束 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Registered from './components/registered'
export default {
  name: 'User',
  components: {
    Registered
  },
  data () {
    return {
      isShowRegistered: false, // 控制注册用户弹框是否显示
      list: [],
      dialog: {
        title: '',
        isShow: false
      },
      selectedUser: {}, // 当前选中的用户
      roleForm: {
        role: []
      },
      roleRules: {
        role: [
          { required: true, message: '请选择一个角色', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('system/role', {
      roleList: state => state.list
    })
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('system/user', ['getUserList', 'modifyStatus', 'resetPassword', 'allocationRole']),
    async init () {
      window.common.showLoading('用户列表加载中...')
      this.list = await this.getUserList()
      window.common.hideLoading()
    },

    // 显示角色弹窗
    _allocationRole (row) {
      this.dialog.title = `设置“${row.displayName}”的角色`
      this.dialog.isShow = true
      this.selectedUser = row
      this.roleForm.role = row.role
    },

    // 保存分配的角色
    _saveRole () {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          this.allocationRole({
            ...this.roleForm,
            id: this.selectedUser.id,
            role: this.roleForm.role.join(',')
          }).then(async () => {
            this._reset()
            window.common.showMessage({
              type: 'success',
              message: '保存成功'
            })
            window.common.showLoading('获取用户列表中...')
            this.list = await this.getUserList()
            window.common.hideLoading()
          }).catch(() => window.common.hideLoading())
        }
      })
    },

    // 启用、删除、禁用
    _modifyStatus (row, mark) {
      const request = () => {
        row.btnLoading = true
        this.modifyStatus({
          id: row.id,
          mark,
          loginName: row.userLoginName
        }).then(async () => {
          row.btnLoading = false
          window.common.showLoading('用户列表加载中...')
          this.list = await this.getUserList()
          window.common.hideLoading()
        }).catch(() => (row.btnLoading = false))
      }
      if (mark === 1) {
        request()
      } else {
        let message = ''
        if (mark === 2) {
          message = '是否禁用该用户？'
        } else if (mark === 3) {
          message = '是否删除该用户？'
        }
        window.common.confirm({
          title: '警告',
          message,
          type: 'warning',
          callback: action => {
            action === 'confirm' && request()
          }
        })
      }
    },

    // 重置密码
    _resetPassword (id) {
      window.common.confirm({
        title: '警告',
        message: '确认要将密码重置为：nkm-123456吗？',
        type: 'warning',
        callback: (action) => {
          if (action === 'confirm') {
            window.common.showLoading('密码重置中...')
            this.resetPassword({ id }).then(() => {
              window.common.hideLoading()
              window.common.showMessage({
                message: '重置成功，密码为：nkm-123456',
                type: 'success',
                showClose: true,
                duration: 0
              })
            }).catch(() => window.common.hideLoading())
          }
        }
      })
    },

    // 重置表单
    _reset () {
      this.$refs.roleForm.resetFields()
      this.dialog.title = ''
      this.dialog.isShow = false
      this.selectedUser = {}
      this.roleForm = {
        role: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
