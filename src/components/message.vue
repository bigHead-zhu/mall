<template>
  <div v-show="showMask">
    <!-- 提示弹框 -->
    <div
      v-if="type=='confirm'"
      class="dialog">
      <div class="dialog-container">
        <div class="dialog-title">{{ title }}</div>
        <div
          class="content"
          v-html="content"/>
        <div class="btns">
          <div
            class="default-btn"
            @click="closeBtn">
            {{ canceltext }}
          </div>
          <div
            class="confirm-btn"
            @click="confirmBtn">
            {{ confirmtext }}
          </div>
        </div>
        <div
          class="close-btn"
          @click="closeMask">
          <i class="iconfont icon-close"/>
        </div>
      </div>
    </div>
    <!-- 操作弹框 -->
    <div
      v-if="type=='message'"
      class="msg-dialog">
      <div 
        class="msg-content" 
        v-text="content"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: '',
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    canceltext: {
      type: String,
      default: '取消'
    },
    confirmtext: {
      type: String,
      default: '确认'
    }
  },
  data() {
    return {
      showMask: false
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal
    },
    showMask(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.showMask = this.value
  },
  methods: {
    closeMask() {
      this.showMask = false
    },
    closeBtn() {
      this.$emit('cancel')
      this.closeMask()
    },
    confirmBtn() {
      this.$emit('confirm')
      this.closeMask()
    },
    dangerBtn() {
      this.$emit('cancel')
      this.closeMask()
    },
		en() {
			alert("我是子组件中的方法")
		}
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container {
    width: 5.4rem;
    min-height: 3rem;
    padding-bottom: 1rem;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    .dialog-title {
      width: 100%;
      height: 0.64rem;
      line-height: 0.64rem;
      text-align: center;
      font-size: 0.36rem;
      color: #333333;
    }
    .content {
      font-size: 0.28rem;
      text-align: center;
      padding: 0.15rem 0 0.39rem;
      line-height: 0.54rem;
      font-size: 0.36rem;
      color: #333333;
      font-weight: bold;
    }
    .btns {
      width: 100%;
      margin-top: 0.24rem;
      height: 1rem;
      position: absolute;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      border-top: 0.01rem solid #f7f6f6;
      padding: 0.28rem 0;
      & > div {
        width: 2.7rem;
        text-align: center;
        font-size: 0.36rem;
        float: left;
      }
      .default-btn {
        color: #e73162;
        border-right: 0.01rem solid #f7f6f6;
      }
      .confirm-btn {
        color: #e73162;
      }
    }
  }
}
.msg-dialog {
  position: fixed;
  width: 5rem;
  min-height: 0.8rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  border-radius: 0.05rem;
  -webkit-border-radius: 0.05rem;
  .msg-d-img {
    width: 100%;
    height: 0.74rem;
    text-align: center;
    margin-top: 0.56rem;
  }
  .msg-content {
    width: 100%;
    min-height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.285rem;
    color: #fff;
  }
}
</style>
