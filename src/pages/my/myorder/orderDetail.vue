<template>
	<div class="hotel-detail-main">
		<div class="header">
			<img class="icon-left" src="../../../../static/img/icon-left-blod.png" @click="toBack" />
			<label class="header-title">订单详情</label>
		</div>
		<!-- 入住状态 -->
		<div class="check-in-state">
			<div class="check-txt">
				<p>当前状态：{{orderlist.statusType}}</p>
				<p class="mt20">序列号：{{orderlist.id}}</p>
			</div>
			<img class="checkbg-person" src="../../../assets/hotel/checkbg-person.png" />
		</div>
		<!-- 入驻信息 -->
		<div class="check-infomation f28 c1e">
			<div class="check-name">
				<label>{{orderlist.userName}}</label>
				<span class="check-num">{{orderlist.userPhone}}</span>
			</div>
			<div class="check-address">{{orderlist.reciveAddress}}</div>
		</div>
			<!-- 订单酒店 -->
		<div class="order-hotel">
			<div class="hotel-title f28 c1e">
				<img class="icon-ordershop" src="../../../assets/hotel/icon-shop.png"/>{{orderlist.merchantName}}<img class="icon-right" src="../../../../static/img/icon-r-return.png"/>
                </div>
			<div class="hotel-alls">
				
				<img v-lazy="orderDetails.goodsImg" alt="">
				<div class="hotel-descript">
					<div class="hotel-descript-title f26 c1e">{{orderDetails.goodsName}}</div>
					<div class="hotel-type f26">
						{{orderDetails.specName}}:{{orderDetails.specDesc}}
					</div>
					<div class="price">
						<label class="price-money">￥{{orderDetails.actualAmount}}</label>
						<label class="price-num f24">×{{orderDetails.number}}</label>
					</div>
				</div>
				
			</div>
			 <div class="btns" v-if="orderlist.status == 0">
				<div class="cffb-btns">付款</div>
				<div class="gray-btns" @click="cancelOrder()">取消订单</div>
			</div>
			<div class="btns" v-if="orderlist.status == 1">
				<div class="cffb-btns mr30" @click="delivery()">提醒发货</div>
				<div class="cffb-btns"  @click="apply()" >申请退款</div>
			</div>
			<div class="btns" v-if="orderlist.status == 2">
				<div class="cffb-btns "  @click="confirmOrder()" >确认收货</div>
				<!-- <div class="cffb-btns"  @click="apply()" >申请退款</div> -->
			</div>
			<div class="btns" v-if="orderlist.status == 3">
				<div class="cffb-btns">评价</div>
			</div>
			<div class="btns" v-if="orderlist.status == 4">
				<div class="cffb-btns" @click="afterservice">申请售后</div>
			</div>
			<div class="btns" v-if="orderlist.status == 8">
				<div class="gray-btns" @click="deleteOrder()">删除订单</div>
			</div>
                <!-- <div class="confirm" @click="evaluate">{{button1}}</div> -->
				<!-- 
				<div class="confirm" v-if="orderlist.orderType == 0">等待付款</div>
				<div class="confirm" v-if="orderlist.orderType == 1">等待发货</div>
				<div class="confirm" v-if="orderlist.orderType == 2">等待收货</div>
				<div class="confirm" v-if="orderlist.orderType == 3">等待评论</div>
				<div class="confirm" v-if="orderlist.orderType == 4">订单完成</div>
				<div class="confirm" v-if="orderlist.orderType == 5">申请退款</div>
				<div class="confirm" v-if="orderlist.orderType == 6">退款审核完成</div>
				<div class="confirm" v-if="orderlist.orderType == 7">退款完成</div> -->
                <!-- <div class="afterservice" @click="afterservice">
                    {{button2}}
                </div> -->
                
		</div>
		<!-- 报销凭证  订单结算-->
		<ul class="expense-couple">
			<li class="expense b1">
				<img class="icon-expense" src="../../../assets/hotel/icon-redict.png" />
				报销凭证：该服务请提前联系商家确认
			</li>
			<li class="couple mt20">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">商品总价</label></div>
					<div class="tr" >¥ {{orderDetails.actualAmount}}</div>
				</div>
			</li>
			<li class="couple">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">收益钱包</label></div>
					<div class="tr" >¥ 0.00</div>
				</div>
			</li>
			<li class="couple b1">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">折扣券</label></div>
					<div class="tr" >¥ {{orderlist.discountAmount}}</div>
				</div>
			</li>
			<li class="couple allNum">
				<div class="copule-tot">
					<div class="tl"><label class="icon-couple">订单实付</label></div>
					<div class="tr" >¥ {{orderlist.actualAmount}}</div>
				</div>
			</li>
		</ul>
		<!-- 订单信息 -->
		<ul class="order-info">
			<li class="c1e h80">
				<img class="icon-order" src="../../../assets/hotel/icon-order.png" />
				订单信息
			</li>
			<li class="order-detail">
				<div class="">订单编号:<span>{{logistics.id}}</span></div>
				<div class="copy-btn">复制</div>
			</li>
			<li>
				<div class="">{{logistics.logisticsDesc}}：<span>{{logistics.date}}</span></div>
			</li>
			<li>
				<div class="">支付时间：<span>{{logistics.date}}</span></div>
			</li>
			<li>
				<div class="">成交时间：<span>{{logistics.date}}</span></div>
			</li>
		</ul>
		
		<popup ref="myConfirm" @userBehavior="onback"></popup>
	</div>
