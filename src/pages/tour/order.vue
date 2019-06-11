<template>
	<div class="tour-order-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">订单结算</label>
		</div>
		<!-- 旅游票 -->
		<div class="film">
			<!-- 旅游订单 -->
			<div class="order-hotel">
				<div class="hotel-title f28 c1e">成都春秋环球旅行社 <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
				<div class="hotel-alls">
					<img class='hotel-img' src="../../assets/hotel/h-list.png" />
					<div class="hotel-descript">
						<div class="hotel-descript-title f26 c1e">成都直飞菲律宾龙目岛宿务岛出海团亲临海豚鲸鲨蓝鲸感受自然</div>
						<div class="hotel-type f26">
							生效时间：2019/03/24-2019/05/20
						</div>
						<div class="price">
							<label class="price-money">¥19999.00</label>
							<label class="price-num f24">x1</label>
						</div>
					</div>
					
				</div>
				<div class="film-num">
					<div class="tl">已选</div>
					<div class="tr">
						<div class="buy-total">
							<input type="button" class="buy-reduce" :class="[onstyle?'':'forbid']" @click="buyReduce" value="-" />
							<input class="buy-count" type="text" readonly="readonly" :value="buyCount">
							<input type="button" class="buy-plus" @click="buyPlus(buyCount)" value="+" />
						</div>
					</div>
				</div>
				<!-- <div class="order-time f26 c1e">
					<div class="time-title">
						<img src="../../assets/hotel/order-time.png" />
						入住时间
					</div>
					<div class="time">03月20日—03月24日(共4日)</div>
				</div> -->
			</div>
		</div>
		<!--   商家券-->
		<ul class="expense-couple">
			<li class="expense height114 bb1">
				<img class="icon-expense" src="../../assets/hotel/icon-expense.png" />
				消费提醒：购买前请联系商家确定出行日期
			</li>
			<li class="couple" v-show="hasCouple">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">商家券</label></div>
					<div class="tr" >暂无可用</div>
				</div>
			</li>
			<li class="couple height124" v-show="hasCouple==false" >
				<div class="copule-total pt30">
					<div class="tl"><label class="icon-couple">商家券</label></div>
					<div class="tr">2张可用<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
				</div>
				<div class="couple-txt">此优惠券与平台优惠券不得同时使用</div>
			</li>
			<li class="count ">
				<label class="f24 c1e mr40">共计1件商品</label>
				<label class="f24 c1e cout-money">会员价：<span class="money">¥18999.00</span></label>
			</li>
		</ul>
		<!-- 平台券 -->
		<ul class="expense-couple ">
			<li class="couple" v-show="hasPubCouple">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">平台券</label></div>
					<div class="tr" >暂无可用</div>
				</div>
			</li>
			<li class="couple height124" v-show="hasPubCouple==false">
				<div class="copule-total pt30">
					<div class="tl"><label class="icon-couple">平台券</label></div>
					<div class="tr">2张可用<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
				</div>
				<div class="couple-txt">此优惠券与商家优惠券不得同时使用</div>
			</li>
			<li class="couple height114">
				<div class="copule-total pt30">
					<div class="tl"><label class="money-title f26">收益钱包</label></div>
					<div class="tr">
						<div class="switch" :class="switchLabel ? 'active':''">
							<label class="switchDot " @click="switchOn" :class="switchLabel ? 'active':'unactive'" ></label>
						</div>
					</div>
				</div>
				<div class="couple-txt">当前抵扣10.00元</div>
			</li>
		</ul>
		<!--  -->
		<div class="tips mb135">
			<p class="tip-title">下单提示：</p>
			<p>该商品属于特殊商品，下单后无法退款</p>
		</div>
		<!-- 结算 -->
		<div class="pay-count">
			<div class="pay-count-price">
				<small class="f24">¥</small>18999.00
			</div>
			<div class="now-pay">立即支付</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				hasCouple:false,//T有券F无
				hasPubCouple:false,
				switchLabel:false,
				buyCount: 1,//购买数量
				onstyle: false,
			}
		},
		watch:{
			buyCount(newVal, oldVal) {
				if (newVal == 1) {
					this.onstyle = false
				} else {
					this.onstyle = true 
				}
			}
		},
		methods:{
			cancel(){
				this.$route.go(-1);
			},
			switchOn(){
				this.switchLabel =!this.switchLabel;
			},
			buyPlus() {
				this.buyCount++;
				this.onstyle = true;
			},
			buyReduce() {
				if (this.onstyle) {
					this.buyCount--;
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";
	.tour-order-main{
		width: 100%;
		height: 100vh;
		background: #eee;
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
		/*电影票购买*/
		.order-hotel{
			padding: .3rem .3rem 0 .3rem;
			text-align: left;
			background: #fff;
		}
		.icon-right{
			width: .1rem;
			height: .18rem;
			vertical-align: middle;
			margin-left: .18rem;
		}
		.hotel-alls{
			display: flex;
			margin-top: .3rem;
			padding-bottom: .3rem;
		}
		.hotel-img{
			width: 2rem;
			height: 2rem;
			margin: 0;
		}
		.hotel-descript{
			margin: .16rem 0 0 .2rem;
		}
		.hotel-descript-title{
			line-height: .34rem;
		}
		.hotel-type{
			color: #aaa;
			margin: .2rem 0 .3rem 0;
		}
		.price-money,.price-num{
			display: inline-block;
			width: 49%;
		}
		.price-money{
			font-size: .3rem;
			color: #b50000;
			text-align: left;
		}
		.price-num{
			color: #aaa;
			text-align: right;
		}
		.film{
			margin-top: 1.04rem;
			overflow: hidden;
			background: #fff;
		}
		.film-des{
			height: 2.28rem;
			margin: .3rem .3rem .35rem;
			overflow: hidden;
			text-align: left;
			background-image: url('../../assets/film/film-couple.png');
			background-size: 100% 100%;
			.title{
				margin: .44rem 0 0 .6rem;
			}
			.time{
				margin: .14rem 0 0 .6rem;
				color: #9c9c9c;
			}
			.cursor{
				margin: .28rem 0 0 .6rem;
				color: #f90;
				display: flex;
			}
			.money{
				font-size: .30rem;
				margin-left: 0;
				font-weight: bold;
			}
			.buy-btn{
				display: inline-block;
				width: 1.2rem;
				height: .36rem;
				background: #f90;
				color: #fff;
				font-size: .28rem;
				border-radius: .18rem;
				text-align: center;
				line-height: .36rem;
				margin-right:0.44rem;;
			}
		}
		.film-num{
			display: flex;
			align-items: center;
			padding-bottom: .12rem;
			.tl{
				margin-left: 0.3rem;
			}
			.tr{
				margin-right: 0.3rem;
				.buy-total {
					flex: 1;
					text-align: right;
					font-size: .28rem;
				}
				
				.buy-total input {
					width: .8rem;
					height: .6rem;
					border: none;
					outline: none;
					text-align: center;
					background-color: #f5f5f5;
					border-radius: .04rem
				}
				
				.buy-reduce.forbid {
					background: #fbfbfb;
					color: #aaa;
				}
				
				.buy-count {
					display: inline-block;
					width: .8rem;
					height: .6rem;
					line-height: .6rem;
					text-align: center;
					background-color: #f5f5f5;
					border-radius: .04rem;
				}
			}
		}
		/*报销凭证 商家券*/
		.expense-couple{
			margin: .16rem 0;
			background: #fff;
		}
		.expense-couple li{
			margin: 0 .3rem;
			height: .84rem;
			border-bottom: .01rem solid #f2f2f2;
		}
		.icon-expense{
			width: .54rem;
			height: .54rem;
			margin: 0 .2rem 0 0;
		}
		.height114{
			height: 1.14rem!important;
		}
		.height124{
			height: 1.24rem!important;
		}
		.pt30{
			padding: .3rem 0 0 0;
		}
		.expense{
			font-size: .26rem;
			display: flex;
			align-items: center;
			color: #aaa;
		}
		.couple .copule-total{
			display: flex;
			width: 100%;
		}
		.couple .copule-total div{
			flex: 1;
		}
		.select-text {
			margin-left: .41rem;
			color: #1e1e1e;
		}
		.copule-tot{
			line-height: .85rem;
			display: flex;
		}
		.couple-txt{
			font-size: .22rem;
			line-height: .22rem;
			color: #aaa;
			margin-top: 0.1rem;
			text-align: left;
		}
		.icon-couple {
			display: inline-block;
			width: .92rem;
			height: .32rem;
			font-size: .24rem;
			line-height: .32rem;
			text-align: center;
			color: #b50000;
			background-image: url('../../../static/img/icon-couple.png');
			background-repeat: no-repeat;
			background-size: .92rem .32rem;
		}
		 .tr {
			font-size: .26rem;
			color: #aaa;
			flex: 1;
		}
		.icon-return {
			width: .1rem;
			height: .18rem;
			margin-left: .1rem;
			vertical-align: middle;
		}
		.count{
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.count .mr40{
			margin-right:.4rem!important;
		}
		.cout-money{
			margin: 0; 
		}
		.money{
			font-size: .32rem;
			color: #b50000;
		}
		.money-title{
			color: #b50000;
		}
		.switch{
			width: .6rem;
			height: .34rem;
			background: #fff;
			border-radius: .2rem;
			margin-right: 0 ;
			position: relative;
			box-shadow: .03rem .03rem .02rem #ccc;
		}
		.switch.active{
			background: #4cd964;
		}
		.switch .switchDot{
			display: inline-block;
			position: absolute;
			top:-0.02rem;
			width: 0.34rem;
			height: .34rem;
			background: #fff;
			border-radius: 50%;
			box-shadow: .03rem .03rem .02rem #ccc;
		}
		.switch .switchDot.unactive{
			left: 0rem;
		}
		.switch .switchDot.active{
			 right: 0rem;
		}
	
		/*结算*/
		.pay-count{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: .98rem;
			display: flex;
			line-height: .98rem;
			background-color: #fff;
			justify-content: space-between;
			z-index: 15;
		}
		.pay-count-price{
			color: #b50000;
			font-size: .4rem;
			margin-left: .32rem;
		}
		.now-pay{
			color: #fff;
			font-size: .3rem;
			width: 2.26rem;
			height:100%;
			margin: 0;
			text-align: center;
			background-image: linear-gradient(98deg,#feca3a 0%,#feb336 100%),linear-gradient(#c8c8c8, #c8c8c8);
			background-blend-mode: normal,normal;
			box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
		}
		.mb135{
			margin-bottom: 1.35rem!important;
		}
		.tips{
			margin: .3rem .3rem;			
			text-align: left;
			font-size: .26rem;
			color: #aaa;
		}
		.tip-title{
			margin: .3rem 0 .2rem 0;
		}
		
	}
</style>
