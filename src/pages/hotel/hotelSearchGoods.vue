<template>
	<div class="hotel-main-goods-search" id="main-goods">
		<div class="header">
			<div class="searchs-content">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel" />
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" type="text" placeholder="搜索商品或企业" v-model="searchTitle" readonly="readonly" @click="tosearch" />
				</div>
			</div>
			<!-- 排序 -->
			<ul class="goods-search-type">
				<li v-for='(item,index) of searchType' :key="index" :class="[index==searchTypeIndex?'active':'']" @click="_searchfn(index)">
					<div :sortId="index">
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
			<scrollto :datalist="hotelList" @scrollend="nextList">
				<div class="list-detail" v-for="(item,index) in hotelList" :key="index" @click="toDetail(item.id)"  v-show="showGoods">
					<img class="list-img" v-lazy="item.showImgs" />
					<div class="bline">
						<div class="list-dtxt">
							<div class="bg-score">综合评分：{{item.score}}</div>
							<div class="hotel-title f32 c1e">{{item.merchantName}}</div>
							<div class="hotel-labels">
								<label class="label-code" v-for="(item,index) in item.labels" :key="index" v-if="!foodshow">{{item.laberName}}</label>
								<label class="label-code " :class="(index/2==0)?'person-money':'mounth-num'"
								 v-for="(item,index) in item.labels" :key="index"  v-if="foodshow">{{item.laberName}}</label>
							</div>
							<div class="price">
								<small>¥</small>{{item.amount}}
							</div>
						</div>
					</div>
				</div>
				<div class="loadingmore">
					<img v-if="loadingstate" src="../../../static/img/img_list_loading.gif">
					{{ loadingtext }}
				</div>
			</scrollto>
			<!-- 无记录 -->
			<div class="goods-none" v-show="showGoods==false">
				<img src="../../../static/img/none-goods.png" />
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
		components: {
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
				searchTypeIndex: -1,
				props: ['goodList'],
				params: {
					sort: 0,
					categoryId: '',
					areaCode: '',
					type: '',
					terms: '',
					fromNum: 1,
					pageSize: 10
				},
				pagecount: 0, //计算共有多少页码
				searchTitle: '', //搜索文字
				hotelList: [],
				showGoods: true, //T有搜索记录F无
				foodshow:false,
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
		mounted() {
			this.params.terms = this.$route.query.searchTitle
			this.params.categoryId = this.$route.query.categoryId
			console.log(this.$route.query.categoryId)
			this.params.type = this.$route.query.type
			this.params.areaCode = this.$route.query.areaCode
			this.searchTitle = this.$route.query.searchTitle
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
			_upstate(index) {
				//降序排列
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				switch (parseInt(index)) {
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
			_downstate(index) {
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				switch (parseInt(index)) {
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
			cancel() {
				this.$router.push("/index");
			},
			tosearch() {
				this.$router.push({
					path: "/searchotel",
					query: {
						searchTitle: this.searchTitle,
						areaCode: this.$route.query.areaCode,
						categoryId: this.$route.query.categoryId
					}
				})
			},
			// 商品详情
			toDetail(id){
				if(this.$route.query.categoryId==2){
					this.$router.push({
					path:'/hotelDetail',
					query:{
						id:id
					}
					})
				}else if(this.$route.query.categoryId==3){
					this.$router.push({
						path:'/foodShop',
						query:{
							id:id
						}
					})
				}
				
			},
			clearList() {
				this.params.fromNum = 1;
				this.hotelList.length = 0
			},
			getSearchData() {
				// 这里是请求搜索数据的地方
				if(this.$route.query.categoryId==2){
					// 住宿
				search.searchHotel(this.params).then(res => {
						console.log(res)
						let code = res.code;
						if (code == 0) {
							if (res.data.count > 0) {
								this.showGoods = true;									
								this.foodshow = false;
								this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
								this.hotelList = this.hotelList.concat(res.data.hotelList);
								if (this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount) {
									this.loadingstate = false
									this.loadingtext = '没有更多了~'
								}
							} else {
								this.showGoods = false
								this.loadingstate = false
								this.loadingtext = ''
							}
						} else {
							console.log(res.message)
						}
					})
				
				}else if(this.$route.query.categoryId==3){
					// 食品
					search.searchFood(this.params).then(res => {
							console.log(res)
							let code = res.code;
							if (code == 0) {
								if (res.data.count > 0) {
									this.showGoods = true;
									this.foodshow = true;
									this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
									this.hotelList = this.hotelList.concat(res.data.hoteListVo);
									if (this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount) {
										this.loadingstate = false
										this.loadingtext = '没有更多了~'
									}
								} else {
									this.showGoods = false
									this.loadingstate = false
									this.loadingtext = ''
								}
							} else {
								console.log(res.message)
							}
						})
					
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
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/css/style.css";

	.hotel-main-goods-search {
		width: 100%;
		overflow: auto;

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

		.list-detail {
			display: flex;
			margin-top: .34rem;
		}

		.list-img {
			width: 2rem;
			height: 2rem;
			margin: 0 0 0 .3rem;
		}
		.bline {
			border-bottom: 0.01rem solid #f2f2f2;
			margin: 0;
		}

		.list-dtxt {
			margin: 0 .3rem 0 .2rem;
			text-align: left;
		}

		.bg-score {
			width: 2rem;
			height: .32rem;
			line-height: .34rem;
			font-size: .22rem;
			border-radius: 4px 20px 4px 20px;
			text-align: center;
			color: #fff;
			margin: .1rem 0 0;
			background: #ffba30;
		}

		.hotel-title {
			margin: .2rem 0 .15rem 0;
			width: 4.6rem;
			height: .32rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.hotel-labels{
			width: 100%;
			display: flex;
		}
		.label-code {
			display: inline-block;
			padding: .06rem .14rem;
			line-height: .22rem;
			font-size: .22rem;
			color: #7f7f7f;
			background-color: #f6f6f6;
			border-radius: .17rem;
			margin:0 .10rem 0 0;
		}
		.person-money{
				color: #ff657b;
				border: 1px solid #ff657b
			}
			.mounth-num{
				color: #38caff;
				border: 1px solid #38caff;
			}
		.price {
			font-size: .36rem;
			margin: .24rem 0 .4rem 0;
			color: #b50000;
		}

		.price small {
			font-size: .2rem;
		}

		// 无记录
		.goods-none {
			margin: 2.3rem auto 0;
		}

		.goods-none img {
			width: 2.3rem;
			height: 2.3rem;
		}

		.none-txt {
			font-size: .3rem;
			margin-top: .7rem;
			color: #aaa;
		}

		/* 加载更多 */
		.loadingmore {
			margin: 0 !important;
			background: red;
			height: 0.92rem;
			line-height: 0.92rem;
			width: 100% !important;
			text-align: center;
			color: #666;
			padding: 0 !important;
			font-size: 0.28rem;
			background-color: #fff;
			font-weight: bold;

			img {
				vertical-align: middle;
				width: 0.3rem;
				height: 0.3rem;
			}
		}
	}
</style>
