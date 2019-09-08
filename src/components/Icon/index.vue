<template>
  <i :class="type"></i>
</template>

<script>
export default {
  name: 'XIcon',
  props: {
    type: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
