<template>
  <div class="flex container h-f-100">
    <div class="tree-wrapper h-f-100 o-y-scroll">
      <el-button type="primary" icon="el-icon-plus" class="m-b-15px" @click="_add">新增节点</el-button>
      <el-button-group class="m-b-15px">
        <el-button
          v-for="(item, index) in btnGroup"
          :key="index"
          :type="currentBtn === index ? 'primary' : ''"
          @click="_toggleTree(index, item.code)"
        >
          {{ item.label }}
        </el-button>
      </el-button-group>
      <el-tree
        ref="tree"
        node-key="id"
        :data="tree"
        check-strictly
        show-checkbox
        highlight-current
        default-expand-all
        :check-on-click-node="false"
        :expand-on-click-node="false"
        :props="defaultProps"
        :render-content="_renderContent"
        :filter-node-method="_filterTree"
        @check="_setCheckNodes"
        @node-click="_selectedCurrentNode"
      >
      </el-tree>
    </div>
    <div class="edit-wrapper h-f-100 o-y-scroll flex-1">
      <el-form ref="form" :model="formModel" :rules="formRules" label-width="100px">
        <el-form-item>
          <h2 class="title">{{ title }}</h2>
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="formModel.name"></el-input>
        </el-form-item>
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="formModel.code"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select v-model="formModel.type" clearable class="w-f-100" placeholder="请选择资源类型">
            <el-option
              v-for="item in resourceTypeList"
              :key="item.id"
              :value="item.code"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级资源" prop="parentId">
          <el-select v-model="formModel.parentId" clearable filterable placeholder="请选择父级资源" class="w-f-100">
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
        <el-form-item label="地址" prop="path">
          <el-input v-model="formModel.path"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="formModel.icon" clearable filterable class="w-f-100">
            <el-option
              v-for="(item, index) in iconList"
              :key="index"
              class="flex-center"
              :value="item"
            >
              <p class="flex-1">{{ item }}</p>
              <template>
                <x-icon v-if="item.indexOf('el-icon') === -1" :type="item" />
                <p v-else :class="item"></p>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formModel.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
          <el-checkbox v-model="formModel.enable" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Resource',
  data () {
    return {
      title: '新增资源',
      iconList: [],
      flatList: [], // 转换树形数据为一维数组
      btnGroup: [
        {
          label: '全部',
          code: 'all'
        },
        {
          label: '菜单',
          code: 'system:resource:menu'
        },
        {
          label: '页面',
          code: 'system:resource:page'
        },
        {
          label: '按钮',
          code: 'system:resource:btn'
        },
        {
          label: '接口',
          code: 'system:resource:api'
        }
      ],
      currentBtn: 0,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      formModel: {
        name: '',
        code: '',
        parentId: '',
        parentCode: '',
        path: '',
        icon: '',
        enable: 1,
        sort: 0,
        type: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入资源编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择一个资源类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('/system/resource', ['tree']),
    ...mapGetters('/system/dictionary', ['getDictionary']),
    resourceTypeList () {
      return this.getDictionary('system:resource')
    }
  },
  created () {
    this.init()
    this.iconList = Object.keys(this.$style).reverse().filter(item => {
      return item !== 'el-icon--right' && item !== 'rotating' && item !== 'el-icon--left' && item !== 'x-iconfont'
    })
  },
  methods: {
    ...mapActions('/system/resource', ['getResourceTree', 'saveResource', 'delResource']),
    async init () {
      await this.getResourceTree()
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

    _toggleTree (index, code) {
      this.currentBtn = index
      this.$refs.tree.filter(code)
    },

    // 过滤
    _filterTree (value, data) {
      if (value === 'all') return true
      return data.type.indexOf(value) !== -1
    },

    // 当前选中的节点
    _setCheckNodes (data) {
      this.title = '编辑资源'
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
        parentCode: '',
        path: '',
        icon: '',
        enable: 1,
        sort: 0,
        type: ''
      }
    },

    // 新增资源
    _add (e, data = {}) {
      e.stopPropagation()
      this.title = '新增资源'
      this._reset()
      if (data.id) this.formModel.parentId = data.id
      this.$refs.tree.setCheckedNodes([data])
    },

    // 删除资源
    async _del (e, id) {
      e.stopPropagation()
      window.common.showLoading('删除中...')
      await this.delResource({ id })
      this.getResourceTree()
      window.common.hideLoading()
    },

    // 保存
    _save () {
      this.$refs.form.validate(valid => {
        if (valid) {
          window.common.showLoading('保存中...')
          this.saveResource({
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

<style lang="scss" module>
$--font-path: '../../../../node_modules/element-ui/lib/theme-chalk/fonts';
@import "../../../../node_modules/element-ui/packages/theme-chalk/src/icon";
@import "../../../assets/scss/iconfont";
</style>
<style lang="scss" scoped>
.container {
  overflow: hidden;
}
.tree-wrapper {
  width: 30%;
  padding: $content-padding;
  box-sizing: border-box;
  border-right: 1px solid $color-border;
}
.edit-wrapper {
  padding: $content-padding;
  box-sizing: border-box;
  .title {
    font-size: 18px;
  }
  .el-form {
    width: 400px;
  }
}
</style>
