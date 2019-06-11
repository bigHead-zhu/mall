<template>
	<div class="hotel-couple">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png"/>
			<label class="header-title">xx酒店优惠券</label>
		</div>
		<!-- 优惠券 -->
		<div class="couple-main">
			<!-- 优惠券 -->
				
				<div class="couple-card">
					<!--  -->
					<div class="card-type">
						<img class="couple-img" src="../../../static/img/bg-couple-card.png" />
						<div class="couple-txt">
							<div class="couple-l">
								<div class="flex">
									<label class="f72">1000<span class="f24">元</span></label>
									<label class="cards-kind"><span>平台券</span></label>
								</div>
								<div class="m-limit">满10000可用</div>
								<div class="couple-time">
									•<label>2019/02/28 - 2019/3/07</label>•
								</div>
							</div>
							<div class="couple-r">
								<a class="go-couple-btn" href="javascript:;">立即抢</a>
								<div>剩999张</div>
							</div>
						</div>
					</div>
					<!--  -->
					<div class="card-type">
						<img class="couple-img" src="../../../static/img/bg-couple-card.png" />
						<div class="couple-txt">
							<div class="couple-l">
								<div class="flex">
									<label class="f72">8.8<span class="f24">折</span></label>
									<label class="cards-kind"><span>商家券</span></label>
								</div>
								<div class="m-limit">满10000可用</div>
								<div class="couple-time">
									•<label>2019/02/28 - 2019/3/07</label>•
								</div>
							</div>
							<div class="couple-r">
								<a class="go-couple-btn" href="javascript:;">立即抢</a>
								<div>剩999张</div>
							</div>
						</div>
					</div>
		
				</div>
		
		</div>
		
		
	</div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
	@import "../../../static/css/style.css";
	
	.hotel-couple{
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
		/*优惠券*/
		.couple-main{
			margin-top: .88rem;
			padding-top: .32rem;
			border-top: .16rem solid #f2f2f2;
		}
		.bg-couple {
			width: 1.68rem;
			height: 2.2rem;
			margin-top: 1.98rem;
		}
		
		.mt70 {
			margin-top: .7rem;
		}
		
		.m56 {
			margin: 0.56rem 0;
		}
		
		.couple-card {
			height: auto;
			margin: 0 .3rem;
			overflow: hidden;
		}
		
		.card-type {
			width: 100%;
			position: relative;
			height: 2.3rem;
			overflow: hidden;
			margin-bottom: .36rem;
		}
		
		.couple-img {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 5;
		}
		
		.couple-txt {
			margin: .4rem .48rem 0rem .38rem;
			display: flex;
			position: relative;
			z-index: 6;
			justify-content: space-between;
			font-size: .24rem;
		}
		
		.couple-l {
			text-align: left;
			margin: 0;
			width: 4.45rem;
			color: #b47d6f;
		}
		
		.f72 {
			font-size: .72rem;
			line-height: .54rem;
			color: #ff344e;
			margin: 0;
		}
		
		.f24 {
			font-size: .24rem;
			margin-left: .1rem;
		}
		
		.flex {
			display: flex;
			align-items: center;
		}
		
		.cards-kind {
			display: inline-block;
			width: 1.06rem;
			height: .40rem;
			margin-left: .56rem;
			line-height: .4rem;
			color: #fefefe;
			text-align: center;
			transform: skew(-10deg);
			background-color: #e49982;
			border-radius: 2px;
		}
		
		.cards-kind span {
			display: inline-block;
			transform: skew(10deg)
		}
		
		.m-limit {
			margin: .16rem 0 .3rem 0;
			line-height: .24rem;
			font-weight: bold;
		}
		
		.couple-time label {
			display: inline-block;
			margin: 0 .06rem;
		}
		
		.couple-r {
			width: 1.40rem;
			color: #e49982;
			font-size: .22rem;		
			text-align: center;
		}
		
		.go-couple-btn {
			margin: .36rem 0 0;
			display: inline-block;
			font-size: .26rem;
			color: #fff;
			width: 1.40rem;
			height: .48rem;    
			line-height: .48rem;
			text-decoration: none;
			background-color: #f96b70;
			border-radius: .24rem;
		}
		
		.couple-r div {
			margin-top: .12rem;
		}
	}
</style>
