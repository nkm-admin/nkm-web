<template>
  <div class="container flex flex-center">
    <div class="img">
      <x-svg-icon icon="icon-404-color"></x-svg-icon>
    </div>
    <div class="right">
      <h2 class="title">404</h2>
      <p>哇哦，页面不见了</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome () {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./error";
</style>
