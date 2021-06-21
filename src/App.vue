<template>
  <div
    id="app"
    v-loading.fullscreen.lock="widget.loading.show"
    :element-loading-text="widget.loading.text"
    :element-loading-background="widget.loading.background"
    element-loading-spinner="el-icon-loading"
  >
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'widget'
    ])
  }
}
</script>
