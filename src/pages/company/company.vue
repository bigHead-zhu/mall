<template>
	<div class="company" id='com'>
		<div>
		<div class="header-fix " v-if="headerState">
			<div class="header-top">
				<div class="header-mask"></div>
				<img class="header-bg" v-lazy ="shopList.backgroundImg" />
				<div class="header-contain">
					<div class="company-heade-title">
						<img class="icon-left" src="../../../static/img/icon-left-fff.png"  @click="goIndex"/>
						<img class="shop-img" v-lazy="shopList.merchantLogo" />
						<div class="shop-title">{{shopList.merchantName}}</div>
						<div class="header-score">好评度：{{shopList.score}}</div>
						<img class="icon-nav" @click="headeTips(event)" src="../../../static/img/icon-nav.png" />
					</div>
					<div class="nav-li">
						<div class="search">
							<img src="../../../static/img/icon-search-fff.png" />
							<label @click="toSearch">搜索</label>
						</div>
						<div @click="headTab(index)" :class="headerIndex==index?'active':''" 
						v-for="(item,index) in headerTitle" 
						:key="index" class="text"><label>{{item}}</label></div>
						
					</div>
				</div>
				<!-- 提示 -->
				<transition name="fade">
					<div class="header-props" v-if="headerProp">
						<div class="triangle_border_up"></div>
						<div class="icon"><img class="icon-message" src="../../../static/img/icon-message.png" /><label>消息</label></div>
						<div class="icon"><img class="icon-message" src="../../../static/img/icon-share-goods.png" /><label>分享</label></div>
					</div>
				</transition>
			</div>
		</div>
		<div class="header-fix-active" v-if="headerState==false">
			<!-- 滑动时 -->
			<div class="header-mask"></div>
			<div class="header-contain-active">
				<div class="nav-li">
					<div class="search">
						<img src="../../../static/img/icon-search-fff.png" />
						<label  @click="toSearch">搜索</label>
					</div>
					<div @click="headTab(index)" :class="headerIndex==index?'active':''" 
					v-for="(item,index) in headerTitle" 
					:key="index" class="text"><label>{{item}}</label></div>
				</div>
			</div>

		</div>
		</div>
		<!-- 首页内容 -->
		<div class="index-main" :class="[mtnum?'':'mt100']" v-show="headerIndex==0">
			<div class="company-container ">
				<div class="company-banner">
					<div class="banner">
						<swiper :options="swiperOption" class="banner-box" >
							<swiper-slide v-for="(item,index) in shopList.banner" :key='index'>
								<img v-lazy="item.bannerImg"/>
							</swiper-slide>
						</swiper>
						<div class="swiper-pagination" id="main-banner-pagination"></div>
					</div>
				</div>
				<div class="new-goods-title">
					<img src="../../../static/img/icon-new-dot.png" />
					<label>新品推荐</label>
					<img src="../../../static/img/icon-new-dot.png" />
					<div class="small-title">RECOMMENDATION</div>
				</div>
				<div class="new-hot" @click="toDetail(shopList.recGoodsVo.goodsId)">
					<img class="new-hot-img" v-lazy="shopList.recGoodsVo.goodsImg" />
					<div class="hot-text">
						<div class="hot-tips-div">热推</div>
						<div class="new-hot-title">{{shopList.recGoodsVo.goodsName}}</div>
						<div class="money">¥{{shopList.recGoodsVo.retailAmount}} </div>
					</div>
				</div>
				<!--  -->
				<div class="there-goods">
					<div class="goods-w" v-for="(item,index) in shopList.recommend" 
					:key="index" @click="toDetail(item.goodsId)">
						<div class="goods-img">
							<img v-lazy="item.goodsImg" />
						</div>
						<div class="title tleft">
							<p class="goods-title">{{item.goodsName}}</p>
							<div class="money">¥{{item.retailAmount}}</div>
						</div>
					</div>
					
				</div>

			</div>
			<!-- 为您推荐 -->
			<div class="company-main">
				<div class="new-goods-title">
					<img src="../../../static/img/icon-new-dot.png" />
					<label>为您推荐</label>
					<img src="../../../static/img/icon-new-dot.png" />
					<div class="small-title">RECOMMENDATION</div>
				</div>
				<div class="goods-list">
					<ul class="goods-all clear">
						<li v-for="(item,index) in shopList.youRecommend" 
						:key="index" @click="toDetail(item.goodsId)">
							<div class="goods">
								<div class="goods-img">
									<img v-lazy="item.goodsImg" />
								</div>
								<div class="title tleft">
									<p class="goods-title">{{item.goodsName}}</p>
									<div class="money">¥{{item.retailAmount}}</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 首页内容end -->
		<!-- 活动内容 -->
		<div class="couple-main" v-show="headerIndex==1">
			<div class="no-couple" v-show="!showcouple">
				<img class="bg-couple" src="../../../static/img/bg-couple.png" />
				<div class="mt70">当前商家暂未设置优惠券哦~</div>
			</div>
			<!-- 优惠券 -->
			<div class="has-couple" v-show="showcouple">
				<div class="company-container">
					<div class="new-goods-title m56">
						<img src="../../../static/img/icon-new-dot.png" />
						<label>优惠领券</label>
						<img src="../../../static/img/icon-new-dot.png" />
						<div class="small-title">RECOMMENDATION</div>
					</div>
				</div>
				<div class="couple-card">
					<!--  -->
					<div class="card-type" v-for="(item,index) in coupleListData"
					:key="index">
						<img class="couple-img" src="../../../static/img/bg-couple-card.png" />
						<div class="couple-txt">
							<div class="couple-l">
								<div class="flex" >
									<div class="f72 ffHeavy">
									{{item.amount}} 
										<span class="f24"  v-if="item.type == 0">元</span>
										<span class="f24"  v-if="item.type == 1">折</span>
									</div>
									<label class="cards-kind"><span>{{item.couponType}}</span></label>
								</div>
								<div class="m-limit">满{{item.conditionAmount}}可用</div>
								<div class="couple-time">
									•<label>{{item.startTime}} - {{item.endTime}}</label>•
								</div>
							</div>
							<div class="couple-r">
								<a class="go-couple-btn" href="javascript:;" @click ="getcouple(item.id,item.isReceive)" v-if="item.isReceive==0">立即抢</a>
								<a class="go-couple-btn" href="javascript:;"
								 @click ="getcouple(item.id,item.isReceive)" v-if="item.isReceive==1">已领取</a>
								<div>剩{{item.number}}张</div>
							</div>
						</div>
					</div>
					<!--  -->
					

				</div>
			</div>

		</div>
		<!-- 活动内容end -->
		<!-- 企业简介 -->
		<div class="com-main"  v-show="headerIndex==2">
			<div class="com-p30">
				<div class="company-name" @click="toCompanyDes(shopList.enterprise.enterpriseAbstract)">
					<img class="comp-aimg" v-lazy="shopList.enterprise.enterpriseLogo" />
					<div class="comp-txt" >
						{{shopList.enterprise.enterpriseAbstract}}
					</div>
				</div>
				<div class="company-m-swiper">
					<div class="com-swi-box">
						<div class="com-m-title">
							<img class="icon-bg-title" src="../../../static/img/icon-new-dot.png" />
							<label class="com-title-txt">企业风采</label>
						</div>
						<!-- 相册 -->
						<div class="com-swiper-box">
							<swiper :options="swiperOptionGood" class="banner-box">
								<swiper-slide v-for="(item,index) in shopList.enterprise.enterpriseMiens" :key ="index">
									<div class="c-b-slide">
										<img v-lazy="item" />
									</div>
								</swiper-slide>
							</swiper>
						</div>
						<!-- 相册end -->
					</div>


				</div>
			</div>
			<div class="company-info">
				<div class="com-m-title mt40">
					<img class="icon-bg-title" src="../../../static/img/icon-new-dot.png" />
					<label class="com-title-txt">企业信息</label>
				</div>
				<div class="com-i-des">
					<img class="bg-info" src="../../../static/img/com-info-bg.png" />
					<div class="com-i-des-title">
						<div class="tl">企业名称：</div>
						<div class="tr">{{shopList.enterprise.enterpriseName}}</div>
					</div>
					<div class="com-i-des-title">
						<div class="tl">企业热线：</div>
						<div class="tr">{{shopList.enterprise.enterpriseHotline}}</div>
					</div>
					<div class="com-i-des-title">
						<div class="tl">所在地：</div>
						<div class="tr">{{shopList.enterprise.enterpriseAddress}}</div>
					</div>
					<div class="com-i-des-title">
						<div class="tl">企业资质：</div>
						<div class="tr">平台已审核</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 企业简介end -->
		<div class="footer-nav" v-if="footState">
			<div class="" @click="toAll()">全部宝贝</div>
			<div class="" @click="toType">宝贝分类</div>
			<div class="" @click="toService()">联系商家</div>
		</div>
	
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
	</div>
