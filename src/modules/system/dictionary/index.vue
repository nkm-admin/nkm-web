<template>
  <div class="flex container min-h-100">
    <div class="tree-wrapper min-h-100">
      <el-button type="primary" icon="el-icon-plus" class="m-b-15px" @click="_add">新增节点</el-button>
      <el-tree
        ref="tree"
        node-key="id"
        :data="tree"
        check-strictly
        show-checkbox
        highlight-current
        :default-expand-all="false"
        :check-on-click-node="false"
        :expand-on-click-node="false"
        :props="defaultProps"
        :render-content="_renderContent"
        @check="_setCheckNodes"
        @node-click="_selectedCurrentNode"
      >
      </el-tree>
    </div>
    <div class="edit-wrapper">
      <el-form ref="form" :model="formModel" :rules="formRules" label-width="100px">
        <el-form-item>
          <h2 class="title">{{ title }}</h2>
        </el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formModel.name"></el-input>
        </el-form-item>
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="formModel.code"></el-input>
        </el-form-item>
        <el-form-item label="父级字典" prop="parentId">
          <el-select v-model="formModel.parentId" clearable filterable placeholder="请选择父级字典" class="w-f-100">
            <el-option :value="0" label="无"></el-option>
            <el-option
              v-for="item in flatList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formModel.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dictionary',
  data () {
    return {
      title: '新增字典',
      flatList: [], // 转换树形数据为一维数组
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      formModel: {
        name: '',
        code: '',
        parentId: 0,
        sort: 0
      },
      formRules: {
        name: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入字典编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择一个字典类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('system/dictionary', ['tree'])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('system/dictionary', ['getTree', 'save', 'del']),
    async init () {
      window.common.showLoading('数据字典加载中...')
      await this.getTree()
      window.common.hideLoading()
      this.flatList = []
      const deepArray = arr => {
        arr.forEach(item => {
          if (item.children.length) deepArray(item.children)
          this.flatList.push(item)
        })
      }
      deepArray(this.tree)
    },

    // 自定义tree结构
    _renderContent (h, { node, data }) {
      return (
        <div class="custom-tree-node" style="flex: 1;">
          <div
            slot="reference"
            class={ ['tree-item', 'flex', `level-${node.level}`] }
          >
            <span class="tree-label flex-1">&nbsp;{ node.label }</span>
            <el-tooltip content="添加子节点" placement="bottom" enterable={ false }>
              <i class="el-icon-circle-plus-outline" onclick={ $event => this._add($event, data) }></i>
            </el-tooltip>
            <el-tooltip content="删除子节点" placement="bottom" enterable={ false }>
              <i class="m-l-10px el-icon-circle-close" onclick={ $event => this._del($event, data.id) }></i>
            </el-tooltip>
          </div>
        </div>
      )
    },

    // 当前选中的节点
    _setCheckNodes (data) {
      this.title = '编辑字典'
      this.$refs.tree.setCheckedNodes([data])
      this.formModel = Object.assign({}, this.formModel, data)
    },

    // 当前点击的节点
    _selectedCurrentNode (data) {
      this._setCheckNodes(data)
    },

    // 重置表单
    _reset () {
      this.$refs.form.resetFields()
      this.formModel = {
        name: '',
        code: '',
        parentId: '',
        sort: 0
      }
    },

    // 新增字典
    _add (e, data = {}) {
      e.stopPropagation()
      this.title = '新增字典'
      this._reset()
      if (data.id) this.formModel.parentId = data.id
      this.$refs.tree.setCheckedNodes([data])
    },

    // 删除字典
    async _del (e, id) {
      e.stopPropagation()
      window.common.showLoading('删除中...')
      await this.del({ id })
      this.getTree()
      window.common.hideLoading()
    },

    // 保存
    _save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          this.save({
            ...this.formModel,
            parentId: this.formModel.parentId || 0
          }).then(() => {
            window.common.hideLoading()
            this._reset()
            this.init()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 $content-padding;
}
.tree-wrapper {
  width: 25%;
  padding: $content-padding $content-padding $content-padding 0;
  border-right: 1px solid var(--color-border);
}
.edit-wrapper {
  padding: $content-padding;
  .title {
    font-size: 18px;
  }
  .el-form {
    width: 400px;
  }
}
</style>
