<template>
	<div class="shop-main" id="shopMain">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="toindex"/>
			<label>商城</label>
			<img class="icon-search" src="../../../static/img/icon-search.png" @click="tosearch()"/>
		</div>
		<div class="mt88">
			<!-- 主轮播 -->
			<div class="banner">
				<swiper :options="swiperOption" class="banner-box">
					<swiper-slide v-for = "(item,index) in shopDataList.banner" :key="index">
						<img v-lazy="item.bannerImg" />
					</swiper-slide>
				</swiper>
				<div class="swiper-pagination" id="main-banner-pagination"></div>
			</div>
			<!-- 分类导航 -->
			<div class="type-nav">
				<ul class="type-nav-ul">
					<li v-for="(item,index) in shopDataList.category" 
					:key="index" @click="toGoods(item.id,item.desc)">
						<img class="type-nav-img" v-lazy="item.categoryImg" />
						<div class="type-nav-title">{{item.desc}}</div>
					</li>
				</ul>
			</div>
			<!-- 爆品推荐 -->
			<div class="Goods-share">
				<h1 class="cle f32 tleft mt40">爆品推荐</h1>
				<scrollto :datalist="searchGoodsData" @scrollend="nextList">
					<ul class="goods-all clear mt30">
						<li  @click="toDetail(item.goodsId)" v-for="(item,index) in searchGoodsData" 
						:key="index">
							<div class="goods">
								<div class="goods-img">
									<img v-lazy="item.goodsImg" />
								</div>
								<div class="title tleft">
									<p class="goods-title f28 c1e">{{item.goodsName}}</p>
									<label class="money f32">¥{{item.retailAmount}}</label>
								</div>
							</div>
						</li>
						<li 
						  class="loadingmore">
						  <img 
							v-if="loadingstate"
							src="../../../static/img/img_list_loading.gif">
						  {{ loadingtext }}
						</li>
					</ul>
				</scrollto>
			</div>
		</div>
	</div>
</template>

