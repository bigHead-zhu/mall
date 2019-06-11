<template>
	<div class="searchShop" id="searchShop">
		<div class="header">
			<div class="searchs-content">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="goreturn" />
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" type="text" placeholder="搜索商品或企业" v-model="searchTitle" readonly="readonly" @click="tosearch" />
				</div>
			</div>
			<ul class="shop-search-type">
				<li v-for='(item,index) of searchType' :key="index" :class="[index==searchTypeIndex?'active':'']" @click="_searchfn(index)">
					<div>
						{{item.name}}
						<label class="icon-up" :class="[item.upstate?'present':'']" @click.stop="_upstate(index)"></label>
						<label class="icon-down" :class="[item.downstate?'present':'']" @click.stop="_downstate(index)"></label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 店铺 列表-->
		<div class="shop-list">
			<scrollto :datalist="searchShopData" @scrollend="nextList">
				<ul class="shop-ul" v-show='showShop'>
					<li v-for="(item,index) in searchShopData" :key="index"	>
						<div class="shop-logo clear">
							<img class="s-logo" :src="item.merchantLogo" />
							<div class="shop-st-tit">
								<div class="shop-title c1e f28">{{item.merchantName}}</div>
								<div class="starts">
									<star :width ="item.score"></star>
								</div>
							</div>
							<div class="go-shop-btn" @click="toShop(item.id)">进入店铺</div>
						</div>
						<div class="img-list clear">
							<img class="shop-list-img" v-for="(item,index) in item.goodsImg" :key="index" :src="item" />
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
			<!-- 无记录 -->
			<div class="goods-none"  v-show="showShop==false">
				<img src="../../../static/img/none-goods.png"/>
				<div class="none-txt">当前暂无搜索结果~</div>
			</div>
		</div>
		<!--  -->
	</div>

</template>

