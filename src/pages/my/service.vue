<template>
	<div class="Customer-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>联系客服</label>
		</div>
		<div class="customer-bg">
			<img class="bg-server" src="../../../static/img/bg-server.png" />
			<div class="customer-txt">
				<div class="customer-tips-title c1e"><label class="customer-tips-title-p">温馨提示</label><div class="cus-line"></div></div>
				<div class="customer-tips">暂未开通在线服务，您可通过以下方式联系商家。</div>
			</div>
			<img class="ball-green" src="../../../static/img/ball-green.png" />
			<img class="ball-pink" src="../../../static/img/ball-pink.png" />
		</div>
		
		<!--联系方式  -->
		<div class="contanct">
			<ul class="contanct-list">
				<li>
					<div class="contanct-title">
						<div class="icon">
							<img class="icon-small icon-phone" src="../../../static/img/c-phone.png"/>
						</div>							
						<div class="mL18">联系电话</div>
					</div>
					<div class="contanct-num">{{listdata.merchantPhone}}</div>
				</li>
				<li>
					<div class="contanct-title">
						<div class="icon">
							<img class="icon-small icon-weixin" src="../../../static/img/c-weixin.png"/>
						</div>
						<div class="mL18">客服微信</div>
					</div>
					<div class="contanct-num">{{listdata.wechat}}</div>
				</li>
				<li>
					<div class="contanct-title">
						<div class="icon">
							<img class="icon-small icon-qq" src="../../../static/img/c-qq.png"/>
						</div>		
						<div class="mL18">客服QQ</div>
					</div>
					<div class="contanct-num">{{listdata.qqNumber}}</div>
				</li>
			</ul>
		</div>
		<!-- <div class="footer-nav">
			<div class="" @click="toAll">全部宝贝</div>
			<div class="" @click="toType">宝贝分类</div>
			<div class="active" >联系商家<label class="footer-line"></label></div>
		</div> -->
	</div>
</template>

<script>
	import common from '../../plugins/common.js';
	import shop from '../../server/shop.js';
	
	export default{
		data(){
			return{
				params:{
					"merchantId": "",
					  "source": 0,
					  "userId": "",
					  "userToken": ""
				},
				listdata:''
			}
		},
		mounted() {
			this.params.merchantId = this.$route.query.id;
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined;
			this.shopAll();
		},
		methods:{
			cancel(){
				this.$router.go(-1)
			},
			toAll(){
				//全部宝贝
				this.$router.push("/companyAll")
			},
			toType(){
				this.$router.push("/companyType")
			},
			toService(){
				this.$router.push("/customer")
			},
			//店铺数据
			shopAll(){
				shop.company(this.params).then(res =>{
					console.log(res)
					if(res.code==0){
						this.listdata = res.data;
					}else{
						console.log(res.message)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/common.css';
	@import '../../../static/css/style.css';
	@import '../../../static/css/header.css';
	.Customer-main{
		width: 100%;
		height: 100vh;
		overflow:auto;
		
		.header label{
			flex: 1;
		}
		.customer-bg{
			width: 100%;
			height: 3.72rem;
			display: flex;
			font-size: .26rem;
			position: relative;
			background: #fff9ee;
			margin-top: 0.88rem;
		}
		.bg-server{
			width: 2.24rem;
			height: 2.71rem;
			margin: .1rem 0 0 1rem;
		}
		.customer-txt{
			margin:.9rem .7rem 0 .54rem;
			text-align: left;
		}
		.customer-tips-title{
			position: relative;
			font-size: .28rem;
			width:100%;
			height: .3rem;
			font-weight: bold;
			line-height: .28rem;
		}
		.customer-tips-title-p{
			display: inline-block;
			width: 100%;
			height: .3rem;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 5;
			background: transparent;
		}
		.cus-line{
			display: inline-block;
			position: absolute;
			width: 1.14rem;
			height: .08rem;
			background-color: #ffeb9a;
			border-radius: .04rem;
			bottom: -.02rem;
			left: .1rem;
			z-index: 1;

		}
		.customer-tips{
			margin-top: .34rem;
			line-height: .36rem;
			color: #7f7f7f;
		}
		.ball-green,.ball-pink{
			display: inline-block;
			position: absolute;
		}
		.ball-green{
			width: .16rem;
			height: .16rem;
			right: .45rem;
			bottom: 1.02rem;
		}
		.ball-pink{
			width: .08rem;
			height: .08rem;
			right: .77rem;
			bottom: .86rem;
		}
		.contanct{
			width: 6.9rem;
			height: 3.88rem;
			border-radius: .04rem;
			background-color: #ffffff;
			box-shadow: 0px 3px 6px 0px rgba(174, 174, 174,0.2);
			margin: -.64rem  auto 0;
			overflow: hidden;
			position: relative;
			z-index: 6;
		}
		.contanct-list{
			margin: .24rem .38rem 0;
			text-align: left;
		}
		.contanct-list li{
			margin-bottom: .40rem;	
			font-size: .28rem;
		}
		.contanct-title{
			display: flex;
			height: .4rem;
			align-items: center;
		}
		.icon{
			width: .4rem;
			height: .4rem;
			display: inline-block;
			background: #fedb6a;
			border-radius: 50%;
			position: relative;
			margin: 0;
		}
		.icon-small{
			position: absolute;
			left: -0.08rem;
			top: .06rem;
			z-index: 5;
		}
		.mL18{
			margin-left: .18rem;
			color: #1e1e1e;
			display: inline-block;
		}
		.icon-phone{
			width: .3rem;
			height: .26rem;
		}
		.icon-weixin{
			width: .34rem;
			height: .28rem;
		}
		.icon-qq{
			width: .26rem;
			height: .28rem;
		}
		.contanct-num{
			margin:.14rem 0 0 .55rem;
			color: #7f7f7f;
			font-family:'pf-Regular';
		}
		
	}
	
</style>
