<template>
	<div class="order-acount">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">订单结算</label>
		</div>
		<div class="order-mian">
			<!-- 收获地址 -->
			<div class="order-addr">
				<div class="top-line">
					<img src="../../assets/car/bg-line.png" alt="">
				</div>
				<div class="check-infomation f28 c1e">
					<div class="check-name">
						<label class="user-name">安利</label>
						<span class="check-num">18190743973</span>
						<img class="icon-right" src="../../../static/img/icon-r-return.png" />
					</div>
					<div class="check-address">四川省 成都市 成华区 双水碾街道站北中街道83号一栋三单元20号</div>
				</div>
			</div>
			<!-- 商铺 -->
			<div class="car-shop">
				<!-- 商品明细 -->
				<div class="order-hotel">
					<div class="hotel-title f28 c1e">成都春秋环球旅行社 <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
					<div class="hotel-alls">
						<img class='hotel-img' src="../../assets/hotel/h-list.png" />
						<div class="hotel-descript">
							<div class="hotel-descript-title f26 c1e">成都直飞菲律宾龙目岛宿务岛出海团亲临海豚鲸鲨蓝鲸感受自然</div>
							<div class="hotel-type f26">
								墨绿色 XXL
							</div>
							<div class="price">
								<label class="price-money">¥19999.00</label>
								<label class="price-num f24">x1</label>
							</div>
						</div>
					</div>
				</div>
				<!-- 商品计价 -->
				<ul class="car-goods">
					<!-- 配送方式 -->
					<li>
						<div class="copule-tot">
							<div class="tl"><label class="icon-delivery"></label>配送方式</div>
							<div class="tr" >快递 包邮</div>
						</div>
					</li>
					<!-- 报销凭证 -->
					<li class="expense">
						<img class="icon-expense" src="../../assets/hotel/icon-expense.png" />
						报销凭证：该服务请提前联系商家确认
					</li>
					<!-- 商家券 -->
					<li>
						<div class="copule-tot">
							<div class="tl"><label class="icon-couple">商家券</label></div>
							<div class="tr" >暂无可用</div>
						</div>
					</li>
					<!-- 买家留言 -->
					<li class="comment">
						<label class="car-goods-title">买家留言：</label>
						<input type="text" class="car-goods-input" />
					</li>
					<!-- 共计 -->
					<li class="count ">
						<label class="f24 c1e mr40">共计1件商品</label>
						<label class="f24 c1e cout-money">会员价：<span class="money">¥18999.00</span></label>
					</li>
				</ul>
				
			</div>
				<div class="car-shop">
				<!-- 商品明细 -->
				<div class="order-hotel">
					<div class="hotel-title f28 c1e">成都春秋环球旅行社 <img class="icon-right" src="../../../static/img/icon-r-return.png"/></div>
					<div class="hotel-alls">
						<img class='hotel-img' src="../../assets/hotel/h-list.png" />
						<div class="hotel-descript">
							<div class="hotel-descript-title f26 c1e">成都直飞菲律宾龙目岛宿务岛出海团亲临海豚鲸鲨蓝鲸感受自然</div>
							<div class="hotel-type f26">
								墨绿色 XXL
							</div>
							<div class="price">
								<label class="price-money">¥19999.00</label>
								<label class="price-num f24">x1</label>
							</div>
						</div>
					</div>
				</div>
				<!-- 商品计价 -->
				<ul class="car-goods">
					<!-- 配送方式 -->
					<li>
						<div class="copule-tot">
							<div class="tl"><label class="icon-delivery"></label>配送方式</div>
							<div class="tr" >快递 包邮</div>
						</div>
					</li>
					<!-- 报销凭证 -->
					<li class="expense">
						<img class="icon-expense" src="../../assets/hotel/icon-expense.png" />
						报销凭证：该服务请提前联系商家确认
					</li>
					<!-- 商家券 -->
					<li>
						<div class="copule-tot">
							<div class="tl"><label class="icon-couple">商家券</label></div>
							<div class="tr" >暂无可用</div>
						</div>
					</li>
					<li class=" couple height124" v-show="hasCouple==false" >
						<div class="copule-total pt30">
							<div class="tl"><label class="icon-couple">商家券</label></div>
							<div class="tr">2张可用<img class="icon-right" src="../../../static/img/icon-r-return.png"  @click="maskLayer()"/></div>
						</div>
						<div class="couple-txt">此优惠券与平台优惠券不得同时使用</div>
					</li>
					<!-- 买家留言 -->
					<li class="comment">
						<label class="car-goods-title">买家留言：</label>
						<input type="text" class="car-goods-input" />
					</li>
					<!-- 共计 -->
					<li class="count ">
						<label class="f24 c1e mr40">共计1件商品</label>
						<label class="f24 c1e cout-money">会员价：<span class="money">¥18999.00</span></label>
					</li>
				</ul>
				
			</div>
			
			<!--平台券  -->
			<ul class="expense-couple mb135">
				<li class="couple" v-show="hasPubCouple">
					<div class="copule-tot">
						<div class="tl"><label class="icon-couple">平台券</label></div>
						<div class="tr" >暂无可用</div>
					</div>
				</li>
				<li class="couple height124" v-show="hasPubCouple==false">
					<div class="copule-total pt30">
						<div class="tl"><label class="icon-couple">平台券</label></div>
						<div class="tr"><label class="label">2张可用</label><img class="icon-right" src="../../../static/img/icon-r-return.png" /></div>
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
			
		</div>
		<!-- 结算 -->
		<div class="pay-count">
			<div class="pay-count-price">
				<small class="f24">¥</small>18999.00
			</div>
			<div class="now-pay">立即支付</div>
		</div>
		
		<!-- 优惠券弹窗 -->
		<div class="mask" v-show="mask"></div>
		<div class="coupon-mask" v-show="carProps">
			<div class="coupon-title c1e ">
				优惠券
				<img @click="maskLayer" src="../../../static/img/icon-close.png" />
			</div>
			<p class="get-title f28">可领取优惠券</p>
			<ul class="coupon-list">
				<li class="coupon-li">
					<div class="coupon-left">
						<p class="coupon-money"><small>¥</small>300</p>
						<p class="coupon-condition">满3000减300</p>
					</div>
					<div class="coupon-right">
						<p class="coupon-type">
							<label class="coupon-label">商家券</label>
							<label class="coupon-limit c1e">订单中的商品不支持</label>
						</p>
						<div class="coupon-limit-time">
							<div class="time">
								2019.03.24-2019.05.01
							</div>
							<div class="check-box">
								<input type="checkbox" />
								<label class="checkbox-label"></label>
							</div>
						</div>
						<p class="coupon-tips">
							使用说明：此券不与商家券叠加使用，请在有效期内使用
						</p>
					</div>
				</li>
				
				<li class="coupon-li">
						<div class="coupon-left">
							<p class="coupon-money"><small>¥</small>300</p>
							<p class="coupon-condition">满3000减300</p>
						</div>
						<div class="coupon-right">
							<p class="coupon-type">
								<label class="coupon-label">商家券</label>
								<label class="coupon-limit c1e">订单中的商品不支持</label>
							</p>
							<div class="coupon-limit-time">
								<div class="time">
									2019.03.24-2019.05.01
								</div>
								<div class="check-box">
									<input type="checkbox" />
									<label class="checkbox-label"></label>
								</div>
							</div>
							<p class="coupon-tips">
								使用说明：此券不与商家券叠加使用，请在有效期内使用
							</p>
						</div>
					</li>
				
			</ul>
		</div>
		<!-- 支付弹窗 -->
		<div class="pay-mask" v-show="payProps">
			<div class="pay-title c1e ">
				<label>确认付款</label>
				<img class="icon-close" @click="maskLayer" src="../../../static/img/icon-close.png" />
			</div>
			<div class="pay-price c1e">¥122.00</div>
			<!-- 付款方式 -->
			<ul class="pay-type">
				<li v-for="(item,index) in payType" :key="index">
					<img class="pay-img" :src="item.img" />
					<label class="pay-name c1e">{{item.title}}</label>
					<div class="check-box" @click="changeCheck(index)" >
						<input type="checkbox" v-model="item.checkState" :checked="item.checkState" />
						<label class="checkbox-label" :class="item.checkState?'active':''"></label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 卡片支付 -->
		<div class="card-pay">
			<div class="pay-nav">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
				<label class="card-pay-title">金卡支付</label>
				<img class="icon-close" @click="maskLayer" src="../../../static/img/icon-close.png" />
			</div>
			<div class="card-main bank">
				<div class="card-title">
					<span>Gold card</span>
					<label></label>
					<label class="dot"></label>
				</div>
				<div class="card-money">
					<small>¥</small>2000.00
				</div>
				<p>注意：使用卡片支付时，无法组合支付</p>
			</div>
			<div class="card-footer c1e">
				立即支付
			</div>
		</div>
		<!-- 支付密码 -->
		<div class="pay-pwd">
			<div class="pay-nav">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
				<label class="card-pay-title">支付密码</label>
				<img class="icon-close" @click="maskLayer" src="../../../static/img/icon-close.png" />
			</div>
			<div class="pay-main">
				<div class="pay-tips">
					请输入支付密码，完成支付
				</div>
				<div class="pay-input">
					<input v-for="(item,index) in inputList" :key="index" class="pwd-input"
					type="password" maxlength="1" v-model="item.val"
					@keyup="nextNum(index,$event)"/>
				</div>
			</div>
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
				mask:true,
				carProps:false,
				payType:[
					{
						id:0,
						img:require("../../assets/car/icon-wx.png"),
						title:"微信支付",
						checkState:false
					},{
						id:1,
						img:require("../../assets/car/icon-alipay.png"),
						title:"支付宝",
						checkState:false
					},
					{
						id:2,
						img:require("../../assets/car/icon-gold.png"),
						title:"金卡支付",
						checkState:false
					},
					{
						id:3,
						img:require("../../assets/car/icon-bank.png"),
						title:"银卡支付",
						checkState:false
					},{
						id:4,
						img:require("../../assets/car/icon-drill.png"),
						title:"钻卡支付",
						checkState:false
					}
				],//支付方式
				inputList: [{val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
			}
		},
		methods:{
			// 返回
			cancel(){
				this.$router.go(-1)
			},
			// 开关
			switchOn(){
				this.switchLabel =!this.switchLabel;
			},
			// 优惠券窗口
			maskLayer(){
				this.carProps = !this.carProps;
				this.mask = !this.mask;
				if (this.mask) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
			// 下一个输入
			nextNum(index,e){
				 var dom = document.getElementsByClassName("pwd-input"),
                    currInput = dom[index],
                    nextInput = dom[index + 1],
                    lastInput = dom[index - 1];
                /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
                if (e.keyCode != 8) {
                    if (index < (this.inputList.length - 1)) {
                        nextInput.focus();
                    } else {
                        currInput.blur();
                    }
                }else{
                    if (index !=0) {
                        lastInput.focus();
                    }
                }
			},
			// 支付单选
			changeCheck(index){
				this.payType[index].checkState = !this.payType[index].checkState
				for (let i = 0; i < this.payType.length; i++) {
					if (i == Number(index)) {
						this.payType[i].checkState = !this.payType[i].checkState
					} else {
						this.payType[i].checkState = false
					}
				}
				switch (index){
					case 2:
						this.carNum = 1
						break;
				}

			},
		}
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
	.order-acount{
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
			z-index:5;
			position: fixed;
			top: 0;
			left: 0;
			border-bottom: 1px solid #eee;
			.icon-left{
				position: absolute;
				left: .3rem;
				display: inline-block;
				width: .16rem;
				height: .28rem;
				z-index: 5
			}
			.header-title{
				display: inline-block;
				flex: 1;
				font-weight:bold;
			}
		}
		// 订单
		.order-mian{
			margin-top: .88rem;
			border-top: .16rem solid #f1f1f1;
			// 订单地址
			.order-addr{
				width: 100%;
				height: 1.8rem;
				.top-line{
					width: 100%;
					text-align: left;
					overflow: hidden;
					height: .12rem;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.check-infomation{
					height: 1.8rem;
					overflow: hidden;
					background: #fff;
					text-align: left;
				}
				.check-name{
					margin: .34rem .52rem 0 .3rem;
					display: flex;
				}
				.check-address{
					margin: .2rem .52rem 0 .3rem;
					line-height: .34rem;
				}
				.check-num{
					color: #aaa;
					margin-left: .22rem;
				}
				.user-name{
					margin: 0;
				}
				
			}
			// 商铺
			.car-shop{
				border-top: .16rem solid #f1f1f1;
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
				.car-goods{
					background: #fff;
					margin: 0 .3rem;
					li{
						border-top: 1px solid #f2f2f2;
					}
					.copule-tot{
						display: flex;
						height: .8rem;
						align-items: center;
					}
					
					.icon-delivery{
						display: inline-block;
						width: .26rem;
						height: .24rem;
						margin-right: .1rem;
						background: url('../../assets/car/icon-delivery.png') no-repeat;
						background-size: .26rem .24rem;
					}
					
					.expense{
						font-size: .26rem;
						display: flex;
						height: 1.15rem;
						align-items: center;
						color: #aaa;
					}
					
					.count,.comment{
						display: flex;
						height: .88rem;
						align-items: center;
					}
					.count{
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
					// 买家留言
					.car-goods-title{
						font-size: .26rem;
						color: #aaa;
						margin: 0;
					}
					.car-goods-input{
						text-align: right;
						height: .6rem;
						flex: 2;
					}
					
					
				}
			
			}
			.tr {
				font-size: .26rem;
				color: #aaa;
				flex: 1;
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
			.icon-right{
				margin-right: 0;
				width: .1rem;
				height: .18rem;
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
			.couple-txt{
				font-size: .22rem;
				line-height: .22rem;
				color: #aaa;
				margin-top: 0.1rem;
				text-align: left;
			}
			.couple .copule-total{
				display: flex;
				align-items: center;
				width: 100%;
			}
			.couple .copule-total div{
				flex: 1;
			}
			.pt30{
				padding: .3rem 0 0 0;
			}
			// 平台券
			.expense-couple{
				border-top: .16rem solid #f1f1f1;
				li{
					margin: 0 .3rem;
					height: .84rem;
					border-bottom: .01rem solid #f2f2f2;
				}
				.expense{
					font-size: .26rem;
					display: flex;
					align-items: center;
					color: #aaa;
				}
				.copule-tot{
					line-height: .85rem;
					display: flex;
				}
				.tr .label{
					vertical-align: middle;
					margin-right: .1rem;
				}
				.tr img{
					vertical-align: middle;
				}
			}
			
		}
		// 开关
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
		// 弹窗标题
		.coupon-title{
			text-align: center;
			font-size: .3rem;
			margin: .35rem 0;
		}
		
		.coupon-title img{
			float: right;
			width: .32rem;
			height: .32rem;
			margin-right: .3rem;
		}

		.pay-title img{
			width: .32rem;
			height: .32rem;
		}
		// 优惠券窗口
		.coupon-mask,.card-pay,.pay-pwd{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 60vh;
			overflow: auto;
			left: 0;
			background: #fff;
			border-radius: .2rem .2rem 0 0;
			z-index: 55;
			
			.get-title{
				color: #aaa;
				margin-left: .3rem;
				text-align: left;
			}
			.coupon-list{
				margin: 0 .22rem 0 .24rem;
			}
			.coupon-li{
				width: 6.9rem;
				height: 2rem;
				display: flex;
				margin: .3rem 0 0;
				background: url('../../assets/car/bg-coupon.png') no-repeat;
				background-size: 100% 100%;
			}
			.coupon-left{
				width: 2.4rem;
				height: 100%;
				margin: 0;
				color: #fefefe;
				text-align: center;
			}
			.coupon-money{
				font-size: .72rem;
				margin-top: .4rem;
				small{
					font-size: .4rem;
					margin-right: .05rem;
				}
			}
			.coupon-condition{
				font-size: .26rem;
				
			}
			.coupon-right{
				flex: 2;
				margin-left: 0;
				margin: 0 .3rem 0 .15rem;
			}
			.coupon-type{
				font-size: .22rem;
				text-align: left;
				margin: .25rem 0 0;
			}
			.coupon-label{
				display: inline-block;
				padding: .05rem .12rem;
				background-color: #febf38;
				border-radius: .15rem;
				color: #fff;
				text-align: center;
				margin:0 .1rem 0 0;
				line-height: .22rem;
			}
			.coupon-limit-time{
				font-size: .2rem;
				color: #aaa;
				align-items: center;
				display: flex;
				height: .3rem;
				margin: .12rem 0;
				.time{
					margin: 0;
				}
			}
			.coupon-tips{
				font-size: .2rem;
				color: #aaa;
				border-top: .03rem solid #f2f2f2;
				padding-top: .15rem;
				text-align: left;
			}
		}
		// 选择按钮
		.check-box{
			width: .3rem;
			height: .3rem;
			margin-right: 0;
			display: inline-block;
			vertical-align: middle;
			position: relative;
		}
		.check-box input{
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
			z-index: 2;
		}
// 		.check-box input:checked + label{
// 			border: none;
// 			background: #ffba30;
// 			background-image: url('../../../static/img/icon-check-fff.png');
// 			background-repeat: no-repeat;
// 			background-size:.21rem .14rem;
// 			background-position: .04rem .08rem;
// 		}
		.check-box .checkbox-label{
			display: inline-block;
			width: .3rem;
			height: .3rem;
			border-radius:50%;
			border: .02rem solid #babac2;
		}
		.check-box .checkbox-label.active{
			border: none;
			background: #ffba30;
			background-image: url('../../../static/img/icon-check-fff.png');
			background-repeat: no-repeat;
			background-size:.21rem .14rem;
			background-position: .04rem .08rem;
		}			
		// 支付弹窗
		.pay-mask{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 60vh;
			overflow: auto;
			left: 0;
			background: #fff;
			border-radius: .2rem .2rem 0 0;
			z-index: 55;
			.pay-title{
				text-align: center;
				height: .95rem;
				position: relative;
				line-height: .95rem;
				font-size: .3rem;
			}
			.pay-price{
				font-size: .60rem;
				border-top: 1px solid #f1f1f1;
				padding: .3rem 0 .15rem 0;
				text-align: center;
			}
			// 支付方式
			.pay-type{
				margin: 0 .3rem;
				li{
					height: 1.2rem;
					display: flex;
					align-items: center;
					border-bottom: 0.03rem solid #f1f1f1;
					.pay-img{
						width: .36rem;
						// height: .36rem;
						margin: 0;
					}
					.pay-name{
						font-size: .3rem;
						margin-left: .28rem;
					}
				}
			}
			
		}
		// 
		.icon-close{
			position: absolute;
			right: .3rem;
			top: .3rem;
			width: .32rem;
			height: .32rem;
			z-index: 30;
		}
		// 卡片支付
		.card-pay,.pay-pwd{
			.pay-nav{
				width: 100%;
				height: .95rem;
				line-height: .95rem;
				font-size: .34rem;
				border-bottom: 1px solid #f2f2f2;
				position:relative;
				font-family: 'pf-Medium';
				.icon-left{
					position: absolute;
					left: .3rem;
					top: .33rem;
					display: inline-block;
					width: .16rem;
					height: .28rem;
					z-index: 5
				}
			}
			// 金卡背景
			.gold{
				background: url('../../assets/car/bg-gold.png') no-repeat;
			}
			// 银卡
			.bank{
				background: url('../../assets/car/bg-bank.png') no-repeat;
			}
			// 钻卡
			.drill{
				background: url('../../assets/car/bg-drill.png') no-repeat;
			}
			.card-main{
				margin: .4rem .6rem;
				height: 3.54rem;
				overflow: hidden;
				border-radius: .06rem;
				background-size: 100% 100%;
				font-family: 'pis';
				color: #fff;
				text-align: left;
				.card-title{
					padding: .5rem .3rem 0 .36rem;
					position: relative;
					span{
						font-size: .36rem;
					}
					label{
						display: inline-block;
						position: absolute;
						right: .3rem;
						top: .5rem;
						width: .3rem;
						height: .3rem;
						z-index: 5;
						background: #fff;
						border-radius: 50%;
						opacity: .4
					}
					.dot{
						right: .45rem;
					}
				}
				// 金额
				.card-money{
					font-size: .72rem;
					line-height: .72rem;
					margin: 1rem 0 0 .36rem;
					small{
						font-size: .42rem;
					}
				}
				p{
					font-size: .22rem;
					line-height: .22rem;
					margin: .3rem 0 0 .36rem;
					font-family: 'pf-Regular'
				}
			}
			.card-footer{
				height: 1.15rem;
				border-top: 1px solid #f2f2f2;
				position: fixed;
				bottom: 0;
				font-size: .34rem;
				line-height: 1.15rem;
				left: 0;
				width: 100%;
				z-index: 15;
				font-family: 'pf-Medium'
			}
		}
	
		// 支付密码
		.pay-tips{
			text-align: center;
			color: #aaa;
			font-size: .24rem;
			margin: .4rem 0;
		}
		.pay-input{
			margin: 0 .3rem;
			display: flex;
			input{
				height: 1.2rem;
				width: .85rem;
				text-align: center;
				font-size: .6rem;
				background: #efefef;
				margin:0 .35rem 0 0;
			}
			input:last-child{
				margin: 0;
			}
		}
	}
	
</style>
