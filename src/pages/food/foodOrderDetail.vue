 <template>
	<div class="food-detail-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png"/>
			<label class="header-title">订单详情</label>
		</div>
		<!-- 入住状态 -->
		<div class="check-in-state">
			<div class="check-txt">
				<p>当前状态：暂未兑换</p>
				<p class="mt20">序列号：01234566879945625</p>
			</div>
			<img class="checkbg-person" src="../../assets/hotel/checkbg-person.png" />
		</div>
		<!-- 入驻信息 -->
		<div class="check-infomation f28 c1e">
			<div class="check-name">
				<label>安利</label>
				<span class="check-num">18190743973</span>
			</div>
			<div class="check-address">四川省 成都市 成华区 双水碾街道站北中街道83号一栋三单元20号</div>
		</div>
			<!-- 订单电影院 -->
		<div class="order-hotel">
			<div class="hotel-title f24 c1e">
				<img class="icon-ordershop" src="../../assets/hotel/icon-shop.png"/>保利国际影城-成都奥克斯店 <img class="icon-right" src="../../../static/img/icon-r-return.png"/>
			</div>
			<div class="film-des">
				<div class="title f32 c1e">2D电影观影券</div>
				<div class="time f28">2D2019/03/24至2019/04/24可用</div>
				<div class="cursor">
					<label class="money"><small class="f24">¥</small>30</label>
				</div>
			</div>
			<div class="film-num c1e f26">
				<div class="tl">购买数量</div>
				<div class="tr">2张</div>
			</div>
		</div>
		<!-- 消费提醒  订单结算-->
		<ul class="expense-couple">
			<li class="expense b1">
				<img class="icon-expense" src="../../../static/img/icon-tips.png" />
				消费提醒：建议提前兑票以防错过就餐时间
			</li>
			<li class="couple mt20">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">商品总价</label></div>
					<div class="tr" >¥ 19999.00</div>
				</div>
			</li>
			<li class="couple">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">收益钱包</label></div>
					<div class="tr" >- ¥ 199.00</div>
				</div>
			</li>
			<li class="couple b1">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">折扣券</label></div>
					<div class="tr" >- ¥ 10.00</div>
				</div>
			</li>
			<li class="couple allNum">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">订单实付</label></div>
					<div class="tr" >- ¥ 19790.00</div>
				</div>
			</li>
		</ul>
		<!-- 订单信息 -->
		<ul class="order-info">
			<li class="c1e h80">
				<img class="icon-order" src="../../assets/hotel/icon-order.png" />
				订单信息
			</li>
			<li class="order-detail">
				<div class="">订单编号:<span>1897456315874652</span></div>
				<div class="copy-btn">复制</div>
			</li>
			<li>
				<div class="">创建时间：<span>2019-03-12  12:23:45</span></div>
			</li>
			<li>
				<div class="">支付时间：<span>2019-03-12  12:23:45</span></div>
			</li>
			<li>
				<div class="">成交时间：<span>2019-03-12  12:23:45</span></div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	
	.food-detail-main{
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
		/*入住状态*/
		.check-in-state{
			width: 100%;
			margin-top: 1.04rem;
			height: 2rem;
			display: flex;
			background-image:url('../../assets/hotel/checkbg.png');
			background-size: 100% 100%;
		}
		.check-txt{
			text-align: left;
			color: #fff;
			flex: 2;
			font-size: .3rem;
			line-height: .3rem;
			margin: .6rem 0 0 .3rem;
		}
		.checkbg-person{
			width: 1.5rem;
			height: 1.8rem;
			margin: .1rem .3rem 0 0; 
		}
		.mt20{
			margin-top: .2rem!important;
		}
		.check-infomation{
			height: 1.8rem;
			overflow: hidden;
			background: #fff;
			text-align: left;
		}
		.check-name{
			margin: .34rem .52rem 0 .3rem;
		}
		.check-address{
			margin: .2rem .52rem 0 .3rem;
			line-height: .34rem;
		}
		.check-num{
			color: #aaa;
		}
		/*订单酒店*/
		.order-hotel{
			margin-top: .16rem;
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
		.film-des{
			height: 2.28rem;
			margin-top: .35rem;
			overflow: hidden;
			background-image: url('../../assets/food/food.png');
			background-size: 100% 100%;
			.title{
				margin: .44rem 0 0 .6rem;
			}
			.time{
				margin: .14rem 0 0 .6rem;
				color: #9c9c9c;
			}
			.cursor{
				margin: .16rem 0 0 .6rem;
				color: #f90;
				height: .4rem;
				position: relative;
			}
			.money small{
				font-weight: normal
			}
			.money{
				font-size: .50rem;
				position: absolute;
				right: .6rem;
				top: 0;
				font-weight: bold;
			}
		}
		.film-num{
			display: flex;
			height: .86rem;
			overflow: hidden;
			align-items: center;
			border-top: #f2f2f2 solid 0.01rem;
			margin: .18rem 0rem 0;
			.tl{
				margin-left: 0;
			}
			.tr{
				margin-right: 0;
			}
		}
		/*报销凭证 订单结算*/
		.expense-couple{
			margin: .16rem 0;
			background: #fff;
		}
		.expense-couple li,.order-info li{
			margin: 0 .3rem;
			color: #aaa;
		}
		.icon-expense{
			width: .3rem;
			height: .3rem;
			margin: 0 .2rem 0 0;
		}
		.expense-couple li{
			text-align: left;
			align-items: center;
		}
		.expense{
			font-size: .26rem;
			display: flex;
			height: .88rem;
		}
		.b1{
			border-bottom:0.01rem solid #f2f2f2;
		}
		.couple .copule-tot{
			display: flex;
			width: 100%;
		}
		.couple .copule-tot div{
			flex: 1;
			margin: .1rem 0;
			font-size: .26rem;
		}
		.allNum{
			color:#1e1e1e!important;
			line-height: .84rem;
		}
		/*订单信息*/
		.order-info{
			background: #fff;
			font-size: .26rem;			
			text-align: left;
		}
		.h80{
			height: .8rem;
			line-height: .8rem!important;
		}
		.order-info .order-detail{
			position: relative;
		}
		.order-info li{
			line-height: .44rem;
		}
		.icon-order{
			width: .3rem;
			height: .3rem;
			vertical-align: middle;
		}
		.copy-btn{
			position: absolute;
			padding: .04rem .1rem;
			border-radius: .15rem;
			line-height: .24rem;
			font-size: .22rem;
			right: 0;
			top: 0.04rem;
			border: solid .01rem #ffba30;
			color: #ffba30;
		}
		.icon-ordershop{
			width: .3rem;
			height: .3rem;
			margin-right: .14rem;
			vertical-align: middle;
		}
}
</style> 