<script>
	import star from '../../components/star.vue';
	import search from '../../server/search.js';
	import common from '../../plugins/common.js';
	import scrollto from '../../components/scrollto.vue';

	export default{
		// name:'index',
		components:{
			star,
			scrollto
		},
		data(){
			return{
				searchType: [{
					name: '销量',
					upstate: false,
					downstate: false
				}, {
					name: '好评',
					upstate: false,
					downstate: false
				}],
				searchTypeIndex:-1,
				searchTitle:'',//搜索关键字
				searchShopData:[],
				showShop:true,//T有搜索记录F无
				params:{
					searchTitle:'',
					sort:0,
					type:'',
					fromNum:1,
					pageSize:10,
					userToken:'',
					userId:'',
					source:0
				},
				score:'',
				pagecount: 0,//计算共有多少页码
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
		mounted() {
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined
			this.params.searchTitle = this.$route.query.searchTitle
			this.searchTitle = this.$route.query.searchTitle
			this.params.type = this.$route.query.type
			this.getSearchData()
		},
		methods: {
			_searchfn(index) {
				let that = this;
				that.searchTypeIndex = index;
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false;
					that.searchType[i].downstate = false;
				}
				that.searchType[index].downstate = true;
			},
			_upstate(index){
				let that = this;
				that.searchTypeIndex = index;
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false;
					that.searchType[i].downstate = false;
				}
				that.searchType[index].upstate = true;
				switch (parseInt(index)){
					case 0:
						this.params.sort = 0;
						break;
					case 1:
						this.params.sort = 1;
						break;
				}
				this.clearList();
				this.getSearchData();
			},
			_downstate(index){
				let that = this;
				that.searchTypeIndex = index;
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false;
					that.searchType[i].downstate = false;
				}
				that.searchType[index].downstate = true;
				switch (parseInt(index)){
					case 0:
						this.params.sort = 0;
						break;
					case 1:
						this.params.sort = 1;
						break;
				}
				this.clearList();
				this.getSearchData();
			},
			tosearch(){
				this.$router.push({
					path: "/search",
					query: {
						searchTitle: this.searchTitle,
						queryType: 'goods',
					}
				})
			},
			goreturn(){
				this.$router.push('/index');
			},
			clearList() {
				this.params.fromNum = 1;
				this.searchShopData.length = 0;
			},
			/*搜索店铺*/
			getSearchData(){
				this.loadingstate = true;
				this.loadingtext = '正在加载';
				search.searchShops(this.params).then(res => {
					console.log(res)
					let code = res.code;
					if(code==0){
						if(res.data.count > 0){
							this.showShop = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.searchShopData = this.searchShopData.concat(res.data.hotelList);
							if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
							  this.loadingstate = false;
							  this.loadingtext = '没有更多了~';
							}
						}else{
							this.showShop = false;
						}
					}else{
						console.log(res.message)
					}
				})
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
			// 
			toShop(id){
				this.$router.push({
					path:'/company',
					query:{
						id:id
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/css/style.css";
	#searchShop {
		font-family: 'pf-Medium';

		.searchShop {
			width: 100%;
			height: auto;
			overflow: hidden;
			position: relative;
			background-color: #fff;
		}
		.header {
			width: 100%;
			padding-top: .18rem;
			position: fixed;
			background: #fff;
			overflow: hidden;
			z-index: 99;
			left: 0;
			top: 0;
		}
		.searchs-content{
			position: relative;
		}
		.search {
			margin: 0rem .3rem 0 .76rem;
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
			font-size: .28rem;
			background: transparent;
			border: none;
			color: #7f7f7f;
			flex: 2;
		} 
		.icon-left{
			width: .16rem;
			height: .28rem;
			position: absolute;
			left:.3rem;
			top: .18rem;
			z-index: 2;
		}
		.shop-search-type{
			display: flex;
			height: .76rem;
			justify-content: center;
			align-items: center;
		}
		.shop-search-type .active{
			color: #feb336;
		}
		.shop-search-type div{
			position: relative;
			flex: 1;
			width: 1.2rem;
			height: .3rem;
			font-size: .28rem;
			line-height: .3rem;
		}
		.icon-down,.icon-up{
			display: inline-block;
			width: .14rem;
			height: .07rem;
			position: absolute;
			right:0rem;
			background-repeat: no-repeat;
			background-size: .14rem .07rem;
		}
		.icon-up{
			top: .05rem;
			background-image: url(../../../static/img/icon-up.png);
		}
		.icon-down{
			bottom: .05rem;
			background-image: url(../../../static/img/icon-down.png);
		}
		.icon-up.present {
			top: .05rem;
			background-image: url(../../../static/img/icon-up-active.png);
		}
		.icon-down.present {
			bottom: .05rem;
			background-image: url(../../../static/img/icon-down-active.png);
		}
		.shop-list{
			border-top: .16rem solid #f1f1f1;
			margin-top: 1.58rem;
		}
		.shop-ul{
			margin: 0 .3rem;
		}
		.shop-ul li{
			padding: .3rem 0;
			border-bottom: #e6e6e6 solid 1px;
		}
		.shop-ul li:last-child{
			border-bottom: none;
		}
		.shop-logo{
			width: 100%;
			height: .8rem;
			line-height: .8rem;
		}
		.s-logo{
			width: .8rem;
			height: .8rem;
			float: left;
			border-radius: .04rem;
		}
		.icon-start{
			
		}
		.shop-st-tit{
			float: left;
			height: 100%;
			margin-left: .2rem;		
		}
		.shop-title{
			margin-top: .13rem;
		}
		.starts{
			width: 1.2rem;
			margin-top: 0.1rem;
		}
		.go-shop-btn{
			display: inline-block;
			width: 1.28rem;
			color: #ff3350;
			border-radius: .4rem;
			height: .4rem;
			margin:.16rem 0 0 0;		
			float: right;
			font-size: .26rem;
			line-height: .4rem;
			font-family: 'pf-Regular';

			border: .01rem solid #ff3350;
		}
		.img-list{
			margin-top: .32rem;
		}
		.img-list img:nth-child(2n){
			margin:0 .12rem;
		}
		.shop-list-img{
			width: 2.2rem;
			height: 2.2rem;
			border-radius: .04rem;
			float: left;
		}
		// 无记录
		.goods-none{
			margin:2.3rem auto 0;
		}
		.goods-none img{
			width: 2.3rem;
			height: 2.3rem;
		}
		.none-txt{
			font-size: .3rem;
			margin-top: .7rem;
			color: #aaa;
		}
		
		
	}
</style>