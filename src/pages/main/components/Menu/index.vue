<template>
  <el-menu
    router
    unique-opened
    :collapse="collapse"
    :default-active="$route.path"
  >
    <menu-item :menu="menu" />
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import MenuItem from './menuItem'
export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('authen', ['menu'])
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border: 0;

  &.el-menu--collapse {
    ::v-deep .el-submenu {
      .title,
      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
}
</style>
