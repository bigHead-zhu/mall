<template>
	<div class="goods-detail " id="goodsDetail">
		<div class="header">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="back()"/>
				<div class="header-nav goodsTitle" :class="[headerFix ? '':'none']">
					<label v-for="(item,index) in headerNav" 
					:key="index" :class="headerIndex==index ?'active':''" 
					@click="headerTab(item.index)">{{item.name}}</label>
					</div>
				<div class="header-title" :class="[headerFix ? 'none':'']">商品详情</div>
				<img class="icon-share" src="../../../static/img/icon-share-goods.png" />
		</div>
		<!--商品轮播  -->
		<div class="goods-banner">
			<swiper :options='goodsSwiper' class="goods-wrapper">
				<swiper-slide v-for="(item,index) in goodsDetailList.img" :key="index">
					<img  v-lazy="item"/>
				</swiper-slide>
				
				<div class="swiper-button-prev button-prev" slot="button-prev"></div>
				<div class="swiper-button-next button-next" slot="button-next"></div>
				
			<!-- 计页数 -->
			<!-- <label class="count">{{index}}/{{goodsDetailList.img.length}}</label> -->
			</swiper>

		</div>
		<!-- 商品名 -->
		<div class="goods-all">
			<div class="goods-name">
				<div class="money-all ">
					<label class="total-money"><span>¥</span>{{goodsDetailList.retailAmount}}</label>
				</div>
				<div class="goods-title">{{goodsDetailList.goodsName}}</div>
				<div class="goods-other">
					<div class="tl">运费:{{goodsDetailList.shipping}}</div>
					<div class="">月销:{{goodsDetailList.sale}}</div>
					<div class="tr">{{goodsDetailList.goodsLocation}}</div>
				</div>
			</div>
			<!--  -->
			<div class="vip">
				<img class="icon-vip" src="../../../static/img/icon-vip.png" />
				成为会员，享受更多优惠！
			</div>
			<div class="goods-pro">
				
				<div class="couple">
					<div class="tl">优惠<label class="icon-couple">商家券</label></div>
					<div class="tr" v-show="hasCoupons">领券<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
					<div class="tr" v-show="!hasCoupons">暂无优惠券</div>
				</div>
				<div class="select">
					<div class="tl">规格选择<label class="select-text" v-show="desType">已选:{{desType}}</label></div>
					<div class="tr" @click="SelectGoods">选择<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
				</div>
			</div>
			<!-- 商品评价 -->
			<div  id="comment" class="goods-coment goodsTitle">
				<div class="goods-coment-title">
					<div class="tl">商品评价</div>
					<div class="tr" @click="tocomment(goodsDetailList.id)" v-if ="commentsShow">查看全部<img class="icon-return" src="../../../static/img/icon-r-return.png" /></div>
				</div>
				
				<div class="comont-deta" >
					<div  v-for="(item,index) in goodsDetailList.goodsCommend" :key="index" v-if ="commentsShow">
						<div class="user" >
							<img class="user-img" v-lazy="item.headIcon" />
							<div class="user-name">{{item.nickName}}</div>
						</div>
						<div class="user-comonet" >
							{{item.content}}
						</div>
					</div>
					
					<label class="notxt" v-if="!commentsShow">该宝贝暂时无人评论~</label>
				</div>
				
			</div>
			<!-- 商品详情 -->
			<div id="goodsCDetail" class="goods-c-detail">
				<div class="goods-c-detail-title goodsTitle">
					<img class="bg-line-left" src="../../../static/img/bg-line-left.png" />
					<label class="bg-title">商品详情</label>
					<img class="bg-line-right" src="../../../static/img/bg-line.png" />
				</div>
				<div class="goods-imgs-all">
					<img v-for="(item,index) in goodsDetailList.goodsDetailss" :key="index" v-lazy="item" />
				</div>
			</div>

		</div>

		<!-- 商品详细参数 -->
		<transition class="goods-fade">
			<div class="mask" :class="[maskState?'':'none']"></div>
		</transition>
		<transition class="goods-fade">
			<div class="select-goods-detail" :class="[maskState?'':'none']">
				<img class="close" @click="close"  src="../../../static/img/icon-close.png" />
				<div class="padding30" >
					<!-- 价格图片库存 -->
					<div class="select-goods-detail-img" >
						<img :src="typeDataList.specImg" />
						<div class="select-goods-detail-num">
							<div class="money">¥<label class="f34">{{typeDataList.retailAmounts}}</label></div>
							<div>库存{{typeDataList.inventory}}件</div>
						</div>
					</div>
					<!-- 颜色分类 -->
					<div class="select-goods-type">
						<div class="select-title">颜色分类</div>
						<div class="goods-type-list">
							<span class="goods-type-code" :class="[index==SelectCodeIndex?'active':'']" v-for="(item,index) in goodsDetailList.goodsSpecVo"
							 :key="index" @click="chooseType(index,item.specName)">{{item.specName}}</span>
						</div>
					</div>
					<!--  -->
					<div class="buy-num">
						<div class="buy-title">购买数量</div>
						<div class="buy-total">
							<input type="button" class="buy-reduce" :class="[onstyle?'':'forbid']" @click="buyReduce" value="-" />
							<label class="buy-count">{{buyCount}}</label>
							<input type="button" class="buy-plus" @click="buyPlus(buyCount)" value="+" />
						</div>
					</div>
					<div class="ok-btn" @click="okBtn">
						<div>确定</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- 购物导航-->
		<div class="car-foot">
			<div class="car-icon" @click="company(goodsDetailList.merchantId)"><img class="goods-home" src="../../../static/img/goods-home.png" /></div>
			<div class="car-icon"><img class="car-bag" src="../../../static/img/car-bag.png" /></div>
			<div class="car-icon"><a :href="'tel:'+goodsDetailList.serviceIphone"><img class="call-phone" src="../../../static/img/call-phone.png" /></a></div>
			<div class="join-car">加入购物车</div>
			<div class="buy">立即购买</div>
		</div>
	</div>
