<template>
	<div class="hotel-order-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">订单结算</label>
		</div>
		<!-- 订单酒店 -->
		<div class="order-hotel">
			<div class="hotel-title f28 c1e">北海道新雪谷希尔顿度假酒店 <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
			<div class="hotel-alls">
				<img class='hotel-img' src="../../assets/hotel/h-list.png" />
				<div class="hotel-descript">
					<div class="hotel-descript-title f26 c1e">北海道新雪谷希尔顿度假酒店精品大床房向阳直接看雪1-2人入</div>
					<div class="hotel-type f26">
						房型：大床房
					</div>
					<div class="price">
						<label class="price-money">¥19999.00</label>
						<label class="price-num f24">x1</label>
					</div>
				</div>
				
			</div>
			<div class="order-time f26 c1e">
				<div class="time-title">
					<img src="../../assets/hotel/order-time.png" />
					入住时间
				</div>
				<div class="time">03月20日—03月24日(共4日)</div>
			</div>
		</div>
		<!-- 入住信息 -->
		<div class="check-info">
			<div class="title f26 c1e">
				<img src="../../assets/hotel/check-info.png" />
				入住信息
			</div>
			<ul class="check-info-des">
				<li >
					<label class="check-info-title f26">房间数</label>
					<input class="check-into-input f26 c1e" type="text" readonly="readonly" value="1间" />
				</li>
				<li >
					<label class="check-info-title f26">入住人</label>
					<input class="check-into-input f26 c1e" type="text" placeholder="请填写实际入住人姓名" />
				</li>
				<li >
					<label class="check-info-title f26">手机号</label>
					<input class="check-into-input f26 c1e" type="text" placeholder="请填写手机号码" />
				</li>
			</ul>
		</div>
		<!-- 报销凭证  商家券-->
		<ul class="expense-couple">
			<li class="expense">
				<img class="icon-expense" src="../../assets/hotel/icon-expense.png" />
				报销凭证：该服务请提前联系商家确认
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
			<li class="count">
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
			<li class="couple height112">
				<div class="copule-total pt30">
					<div class="tl"><label class="money-title">收益钱包</label></div>
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
				switchLabel:false
			}
		},
		methods:{
			cancel(){
				this.$route.go(-1);
			},
			switchOn(){
				this.switchLabel =!this.switchLabel;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";
	.hotel-order-main{
		width: 100%;
		height: 100vh;
		background: #eee;
		overflow:auto;
		font-family:'pf-Regular';

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
			font-family:'pf-Bold';
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
		}
		/*订单酒店*/
		.order-hotel{
			margin-top: 1.05rem;
			padding: .3rem .3rem 0 .3rem;
			text-align: left;
			background: #fff;
		}
		.hotel-title{
			font-family:'pf-Bold';
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
			border-bottom: .01rem solid #f2f2f2;
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
			font-family:'pf-Regular';
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
			font-family:'pf-Heavy';
			text-align: right;
		}
		.order-time{
			width: 100%;
			display: flex;
			height: .85rem;
			align-items: center;
		}
		.time-title img,.check-info img{
			width: .26rem;
			height: .26rem;
			margin-right: .1rem;
			vertical-align: middle;
		}
		.time{
			flex: 2;
			text-align: right;
		}
		.check-info{
			background: #fff;
			padding:0 .3rem;
			margin-top: .16rem;
		}
		.check-info .title{
			height: .84rem;
			text-align: left;
			line-height: .84rem;
		}
		.check-info-des{
			margin: 0 .3rem;
		}
		.check-info-des li,.expense-couple li{
			border-bottom: 0.01rem solid #f2f2f2;
			height: .85rem;
			text-align: left;
			align-items: center;
		}
		.expense-couple li:last-child,.check-info-des li:last-child{
			border-bottom: none;
		}
		.check-info-des li{
			display: flex;
		}
		.check-info-title{
			margin:0 0 0 .4rem;
			color: #aaa;
		}
		.check-info-input,.ml112{
			margin-left: 1.12rem;
		}
		.check-info-input::placeholder{
			color: #aaa;
		}
		/*报销凭证 商家券*/
		.expense-couple{
			margin: .16rem 0;
			background: #fff;
		}
		.expense-couple li{
			margin: 0 .3rem;
		}
		.icon-expense{
			width: .54rem;
			height: .54rem;
			margin: 0 .2rem 0 0;
		}
		.height112{
			height: 1.12rem!important;
		}
		.height124{
			height: 1.24rem!important;
		}
		.pt30{
			padding: .3rem 0 .08rem 0;
		}
		.expense{
			font-size: .26rem;
			display: flex;
			height: 1.1rem;
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
			margin: .1rem 0 0;
			color: #aaa;
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
			font-size: .26rem;
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