</template>

<script>
	import common from '../../plugins/common.js';
	import shop from '../../server/shop.js';
	import message from '../../components/message.vue';
	
	export default {
		components:{
			message
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
				sendVal: '',
				msgContent: '',//弹窗
				headerProp:false,
				headerTitle:['首页','活动','企业简介'],
				headerIndex:0,
				headerState:true,//头部状态
				footState:false,//底部
				mtnum:true,
				swiperOptionGood: {
					loop: true,
					slidesPerView: 'auto',
					spaceBetween: '1%',
					centeredSlides: false,
				},
				params:{
					"merchantId": "",
					  "source": 0,
					  "userId": "",
					  "userToken": ""
				},
				shopList:"",//所有数据
				// 优惠券
				copuleData:{
					type:1,
					merhcantId:"",
					userId: "",
					userToken: "",
					fromNum:1,
					pageSize:10
				},
				coupons:{
					couponId:'',
					source:0,
					userId:'',
					userToken:''
				},
				//优惠券状态
				showcouple:true,
				coupleListData:[],
				chantId:'',//
				
			}
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll);
			this.params.merchantId = this.$route.query.id;
			this.copuleData.merhcantId = this.$route.query.id;
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined
			this.copuleData.userToken = common._getCookes('code_token') || undefined
			this.copuleData.userId = common._getCookes('userid') || undefined
			this.coupons.userToken = common._getCookes('code_token') || undefined
			this.coupons.userId = common._getCookes('userid') || undefined
			this.shopAll();
			this.couple();
			
		},
		methods:{
			headeTips(event){//提示框
				this.headerProp = !this.headerProp;
				var btn = document.querySelector(".icon-nav");
				if(btn){
				    if(!btn.contains(event.target)){ //按钮.app-download以外的区域
				        this.headerProp = false;
				    }
				}
			},
			headTab(index){//头部选项卡切换
				this.headerIndex = index; 
				switch (index){
					case 0:
						this.footState = false;
						break;
					case 1:
						this.footState = true;
						this.headerState = true;
						break;
					case 2:
						this.footState = true;
						this.headerState = true;
						break;
				}
			},
			goIndex(){
				//首页
				this.$router.push("/index")
			},
			toCompanyDes(val){
				//企业简介
				this.$router.push({
					path:"/companyDes",
					query:{
						merchantId:this.params.merchantId,
						des:val
					}
				})
			},
			toAll(){
				//全部宝贝
				this.$router.push({
					path:"/companyAll",
					query:{
						merchantId:this.params.merchantId
					}
				})
			},
			toSearch(){
				//搜索页面
				this.$router.push({
					path:"/searchCom",
					query:{
						merchantId:this.params.merchantId
					}
				})
			},
			toType(){
				//宝贝分类
				this.$router.push({
					path:"/companyType",
					query:{
						merchantId:this.params.merchantId
					}
				})
			},
			toService(){
				//联系客服 
				this.$router.push({
					path:"/customer",
					query:{
						id:this.params.merchantId
					}
				})
			},
			handleScroll(){
				//滚动显示底部导航
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(this.headerIndex == 0){
					if(scrollTop > 56){
						this.headerState = false;
						this.footState = true;
						this.mtnum = false;
					}else{
						this.headerState = true;
						this.mtnum = true;
						this.footState = false;
					}
				}else if(this.headerIndex ==2){
					this.footState = true;
				}
			},
			//店铺数据
			shopAll(){
				shop.company(this.params).then(res =>{
					console.log(res)
					if(res.code==0){
						this.shopList = res.data;
					}else{
						console.log(res.message)
					}
				})
			},
			// 优惠券列表
			couple(){
				shop.couple(this.copuleData).then(res =>{
					if(res.code==0){
						if(res.data.length >0){
							this.showcouple = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.coupleListData = this.coupleListData.concat(res.data);
							if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
								 this.loadingstate = false
								 this.loadingtext = '没有更多了~'
							}
						}else{
							this.showcouple = false;
						}
					}else{
						console.log(res.message)
					}
				})
			},
			// 领取券
			getcouple(val,is){
				this.coupons.couponId = val;
				if(is==0){
					shop.getCoupons(this.coupons).then(res =>{
						if(res.code == 0){
							this._setMsgBox(res.message)
						}else{
							console.log(res.message)
						}
					})
					this.coupleListData = []
					this.couple();
				}else{
					this._setMsgBox("亲，您已领取过了~")
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
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.getlist()
			  }
			},
			clearList(){
				this.params.fromNum = 1;
				this.coupleListData.length = 0
			},
			// 弹窗
			_setMsgBox(content = '', timer = 2000, callback) {
			  let that = this
			  that.sendVal = true
			  that.msgContent = content
			  setTimeout( () => {
				that.sendVal = false
				if (callback) {
				  callback()
				}
			  }, timer)
			},
		},
		destroyed(){
			window.removeEventListener('scroll',this.handleScroll);
		},
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
#com{
	font-family:'pf-Medium';
	.ffHeavy{
		font-family:'pf-Heavy';
	}
	.company {
		background: #fff;
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.header-fix {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 2.1rem;
		z-index:5;
	}

	.header-fix-active {
		position: fixed;
		height: 1rem;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		color: #fff;
		font-size: .3rem;
		z-index: 10;
	}

	.header-top {
		width: 100%;
		height: 2.1rem;
		position: relative;
		overflow: hidden;
	}

	.header-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		z-index: 5;
	}

	.header-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}

	.header-contain,
	.header-contain-active {
		margin: 0 .3rem;
		position: relative;
		height: auto;
		left: 0;
		top: 0;
		color: #fff;
		font-size: .3rem;
		z-index: 10;
	}

	.header-contain-active {
		width: 100%;
	}

	.header-fix-active .nav-li {
		margin: .25rem 0;

	}

	.header-fix-active .header-mask {
		background-color: #40403f !important;
	}

	.company-heade-title {
		width: 100%;
		height: 100%;
		margin-top: .16rem;
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.icon-left {
		width: .16rem;
		height: .28rem;
		margin: 0;
	}

	.shop-img {
		width: .56rem;
		height: .56rem;
		margin:0 0 0 .24rem;
		border-radius: 50%;
	}

	.shop-title {
		font-family:'pf-Bold';
		margin: 0 .18rem;
	}

	.header-score {
		padding: .08rem .14rem;
		font-size: .2rem;
		line-height: .2rem;
		border-radius: .16rem;
		margin: 0;
		font-family:'pf-Regular';
		background: rgba($color: #000000, $alpha: .4)
	}
	.mt100{
		margin-top: 1rem!important;
	}
	// 提示
	.header-props {
		position: absolute;
		top: .72rem;
		right: .26rem;
		height: 1rem;
		width: 1.6rem;
		font-size: .24rem;
		background: #fff;
		box-shadow: 0 .08rem .16rem 0px rgba(0, 0, 0, 0.6);
		border-radius: .04rem;
		z-index:45;
	}

	.triangle_border_up {
		width: 0;
		height: 0;
		top: -0.12rem;
		right: 0;
		border-width: 0 .15rem .15rem;		
		border-style: solid;
		border-color: transparent transparent #fff;
		position: absolute;
	}
	.header-props .icon {
		display: flex;
		height: .5rem;
		align-items: center;
	}

	.header-props label {
		display: inline-block
	}
	.icon-message {
		width: .28rem;
		height: .31rem;
		margin: 0 0 0 .2rem;
		display: inline-block;
	}

	.icon-nav {
		width: .28rem;
		height: .24rem;
		margin-right: 0;
	}

	.nav-li {
		display: flex;
		height: .5rem;
		width: 100%;
		align-items: center;
		margin-top: .36rem;
	}

	.search {
		padding: .12rem .18rem;
		font-size: .26rem;
		line-height: .26rem;
		border-radius: .24rem;
		background: rgba(161, 161, 161, .7);
	}

	.search label {
		vertical-align: middle;
		margin-left: .08rem;
	}

	.search img {
		width: .26rem;
		vertical-align: middle;
		height: .26rem;
	}

	.nav-li .text {
		font-size: .3rem;
	}
	.nav-li .text label {
		padding-bottom: .08rem;
		display: inline-block;
	}
	.nav-li .active label{
		border-bottom: .04rem solid #fff;
		border-radius: .02rem;
	}
	.company-container {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.mt210 {
		margin-top: 2.1rem;
	}
// 首页
	.index-main{
		margin: -.1rem 0rem 0 0rem;
		position: relative;
		z-index: 5
	}
	.company-banner {
		position: relative;
		height: 2.3rem;
		margin: 0 .3rem;
		box-shadow: 0 .08rem .16rem 0px rgba(174, 174, 174, 0.3);
		border-radius: .04rem;
		z-index: 5;
		overflow: hidden;
	}
.banner {
			width: 100%;
			height: 2.8rem;
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
	.company-banner .company-banner-img {
		width: 100%;
		height: 2.3rem;
		display: block;
		border-radius: .04rem;
	}

	// 为你推荐
	.new-goods-title {
		font-size: .3rem;
		margin-top: .5rem;
	}

	.new-goods-title label {
		display: inline-block;
		margin: 0 .32rem;
		font-family:'pf-Bold';
		letter-spacing: .04rem;
		vertical-align: middle;
	}

	.new-goods-title img {
		display: inline-block;
		width: .44rem;
		height: .2rem;
		vertical-align: middle;
	}

	.small-title {
		font-size: .14rem;
		color: #1e1e1e;
		width: 100%;
		font-family:'pf-Regular';
		margin-top: .16rem;
		letter-spacing: .04rem;
	}

	.new-hot {
		background: #fff1e0;
		margin: .3rem .3rem 0;
		height: 2.3rem;
		display: flex;
	}

	.new-hot-img {
		width: 2rem;
		height: 2rem;
		margin: .15rem .34rem .15rem .15rem;
	}

	.hot-tips-div {
		margin: .42rem 0 0;
		height: .3rem;
		text-align: center;
		width: .8rem;
		font-size: .22rem;
		line-height: .28rem;
		background-color: #fff;
		border-radius: .02rem;
		font-family:'pf-Regular';
		color: #b50000;
		border: solid 1px #b50000;
	}

	.hot-text {
		text-align: left !important;
		overflow: hidden;
		margin: 0;
	}

	.new-hot-title {
		font-size: .28rem;
		line-height: .28rem;
		color: #1e1e1e;
		width: 93%;
		height: .3rem;
		margin-top: .36rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.money {
		font-size: .26rem;
		color: #b50000;
		line-height: .26rem;
		margin-top: .1rem;
	}
	// ---------
	.there-goods {
		display: flex;
		margin: .22rem .3rem 0;
		text-align: left;
	}
	.goods-w {
		width: 2.2rem;
		margin: 0;
	}
	.goods-w:nth-child(2) {
		margin: 0 .14rem;
	}
	.goods-img {
		width: 2.2rem;
		height: 2.2rem;
	}

	.goods-img img {
		width: 100%;
		height: 100%;
	}
	.title {
		width: 100%;
		font-size: .24rem;
	}

	.goods-title {
		width: 100%;
		height: .32rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-top: .23rem;
		line-height: .32rem !important;
	}
	// -------------
	.company-main {
		margin-bottom: .98rem;
	}

	/* 商品 */
	.goods {
		width: 3.4rem;
		height: 4.4rem;
	}
	.goods-list {
		margin: 0.32rem .3rem 0 .3rem;
	}

	.goods-all {
		width: 100%;
		text-align: left;
	}

	.goods-all li {
		float: left;
		margin-bottom: .4rem;
	}

	.goods-all li:nth-child(2n-1) {
		margin-right: .1rem;
	}

	.goods .goods-img {
		width: 100%;
		height: 3.4rem;
	}

	.goods .goods-img img {
		width: 100%;
		height: 100%;
	}
	// 活动
	.no-couple {
		width: 100%;
		text-align: center;
		font-size: .3rem;
		color: #aaa;
		height: auto;
	}

	.bg-couple {
		width: 1.68rem;
		height: 2.2rem;
		margin-top: 1.98rem;
	}

	.mt70 {
		margin-top: .7rem;
	}

	.m56 {
		margin: 0.56rem 0;
	}

	.couple-card {
		height: auto;
		margin: 0 .3rem;
		overflow: hidden;
	}

	.card-type {
		width: 100%;
		position: relative;
		height: 2.3rem;
		overflow: hidden;
		margin-bottom: .36rem;
	}

	.couple-img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 5;
	}

	.couple-txt {
		margin: .4rem .48rem 0rem .38rem;
		display: flex;
		position: relative;
		z-index: 6;
		justify-content: space-between;
		font-size: .24rem;
	}

	.couple-l {
		text-align: left;
		margin: 0;
		width: 4.45rem;
		color: #b47d6f;
	}

	.f72 {
		font-size: .72rem;
		line-height: .54rem;
		color: #ff344e;
		margin: 0;
	}

	.f24 {
		font-size: .24rem;
		margin-left: .1rem;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.cards-kind {
		display: inline-block;
		width: 1.06rem;
		height: .40rem;
		margin-left: .56rem;
		line-height: .4rem;
		color: #fefefe;
		text-align: center;
		transform: skew(-10deg);
		background-color: #e49982;
		border-radius: 2px;
	}

	.cards-kind span {
		display: inline-block;
		transform: skew(10deg)
	}

	.m-limit {
		margin: .16rem 0 .3rem 0;
		line-height: .24rem;
		font-family: 'pf-Bold';
	}

	.couple-time label {
		display: inline-block;
		margin: 0 .06rem;
	}

	.couple-r {
		width: 1.40rem;
		color: #e49982;
		font-size: .22rem;	
		font-family: 'pf-Bold';
		text-align: center;
	}

	.go-couple-btn {
		margin: .36rem 0 0;
		display: inline-block;
		font-size: .26rem;
		color: #fff;
		width: 1.40rem;
		height: .48rem;    
		line-height: .48rem;
		text-decoration: none;
		background-color: #f96b70;
		border-radius: .24rem;
	}

	.couple-r div {
		margin-top: .12rem;
	}

	// 企业简介
	.com-main {
		overflow: hidden;
	}

	.com-p30 {
		margin: 0 .3rem;
	}

	.company-name {
		margin-top: .7rem;
		background: #fff;
		width: 100%;
		height: 2rem;
		display: flex;
		box-shadow: .02rem 0.06rem .12rem 0px rgba(199, 199, 199, 0.2);
		border-radius: 4px;
		border-bottom: .01rem solid #eee;
		border-top: .01rem solid #f5f5f5;
		position: relative;
	}
	.comp-aimg {		
		width:1.6rem;
		display: inline-block;
		height: 100%;
		height: 2rem;
		margin: -.3rem .34rem .3rem .28rem;		
	}

	.comp-txt {
		font-size: .24rem;
		line-height: .30rem;
		height: 1.2rem;
		color: #7f7f7f;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		font-family: 'pf-Regular';
		-webkit-box-orient: vertical;
		margin: .4rem 0 0;
	}

	.company-m-swiper {
		margin-top: .48rem;
	}

	.com-swi-box {
		width: 100%;
		height: auto;
	}

	.com-m-title {
		color: #1e1e1e;
		height: .3rem;
		width: 100%;
		text-align: left;
		font-size: .3rem;
		line-height: .24rem;
		position: relative;
	}

	.icon-bg-title {
		position: absolute;
		display: inline-block;
		left: 0;
		top: 0;
		width: .44rem;
		height: .2rem;
		z-index: 1;
	}
	.com-title-txt {
		margin-left: .14rem;
		position: relative;
		z-index: 5;
		font-family: 'pf-Bold';
	}

	.c-b-slide {
		width: 100%;
		height: 3.48rem;
		align-items: center;
	}

	/* 相册 start */
	.com-swiper-box {
		height: 4rem;
		position: relative;
		-webkit-justify-content: center;
		display: flex;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
		margin-top: .3rem;

		.banner-box {
			.swiper-slide {
				width: 3rem;
				height: 4rem;
				transform: scale(0.9);
			}
			.swiper-slide-active {
				transform: scale(1)
			}
		}
	}

	/* 相册 end */
	.c-b-slide img {
		width: 100%;
		height: 100%
	}
	// ------信息---------------
	.company-info {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: .98rem;
		font-family:'pf-Regular';
		border-top: .16rem solid #e6e6e6;
	}

	.mt40 {
		margin: .4rem .3rem 0;
	}
	.com-i-des {
		margin: .3rem;
		height: 2.4rem;
		font-size: .26rem;
		line-height: .26rem;
		color: #1e1e1e;
		background-color: #fff;
		box-shadow: .02rem 0.06rem .12rem 0px rgba(199, 199, 199, 0.2);
		border-radius: 4px;
		border-bottom: .01rem solid #eee;
		border-top: .01rem solid #f5f5f5;
		position: relative;
		overflow: hidden;
	}

	.bg-info {
		position: absolute;
		width: 1.26rem;
		height: 1.26rem;
		right: -.3rem;
		top: -.24rem;
		z-index: 1
	}

	.com-i-des-title {
		width: 100%;
		display: flex;
		margin-top: .3rem;
		justify-content: space-between;
	}

	.com-i-des-title .tl {
		text-align: left;
		flex: 1;
		margin-left: .3rem;
	}

	.com-i-des-title .tr {
		text-align: right;
		color: #7f7f7f;
		margin-right: .3rem;
		flex: 1;
	}
}
</style>
