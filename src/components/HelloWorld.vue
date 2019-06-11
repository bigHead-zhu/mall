<template>
  <div class="hello">
			<slot name="left"></slot>
			<div>一样的样式{{name}}</div>
			<slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
	props:['name', 'age'],
	
  data () {
    return {
      msg: '我是子组件的数据'
    }
  },
	mounted() {
		
	},
	methods:{
		set() {
			alert(1)
		},
		_click() {
			this.$emit('huu', this.msg)
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
