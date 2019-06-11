<template>
	<div class="content-index" id="index">
		<div class="header">
			<div class="search">
				<img class="icon-search" src="../../static/img/icon-search.png" />
				<input class="search-input" type="text" placeholder="搜索商品或企业"  readonly="readonly" @click="tosearch"/>
			</div>
			<div class="icon-tips" @click="toNews">
				<img class="icon-message" src="../../static/img/icon-message.png" />
				<label class="tips-cricle" v-if="indexAll.messageNotCount>0"></label>
			</div>
		</div>
		<div class="mt114">
			<div class="hot f26 " v-show="codeShow">
				<label class="h-title">热搜：</label>
				<div class="hot-code">
					<label v-for="(item,index) in indexAll.label" :key='index'>{{item.value}}</label>
				</div>
			</div>
			<!-- 主轮播 -->
			<div class="banner">
				<swiper :options="swiperOption" class="banner-box" >
					<swiper-slide v-for="(item,index) in indexAll.banner" :key='index'>
					<img v-lazy="item.bannerImg"/></swiper-slide>
				</swiper>
				<div class="swiper-pagination" id="main-banner-pagination"></div>
			</div>
			<!-- 五大分类 -->
			<div class="link-rou clear">
				<div  v-for="(item,index) in indexAll.category" :key='index' @click="toType(item.type,item.id)">
					<img  v-lazy="item.categoryImg" />
				</div>
			</div>
			<!-- 为你推荐轮播 -->
			<div class="Good-top">
				<h1 class="c1e f32">为你推荐</h1>
				<div class="good-banner" id="good-banner">
					<swiper :options="swiperOptionGood" class="banner-box">
						<swiper-slide class="goods-w" v-for="(item,index) in indexAll.youRecommend"
						 :key='index'>
							<div class="goods-img"  @click.stop="toDetail(item.goodsId)">
								<img v-lazy="item.goodsImg" />
							</div>
							<div class="index-title tleft">
								<p class="goods-title">{{item.goodsName}}</p>
								<label class="money">¥{{item.retailAmount}}</label>
							</div>
						</swiper-slide>	
											
					</swiper>
					<div class="swiper-pagination" id="good-banner-pagination"></div>
				</div>
			</div>
			<!-- 企业家乐园 -->
			<div class="bg-company">
				<div class="bg-compimg">
					<img src="../../static/img/bg-company.png" />
				</div>
			</div>
			<!-- 爆品推荐 -->
			<div class="Goods-share">
				<h1 class="cle f32 tleft">爆品推荐</h1>
				<ul class="goods-all clear mt30">
					<li v-for="(item,index) in searchGoodsData" :key="index"   @click="toDetail(item.goodsId)">
						<div class="goods">
							<div class="goods-img">
								<img v-lazy="item.goodsImg" />
							</div>
							<div class="title tleft">
								<p class="goods-title f28 c1e">{{item.goodsName}}</p>
								<label class="money f32">¥1{{item.retailAmount}}</label>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	<!-- 导航 -->l
		<foot ></foot>
		<sys 
			v-model="state"
		/>
	</div>
</template>

<script>
	import common from '../plugins/common.js';
	import search from '../server/search.js';
	import foot from '../components/footer.vue';
	import sys from '../components/sysCoupon.vue';
	export default {
		components:{
			foot,
			sys
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
				},
				swiperOptionGood: {
					loop: true,
					slidesPerView: 3,
					spaceBetween: 15,
					slidesPerGroup: 3,
					pagination: {
						el: '#good-banner-pagination',
						clickable: true,
					}
				},
				params:{
					source:'0',
					openId:'1',
					userId:''
				},
				goods:{//爆品推荐
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//共多少页
				indexAll:'',
				codeShow:false,
				searchGoodsData:[],
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
				state: true
			}
		},
		mounted() {
			this.params.userId = common._getCookes('userid') || undefined
			this.hotCode();
			this.topGoods();
			setTimeout(()=>{
				this.state = false
			},3000)
		},
		methods: {
			// 消息
			toNews(){
				this.$router.push("/news")
			},
			tosearch(){
				this.$router.push({
					path: '/search',
					query: {
						queryType: 'goods'
					}
				})
			},			
			// 热搜关键字
			hotCode(){
				search.indexAll(this.params).then(res =>{
					if(res.code == 0){
						this.indexAll = res.data;
						if(res.data.label.length >0){
							this.codeShow = true;
						}else{
							this.codeShow = false;
						}
					}else{
						console.log(res.message)
					}
				})
			},
			/*爆品推荐*/
			topGoods(){
				search.topGoods(this.goods).then(res =>{
					let code = res.code;
					console.log(res)
					if(code==0){
						if(res.data.count > 0){
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.searchGoodsData = this.searchGoodsData.concat(res.data.recGoodsVo);
							if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
							  this.loadingstate = false
							  this.loadingtext = '没有更多了~'
							}
						}else{
							console.log(res.message);
						}
					}
				})
			},
			/*跳转分类商城*/
			toType(val,cateid){
				console.log(val)
				let categoryId = cateid;
				switch(val){
					case 0:
						this.$router.push({
							path:'/shop',
							query:{
								categoryId:categoryId
							}
						})
						break;
					case 1:
						this.$router.push({
							path:'/hotel',
							query:{
								categoryId:categoryId
							}
						})
						break;
					case 2:
						this.$router.push({
							path:'/film',
							query:{
								categoryId:categoryId
							}
						})
						break;	
					case 3:
						this.$router.push({
							path:'/food',
							query:{
								categoryId:categoryId
							}
						})
						break;
					case 4:
						this.$router.push({
							path:'/tour',
							query:{
								categoryId:categoryId
							}
						})
						break;
				}
			},
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.getSearchData()
			  }
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
			
		},
	}
