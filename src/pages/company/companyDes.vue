<template>
	<div class="compa-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>企业简介</label>
		</div>
		<div class="main-txt">
			{{des}}
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				des:''
			}
		},mounted() {
			this.merchantId = this.$route.query.merchantId;
			this.des = this.$route.query.des ||'';
			console.log(this.des)
		},methods:{
			cancel(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss"  >
	.compa-main {
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content: center;
			align-items: center;
			background: #fff;
			border-bottom: .01rem solid #e6e6e6;
			position: fixed;
			top: 0;
			left: 0;
			z-index:999;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.header label{
			flex: 1;
		}
		.main-txt{
			margin: 1.5rem .3rem 0;
			font-size: .26rem;
			color: #1e1e1e;
			line-height: .3rem;
			text-align: left;
			text-indent: .52rem;
		}
	}
	
</style>
