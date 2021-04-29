<template>
  <div class="container">
    <el-button type="primary" class="m-b-15px" @click="isShowRegistered = true">新增用户</el-button>

    <registered v-model="isShowRegistered" @on-success="reload" />

    <d-table ref="table" :request-method="init">
      <template v-slot:status="{ row }">
        <x-dot-tag v-if="row.status === 1" type="success">启用</x-dot-tag>
        <x-dot-tag v-else-if="row.status === 0" type="danger">禁用</x-dot-tag>
      </template>
      <template v-slot:registeredTime="{ row }">{{ row.registeredTime | formatDate }}</template>
      <template v-slot:lastLoginTime="{ row }">{{ row.lastLoginTime | formatDate }}</template>
      <template v-slot:operation="{ row }">
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
              @click="_modifyStatus(row, 0)"
            >
              禁用
            </el-link>
            <el-link
              v-else-if="row.status === 0"
              type="primary"
              size="mini"
              :loading="row.btnLoading"
              @click="_modifyStatus(row, 1)"
            >
              启用
            </el-link>
          </template>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" size="mini" @click="_delUser(row.id)">删除</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="primary" size="mini" @click="_resetPassword(row.id)">重置密码</el-link>
        </template>
      </template>
    </d-table>

    <!-- 角色分配开始 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.isShow"
      @close="_reset"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="100px">
        <el-form-item label="选择角色" prop="role">
          <el-checkbox-group v-model="roleForm.role">
            <el-checkbox
              v-for="item in roleList"
              :key="item.id"
              :label="item.code"
              :disabled="!!selectedUser.isSystemAdmin && item.code === 'systemAdministrator'"
            >
              {{ item.name }}
            </el-checkbox>
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
import API from '@/api'
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
  methods: {
    ...mapActions('system/user', ['modifyStatus', 'resetPassword', 'allocationRole', 'delUser']),

    async init(params) {
      this.$_Dcommon.showLoading('用户列表加载中...')
      const { data, count } = await API['system/user'].getUserList(params)
      data.map(item => {
        item.btnLoading = false
      })
      this.$_Dcommon.hideLoading()
      return {
        header: [
          { name: '序号', type: 'index', align: 'center' },
          { name: '登录账号', column: 'loginName' },
          { name: '用户名称', column: 'displayName' },
          { name: '账号状态', column: 'status', width: 100, align: 'center'  },
          { name: '注册时间', column: 'registeredTime', width: 150, align: 'center'  },
          { name: '最后登录', column: 'lastLoginTime', width: 150, align: 'center'  },
          { name: '操作', column: 'operation', width: 260, align: 'center'  }
        ],
        data,
        count
      }
    },

    reload() {
      this.$refs.table.reload()
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
          this.$_Dcommon.showLoading('保存中...')
          this.allocationRole({
            ...this.roleForm,
            id: this.selectedUser.id,
            role: this.roleForm.role.join(',')
          }).then(async () => {
            this._reset()
            this.$_Dcommon.showMessage({
              type: 'success',
              message: '保存成功'
            })
            this.reload()
          }).catch(() => this.$_Dcommon.hideLoading())
        }
      })
    },

    _delUser (id) {
      this.$_Dcommon.confirm({
        title: '警告',
        message: '确认删除该用户吗？',
        type: 'warning',
        callback: async action => {
          if (action === 'confirm') {
            await this.delUser({
              id
            })
            this.$_Dcommon.showMessage({
              type: 'success',
              message: '用户删除成功'
            })
            this.init()
          }
        }
      })
    },

    // 启用、禁用
    _modifyStatus (row, status) {
      this.$_Dcommon.confirm({
        title: '警告',
        message: `是否${status ? '启用' : '禁用'}该用户？`,
        type: 'warning',
        callback: async action => {
          if (action === 'confirm') {
            row.btnLoading = true
            this.modifyStatus({
              id: row.id,
              status,
            }).then(async () => {
              row.btnLoading = false
              this.reload()
            }).catch(() => (row.btnLoading = false))
          }
        }
      })
    },

    // 重置密码
    _resetPassword (id) {
      this.$_Dcommon.confirm({
        title: '警告',
        message: '确认要将密码重置为：nkm-123456吗？',
        type: 'warning',
        callback: (action) => {
          if (action === 'confirm') {
            this.$_Dcommon.showLoading('密码重置中...')
            this.resetPassword({ id }).then(() => {
              this.$_Dcommon.hideLoading()
              this.$_Dcommon.showMessage({
                message: '重置成功，密码为：nkm-123456',
                type: 'success',
                showClose: true,
                duration: 5000
              })
            }).catch(() => this.$_Dcommon.hideLoading())
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
        role: []
      }
    }
  }
}
</script>
