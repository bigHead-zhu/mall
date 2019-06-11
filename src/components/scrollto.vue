<template>
  <div class="scrollto">
    <slot />
  </div>
</template>
<script>
import common from '../plugins/common.js'
export default {
  props: {
    // 动态数据
    datalist: {
      type: Array,
      default: function() {
      	return false;
      }
    }
  },
  watch: {
    datalist() {
      this._getScrollH()
    }
  },
  mounted() {
    let that = this
    that.$nextTick(() => {
      that._getScrollH()
    })
  },
  methods: {
    _getScrollH() {
      let that = this
      let state = false
      document.body.onscroll = function() {
        let scrollTop = this.scrollY
        let clientH = document.querySelector('body').clientHeight
        let scrollcount = scrollTop + clientH
        let hs = document.documentElement.scrollHeight || document.body.scrollHeight
        that.$emit('scrollto', scrollTop)
        if (scrollcount >= hs) {
          that.$emit('scrollend', true)
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.scrollto {
  width: 100%;
  height: auto;
}
</style>
