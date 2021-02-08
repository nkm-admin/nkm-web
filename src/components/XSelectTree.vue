<template>
  <el-select
    ref="select"
    :value="innerValue"
    :placeholder="placeholder"
    popper-class="x-select-tree"
    :clearable="clearable"
    @clear="_clear"
  >
    <el-option :value="value" :label="checkedLabel">
      <el-tree
        ref="tree"
        :data="data"
        :props="innerTreeProps"
        :node-key="valueKey"
        show-checkbox
        check-strictly
        check-on-click-node
        @check="_change"
      />
    </el-option>
  </el-select>
</template>

<script>
import { deepCopy, isEmpty } from '@/utils'
export default {
  name: 'XSelectTree',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    treeProps: {
      type: Object,
      default: () => ({})
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    separator: {
      type: String,
      default: '-'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      checkedLabel: ''
    }
  },

  computed: {
    innerTreeProps() {
      return {
        value: 'id',
        label: 'label',
        children: 'children',
        parentId: 'parentId',
        ...this.treeProps
      }
    },

    innerValue() {
      return this.value
    }
  },

  created() {
    this._watchValueAndData()
  },

  methods: {
    _watchValueAndData() {
      this.$watch(() => {
        return {
          value: this.value,
          data: this.data
        }
      }, ({ value, data }) => {
        if (!isEmpty(value)) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([value])
            this.checkedLabel = this._findLabelByValue(value, data)
          })
        }
      }, {
        immediate: true
      })
    },

    _change(node) {
      const value = node[this.innerTreeProps.value]
      this.$refs.tree.setCheckedKeys([value])
      this.$emit('input', value + '')
      this.$refs.select.blur()
    },

    _clear() {
      this.$refs.tree.setCheckedKeys([])
      this.checkedLabel = ''
      this.$emit('input', '')
    },

    // 通过value查找路径名称
    _findLabelByValue(value, data) {
      let path = []
      let isContinue = true
      const deep = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i]
          const children = item[this.innerTreeProps.children]
          if (item[this.innerTreeProps.value] == value) {
            path.push(item[this.innerTreeProps.parentId])
            path.push(item[this.innerTreeProps.value])
            isContinue = false
            throw new Error('success')
          }
          if (isContinue) {
            if (Array.isArray(children) && children.length) {
              path.push(item[this.innerTreeProps.parentId])
              deep(children)
            } else {
              path = []
            }
          }
        }
      }
      try {
        deep(data)
      } catch (err) {
        if (err.message === 'success') {
          path = [...new Set(path)]
          const flatData = this._flat(data)
          let labels = path.map(item => {
            const flat = flatData.find(_flat => item == _flat[this.innerTreeProps.value])
            item = flat ? flat[this.innerTreeProps.label] : ''
            return item
          })
          return labels.join(this.separator).replace(new RegExp(`^${this.separator}|${this.separator}$`), '')
        }
      }
    },

    // 打平数组
    _flat(arr) {
      const result = []
      const deep = arr => {
        arr.forEach(item => {
          const children = item[this.innerTreeProps.children]
          item.children = []
          result.push(item)
          if (Array.isArray(children) && children.length) deep(children)
        })
      }
      deep(deepCopy(arr))
      return result
    }
  }
}
</script>

<style lang="scss">
.x-select-tree {
  .el-select-dropdown__item {
    height: auto !important;
    padding: 0;

    &.selected {
      font-weight: initial;
    }
  }
}
</style>
