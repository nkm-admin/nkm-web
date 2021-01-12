<template>
  <div class="container">
    <div class="tree-wrapper">
      <el-button type="primary" class="m-b-15px" @click="_add(null)">新增节点</el-button>
      <el-table
        :data="tree"
        border
        row-key="id"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="编码" align="center"></el-table-column>
        <el-table-column prop="path" label="链接" align="center"></el-table-column>
        <el-table-column label="类型" width="100" align="center">
          <template v-slot="{ row }">
            <el-tag :type="row.type | tagType">{{ row.type | type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="图标" width="60" align="center">
          <template v-slot="{ row }">
            <i :class="row.icon" style="font-size: 18px"></i>
          </template>
        </el-table-column>
        <el-table-column label="启用" width="80" align="center">
          <template v-slot="{ row }">
            <x-dot-tag v-if="row.enabled" type="success">是</x-dot-tag>
            <x-dot-tag v-else type="danger">否</x-dot-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template v-slot="{ row }">{{ row.createTime | formatDate }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="{ row }">
            <el-link size="mini" type="primary" @click="_add(row.id)">添加</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link size="mini" type="primary" @click="_edit(row)">编辑</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link size="mini" type="primary" @click="_del(row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <edit
        :visible.sync="isShowEdit"
        :resource-tree="tree"
        :parent-id.sync="editParentId"
        :data.sync="editData"
        @success="init"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { sortTreeArr, deepTree } from '@/utils'
import Edit from './components/edit'
export default {
  name: 'Resource',
  filters: {
    type (val) {
      const type =  {
        'system:resource:menu': '菜单',
        'system:resource:page': '页面',
        'system:resource:btn': '按钮',
        'system:resource:api': '接口',
        'placeholder': '占位'
      }
      return type[val]
    },

    tagType (val) {
      const type = {
        'system:resource:menu': '',
        'system:resource:page': 'success',
        'system:resource:btn': 'warning',
        'system:resource:api': 'danger'
      }
      return type[val]
    }
  },
  components: {
    Edit
  },
  data () {
    return {
      value: '13',
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isShowEdit: false,
      editParentId: 0,
      editData: {}
    }
  },
  computed: {
    ...mapState('system/resource', ['list'])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('system/resource', ['getResourceList', 'saveResource', 'delResource']),
    async init () {
      window.common.showLoading('资源列表加载中...')
      let data = await this.getResourceList()
      window.common.hideLoading()
      this.tree = sortTreeArr(deepTree(data))
    },

    // 新增资源
    _add (id) {
      this.title = '新增资源'
      this.isShowEdit = true
      this.editParentId = id
    },

    _edit (data) {
      this.title = '新增资源'
      this.isShowEdit = true
      this.editData = data
    },

    // 删除资源
    _del (id) {
      window.common.confirm({
        title: '警告',
        message: '确认删除该资源吗？',
        type: 'warning',
        callback: async action => {
          if (action === 'confirm') {
            window.common.showLoading('删除中...')
            await this.delResource({ id })
            this.getResourceList()
            window.common.hideLoading()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
}
.tree-wrapper {
  padding: $content-padding;
  box-sizing: border-box;
}
</style>
