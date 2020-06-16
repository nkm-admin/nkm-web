<template>
  <div>
    <template v-for="item in menu">
      <template v-if="item.children && item.children.length">
        <el-submenu :key="item.id" :index="item.path">
          <template #title>
            <template>
              <i v-if="item.icon.indexOf('el-icon') !== -1" :class="item.icon"></i>
              <x-icon v-else :type="item.icon" />
            </template>
            <span class="title">{{ item.name }}</span>
          </template>
          <menu-item :menu="item.children" />
        </el-submenu>
      </template>
      <el-menu-item v-else :key="item.id" :index="item.path">
        <template>
          <i v-if="item.icon.indexOf('el-icon') !== -1" :class="item.icon"></i>
          <x-icon v-else :type="item.icon" />
        </template>
        <template #title>
          <span class="title">{{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
