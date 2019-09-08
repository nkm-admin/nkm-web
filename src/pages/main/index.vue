<template>
  <el-container class="container">
    <el-aside width="250px" :class="[isCollapse && 'is-collapse']">
      <div class="logo flex-center">
        <img src="../../assets/images/logo.png" class="logo-img" alt="">
      </div>
      <side-menu :collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header height="60px">
        <el-row>
          <el-col :span="12" class="flex">
            <span class="collapse">
              <i v-if="isCollapse" class="el-icon-s-unfold" @click="isCollapse = false"></i>
              <i v-else class="el-icon-s-fold" @click="isCollapse = true"></i>
            </span>
            <bread-crumb class="flex-center m-l-15px" />
          </el-col>
          <el-col :span="10" class="t-right">
            <div class="user-info">
              <el-dropdown @command="_dropdown">
                <div class="user-name">
                  <img :src="userInfo.avatar" class="avatar" width="30" alt="">
                  <span>{{ userInfo.displayName }}</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-user" command="user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-s-promotion" divided command="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div :class="['wrapper', 'h-f-100', noPadding && 'no-padding', noBackground && 'no-background']">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from './components/SideMenu'
import BreadCrumb from './components/BreadCrumb'
import { mapState } from 'vuex'
import API from '@/api'
export default {
  name: 'Main',
  components: {
    SideMenu,
    BreadCrumb
  },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState('authen', ['userInfo']),
    noPadding () {
      const routerName = ['Role', 'Resource', 'Dictionary', 'PersonalCenter', 'Dashboard']
      return routerName.findIndex(v => v === this.$route.name) !== -1
    },
    noBackground () {
      const routerName = ['PersonalCenter', 'Dashboard']
      return routerName.findIndex(v => v === this.$route.name) !== -1
    }
  },
  methods: {
    async _dropdown (command) {
      /* eslint-disable */
      switch (command) {
        case 'user':
          this.$router.push({ name: 'PersonalCenter' })
          break
        case 'logout':
          window.common.showLoading('正在退出中...')
          await API.logout()
          window.common.hideLoading()
          this.$router.push({ name: 'Login' })
          this.$store.commit('authen/LOGOUT')
          break
      }
      /* eslint-disable */
    }
  }
}
</script>

<style lang="scss" scoped>
$color-main: #fff;
.el-aside {
  background-color: $color-main;
  box-shadow: $box-shadow;

  .logo {
    height: 60px;
    padding: 10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid $color-background;

    img {
      height: 40px;
      transition: .3s;
    }
  }
}

.el-aside {
  transition: .4s;
  &.is-collapse {
    width: 70px !important;

    .el-menu {
      width: 100% !important;
    }

    .logo-img {
      height: 30px;
    }
  }
}

.el-header {
  background-color: $color-main;
  box-shadow: 10px 0 10px rgba(0,0,0,.1);
  line-height: 60px;

  .collapse {
    font-size: 28px;
    cursor: pointer;
  }
}

.user-info {
  .user-name {
    cursor: pointer;
  }
  .avatar {
    margin-right: 10px;
    border-radius: 50%;
    vertical-align: middle;
  }
}

.wrapper {
  padding: $content-padding;
  box-sizing: border-box;
  overflow: auto;
  background-color: #fff;
  border-radius: $border-radius;

  &.no-padding {
    padding: 0;
  }

  &.no-background {
    background: none;
  }
}
</style>
