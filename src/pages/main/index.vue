<template>
  <el-container class="container">
    <el-aside width="250px" :class="[isCollapse && 'is-collapse']">
      <div class="logo flex-center">
        <img src="../../assets/images/logo.png" class="logo-img" alt="">
      </div>
      <Menu :collapse="isCollapse" />
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

          <el-col :span="10" class="right-info flex align-right">
            <a href="https://github.com/nkm-admin" target="_blank" class="m-r-10px" style="display:inherit;">
              <x-svg-icon
                icon="github"
                :custom-style="{
                  fill: mode === 'dark' ? '#fff' : ''
                }"
              />
            </a>
            <!-- TODO: 黑夜模式适配还不完善，暂时取消适配 -->
            <!-- <div class="mode-btn m-r-10px align-center c-pointer">
              <el-tooltip effect="dark" content="模式切换" placement="bottom">
                <i v-if="mode === 'dark'" class="el-icon-sunny" @click="_toggleMode('day')"></i>
                <i v-else-if="mode === 'day'" class="el-icon-moon" @click="_toggleMode('dark')"></i>
              </el-tooltip>
            </div> -->
            <div class="user-info">
              <el-dropdown trigger="click" @command="_dropdown">
                <div class="user-name">
                  <img :src="userInfo.avatar || avatar" class="avatar" width="30" alt="">
                  <span>{{ userInfo.displayName }}</span>
                  <i class="m-l-5px el-icon-arrow-down"></i>
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
        <div :class="['wrapper', 'h-100', noPadding && 'no-padding', noBackground && 'no-background']">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './components/Menu'
import BreadCrumb from './components/BreadCrumb'
import { mapState } from 'vuex'
import { AVATAR } from '@/settings'
import API from '@/api'
export default {
  name: 'Main',
  components: {
    Menu,
    BreadCrumb
  },
  data () {
    return {
      isCollapse: false,
      avatar: AVATAR,
      mode: 'day'
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
  created () {
    this._toggleMode(localStorage.getItem('mode'))
  },
  methods: {
    async _dropdown (command) {
      /* eslint-disable */
      switch (command) {
        case 'user':
          this.$router.push({ name: 'PersonalCenter' })
          break
        case 'logout':
          this.$_D_common.showLoading('正在退出中...')
          await API.logout()
          this.$_D_common.hideLoading()
          this.$store.commit('authen/LOGOUT')
          this.$router.push({ name: 'Login' })
          break
      }
      /* eslint-disable */
    },

    _toggleMode (mode) {
      this.mode = mode === 'null' ? 'day' : mode
      document.querySelector('html').setAttribute('data-theme', mode)
      localStorage.setItem('mode', mode)
    }
  }
}
</script>

<style lang="scss" scoped>
$color-main: #fff;
.el-aside {
  background-color: var(--color-background-content);
  box-shadow: $box-shadow;

  .logo {
    height: 60px;
    padding: 10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);

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
  background-color: var(--color-background-content);
  box-shadow: 10px 0 10px rgba(0,0,0,.1);
  line-height: 60px;

  .collapse {
    font-size: 28px;
    cursor: pointer;
  }
}

.mode-btn {
  width: 30px;
  margin-right: 10px;
  font-size: 20px;
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
  background-color: var(--color-background-content);
  border-radius: $border-radius;

  &.no-padding {
    padding: 0;
  }

  &.no-background {
    background: none;
  }
}

.right-info {
  justify-content: flex-end;
  align-items: center;
}
</style>
