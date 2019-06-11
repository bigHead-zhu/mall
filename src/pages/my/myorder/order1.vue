<template>
    <div class="details">
       
		<div class="order-details" v-for="(item,index) in orderlist" :key="index" >
            <div class="details-title" @click="goDetail(item)">
                <div class="merchantLogo">
                    <img v-lazy="item.merchantLogo" alt="">
                </div>
                <p class="title">{{item.merchantName}}</p>
                <div class="title1">
                    <img src="../../../../static/img/user/arrow.png" alt="">
                </div>
                
                <p class="buyer">{{item.statusType}}</p>
            </div>
            <div class="details-content" @click="goDetail(item.id)">
                <div>
                    <img v-lazy="item.goodsImgs" alt="">
                </div>
                <div class="details-model">
                    <div class="name">
                        {{item.goodsName}}
                    </div>
                    <div class="model-one">
                        <p>{{item.specName}}: {{item.specDesc}}</p>
                        <p class="number">×{{item.goodsCount}}</p>
                    </div>
                </div>
            </div>
            <div class="details-price">
                <p>共{{item.goodsCount}}件商品 合计：</p>
                <p>￥{{item.totalAmount}}</p>    
            </div>
            <div class="btns" v-if="item.status == 0">
            	<div class="cffb-btns">付款</div>
            	<div class="gray-btns" @click="cancelOrder(item.id)">取消订单</div>
            </div>
            <div class="btns" v-if="item.status == 1">
            	<div class="cffb-btns" @click="delivery(item.id)">提醒发货</div>
            	<!-- <div class="gray-btns" @click="cancelOrder(item.id)">申请退款</div> -->
            </div>
            <div class="confirm" v-if="item.status == 2" @click="confirmOrder(item.id)" >确认收货</div>
            <div class="confirm" v-if="item.status == 3">评价</div>
			<div class="btns" v-if="item.status == 4">
				<div class="gray-btns" @click="deleteOrder(item.id)">删除订单</div>
			</div>
            <div class="confirm" v-if="item.status == 5">申请退款</div>
            <div class="confirm" v-if="item.status == 6">退款审核完成</div>
            <div class="confirm" v-if="item.status == 7">退款完成</div>
			<div class="btns" v-if="item.status == 8">
				<div class="gray-btns" @click="deleteOrder(item.id)">删除订单</div>
			</div>
        </div>
		
		<popup ref="myConfirm" @userBehavior="onback"></popup>
    </div>
</template>

<script>
import user from '../../../server/user.js';
import popup from '@/pages/my/popup';

