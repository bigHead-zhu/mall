<template>
  <div class="hello" @click="te">
	  
	  <mh ref="mg" :name="'草拟吗'" :age="'10'" @huu="_gethuu">
		  你的好几个号阿斯蒂芬可视电话看风景哈萨克结合地方
	  </mh>
  </div>
</template>

<script>
import mh from './HelloWorld.vue'
export default {
  name: 'HelloWorld',
  components:{
	  mh
  },
  data () {
    return {
    }
  },
  methods:{
	  te() {
		  this.$refs.mg.set()
	  },
	  _gethuu(res) {
		  alert(res)
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
