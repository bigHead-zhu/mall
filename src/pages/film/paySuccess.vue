<template>
	<div class="pay">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png"/>
			<label class="header-title">支付结果</label>
		</div>
		<!-- 支付状态 -->
		<div class="pay-state">
			<div class="pay-txt">
				<img src="../../assets/hotel/icon-pay.png" />
				<p class="f34 c1e">支付成功</p>
			</div>
			<div class="pay-btn">
				<label class="pay-btn-left">返回首页</label>
				<label class="pay-btn-right">查看订单</label>
			</div>
		</div>
		<!-- 兑换码 -->
		<div class="code">
			<div class="code-bg">
				<p class="code-title">商品兑换码</p>
				<p class="code-num">0264978513246578</p>
				<p class="copy-btn">复制兑换码</p>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
	@import "../../../static/css/style.css";
	
	.pay{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content:center;
			align-items: center;
			background: #fff;
			z-index:999;
			position: fixed;
			top: 0;
			left: 0;
			border-bottom: 0.01rem solid #eee;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.header label{
			display: inline-block;
			flex: 1;
			font-weight:bold;
		}
		/*支付状态*/
		.pay-state{
			border-top: .16rem solid #f2f2f2;
			margin-top: .88rem;
			.pay-txt img{
				width: 1.28rem;
				height: 1.18rem;
				margin: .2rem  0;
			}
			.pay-btn{
				margin-top: .32rem;
			}
			.pay-btn label{
				display: inline-block;
				width: 1.8rem;
				height: .6rem;
				color:#ffba30;
				line-height: .6rem;
				font-size: .28rem;
				border: .01rem solid #ffba30;
				border-radius: .3rem;
			}
			.pay-btn-left{
				margin-left: 1.58rem;
			}
			.pay-btn-right{
				margin-right: 1.58rem;
			}
			
		}
		/*兑换码*/
		.code{
			width: 100%;
			height: 3.04rem;
			margin-top: .6rem;
			overflow: hidden;
			background: #fff4e6 ;
		}
		.code-bg{
			width: 3.4rem;
			height: 2.56rem;
			font-size: .24rem;
			line-height: .24rem;
			color: #666;
			overflow: hidden;
			margin:.25rem auto 0 auto;
			background-image: url('../../assets/hotel/bg-code.png');
			background-size: 100% 100%;
		}
		.code-title{
			margin-top: .88rem;
		}
		.code-num{
			margin-top: .15rem;
		}
		.copy-btn{
			width: 1.68rem;
			height: .4rem;
			line-height: .4rem;
			margin: .3rem auto 0;
			color: #fff;
			background-color: #ff3738;
			border-radius: .06rem;
		}
		
	}
</style>
