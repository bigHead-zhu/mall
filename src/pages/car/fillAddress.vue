<template>
	<div class="fill-address">
		<div class="header">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel()" />
				<div class="header-title">编辑收货地址</div>
				<div class="icon-del c1e">删除</div>
		</div>
		<div class="edit-main">
			<!-- 收货人 -->
			<div class="edit-list">
				<div class="edit-title">收货人</div>
				<input class="edit-input" type="text" placeholder="请输入收货人姓名"/>
			</div>
			<!-- 手机号码 -->
			<div class="edit-list">
				<div class="edit-title">手机号码</div>
				<input class="edit-input" type="tel" placeholder="请输入收货人手机号码"/>
			</div>
			<!-- 所有地址 -->
			<div class="edit-list">
				<div class="edit-title">所在地址</div>
				<div class="local-txt"  @click="maskLayer()">内蒙古省鄂尔多斯市阿里卖家区</div>
				<img class="icon-right" src="../../../static/img/icon-r-return.png"  @click="maskLayer()" />
			</div>
			<!-- 详细地址 -->
			<div class="edit-list">
				<div class="edit-title">详细地址</div>
				<input class="edit-input" type="tel" placeholder="请填写街道、门牌号"/>
			</div>
			<div class="set-addr">
				<div class="set-title c1e">设置该地址为默认地址</div>
				<div class="switch" :class="switchLabel ? 'active':''">
					<label class="switchDot " @click="switchOn" :class="switchLabel ? 'active':'unactive'" ></label>
				</div>
			</div>
		</div>
		<div class="foot-btn">
			<div class="save-btn">保存并使用</div>
		</div>
		<!-- 地址选择 -->
			<!--  -->
		<div class="mask" v-if="mask" @click="maskLayer()"></div>
		<!-- 地址 -->
		<div class="addr-main" v-if="addrProps">
			<div class="addr-title c1e f32">
				您的位置
				<img @click="maskLayer" src="../../../static/img/icon-close.png" />
			</div>
			<div class="addr-detail">
				<!-- 地址 -->
				<ul class="address-title">
					<li v-for="(item,index) in addressTitle" 
					:key="index" :class="item.title ?'active':''"
					@click="titleTab(index)" :codeId="item.code"
						v-if="item.state" >
						{{item.txt}}
					</li>					
				</ul>
				<div class="address-list">
					<!-- 省 -->
					<ul class="ad-list provice" v-if="addressData.codeproviceState">
						<li v-for="(item,index) in proviceData" 
						:class="addressData.proviceIndex == index?'person':''"
						@click="tocity(item.areaCode,item.name,index)" 
						:key="index">{{item.name}}</li>
					</ul>
					<!-- 市 -->
					<ul class="ad-list provice" v-if="addressData.codecityState">
						<li v-for="(item,index) in cityData" 
						@click="toarea(item.areaCode,item.name,index)" 
						:class="addressData.cityIndex == index?'person':''"
						:key="index">{{item.name}}</li>
					</ul>
					<ul class="ad-list provice" v-if="addressData.codeareaState">
						<li v-for="(item,index) in areaData" 
						 :key="index"
						 :class = "addressData.areaIndex == index?'person':''"
						 @click = "areaval(item.name,index)">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				switchLabel:false,
				mask:false,
				addrProps:false,//地址
				proviceData:[],//省数据
				cityData:[],//城市数据
				areaData:[],//城市数据
				addressTitle:[
					{
						title:true,//切换显示状态
						state:true,//切换前显示状态
						txt:'请选择',
						code:'',
						index:''
					},{
						title:false,
						state:false,
						txt:'请选择',
						code:'',
						index:''
					},{
						title:false,
						state:false,
						txt:'请选择',
						code:'',
						index:''
					}
				],
				addressData:{
					areaIndex:'',
					cityIndex:'',
					proviceIndex:'',
					codeproviceState:true,//长列显示
					codecityState:false,
					codeareaState:false,
				},
			}
			
		},methods:{
			// 返回
			cancel(){
				this.$router.go(-1)
			},
			// 开关
			switchOn(){
				this.switchLabel =!this.switchLabel;
			},
			// 地址窗口
			maskLayer(){
				this.addrProps = !this.addrProps;
				this.mask = !this.mask;
				if (this.mask) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
		}
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
	.fill-address{
		width: 100%;
		height: 100vh;
		overflow: auto;
		.header {
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content: center;
			align-items: center;
			background: #fff;
			box-shadow: 2px 1px 0 #eee;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 16;
		}
		.icon-left {
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin:0 0 0 .3rem ;
		}
		.icon-del {
			display: inline-block;
			font-size: .28rem;
			margin:0 .3rem 0 0;
		}
		// 信息编辑
		.edit-main{
			border-top: .16rem solid #f1f1f1;
			margin-top: .88rem;
		}
		.edit-list{
			margin: 0 .3rem;
			display: flex;
			font-size: .3rem;
			align-items: center;
			border-bottom: 1px solid #f1f1f1;
			height: 1.06rem;
		}
		.edit-title{
			width: 1.2rem;
			text-align: left;
			margin: 0;
		}
		.edit-input{
			margin-left:.3rem; 
			height: .8rem;
		}
// 		.edit-local{
// 			margin:0 0 0.3rem; 
// 			text-align: left;
// 		}
		.local-txt{
			margin: 0 0 0 .3rem;
		}
		.icon-right{
			margin-right: 0;
			width: .1rem;
			height: .18rem;
		}
		// 
		.set-addr{
			display: flex;
			margin: .3rem .3rem 0 .3rem;
		}
		.set-title{
			font-size: .26rem;
			margin: 0;
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
		.foot-btn{
			position:fixed;
			width: 100%;
			bottom: .5rem;
			left: .0rem;
			z-index: 5;
		}
		.save-btn{
			margin: 0 .55rem;
			height:.8rem;
			background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
			background-blend-mode: normal,normal;
			box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
			border-radius: .4rem;
			color: #fff;
			line-height: .8rem;
			font-size: .3rem;
		}
	}
</style>
