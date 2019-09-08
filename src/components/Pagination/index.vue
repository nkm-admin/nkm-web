<template>
  <el-pagination
    background
    class="t-right"
    layout="prev, pager, next"
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