</template>

<script>
import user from '../../../server/user.js';
import popup from '@/pages/my/popup'

	export default{
		 components:{
		    popup
		},
        data() {
            return {
                button1:"",
				button2:"",
				orderDetails:"",
				logistics:"",
				orderlist:{},
				params:{
					source:'0',
					userId:'',
					userToken:"",
					orderId:""
				},
            }
        },
        created() {
            // let res = this.$route.query.state;
			
//             this.button1 = res.data1.statusType
// 			this.button2 = res.button2
// 			this.orderlist = res.data1;
// this.params.orderId = res.data1.id;
        },
		methods:{
            toBack() {
                this.$router.go(-1)
            },
            afterservice() {
                this.$router.push({path:"/afterservice",query:{code:""}})
            },
            evaluate() {
                console.log('正在开发中')
                // this.$router.push({path:"/evaluate"})
			},
			apply(){
				this.$router.push({path:"/apply",query:{id:this.$route.query.id}})
			},
			orderDetail() {
				user.orderDetails(this.params).then(res=>{
					this.orderlist = res.data;
					this.logistics = res.data.logistics[0];
					this.orderDetails = res.data.orderDetails[0];
				})
			},
			onback(type) {
				/*
				*取消订单 删除订单 确认收货
				*/
				if(this.state == 0){
					if(type == "clickConfirm") {
					    user.cancelOrder(this.params).then(res =>{
					    	this.$router.push("/order1")
					    })
					}else{
					    console.log("用户点击了取消")
					}
				}else if(this.state == 1){
					if(type == "clickConfirm") {
					    user.delOrder(this.params).then(res =>{
					    	// this.orderList();
							this.$router.push("/order1")
					    })
					}else{
					    console.log("用户点击了取消")
					}
				}else if(this.state == 2){
					if(type == "clickConfirm") {
					    user.confirmOrder(this.params).then(res =>{
							this.$router.push("/order1")
					    })
					}else{
					    console.log("用户点击了取消")
					}
				}else if(this.state == 3){
					if(type == "clickConfirm") {
					    user.delivery(this.params).then(res =>{
							console.log(res)
					    })
					}else{
					    console.log("用户点击了取消")
					}
				}
			    
			},
				// 取消订单
			cancelOrder(){
				this.state = 0;
				this.$refs.myConfirm.show("亲，确定不要该宝贝了吗？", {titleText:"取消订单",cancelText:"取消",confirmText:"确认",type:"confirm"})
			},
			// 删除订单
			deleteOrder(){
				// this.order.orderId = id;
				this.state = 1;
				this.$refs.myConfirm.show("删除后将不可恢复哦~", {titleText:"删除订单",cancelText:"取消",confirmText:"确认",type:"confirm"})
			},
			// 确认收货
			confirmOrder(){
				// this.order.orderId = id;
				this.state = 2;
				this.params.payPwd = 654321;
				this.params.type = 0;
				this.$refs.myConfirm.show("请收到货再确认哦，否则钱财两空~", {titleText:"确认收货",cancelText:"取消",confirmText:"确认",type:"confirm"})
			},
			// 提醒发货
			delivery(){
				this.state = 3;
				this.params.payPwd = 654321;
				this.params.type = 0;
				this.$refs.myConfirm.show("提醒商家尽快发货~", {titleText:"提醒发货",cancelText:"取消",confirmText:"确认",type:"confirm"})
			},
		},
		mounted() {
			let islogin = JSON.parse(localStorage.getItem("islogin"));
			this.params.userToken = islogin.userToken;
			this.params.orderId = this.$route.query.id;
			this.params.userId = islogin.userId;
			this.orderDetail()
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../../static/css/style.css";
	@import "../../../../static/css/header.css";
	
	.hotel-detail-main{
		width: 100%;
		height: 100vh;
		background: #eee;
		overflow:auto;
		
		.header label{
			display: inline-block;
			flex: 1;
			background: #fff;
		}
		/*入住状态*/
		.check-in-state{
			width: 100%;
			margin-top: 1.04rem;
			height: 2rem;
			display: flex;
			background-image:url('../../../assets/hotel/checkbg.png');  
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
			max-height:2rem;
			overflow: hidden;
			background: #fff;
			text-align: left;
		}
		.check-name{
			margin: .34rem .52rem 0 .3rem;
		}
		.check-address{
			margin: .2rem .52rem 0 .3rem;
			padding-bottom:.1rem; 
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
		.hotel-alls{
			display: flex;
			margin-top: .3rem;
			padding-bottom: .3rem;
			border-bottom: .01rem solid #f2f2f2;
		}
		.hotel-alls img{
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
		.price{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.price-money,.price-num{
			display: inline-block;
			width: 49%;
		}
		.price-money{
			font-size: .3rem;
			color: #b50000;
			text-align: left;
			margin-right: 3.5rem;
		}
		.price-num{
			color: #aaa;
			text-align: right;
			margin-top: 0.13rem;
		}
		.order-time{
			width: 100%;
			display: flex;
			height: .85rem;
			align-items: center;
            flex-direction: row;
            justify-content: flex-end;
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
			padding-bottom: 0.4rem;
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
        .confirm{
            width: 1.5rem;
            height: 0.54rem;
            border: 0.01rem solid #feb336;
            border-radius: 0.27rem;
            // font-weight: bold;
            line-height: 0.54rem;
            float: right;
            margin-right: 0.3rem;
            color:#feb336;
            display: flex;
            flex-direction:row; 
            justify-content: center;
            margin-left: 0rem;
        }
        .afterservice{
            width: 1.5rem;
            height: 0.54rem;
            border: 0.01rem solid #feb336;
            border-radius: 0.27rem;
            // font-weight: bold;
            line-height: 0.54rem;
            display: flex;
            flex-direction:row; 
            justify-content: center;
            margin-right: 0.1rem;
            color:#feb336;
            float: right;
            margin-left: 0rem;
        }
		.btns{
			display: flex;
			flex-direction:row; 
			padding: .3rem 0;
			justify-content: flex-end;
			.cffb-btns,.gray-btns{
				display: inline-block;
				 width: 1.5rem;
				height: 0.54rem;
				font-size: 0.26rem;
				text-align: center;
				border-radius: 0.27rem;
				line-height: 0.54rem;
				margin: 0;
			}
			.cffb-btns{
				color:#feb336;
				border: 1px solid #feb336;
			}
			.gray-btns{
				color: #aaa;
				margin-left: .3rem;
				border: 1px solid #aaa;
			}
			.mr30{
				margin-right: .3rem;
			}
		}
}
</style> 