</template>

<script>
	import goodsDetail from '../../server/goods.js';
	import common from '../../plugins/common.js';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		components:{
			swiper,
			swiperSlide
		},
		data() {
			return {
				goodsSwiper: {
					loop: true,
					autoplay: true,
					navigation:{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				},//轮播图
				// 规格选择
				SelectCodeIndex: 0,
				buyCount: 1,//选择商品数量
				onstyle: false,
				maskState: false,
				headerFix:false,//头部导航
				headerNav:[
					{
						name:'宝贝',
						index:0
					},{
						name:'评价',
						index:1
					},
					{
						name:'详情',
						index:2
					}],
				headerIndex:0,
				//商品详情请求
				params:{
					userToken:'',
					userId:'',
					source:0
				},
				goodsDetailList:'',
				//详细参数
				desType:"",
				typeDataList: '',
				commentsShow:false,//商品评
				hasCoupons:true,//优惠券
			}
		},
		watch: {
			buyCount(newVal, oldVal) {
				if (newVal == 1) {
					this.onstyle = false
				} else {
					this.onstyle = true 
				}
			},
		},
		mounted(){
			this.params.goodsId =  this.$route.query.goodsId;
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined;
			document.addEventListener('scroll',this.navScroll);//滚动
			//获取请求数据
			this.goodsDetail()
		},
		
		methods: {
			// 去店铺
			company(id){
				this.$router.push({
					path: "/company",
					query: {
						id: id,
				}
			})
			},
			//规格选择
			chooseType(index,val) {
				this.SelectCodeIndex = index;
				this.desType = val;
				this.typeDataList = this.goodsDetailList.goodsSpecVo[index]
			},
			buyPlus() {
				this.buyCount++;
				this.onstyle = true;
			},
			buyReduce() {
				if (this.onstyle) {
					this.buyCount--;
				}
			},
			chooseComment(index) {
				this.commentIndex = index;
			},				
			// 评论蒙版隐藏
			CommentShow(){
				this.commentMask = !this.commentMask;
			},
			// 评论列表
			tocomment(id){
				this.$router.push({
					path:'/goodsComment',
					query:{
						goodsId:id
					}
				})
			},
			// 滚动监听
			navScroll(){
				let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
				console.log(scrollTop)
				let offsetTop = document.querySelector('#goodsDetail').offsetTop;
				// 导航条切换
				scrollTop > offsetTop ? this.headerFix = true : this.headerFix = false;
				let goodsNum = document.getElementsByClassName('goodsTitle');
				for( let item in goodsNum){
					console.log(goodsNum[item].offsetTop)
					if(goodsNum[item].offsetTop < scrollTop){
						this.headerIndex = item;
					}
				}
			},
			headerTab(Ind){
				/*导航条切换*/
				this.headerIndex =Ind;
				switch (Ind){
					case 0:
						document.getElementById('goodsDetail').scrollIntoView();
						break;
					case 1:
						document.getElementById('comment').scrollIntoView();
						break;
					case 2:
						document.getElementById('goodsCDetail').scrollIntoView()
						break;
				}
			},
			SelectGoods(){
				/*详细参数开关*/
				this.maskState = true;
				if (this.maskState) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
			close(){
				this.maskState =false;
				document.body.style.overflow = 'initial'
			},
			okBtn(){
				this.close();
			},
			back(){
				//返回
				this.$router.go(-1);
			},
			/*商品详情*/
			goodsDetail(){
				goodsDetail.goodsDetail(this.params).then(res =>{
					console.log(res)
					let code = res.code;
					if(code == 0){
						this.goodsDetailList = res.data;
						if(res.data.coupons>0){
							this.hasCoupons = true;
						}else{
							this.hasCoupons = false;
						}
						if(res.data.goodsCommend.length > 0){
							this.commentsShow = true;
						}else{
							this.commentsShow = false;
						}
						this.typeDataList = this.goodsDetailList.goodsSpecVo[0]
					}
				})
			}
		},
		destroyed(){
			document.removeEventListener('scroll',this.navScroll)
		},
	} 
</script>
<style lang="scss">
	@import 'swiper/dist/css/swiper.css';
	@import '../../../static/css/common.css';
	@import '../../../static/css/style.css';
	#goodsDetail {
		font-family: 'pf-Medium';

		.none {
			display: none!important;
		}
		.goods-detail {
			width: 100%;
			height: auto;
		}
		.f34 {
			font-size: .34rem;
		}

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
		.header-nav{
			display: flex;
			font-size: .3rem;
			align-items: center;
			color: #7f7f7f;
		}
		.header-nav label{
			display: inline-block;
			width: 30%;
			margin-right: .56rem;
			padding-bottom: .1rem;
		}
		.header-nav label:last-child{
			margin: 0;
		}
		.header-nav .active{
			border-bottom:.04rem solid #7f7f7f;
			border-radius: .02rem;
		}
		.icon-left {
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}

		.icon-share {
			display: inline-block;
			width: .26rem;
			height: .27rem;
			background: #fff;
			margin-right: .3rem;
		}

		.goods-banner {
			width: 100%;
			height: 5.62rem;
			margin-top: .9rem;
			background: #1e1e1e;
			position: relative;
			.goods-wrapper {
				width: 100%;
				height: 100%;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.button-prev,
		.button-next {
			width: .33rem!important;
			position: absolute;
			height: .26rem!important;
			top: 50%;
			margin-top: -.13rem;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			z-index: 15;
		}
// 		.button-next img,.button-prev img{
// 			width: 100%;
// 			height: 100%;
// 		}
		.button-prev {
			left: .3rem;
			background-image: url('../../../static/img/icon-pre.png')!important;
		}

		.button-next {
			right: .3rem;
			background-image: url('../../../static/img/icon-next.png')!important;
		}

		.count {
			color: #7f7f7f;
			font-size: .2rem;
			background: #fff;
			border-radius: .02rem;
			position: absolute;
			bottom: .3rem;
			right: .3rem;
			z-index: 15;
			padding: 0.05rem .1rem;
		}

		.goods-all {
			width: 100%;
			margin-bottom: .98rem;
			overflow: hidden;
		}

		.goods-name {
			margin-top: .4rem;
			padding: 0 .3rem;
			height: 2.35rem;
			border-bottom: .16rem solid #f1f1f1;
		}

		.money-all {
			text-align: left;
			line-height: .4rem;
		}

		.total-money {
			color: #b50000;
			line-height: .4rem;
			font-family:'pf-Heavy';
			font-size: .4rem;
		}

		.total-money span {
			font-size: .24rem;
			line-height: .24rem
		}

		.gray-line {
			text-decoration: line-through;
			color: #aaa;
			font-size: .22rem;
			line-height: .22rem;
		}

		.goods-title {
			font-size: .3rem;
			line-height: .34rem;
			max-height: .68rem;
			text-align: left;
			color: #1e1e1e;
			margin-top: .23rem;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.goods-other {
			display: flex;
			color: #aaa;
			font-size: .26rem;
			margin-top: .3rem;
		}

		.goods-other div {
			flex: 1
		}

		.tl {
			text-align: left !important
		}

		.tr {
			text-align: right !important
		}
		//会员
		.vip{
			width: 100%;
			height: .88rem;
			line-height: .88rem;
			text-align: left;
			color: #ffba30;
			font-size: .24rem;
			background: #fff9e9;
		}
		.icon-vip{
			width: .34rem;
			height: .3rem;
			margin:.24rem .24rem 0 .44rem;
		}
		// 优惠券
		.goods-pro {
			color: #aaa;
			font-size: .26rem;
			padding: 0 .3rem;
			line-height: .24rem;
			border-bottom: .16rem solid #f2f2f2;
		}
		
		.icon-return {
			width: .1rem;
			height: .18rem;
			margin-left: .1rem;
		}

		.goods-pro .couple,
		.goods-pro .select {
			display: flex;
			margin: .3rem 0;
			font-family:'pf-Regular';
		}

		.couple div,
		.select div {
			flex: 1;
		}

		.select-text {
			margin-left: .41rem;
			color: #1e1e1e;
		}

		.icon-couple {
			display: inline-block;
			width: .92rem;
			height: .32rem;
			font-size: .24rem;
			line-height: .32rem;
			text-align: center;
			color: #b50000;
			margin-left: .41rem;
			background-image: url('../../../static/img/icon-couple.png');
			background-repeat: no-repeat;
			background-size: .92rem .32rem;
		}

		// 商品评价
		.goods-coment {
			padding: 0 .3rem;
			margin-top: .32rem;
			border-bottom: .16rem solid #f1f1f1;
		}

		.goods-coment-title {
			display: flex;
		}

		.goods-coment-title .tl {
			font-size: .28rem;
			color: #1e1e1e;
			flex: 1;
		}
		.goods-coment-title .tr {
			font-size: .26rem;
			color: #aaa;
			font-family:'pf-Regular';
			flex: 1;
		}
		.comont-deta {
			padding-bottom: .46rem;
		}
		.user {
			margin-top: .33rem;
			display: flex;
			align-items: center;
			text-align: left;
		}

		.user-img {
			width: .48rem;
			height: .48rem;
			margin: 0;
			border-radius: 50%;
		}
		.user-name {
			font-size: .26rem;
			color: #7f7f7f;
			flex: 3;
			margin-left: .15rem;
		}
		.user-comonet {
			font-size: .26rem;
			color: #1e1e1e;
			text-align: left;
			margin-top: .16rem;
		}
		// 商品详情
		.goods-c-detail {
			padding: 0 .3rem;
		}
		.goods-c-detail-title {
			text-align: center;
			font-size: .26rem;
			height: .8rem;
			line-height: .8rem;
			border-bottom: 1px solid #e6e6e6;
		}
		.bg-line-left,
		.bg-line-right {
			display: inline-block;
			width: .4rem;
			height: .16rem;
			vertical-align: middle;
		}
		.goods-imgs-all {
			width: 100%;
			margin-top: .44rem;
		}
		.goods-imgs-all img {
			width: 100%;
		}
		// --------------=--
		
		// 商品详细参数
		.goods-fade-enter-active,
		.goods-fade-leave-active {
			transition: height 5s;
		}

		.mask {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			background: rgba($color: #000, $alpha: .6);
			z-index:77;
		}

		.fixed-all {
			overflow: hidden;
			height: 100vh;
		}

		.select-goods-detail {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 90vh;
			background: #fff;
			border-radius: .2rem .2rem 0 0;
			z-index: 90;
		}

		.padding30 {
			padding: 0 .3rem;
		}
		.close{
			display: inline-block;
			width: .32rem;
			height: .32rem;
			position: absolute;
			top: .3rem;
			right:.3rem;
		}
		.select-goods-detail-img {
			display: flex;
			font-size: .24rem;
			margin-top: .3rem;
			color: #aaa;
			align-items: flex-end
		}

		.select-goods-detail-img img {
			width: 2.2rem;
			height: 2.2rem;
		}

		.select-goods-detail-num {
			flex: 2;
			text-align: left;

			margin-left: .24rem;
		}

		.money {
			color: #b50000;
			line-height: .4rem;
		}

		.money label {
			margin-left: 0.04rem;
		}

		.select-goods-type {
			margin-top: .65rem;
			text-align: left;
			border-bottom: 1px solid #f2f2f2;
		}

		.select-title {
			color: #1e1e1e;
			font-size: .28rem;
			margin-bottom: .32rem;
		}

		.goods-type-list {
			display: flex;
			flex-wrap: wrap;
		}

		.goods-type-list .goods-type-code {
			display: inline-block;
			height: .6rem;
			padding: 0 .3rem;
			background: #f5f5f5;
			font-size: .26rem;
			margin: 0 .20rem .24rem 0;
			line-height: .6rem;
			border-radius: .04rem;
		}

		.goods-type-list .goods-type-code.active {
			border: solid 1px #febf38;
			background: #fff9ec;
			color: #febf38;
		}

		.buy-num {
			display: flex;
			align-items: center;
			margin-top: .4rem;
		}

		.buy-title {
			color: #1e1e1e;
			font-size: .28rem;
			text-align: left;
			flex: 1;
		}

		.buy-total {
			flex: 1;
			text-align: right;
			font-size: .28rem;
		}

		.buy-total input {
			width: .8rem;
			height: .6rem;
			border: none;
			outline: none;
			text-align: center;
			background-color: #f5f5f5;
			border-radius: .04rem
		}

		.buy-reduce.forbid {
			background: #fbfbfb;
			color: #aaa;
		}

		.buy-count {
			display: inline-block;
			width: .8rem;
			height: .6rem;
			line-height: .6rem;
			text-align: center;
			background-color: #f5f5f5;
			border-radius: .04rem;
		}

		.ok-btn {
			width: 100%;
			left: 0;
			bottom: .16rem;
			position: absolute;
			height: .8rem;
		}

		.ok-btn div {
			margin: 0 .3rem;
			height: 100%;
			line-height: .8rem;
			font-size: .32rem;
			color: #fff;
			border: none;
			background-image: linear-gradient(187deg, #feca3a 0%, #feb336 100%), linear-gradient(#ffba30, #ffba30);
			background-blend-mode: normal, normal;
			border-radius: .4rem;
		}
		
		.notxt{
			font-size: .28rem;
			color: #aaa;
		}
	}
</style>