export default {
    data() {
        return{
            params:{
                source:'0',
                // openId:'1',
                userId:'1557044636818036',
                userToken:"",
                type:0,
                pageSize:10,
                fromNum:1
            },
			order:{
				userId:"",
				userToken:'',
				source:0
			},
            orderlist:[],
            status: "",
			showOrder:true,
        }
    },
    methods:{
        //订单列表
        orderList() {
            user.orderList(this.params).then(res=>{
                this.orderlist = res.data.orderListVo;
            })
        },
        //详情
        goDetail(id) {
            // this.$router.push({path:"/orderDetail",query:{button1:"待评价",button2:"售后",data1:item}})
            this.$router.push({path:"/orderDetail",query:{id:id}})
        },
		// 取消订单
		cancelOrder(id){
			this.order.orderId = id;
			this.state = 0;
			this.$refs.myConfirm.show("亲，确定不要该宝贝了吗？", {titleText:"取消订单",cancelText:"取消",confirmText:"确认",type:"confirm"})
		},
		// 删除订单
		deleteOrder(id){
			this.order.orderId = id;
			this.state = 1;
			this.$refs.myConfirm.show("删除后将不可恢复哦~", {titleText:"删除订单",cancelText:"取消",confirmText:"确认",type:"confirm"})
		},
		// 确认收货
		confirmOrder(id){
			this.order.orderId = id;
			this.state = 2;
			this.order.payPwd = 654321;
			this.order.type = 0;
			this.$refs.myConfirm.show("请收到货再确认哦，否则钱财两空~", {titleText:"确认收货",cancelText:"取消",confirmText:"确认",type:"confirm"})
		},
		// 提醒发货
		delivery(id){
			this.order.orderId = id;
			this.state = 3;
			this.order.payPwd = 654321;
			this.order.type = 0;
			this.$refs.myConfirm.show("提醒商家尽快发货~", {titleText:"提醒发货",cancelText:"取消",confirmText:"确认",type:"confirm"})
		},
		onback(type) {
			/*
			*取消订单 删除订单 确认收货
			*/
			if(this.state == 0){
				if(type == "clickConfirm") {
				    user.cancelOrder(this.order).then(res =>{
				    	this.orderList();
				    })
				}else{
				    console.log("用户点击了取消")
				}
			}else if(this.state == 1){
				if(type == "clickConfirm") {
				    user.delOrder(this.order).then(res =>{
				    	this.orderList();
				    })
				}else{
				    console.log("用户点击了取消")
				}
			}else if(this.state == 2){
				if(type == "clickConfirm") {
				    user.confirmOrder(this.order).then(res =>{
						console.log(res)
				    	this.orderList();
				    })
				}else{
				    console.log("用户点击了取消")
				}
			}else if(this.state == 3){
				if(type == "clickConfirm") {
				    user.delivery(this.order).then(res =>{
						console.log(res)
				    	this.orderList();
				    })
				}else{
				    console.log("用户点击了取消")
				}
			}
		    console.log(type);
		    
		}
    },
    mounted() {
        let islogin = JSON.parse(localStorage.getItem("islogin"));
        this.params.userToken = islogin.userToken;
        this.params.userId = islogin.userId;
		this.order.userToken = islogin.userToken;
		this.order.userId = islogin.userId;
        this.orderList();
    },
    components:{
        popup,
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../static/css/style.css";

    .details{
        width: 100%;
        height: auto;
        background-color: #f1f1f1;
        box-sizing: border-box;
        padding-top: 0.16rem;
        font-family:'pf-Medium';
    .merchantLogo{
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0rem;
        margin-left: 0.3rem;
    }
    .merchantLogo img{
        width: 100%;
        height:100%;
    }
    .order-details{
        width: 100%;
        height: 4.39rem;
        background-color: #ffffff;
        margin-bottom: 0.16rem;
    }
    .details-title{
        height: 0.78rem;
        width: 100%;
        line-height: 0.78rem;
        font-size: 0.26rem;
        text-align: left;
        display: flex;
        flex-direction: row;
        margin-left: 0rem;
        align-items: center;
    }
    .details-title p{
        // font-weight: bold;
        font-family:'pf-Medium';
    }
    .title{
        margin-left: 0.1rem;
    }
    .title1{
        width: 0.1rem;
        height: 0.18rem;
        margin-left: 0.4rem;
    }
    .title1 img{
        width: 100%;
        height: 100%;
        
    }
    .buyer{
        margin-right: 0.3rem;
        color: #feb336;
    }
    .details-content{
        width: 100%;
        height: 1.8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .details-content img{
        width: 1.8rem;
        height: 1.8rem;
    }
    .details-model{
        width: 4.8rem;
        height: auto;
        text-align: left;
        font-size: 0.26rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .name{
        // font-weight: bold;
        font-size: 0.26rem;
        color: #1e1e1e;
        font-family:'pf-Regular';
        text-align: left;
        margin-left: 0rem;
        margin-bottom: 0.1rem;
    }
    .model-one{
        width: 4.6rem;
        text-align: left;
        margin-left: 0rem;
        display: flex;
        font-size: 0.26rem;
        font-family:'pf-Regular';
        flex-direction: row;
        justify-content: space-between;
        color: #aaaaaa;
        margin-top: 0.2rem;
    }
    .details-price{
        display: flex;
        flex-direction:row; 
        justify-content: flex-end;
        font-size: 0.24rem;
        margin-right: 0.3rem;
        color: #aaaaaa;
        margin-top: 0.32rem;
    }
    .price-last{
        font-size: 0.3rem;
        color: #aaaaaa;
        margin-top: -0.04rem;
    }
    .confirm{
        width: 1.5rem;
        height: 0.54rem;
        font-size: 0.26rem;
        border: 0.01rem solid #feb336;
        border-radius: 0.27rem;
        // font-weight: bold;
        line-height: 0.54rem;
        display: flex;
        flex-direction:row; 
        justify-content: center;
        margin-right: 0.3rem;
        color:#feb336;
        margin-top: 0.3rem;
    }
	.btns{
		display: flex;
		flex-direction:row; 
		justify-content: flex-end;
		.cffb-btns,.gray-btns{
			display: inline-block;
			 width: 1.5rem;
			height: 0.54rem;
			font-size: 0.26rem;
			border-radius: 0.27rem;
			line-height: 0.54rem;
			margin: 0.3rem 0.3rem 0 0;
		}
		.cffb-btns{
			color:#feb336;
			border: 1px solid #feb336;
		}
		.gray-btns{
			color: #aaa;
			border: 1px solid #aaa;
		}
	}
	
    }
</style>