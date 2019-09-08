<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      breadcrumb: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (router) {
        this.breadcrumb = []
        router.matched.forEach(({ meta }) => {
          this.breadcrumb.push(meta.title)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
