<template>
  <el-menu router unique-opened :collapse="collapse" :default-active="$route.path">
    <template v-for="menu in menu">
      <template v-if="menu.children && menu.children.length">
        <el-submenu :key="menu.id" :index="menu.url">
          <template #title>
            <template>
              <i v-if="menu.icon.indexOf('el-icon') !== -1" :class="menu.icon"></i>
              <x-icon v-else :type="menu.icon" />
            </template>
            <span class="title">{{ menu.name }}</span>
          </template>
          <el-menu-item v-for="submenu in menu.children" :key="submenu.id" :index="submenu.url">
            <template #title>
              <template>
                <i v-if="submenu.icon.indexOf('el-icon') !== -1" :class="submenu.icon"></i>
                <x-icon v-else :type="submenu.icon" />
              </template>
              <span class="title">{{ submenu.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
      <el-menu-item v-else :key="menu.id" :index="menu.url">
        <template>
          <i v-if="menu.icon.indexOf('el-icon') !== -1" :class="menu.icon"></i>
          <x-icon v-else :type="menu.icon" />
        </template>
        <template #title>
          <span class="title">{{ menu.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SideMenu',
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
}
</style>
