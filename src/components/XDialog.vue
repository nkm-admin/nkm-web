<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'XDialog'
}
</script>
