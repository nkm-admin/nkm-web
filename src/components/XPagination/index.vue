<template>
  <el-pagination
    background
    layout="total, prev, pager, next, jumper"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'XPagination'
}
</script>
