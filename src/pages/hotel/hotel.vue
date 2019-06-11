<template>
	<!-- 酒店住宿 -->
	<div class="hotel-main">
		<!-- 顶部导航star -->
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="toindex"/>
			<div class="search">
				<img class="icon-search" src="../../../static/img/icon-search.png" />
				<input class="search-input" type="text" placeholder="搜索酒店名"  readonly="readonly" @click="tosearch"/>
			</div>
			<div class="addr-text c1e" @click="maskLayer">
				{{local.localposition}}
			</div>
		</div>
		<!-- 顶部导航end -->
		<!-- 主轮播 -->
		<div class="banner">
			<swiper :options="swiperOption" class="banner-box">
				<swiper-slide v-for="(item,index) in banner" :key = "index"><img v-lazy="item.bannerImg" /></swiper-slide>
			</swiper>
			<div class="swiper-pagination" id="hotel-banner-pagination"></div>
		</div>
		<!-- 主轮播end -->
		<!-- 精品推荐 -->
		<div class="hotel-list">
			<!-- 精品推荐标题 -->
			<div class="goods-c-detail-title">
				<img class="bg-line-left" src="../../../static/img/bg-line-left.png" />
				<label class="bg-title c1e">精品推荐</label>
				<img class="bg-line-right" src="../../../static/img/bg-line.png" />
			</div>
			<!-- hotel list -->
			<!-- 有数据 -->
			<div v-show="showlist">
				<div class="list-detail" v-for="(item,index) in hotelList" :key="index" @click="toshop(item.id)">
					<img class="list-img" v-lazy="item.showImgs" />
					<div class="bline">
						<div class="list-dtxt">
							<div class="bg-score">综合评分：{{item.score}}</div>
							<div class="hotel-title f32 c1e">{{item.merchantName}}</div>
							<div class="hotel-label">
								<label class="label-code" v-for="(item,index) in item.labels" :key="index">{{item.laberName}}</label>
							</div>
							<div class="price">
								<small>¥</small>{{item.amount}}
							</div>
						</div>
					</div>
				</div>		
			</div>
			<div class="none-txt" v-show="!showlist">
				该城市暂无推荐数据~
			</div>
					
			</div>
			
			
		<!-- 精品推荐 end-->
		<!--  -->
		<!-- 蒙版 -->
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
	import hotel from '../../server/hotel.js';
	import city from '../../plugins/city.js';
	import common from '../../plugins/common.js';
	
	export default {
		data() {
			return {
				swiperOption: {
					loop: true,
					autoplay: true,
					pagination: {
						el: '#hotel-banner-pagination',
						clickable: true,
					}
				},
				mask:false,
				addrProps:false,
				code:{
					areaId:0
				},
				banner:"",//轮播图
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
				local:{
					localposition:'',
					localareaId:''
				},//酒店位置
				params:{
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				hotelList:"",
				showlist:false,//T有
			}
		},
		mounted() {
			this.params.categoryId = this.$route.query.categoryId;
			this.local.localposition = common._getCookes('city') || '北京'
			this.local.localareaId = common._getCookes('cityId') || '110000'
			this.city();
			this.hotel();
		},
		methods: {
			toindex(){
				this.$router.push("/index")
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
			/*住宿模块*/
			hotel(){
				this.params.areaCode = this.local.localareaId;
				this.listData = []
				
				hotel.hotel(this.params).then(res =>{
					console.log(res)
					let code = res.code;
					if(code==0){
						this.banner = res.data.banners;
						if(res.data.count > 0){
							this.showlist = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.hotelList = res.data.hotelList;
						}else{
							this.showlist = false;
						}
					}else{
						console.log(res.message)
					}
				})
			},
			/*三级联动城市*/
			city(){
				hotel.city(this.code).then(res =>{
					console.log(res);
					if(res.code == 0){
						this.proviceData = res.data;
					}else{
						console.log(res.message)
					}
				})
			},
			tocity(areaId,val,index){
				this.addressTitle[1].state = true;
				this.addressData.codeproviceState = false;
				this.addressData.codecityState = true;
				this.addressData.codeareaState = false;
				this.addressTitle[0].code = areaId;
				this.addressTitle[0].index = index;
				this.addressTitle[0].title = false;
				this.addressTitle[1].title = true;
				this.addressTitle[2].title = false;
				this.addressData.proviceIndex = index;
				this.addressTitle[0].txt = val;
				this.code.areaId = areaId;
				if(areaId== 110000 || areaId == 120000 || areaId == 500000 || areaId == 300000){
					this.local.localposition = val
					this.local.localareaId = areaId
					common._setCookie('city', val)
					common._setCookie('cityId', areaId)
				}
				
				hotel.city(this.code).then(res =>{
					console.log(res);
					if(res.code == 0){
						this.cityData = res.data;
					}else{
						console.log(res.message)
					}
				})	

			},
			toarea(areaId,val,index){
				if(areaId== 110100 || areaId == 110200){
					this.local.localposition = "北京"
					this.local.localareaId = 110000
					this.params.areaCode = 110000
				}else if(areaId == 120100 || areaId == 120200){
					this.local.localposition = "天津"
					this.local.localareaId = 120000
					this.params.areaCode = 120000
				}else if(areaId == 500100 || areaId == 500200){
					this.local.localposition = "重庆"
					this.local.localareaId = 500000
					this.params.areaCode = 500000
				}else if(areaId == 300100 || areaId == 300200){
					this.local.localposition = "上海"
					this.local.localareaId = 300000
					this.params.areaCode = 300000
				}else{
					this.local.localposition = val;
					this.local.localareaId = areaId
					this.params.areaCode = areaId
					common._setCookie('city', val)
					common._setCookie('cityId', areaId)

				}
				console.log(areaId)
				this.hotel();
				this.addressTitle[1].txt = val;
				this.addressTitle[0].title = false;
				this.addressTitle[1].title = false;
				this.addressTitle[2].title = true;
				this.addressTitle[1].code = areaId;
				this.addressTitle[1].index = index;
				this.addressTitle[2].state = true;
				this.code.areaId = areaId;
				this.addressData.codeproviceState = false;
				this.addressData.codecityState = false;
				this.addressData.codeareaState = true;
				this.addressData.cityIndex = index;
				hotel.city(this.code).then(res =>{
					if(res.code == 0){
						this.areaData = res.data;
					}else{
						console.log(res.message)
					}
				})	
			},
			areaval(val,index){
				this.addressTitle[2].txt = val;
				this.addressTitle[0].title = false;
				this.addressTitle[1].title = false;
				this.addressTitle[2].title = true;
				this.addressData.areaIndex = index;
				this.maskLayer();
			},
			/*三级联动城市end*/
			/*头部切换*/
			titleTab(index){
				switch(index){
					case 0:
						// this.city();
						this.tocity(this.addressTitle[0].code,this.addressTitle[0].txt,this.addressTitle[0].index)
						this.addressData.cityIndex = "";//切换回来清空index
						this.addressData.areaIndex = "";//切换回来清空index
						this.addressTitle[0].title = true
						this.addressTitle[1].title = false
						this.addressTitle[2].title = false
						this.addressData.codeproviceState = true;
						this.addressData.codecityState = false;
						this.addressData.codeareaState = false;
						break;
					case 1:
						this.addressTitle[0].title = false
						this.addressTitle[1].title = true
						this.addressTitle[2].title = false
						this.addressData.codeproviceState = false;
						this.addressData.codecityState = true;
						this.addressData.codeareaState = false;
						break;
					case 2:
						this.addressTitle[0].title = false
						this.addressTitle[1].title = false
						this.addressTitle[2].title = true
						this.addressData.codeproviceState = false;
						this.addressData.codecityState = false;
						this.addressData.codeareaState = true;
						break;
			}
		},
		// 去店铺
		toshop(id){
			this.$router.push({
				path:'/hotelDetail',
				query:{
					id:id,
				}
			})
		},
		// 搜索
		tosearch(){
			this.$router.push({
				path:'/searchotel',
				query:{
					areaCode:this.local.localareaId,
					categoryId: this.$route.query.categoryId
				}
			})
		}
	},
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/common.css";
	.hotel-main{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;
		// 顶部导航
		.header {
			width: 100%;
			padding: .18rem 0 .14rem 0;
			position: fixed;
			background: #fff;
			font-size: .28rem;
			overflow: hidden;
			z-index: 9;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			
		}
		.search {
			width: 5.14rem;
			height: .64rem;
			text-align: left;
			display: flex;
			align-items: center;
			background: #f1f1f1;
		}
		.icon-search {
			width: .27rem;
			height: .26rem;
			font-size: .28rem;
			margin-left: .24rem;
		}
		.search-input {
			margin-left: .14rem;
			height: 100%;
			background: transparent;
			color: #7f7f7f;
			border: none;
			flex: 2;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.addr-text{
			font-size: .3rem;
			margin-right: .3rem;
			width: 1.2rem;
			height: .3rem;
			line-height: .3rem;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			text-align: right;
			.icon-address{
				width: .32rem;
				height: .32rem;
				margin: 0;
				vertical-align: middle;
			}
		}
		.banner {
			width: 100%;
			height: 2.8rem;
			margin: .96rem 0 .2rem 0;
			position: relative;
			background: #1E1E1E;
		}
		.banner img{
			width: 100%;
			height: 100%;
		}
		.banner-box {
			height: 100%;
		}
		.banner .swiper-pagination {
			bottom: .13rem;
			width: 100%;
			align-items: center;
			z-index: 2;
		}
		.banner .swiper-pagination-bullet {
			width: .3rem;
			height: .04rem;
			border-radius: .02rem;
			background-color: #fff;
			opacity: 0.4;
			margin-right: .08rem;
		}
		.banner .swiper-pagination-bullet-active {
			background: #fff;
			opacity: 1;
		}
		// 精品推荐
		.hotel-list{
			border-top: 0.16rem solid #f1f1f1;
			.goods-c-detail-title {
				margin-top: .32rem;
				text-align: center;
				height: .3rem;
			}
			.bg-title{
				vertical-align: middle;
				font-size: .3rem;
			}
			.bg-line-left,
			.bg-line-right {
				display: inline-block;
				width: .4rem;
				height: .16rem;
				vertical-align: middle;
			}
			.list-detail{
				display: flex;
				margin-top: .34rem;
			}
			.list-img{
				width: 2rem;
				height: 2rem;
				margin:0 0 0 .3rem;
			}
			.bline{
				border-bottom: 0.01rem solid #f2f2f2;
				margin: 0;
			}
			.list-dtxt{
				margin: 0 .3rem 0 .2rem;
				text-align: left;
			}
			.bg-score{
				width: 2rem;
				height: .32rem;
				line-height: .34rem;
				font-size: .22rem;
				border-radius: 4px 20px 4px 20px;
				text-align:center;
				color:#fff;
				margin:.1rem 0 0;
				background: #ffba30;
			}
			.hotel-title{
				margin: .2rem 0 .15rem 0;
				width: 4.6rem;
				height: .32rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;				
			}
			.hotel-labels{
				width: 100%;
				display: flex;
			}
			.label-code{
				display: inline-block;
				padding: .06rem .14rem;
				line-height: .22rem;
				font-size: .22rem;
				font-family:'pf-Regular';
				color: #7f7f7f;
				background-color: #f6f6f6;
				border-radius: .17rem;
				margin-right: .10rem;
			}
			.price{
				font-size: .36rem;
				margin: .24rem 0 .4rem 0;
				font-family:'pf-Bold';
				color: #b50000;
			}
			.price small{
				font-size: .2rem;
			}
		}
		
		.none-txt{
			font-size: .26rem;
			text-align: center;
			color: #666;
			margin-top: .30rem;
		}
	}
	
</style>
