<template>
  <div  
    ref="scroll"
    class="scroll">
    <slot/>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  props: {
    probetype: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    scrollx: {
      type: Boolean,
      default: false
    },
    listenscroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    pullingup: {
      type: Boolean,
      default: false
    },
    beforescroll: {
      type: Boolean,
      default: false
    },
    refreshdelay: {
      type: Number,
      default: 20
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshdelay)
      if (this.pullingup) {
        if (this.scroll) {
          this.scroll.finishPullUp()
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.scroll) {
        return
      }
      this.scroll = new Bscroll(this.$refs.scroll, {
        probeType: this.probetype,
        click: this.click,
        scrollX: this.scrollx,
        pullUpLoad: {
          threshold: 0
        }
      })

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrolltoend')
          }
        })
      }
      if (this.pulldown) {
        this.scroll.on('touchEnd', pos => {
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      }

      if (this.pullingup) {
        this.scroll.on('pullingUp', () => {
          // console.log('wwww')
          this.$emit('pullingup')
        })
      }

      if (this.beforescroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforescroll')
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  height: 100%;
  overflow: hidden;
}
</style>