<script>
	import shop from '../../server/shop.js';
	import scrollto from '../../components/scrollto.vue';

	export default {
		components:{
			scrollto
		},
		data() {
			return {
				swiperOption: {
					loop: true,
					autoplay: true,
					pagination: {
						el: '#main-banner-pagination',
						clickable: true,
					}
				},//轮播图
// 				typeNav:[
// 					{
// 						src:'../../../static/img/icon-dress.png',
// 						title:'服饰鞋帽'
// 					},
// 					{
// 						src:'../../../static/img/icon-skin.png',
// 						title:'个护化妆'
// 					},
// 					{
// 						src:'../../../static/img/icon-little.png',
// 						title:'内衣配饰'
// 					},
// 					{
// 						src:'../../../static/img/icon-baby.png',
// 						title:'母婴童装'
// 					},
// 					{
// 						src:'../../../static/img/icon-box.png',
// 						title:'箱包皮具'
// 					},
// 					{
// 						src:'../../../static/img/icon-watch.png',
// 						title:'钟表珠宝'
// 					},
// 					{
// 						src:'../../../static/img/icon-moutain.png',
// 						title:'户外运动'
// 					},
// 					{
// 						src:'../../../static/img/icon-guitar.png',
// 						title:'玩具乐器'
// 					},
// 					],
					//
					params:{
						categoryId:'',
						fromNum:1,
						pageSize:4
					},
					pagecount: 0,//计算共有多少页码
					shopDataList:'',
					
					// 加载更多
					loadingstate: true,
					loadingtext: '正在加载',
					searchGoodsData:[]
			}
		},
		mounted(){
			this.params.categoryId =  this.$route.query.categoryId;
			this.shopData();
			this.topGoods();
		},
		methods: {
			toindex(){
				//回首页
				this.$router.push("/index");
			},
			tosearch(){
				this.$router.push("/search");
			},
			toGoods(val,title){
				this.$router.push({
					path:"/shopGoods",
					query:{
						categoryId:val,
						title:title
					}
				})
			},
			toshop(val){
				let categoryId = val
				this.$router.push({
					path:"/searchshop",
					query:{
						categoryId:this.$route.query.categoryId
					}
				})
			},
			/*商城数据*/
			shopData(){
				shop.shopIndex(this.params).then(res =>{
					console.log(res)
					if(res.code==0){
						this.shopDataList = res.data;
					}else{
						console.log(res.message);
					}
				})
			},
			/*爆款推荐*/
			topGoods(){
				shop.shopIndex(this.params).then(res =>{
					let code = res.code;
					console.log(res)
					if(code==0){
						if(res.data.count > 0){
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.searchGoodsData = this.searchGoodsData.concat(res.data.recommend);
							if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
							  this.loadingstate = false
							  this.loadingtext = '没有更多了~'
							}
						}
					}else{
						console.log(res.message)
					}
				})
			},
			/*商品详情*/
			toDetail(index){
				this.$router.push({
					path:'/goodsDetail',
					query:{
						goodsId:index
					}
				})
			},
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.topGoods()
			  }
			},
			clearList(){
				this.params.fromNum = 1;
				this.searchGoodsData.length = 0
			},
		},
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	.shop-main {
			width: 100%;
			height: auto;
			overflow: hidden;
			position: relative;
			background-color: #fff;
			font-family:'pf-Medium';
		.mt88{
			margin-top: .88rem;
		}
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			font-family:'pf-Bold';
			justify-content:center;
			align-items: center;
			background: #fff;
			z-index:999;
			position: fixed;
			top: 0;
			left: 0;
			
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
		.icon-search{
			width: .3rem;
			height: .3rem;
			display: inline-block;
			margin-right: .3rem;
		}
		.banner {
			width: 100%;
			height: 2.8rem;
			margin-top: .19rem;
			position: relative;
			background: #1E1E1E;
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
		.link-rou {
			height: 1.6rem;
			margin: .64rem .3rem .33rem .3rem;
			text-align: left;
		}
		.link-rou a {display:block ;border-radius: .04rem;}
		.big-icon{
			width: 3rem;
			float: left;
			margin-right: .16rem;
			height: 100%;
		}
		.icon-mall{
			width: 3rem;
			height: 100%;
			border-radius: .04rem;
		}
		.link-small{
			height: 1.6rem;
			width: 3.72rem;
			float: right;
		}
		.link-small a{
			float:left;
		}
		.link-small a:nth-child(1),.link-small a:nth-child(2){
			margin-bottom: .08rem;
		}
		.link-small a:nth-child(2n){
			margin-left: .08rem;
		}
		.icon-small{
			width: 1.82rem;
			height: .76rem;		
			border-radius: .04rem;
		}
		
		/* 商品 */
		.Goods-share{
			margin: 0 .3rem;
		}
		.goods{
			width: 3.4rem;
			height: 4.4rem;  
		}
		.goods-all{
			width: 100%;
		}
		.goods-all li{
			float: left;
			margin-bottom: .4rem;
		}
		.goods-all li:nth-child(2n-1){
			margin-right: .1rem;
		}
		.goods .goods-img{
			width:100%;
			height: 3.4rem;
		}
		.goods .goods-img img{
			width: 100%;
			height: 100%;
		}
		.goods-title{
			width:100%;
			text-overflow:ellipsis;
			overflow: hidden;
			margin-top: .23rem;
			line-height: .32rem!important;
			white-space: nowrap;
		}
		.gray-money{
			color: #aaa;
			margin-left: .16rem;
			text-decoration: line-through;
		}
		.money{
			color: #b50101;
			display: inline-block;
			margin-top: .15rem;
			font-family:'pf-Regular';
		}
		// 分类导航
		.type-nav{
			width: 100%;
			height: 4.34rem;
			border-bottom: .16rem solid #f1f1f1;
		}
		.type-nav-ul{
			margin:.57rem .3rem .4rem;
		}
		.type-nav-ul li{
			float: left;			
			width:25%;
			margin-bottom: .34rem;
			text-align: center;
		}
		.type-nav-img{
			width:1.08rem;
			height: 1.08rem;
			display: inline-block;
		}
		.type-nav-title{
			margin-top: .16rem;
			color: #2e312c;
			font-size: .26rem;
		}
	}
		
</style>
