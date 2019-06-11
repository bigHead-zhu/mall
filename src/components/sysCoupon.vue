<template>
	<div class="compone-sys"  v-show="showState" >
			<!-- 平台优惠券 -->
		<div class="mask"></div>
		<div class="coupon-mask">
			<div class="coupon-title c1e ">
				优惠券
				<img src="../../static/img/icon-close.png"  @click="sysProps" />
			</div>
			<p class="get-title f28">可领取优惠券</p>
			<ul class="coupon-list">
				<li class="coupon-li" v-for="(item,index) in sysCoupon" :key="index">
					<div class="coupon-left"  v-show="item.type==0">
						<p class="coupon-money"><small>¥</small>{{item.discountAmount}}</p>
						<p class="coupon-condition">满{{item.conditionAmount}}减{{item.discountAmount}}</p>
					</div>
					<div class="coupon-left"  v-show="item.type==1">
						<p class="coupon-money"><small></small>{{item.discountAmount}}<label class="f24">折</label></p>
						<p class="coupon-condition" v-show="item.conditionAmount">满{{item.conditionAmount}}打{{item.discountAmount}}折</p>
					</div>
					<div class="coupon-right">
						<p class="coupon-type">
							<label class="coupon-label">平台券</label>
							<!-- <label class="coupon-limit c1e">订单中的商品不支持</label> -->
						</p>
						<div class="coupon-limit-time">
							<div class="time">
								{{item.startTime}}至{{item.endTime}}
							</div>
							<div class="check-box" @click="sysCheck(index,item.couponId,item.couponDetailsId)" >
								<input type="checkbox"   :checked="item.isCheck"/>
								<label class="checkbox-label" :class="item.isCheck?'active':''"></label>
							</div>
						</div>
						<p class="coupon-tips">
							使用说明：此券不与商家券叠加使用，请在有效期内使用
						</p>
					</div>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	export default{
		props:{
			sysCoupon:{
				type:Array,
				default:function(){
					return []
				}
			},
		    value: {
		      type: '',
		      default: ''
		    },
		},
		data(){
			return{
				showState:false
			}
		},
		watch:{
			value(newVal, oldVal) {
			  this.showState = newVal
			},
			showState(val) {
			  this.$emit('input', val)
			}
		},
		mounted(){
			this.showState = this.value
		},
		methods:{
			Props(){
				if (this.showState) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
			// 平台优惠券窗口
			sysProps(){
				this.showState =!this.showState;
				this.Props();
			},
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../static/css/style.css';
	@import '../../static/css/common.css';
	.compone-sys{
		// 优惠券窗口
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
		.coupon-mask{
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
				background: url('../assets/car/bg-coupon.png') no-repeat;
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
					margin-left: 0;
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
		
		.check-box .checkbox-label{
			display: inline-block;
			width: .3rem;
			height: .3rem;
			border-radius:50%;
			border: 1px solid #babac2;
		}
		.check-box .checkbox-label.active{
			border: none!important;
			background: #ffba30;
			background-image: url('../../static/img/icon-check-fff.png');
			background-repeat: no-repeat;
			background-size:.2rem .14rem;
			background-position: .05rem .07rem;
		}	
		
	}
</style>
