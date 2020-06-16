<template>
  <div :class="['dot-tag', `tag-${type}`]">
    <i class="tag-dot"></i>
    <span class="tag-text"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'XDotTag',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dot-tag {
  &.tag-success {
    .tag-dot {
      background: $color-success;
    }
  }
  &.tag-warning {
    .tag-dot {
      background: $color-warning;
    }
  }
  &.tag-danger {
    .tag-dot {
      background: $color-error;
    }
  }
  .tag-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 5px;
    border-radius: 50%;
    background: #e8eaec;
  }

  .tag-text {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
