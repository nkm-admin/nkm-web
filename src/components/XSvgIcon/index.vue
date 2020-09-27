<template>
  <svg
    class="x-svg-icon"
    aria-hidden="true"
    :style="{
      ...customStyle,
      width,
      height,
      verticalAlign: align
    }"
  >
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
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: null
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
