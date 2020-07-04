<template>
  <svg class="x-svg-icon" aria-hidden="true" :style="customStyle">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>
<script>
export default {
  name: 'XSvgIcon',
  props: {
    icon: {
      type: String,
      default: '',
      required: true
    },
    customStyle: {
      type: Object,
      default: () => ({})
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
