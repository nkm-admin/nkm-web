<template>
  <el-dialog v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'XDialog'
}
</script>

<style lang="scss" scoped>

</style>
