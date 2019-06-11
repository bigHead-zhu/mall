<template>
	<div class="film-main-goods-search">
		<div class="header">
			<div class="searchs-content">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="cancel"/>
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" type="text" placeholder="搜索商品" v-model="searchTitle"  readonly="readonly" @click="tosearch"/>
				</div>
			</div>
		</div>
		<!-- 商品列表 -->
		<div class="film-list">
				<ul class="film-list-ul">
					<scrollto :datalist="searchGoodsData" @scrollend="nextList">
						<li v-for="(item,index) in searchGoodsData" :key="index" @click="todetail(item.id)">
							<div class="film-left">
								<div class="film-title">
									<label class="film-name f32 c1e">{{item.merchantName}}</label>
									<label class="bg-score">好评：{{item.score}}</label>
								</div>
								<div class="address f26 caaa">
									地址：{{item.merchantAddress}}
								</div>
							</div>
							<div class="film-right">
								<label class="num">{{item.minAmount}}</label><small>元</small><small class="caaa">起</small>
							</div>
						</li>
						<li 
						  class="loadingmore">
						  <img 
							v-if="loadingstate"
							src="../../../static/img/img_list_loading.gif">
						  {{ loadingtext }}
						</li>
					</scrollto>
				</ul>
				
			</div>
		</div>
</template>

<script>
	import common from '../../plugins/common.js';
	import search from '../../server/search.js';
	import message from '../../components/message.vue';
	import scrollto from '../../components/scrollto.vue';
	export default {
		components:{
			scrollto
		},
		data() {
			return {
				// 搜索分类
				searchType: [{
					name: '价格',
					upstate: false,
					downstate: false
				}, {
					name: '销量',
					upstate: false,
					downstate: false
				}, {
					name: '好评',
					upstate: false,
					downstate: false
				}],
				// 搜索分类索引
				searchTypeIndex:-1,
				props:['goodList'],
				params: {
					areaCode:'',
					categoryId:'',
					terms:'',
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				searchTitle: '',//搜索文字
				searchGoodsData:[],
				showGoods:true,//T有搜索记录F无
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
		mounted() {
			this.params.terms= this.$route.query.searchTitle
			this.params.categoryId= this.$route.query.categoryId
			this.params.areaCode= this.$route.query.areaCode
			this.searchTitle= this.$route.query.searchTitle
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined
			this.getSearchData()
		},
		methods: {
			_searchfn(index) {
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				that.searchType[index].downstate = true
			},
			_upstate(index){
				//降序排列
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				switch (parseInt(index)){
					case 0:
						this.params.sort = 1
						break;
					case 1:
						this.params.sort = 2
						break;
					case 2:
						this.params.sort = 3
						break;
				}
				that.searchType[index].upstate = true
				this.clearList()
				this.getSearchData();
			},
			_downstate(index){
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				switch (parseInt(index)){
					case 0:
						this.params.sort = 0
						break;
					case 1:
						this.params.sort = 2
						break;
					case 2:
						this.params.sort = 3
						break;
				}
				that.searchType[index].downstate = true
				this.clearList()
				this.getSearchData();
			},
			cancel(){
				this.$router.push("/index");
			},
			tosearch(){
				this.$router.push({
					path: "/searchotel",
					query:{
						areaCode:this.local.localareaId,
						categoryId: this.$route.query.categoryId
					}
				})
			},
			
			getSearchData() {
				// 这里是请求搜索数据的地方
				search.searchFilm(this.params).then(res => {
					console.log(res)
					let code = res.code;
					if(code==0){
						if(res.data.count > 0){
							this.showGoods = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.searchGoodsData = this.searchGoodsData.concat(res.data.filmListVo);
							if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
							  this.loadingstate = false
							  this.loadingtext = '没有更多了~'
							}
						}else{
							this.showGoods = false
						}
					}else{
						console.log(res.message)
					}
				})
			},
			clearList() {
				this.params.fromNum = 1;
				this.searchGoodsData.length = 0
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
					path:'/tourShop',
					query:{
						id:index
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/css/style.css";
.film-main-goods-search{
		width: 100%;
		overflow: auto;
	.header {
		width: 100%;
		height: .88rem;
		display: flex;
		font-size: .34rem;
		color: #1e1e1e;
		justify-content:center;
		align-items: center;
		position: fixed;
		background: #fff;
		overflow: hidden;
		z-index: 99;
		left: 0;
		top: 0;
	}
	.searchs-content {
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

	.icon-left {
		width: .16rem;
		height: .28rem;
		position: absolute;
		left: .3rem;
		top: .18rem;
		z-index: 2;
	}

	.goods-search-type {
		display: flex;
		height: .76rem;
		justify-content: center;
		align-items: center;
	}

	.goods-search-type .active {
		color: #feb336;
	}

	.goods-search-type div {
		position: relative;
		flex: 1;
		width: 1.2rem;
		height: .3rem;
		font-size: .28rem;
		line-height: .3rem;
	}

	.icon-down,
	.icon-up {
		width: .14rem;
		height: .07rem;
		position: absolute;
		right: 0rem;
		background-repeat: no-repeat;
		background-size: .14rem .07rem;
	}
	.icon-up {
		top: .05rem;
		background-image: url(../../../static/img/icon-up.png);
	}

	.icon-down {
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

	
	/* 加载更多 */
	.loadingmore {
		margin: 0!important;
		background: red;
		height: 0.92rem;
		line-height: 0.92rem;
		width: 100%!important;
		text-align: center;
		color: #666;
		padding: 0 !important;
		font-size: 0.28rem;
		background-color: #fff;
		 font-weight: bold;
	  img{
		vertical-align: middle;
		width: 0.3rem;
		height: 0.3rem;
	  }
	}
	/*电影院列表*/
	.film-list{
		border-top: .16rem solid #f2f2f2;
		margin-top: .98rem;
		.film-list-ul{
			margin: 0 .3rem;			
		}
		.film-list-ul li{
			border-bottom: 1px solid #f2f2f2;
			display: flex;
			align-items: center;
			min-height: 1.44rem;
		}
		.film-left{
			width: 5.55rem;
			text-align: left;
		}
		.film-name{
			display: inline-block;
			max-width: 3.7rem;
			height: .32rem;
			overflow: hidden;
			vertical-align: middle;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.bg-score{
			display: inline-block;
			width: 1.5rem;
			height: .30rem;
			line-height: .34rem;			
			vertical-align: middle;
			font-size: .22rem;
			border-radius: 4px 20px 4px 20px;
			text-align:center;
			color:#fff;
			margin:-.12rem 0 0;
			margin: 0;
			vertical-align: middle;
			background: #ffba30;
		}
		.film-right{
			margin: -.20rem 0 0;
			color: #b50000;
			font-size: .22rem;
		}
		.film-right .num{
			font-size: .32rem;
			font-weight: bold;
		}
		.caaa{
			color: #aaa;
		}
		.address{
			margin-top: .12rem;
		}
	}
}
	
</style>
