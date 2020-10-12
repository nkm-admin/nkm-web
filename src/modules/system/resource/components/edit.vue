<template>
  <x-dialog :visible="visible" :title="title" width="600px" @close="_close">
    <div class="edit-wrapper">
      <el-form ref="form" :model="formModel" :rules="formRules" label-width="100px">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="formModel.name"></el-input>
        </el-form-item>
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="formModel.code"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select v-model="formModel.type" clearable class="w-100" placeholder="请选择资源类型">
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
          <el-select
            v-model="formModel.parentId"
            clearable
            filterable
            placeholder="请选择父级资源"
            class="w-100"
          >
            <el-option
              v-for="item in resourceList"
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
          <el-select v-model="formModel.icon" clearable filterable class="w-100">
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
        <el-form-item label="是否启用" prop="enabled">
          <el-checkbox v-model="formModel.enabled" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_save">保存</el-button>
          <el-button @click="_close">关闭</el-button>
        </el-form-item>
      </el-form>
    </div>
  </x-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ResourceEdit',
  props: {
    title: {
      type: String,
      default: '新增资源'
    },
    visible: {
      type: Boolean,
      default: false
    },
    parentId: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => ({})
    },
    resourceList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      formModel: {
        name: '',
        code: '',
        parentId: '',
        parentCode: '',
        path: '',
        icon: '',
        enabled: 1,
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
    ...mapGetters('system/dictionary', ['getDictionary']),
    resourceTypeList () {
      return this.getDictionary('system:resource:type')
    },
    iconList () {
      return Object.keys(this.$style).reverse().filter(item => {
        return item !== 'el-icon--right' && item !== 'rotating' && item !== 'el-icon--left' && item !== 'x-iconfont'
      })
    }
  },
  watch: {
    parentId (num) {
      this.formModel.parentId = num
    },

    visible (val) {
      if (val) {
        for (const [_key, _value] of Object.entries(this.data)) {
          this.formModel[_key] = _value
        }
      }
    }
  },
  methods: {
    ...mapActions('system/resource', ['saveResource']),
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
            this.$emit('success')
            this._close()
          })
        }
      })
    },

    // 重置表单
    _reset () {
      this.$refs.form.resetFields()
      this.formModel = this.$options.data().formModel
    },

    _close () {
      this._reset()
      this.$emit('update:visible', false)
      this.$emit('update:data', {})
      this.$emit('update:parentId', 0)
    }
  }
}
</script>

<style lang="scss" module>
$--font-path: '../../../../../node_modules/element-ui/lib/theme-chalk/fonts';
@import "../../../../../node_modules/element-ui/packages/theme-chalk/src/icon";
@import "../../../../assets/scss/iconfont";
</style>
<style lang="scss" scoped>

</style>
