<template>
	<div class="address-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">收货地址</label>
		</div>
		<!-- 地址选择 -->
		<ul class="address-list">
			<li class="address-li">
				<div class="user-title">
					<label class="user-name c1e">琳琳</label>
					<label class="user-phone c1e">18154877899</label>
					<label class="user-label ">默认</label>
				</div>
				<div class="address-txt">
					<div class="addr-detail-txt c1e">
					四川省 成都市 成华区 双水碾街道站北中街道83号码一栋三单元20号
					</div>
					<div class="icon-edit" @click="tofillAddress()"></div>
				</div>
			</li>
			<li class="address-li">
				<div class="user-title">
					<label class="user-name c1e">琳琳</label>
					<label class="user-phone c1e">18154877899</label>
					<!-- <label class="user-label ">默认</label> -->
				</div>
				<div class="address-txt">
					<div class="addr-detail-txt c1e">
					四川省 成都市 成华区 双水碾街道站北中街道83号码一栋三单元20号
					</div>
					<div class="icon-edit"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		methods:{
			// 填写地址
			tofillAddress(){
				
			},
		},
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	.address-main{
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
			border-bottom: 1px solid #eee;
			.icon-left{
				display: inline-block;
				width: .16rem;
				height: .28rem;
				margin-left: .3rem;
			}
			.header-title{
				display: inline-block;
				flex: 1;
				font-weight:bold;
			}
		}
		// 地址列表
		.address-list{
			margin-top: .88rem;
			border-top: .16rem solid #f1f1f1;
			
			.address-li{
				border-bottom: 1px solid #f1f1f1;
				margin: 0 .3rem;
				height: 1.68rem;
			}
			.user-title{
				text-align: left;
				display: flex;
				align-items: center;
				margin: .3rem 0 0 0;
			}
			.user-name,.user-phone{
				font-size: .32rem;
			}
			.user-name{
				margin: 0;
			}
			.user-phone{
				margin: 0 .26rem 0 .43rem;
			}
			.user-label{
				width: .7rem;
				height: .3rem;
				color: #fff; 
				line-height: .3rem;
				text-align: center;
				display: inline-block;
				font-size: .22rem;
				margin: 0;
				align-self: center;
				background-image: linear-gradient(93deg,#ff99a7 0%,	#fe7f9a 100%);
				border-radius: .15rem;
			}
			.icon-edit{
				width: .25rem;
				height: .24rem;
				margin-right: 0;
				//background: url('../../../static/img/icon-pen.png') no-repeat 100%;
				background-image: url('../../../static/img/icon-pen.png');
				background-repeat: no-repeat;
				background-size:100% 100%;
			}
			.address-txt{
				font-size: .26rem;
				text-align: left;
				display: flex;
				margin-top: .2rem;
				align-items: center;
			}
			.addr-detail-txt{
				width: 5.9rem;
				line-height: .34rem;
				margin: 0;
			}
			
			
		}
		
	}
</style>
