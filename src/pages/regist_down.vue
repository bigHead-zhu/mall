<template>
	<div class="main" id="regist-down">
		<div class="header f34 c1e">注册</div>
		<div class="r-img">
			<img src="../../static/img/bg-ok.png" />
		</div>
		<h2 class="f28 c1e mt40 ">您已注册成功，现在开始购物之旅吧！</h2>
		<div class="t-btn">
			<router-link to="/index" class="Ind-link t-link">进入商城</router-link>
			<router-link to="/edit" class="edit-link t-link mt40">编辑个人信息</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
	@import '../../static/css/style.css';
	#regist-down{
		.main {
			width: 100%;
			height: 100vh;
		}
		.header{
			width: 100%;
			height: .94rem;
			line-height: .94rem!important;
			border-bottom: .01rem solid #E6E6E6;
		}
		.r-img{
			width: 4.58rem;
			height: 3.01rem;
			margin: 1.6rem auto 0;
		}
		.r-img img{
			width: 100%;
			height: 100%;
		}
		.t-btn{
			margin-top: 1.28rem;
			
		}
		.t-link{
			width: 2.86rem;
			height: .8rem;
			line-height: .8rem;
			display: block;
			font-size: .3rem;
			margin: 0 auto;
			border-radius: .4rem;
		}
		.Ind-link{
			background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
			background-blend-mode: normal,normal;
			color: #fff;
			box-shadow: 0 0.09rem .16rem .01rem rgba(254, 166, 19, 0.2);
		}
		.edit-link{
			// background-blend-mode: ;
			box-shadow:0 0.09rem .16rem .01rem rgba(254, 166, 19, 0.2);
			border-style: solid;
			border-width: 1px;
			color: #FECA3A;
		}
	}
</style>
