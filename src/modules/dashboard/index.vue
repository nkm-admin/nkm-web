<template>
  <div class="container">
    {{ test }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  data () {
    return {

    }
  },
  computed: {
    ...mapState('dashboard', ['test'])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('dashboard', ['getTest']),
    async init () {
      window.common.showLoading('仪表盘数据加载中...')
      await Promise.all([
        this.getTest({
          timestamp: Date.now()
        })
      ])
      window.common.hideLoading()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .item {
    &.expenditure {
      .content {
        position: relative;
        display: grid;
        grid-column-gap: 20px;

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: 0;
          width: 1px;
          height: 100%;
          background: $color-border;
        }

        &.item-2 {
          grid-template-columns: repeat(2, 1fr);
          &:before {
            display: none;
          }
          &:after {
            right: 50%;
          }
        }

        &.item-3 {
          grid-template-columns: repeat(3, 1fr);
          &:before {
            left: calc(100% / 3);
          }
          &:after {
            right: calc(100% / 3);
          }
        }
      }

      .money {
        margin-top: 10px;
      }
    }
  }
}
</style>
