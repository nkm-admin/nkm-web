<template>
  <div class="container flex min-h-100">
    <div class="role-list min-h-100">
      <header class="flex m-b-15px">
        <span class="flex-1 title">角色列表</span>
        <el-button icon="el-icon-plus" size="mini" @click="_reset"></el-button>
      </header>
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          :class="['item flex f-a-center c-pointer', currentRole.id === item.id && 'is-active']"
          @click="_eidt(item)"
        >
          <span class="item-text flex-1">{{ item.name }}</span>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>
    <div class="role-detail flex-1">
      <div class="form-wrapper m-b-10px">
        <el-form ref="form" :model="formModel" :rules="formRules" label-width="100px">
          <el-form-item>
            <span class="title">{{ currentRole.name }}</span>
            <i v-if="isShowDeleteBtn" class="el-icon-delete c-pointer" @click="_del"></i>
          </el-form-item>
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="formModel.code" :disabled="formModel.code === 'systemAdministrator'"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tree">
        <el-form label-width="100px">
          <el-form-item label="选择资源">
            <el-tree
              ref="tree"
              node-key="id"
              :data="tree"
              show-checkbox
              highlight-current
              :check-on-click-node="false"
              :default-expand-all="false"
              :auto-expand-parent="true"
              :expand-on-click-node="true"
              :check-strictly="true"
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Role',
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 当前选中的角色
      currentRole: {
        name: '新增角色'
      },
      formModel: {
        name: '',
        code: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('/system/resource', ['tree']),
    ...mapState('/system/role', ['list']),
    isShowDeleteBtn () {
      return this.formModel.code !== 'systemAdministrator' && this.currentRole.name !== '新增角色'
    }
  },
  created () {
    window.common.hideLoading()
  },
  methods: {
    ...mapActions('/system/role', ['getRoleList', 'saveRole', 'delRole']),
    async init () {
      // 获取资源树
      await this.$store.dispatch('/system/resource/getResourceTree')

      // 获取角色列表
      await this.getRoleList()
      window.common.hideLoading()
    },

    _eidt (data) {
      this.$refs.tree.setCheckedKeys([])
      this.currentRole = data
      this.formModel.name = data.name
      this.formModel.code = data.code
      // 转换角色资源code
      const keys = data.permission.split(',').map(item => +item)
      // 解决element-ui tree全选问题，如果有父级id会默认选中所有的子级，解决方案删除父级id
      // const deepDelParentId = arr => {
      //   arr.map(item => {
      //     if (item.children.length) {
      //       const index = keys.findIndex(v => v === item.id)
      //       if (index !== -1) keys.splice(index, 1)
      //       deepDelParentId(item.children)
      //     }
      //   })
      //   return arr
      // }
      // deepDelParentId(this.tree)
      this.$refs.tree.setCheckedKeys(keys)
    },

    async _del () {
      window.common.showConfirm({
        title: '警告',
        message: '确认要删除此角色吗？',
        type: 'warning',
        callback: async action => {
          if (action === 'confirm') {
            window.common.showLoading('正在删除中...')
            await this.delRole({
              id: this.currentRole.id
            })
            this.init()
            this._reset()
            window.common.hideLoading()
          }
        }
      })
    },

    // 保存
    _save () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const ids = this.$refs.tree.getCheckedNodes(false, true).map(item => item.id).join(',')
          window.common.showLoading('保存中...')
          await this.saveRole({
            ...this.formModel,
            ids,
            id: this.currentRole.id
          })
          this.init()
          this._reset()
          window.common.hideLoading()
        }
      })
    },

    _reset () {
      this.$refs.form.resetFields()
      this.$refs.tree.setCheckedKeys([])
      this.currentRole = {
        name: '新增角色'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    font-size: 18px;
  }
  .role-list {
    width: 20%;
    padding: $content-padding;
    border-right: 1px solid $color-border;
    box-sizing: border-box;

    header {
      padding-bottom: 15px;
      border-bottom: 1px solid $color-border;
    }

    .item {
      padding: 5px;
      border-radius: 3px;

      &.is-active {
        background-color: $color-theme;
        color: #fff;
      }
    }
  }

  .role-detail {
    padding: $content-padding;

    .form-wrapper {
      border-bottom: 1px solid $color-border;
    }

    .el-form {
      width: 50%;
    }
  }
}
</style>
