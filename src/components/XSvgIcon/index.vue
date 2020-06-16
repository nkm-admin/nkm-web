<template>
  <svg class="x-svg-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>
<script>
export default {
  name: 'XSvgIcon',
  props: {
    type: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.x-svg-icon {
  width: 24px;
  height: 24px;
}
</style>
