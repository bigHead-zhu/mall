<template>
  <div class="star">
    <div class="star_b_i">
      <img src="../../static/img/star_03.png">
    </div>
    <div 
      :style="{'width':clienw+'px'}"
      class="star_t_i">
      <img 
        :style="{'width':imgW+'px','max-width':imgW+'px'}"
        src="../../static/img/star_01.png">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgW: '',
      clienw: '',
      scal: 0,

    }
  },
  watch: {
    width(n, o) {
      this.clienw = parseFloat(n) * (this.imgW / 5)
    }
  },
  mounted() {
    let width = document.querySelector('.star').offsetWidth
    this.imgW = this._compNum(120)
    let st = document.documentElement.clientWidth || document.body.clientWidth
    if (st >= 750) {
      st = 750
    }
    this.clienw = parseFloat(this.width) * (this.imgW / 5)
  },
	methods:{
	  _compNum(num) {
			let st = document.documentElement.clientWidth || document.body.clientWidth
			if (st >= 750) {
				st = 750
			}
			let scal = st / 750
			return (this.nums = num * scal)
		}
	}
}
</script>
<style lang="scss" scoped>
.star {
  width: 100%;
  // width: 1.2rem;
	height: .2rem;
  position: relative;
  .star_b_i {
    position: absolute;
    width: 100%;
    height: 0.2rem;
    left: 0;
    top: 0;
    z-index: 1;
    img {
      height: 0.2rem;
	  display: block;

    }
  }
  .star_t_i {
    position: absolute;
    height: 0.2rem;
    left: 0;
    top: 0;
    z-index: 1;
    overflow: hidden;
    img {
      height: 0.2rem;
      display: block;
    }
  }
}
</style>
