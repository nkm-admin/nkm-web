<template>
  <div class="x-table-container">
    <div v-if="$slots.header" class="header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.btnGroup" class="btn-group">
      <slot name="btnGroup"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div v-if="$slots.pagination" class="pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XTableContainer'
}
</script>

<style lang="scss" scoped>
.x-table-container {
  .header {
    margin-bottom: 15px;
    border-bottom: 1px solid $color-border;
  }
  .content {
    margin: 15px auto;
  }
}
</style>
