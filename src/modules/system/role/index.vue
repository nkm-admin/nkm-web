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
              default-expand-all
              :check-on-click-node="true"
              :auto-expand-parent="true"
              :expand-on-click-node="false"
              :check-strictly="false"
              :props="defaultProps"
              :render-content="_renderContent"
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
import { isEmpty, deepCopy } from '@/utils'
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
    ...mapState('system/resource', ['tree']),
    ...mapState('system/role', ['list']),
    isShowDeleteBtn () {
      return this.formModel.code !== 'systemAdministrator' && this.currentRole.name !== '新增角色'
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('system/role', ['getRoleList', 'saveRole', 'delRole']),
    async init () {
      window.common.showLoading('角色列表加载中...')
      // 获取资源树
      await this.$store.dispatch('system/resource/getResourceTree')

      // 获取角色列表
      await this.getRoleList()
      window.common.hideLoading()
    },

    _findChildrenCodes (data) {
      const permission = deepCopy(data.permission)
      const _deep = arr => {
        arr.forEach(item => {
          if (!isEmpty(item.children)) {
            const index = permission.indexOf(item.id)
            if (index !== -1) permission.splice(index, 1)
            _deep(item.children)
          }
        })
      }
      _deep(this.tree)
      return permission
    },

    _eidt (data) {
      this.$refs.tree.setCheckedKeys([])
      this.currentRole = data
      this.formModel.name = data.name
      this.formModel.code = data.code

      // 转换角色资源code
      this.$refs.tree.setCheckedKeys(this._findChildrenCodes(data))
    },

    async _del () {
      window.common.confirm({
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
          window.common.showLoading('保存中...')
          await this.saveRole({
            ...this.formModel,
            ids: [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()].join(','),
            id: this.currentRole.id
          })
          this.init()
          this._reset()
          window.common.hideLoading()
          window.common.showMessage({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    },

    _reset () {
      this.$refs.form.resetFields()
      this.$refs.tree.setCheckedKeys([])
      this.currentRole = {
        name: '新增角色'
      }
    },

    _renderContent (h, { node }) {
      return (
        <div class="custom-tree-node" style="flex: 1;">
          <div
            slot="reference"
            class={ ['tree-item', 'flex', `level-${node.level}`] }
          >
            <span class="tree-label flex-1">&nbsp;{ node.label }</span>
          </div>
        </div>
      )
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
    border-right: 1px solid var(--color-border);
    box-sizing: border-box;

    header {
      padding-bottom: 15px;
      border-bottom: 1px solid var(--color-border);
    }

    .item {
      padding: 5px;
      border-radius: 3px;

      &.is-active {
        background-color: var(--color-theme);
        color: #fff;
      }
    }
  }

  .role-detail {
    padding: $content-padding;

    .form-wrapper {
      border-bottom: 1px solid var(--color-border);
    }

    .el-form {
      width: 50%;
    }
  }
}
</style>