</script>

<style lang="scss" >
	@import "../../static/css/style.css";
	#index {
		font-family:'pf-Medium';
		.content-index {
			width: 100%;
			height: auto;
			overflow: hidden;
			position: relative;
			background-color: #fff;
		}
		.header {
			width: 100%;
			padding: 0rem 0 .32rem 0;
			position: fixed;
			background: #fff;
			font-size: .28rem;
			overflow: hidden;
			z-index: 99;
			left: 0;
			top: 0;
		}
		.search {
			margin: .18rem .9rem 0 .3rem;
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

		.icon-tips {
			width: .28rem;
			height: .31rem;
			position: absolute;
			right: .34rem;
			top: .37rem;
		}

		.icon-message {
			width: 100%;
			height: 100%;
		}

		.tips-cricle {
			position: absolute;
			width: .13rem;
			height: .13rem;
			background: #ff3350;
			border-radius: 50%;
			top: 0;
			left: 0;
		}

		.hot {
			padding: 0rem .32rem .2rem .3rem;
			color: #7f7f7f;
			text-align: left;
			overflow: hidden;
			background: #fff;
		}
		.hot label {
			margin-left: 0;
		}
		.hot-code {
			display: inline-block;
			margin-left: 0;
		}

		.hot-code label {
			display: inline-block;
			text-align: ceter;
			padding: 0 .15rem;
			line-height: .3rem!important;
			border-right: 1px solid #babac2;
		}
		.hot label:last-child {
			border: none;
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
		.link-rou div {display:block ;border-radius: .04rem;}
		.link-rou div:first-child{
			width: 3rem;
			float: left;
			margin-right: .16rem;
			height: 100%;
		}
		.link-rou img{
			width: 100%;
			height: 100%;
		}
		.link-rou div:nth-child(2),.link-rou div:nth-child(3){
			margin-bottom: .08rem;
		}
		.link-rou div:nth-child(2),.link-rou div:nth-child(4){
			margin-right: .08rem;
		}
		.link-rou div{
			width: 1.82rem;
			height: .76rem;
			display: inline-block;
			border-radius: .04rem;
		}
		/*  */
		.Good-top{
			border-top: .16rem solid #f1f1f1;
		}
		.Good-top h1{
			margin:.3rem 0 .3rem .3rem;
			font-size: .32rem;
			text-align: left;
		}
		.good-banner{
			height: 3.82rem;
			position: relative;
			margin: 0 .3rem 0 .3rem ;
			
		}
		.good-banner .goods-w{
			width: 2.2rem;
			margin: 0;
		}
		.good-banner .goods-img{
			width:2.2rem;
			margin-left: 0; 
			height: 2.2rem;
		}
		.good-banner .goods-img img{
			width: 100%;
			height: 100%;
		}
		.index-title{
			width:100%;
			font-size: .24rem; 
		}
		.goods-title{
			width:100%;
			text-overflow:ellipsis;
			overflow: hidden;
			margin-top: .23rem;
			line-height: .32rem!important;
			white-space: nowrap;
		}
		.money{
			color: #b50101;
			font-family:'pf-Bold';
			display: inline-block;
			margin-top: .15rem;
		}
		.good-banner .swiper-pagination{
			bottom: 0.3rem;;
			width: 100%;
			margin-left: -.3rem!important;;
			align-items: center;
			z-index: 2;
		}
		.good-banner .swiper-pagination-bullet {
			width: .12rem;
			height: .12rem;
			border-radius:50%;
			background-color: #f1f1f1!important;;
			opacity: 1;
			margin-right: .1rem;
		}
		.good-banner .swiper-pagination-bullet-active {
			background: #feb336!important;
			opacity: 1;
		}
		.bg-company{
			border-top: .16rem solid #f1f1f1;
		}
		.bg-compimg{
			margin: .6rem .3rem;
		}
		.bg-company img{
			width: 100%;
			height: 1.2rem;
		}
		.Goods-share{
			margin: 0 .3rem;
		}
		/* 商品 */
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
	}
		
</style>
