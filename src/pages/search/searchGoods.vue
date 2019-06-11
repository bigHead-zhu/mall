<template>
	<div class="main-goods-search" id="main-goods">
		<div class="header">
			<div class="searchs-content">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="cancel"/>
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" type="text" placeholder="搜索商品或企业" v-model="searchTitle"  readonly="readonly" @click="tosearch"/>
				</div>
			</div>
			<!-- 排序 -->
			<ul class="goods-search-type">
				
				<li v-for='(item,index) of searchType' :key="index" :class="[index==searchTypeIndex?'active':'']" @click="_searchfn(index)">
					<div :sortId = "index">
						{{item.name}}
						<label class="icon-up" :class="[item.upstate?'present':'']" @click.stop="_upstate(index)"></label>
						<label class="icon-down" :class="[item.downstate?'present':'']" @click.stop="_downstate(index)"></label>
					</div>
				</li>
			</ul>	
		</div>
		<!-- 商品列表 -->
		<div class="goods-list">
			<!-- 搜索列表 -->
			<scrollto :datalist="searchGoodsData" @scrollend="nextList">
				<ul class="goods-ul clear"  v-show="showGoods">
					<li v-for="(item,index) in searchGoodsData" :key ="index"
					  @click = 'toDetail(item.goodsId)'>
						<div class="goods-li">
							<img class="goods-img" :src="item.goodsImg" />
						</div>
						<div class="title tleft ">
							<p class="goods-title">{{item.goodsName}}</p>
							<label class="money">¥{{item.minAmount}}</label>
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
			<div class="goods-none"  v-show="showGoods==false">
				<img src="../../../static/img/none-goods.png"/>
				<div class="none-txt">当前暂无搜索结果~</div>
			</div>
			
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
					source:0,
					userId:'',
					userToken:'',
					sort:0,
					merchantId:'',
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
			this.params.searchTitle= this.$route.query.searchTitle
			this.params.merchantId= this.$route.query.merchantId
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
					path: "/search",
					query: {
						searchTitle: this.searchTitle,
						queryType:'goods',
					}
				})
			},
			
			getSearchData() {
				// 这里是请求搜索数据的地方
				
				search.searchGoods(this.params).then(res => {
					let code = res.code;
					if(code==0){
						if(res.data.count > 0){
							this.showGoods = true;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.searchGoodsData = this.searchGoodsData.concat(res.data.goodsSearchVo);
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
					path:'/goodsDetail',
					query:{
						goodsId:index
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/css/style.css";
.main-goods-search{
		width: 100%;
		overflow: auto;
		font-family: 'pf-Medium';

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

	.goods-list {
		border-top: .16rem solid #f1f1f1;
		margin-top: 1.58rem;
	}

	.goods-ul {
		margin: 0 .3rem;
	}

	.goods-ul li {
		float: left;
		width: 3.4rem;
		margin-top: .35rem;
	}
	.goods-ul li:last-child{
		border-bottom: none;
	}
	.goods-ul li:nth-child(2n-1) {
		margin-right: .1rem;
	}
	.goods-img {
		width: 3.4rem;
		height: 3.4rem;
		border-radius: .04rem;
	}
	.title {
		width: 100%;
		font-size: .24rem;
	}

	.goods-title {
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-top: .23rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.money {
		color: #b50101;
		display: inline-block;
		margin-top: .15rem;
		font-family: 'pf-Blod';

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
}
	
</style>
