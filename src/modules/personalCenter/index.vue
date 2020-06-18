<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <el-card class="setting-wrapper" shadow="never">
          <template #header>
            <i class="el-icon-s-operation"></i>
            <span>个人设置</span>
          </template>
          <ul class="list-wrapper">
            <li
              v-for="(item, index) in settingList"
              :key="index"
              :class="['item c-pointer', active === index && 'is-active']"
              @click="_toggle(index)"
            >
              {{ item }}
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="1">{{ '\u3000' }}</el-col>
      <el-col :span="17">
        <el-card shadow="never">
          <template #header>
            <h2 class="title f-s-18px">{{ title }}</h2>
          </template>
          <information v-show="title === '基本设置'" />
          <security v-show="title === '安全设置'" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import information from './components/information'
import security from './components/security'
export default {
  name: 'PersonalCenter',
  components: {
    information,
    security
  },
  data () {
    return {
      settingList: ['基本设置', '安全设置'],
      active: 0,
      title: '基本设置'
    }
  },
  methods: {
    _toggle (i) {
      this.active = i
      this.title = this.settingList[i]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .setting-wrapper {
    /deep/ .el-card__body {
      padding: 10px 0;
    }
    .list-wrapper {
      .item {
        padding: 10px 20px;

        &.is-active {
          background: var(--color-background);
          color: var(--color-theme);
        }
      }
    }
  }
}
</style>
