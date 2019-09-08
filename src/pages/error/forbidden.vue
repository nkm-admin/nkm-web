<template>
  <div class="container flex flex-center">
    <div class="img">
      <x-svg-icon type="icon-403-color"></x-svg-icon>
    </div>
    <div class="right">
      <h2 class="title">403</h2>
      <p>抱歉，您无权访问该页面</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forbidden',
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
