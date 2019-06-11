<template>
	<div class="c-main-goods-all" id="main-goods">
		<div class="header" id="top">
			<div class="searchs-content">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="cancel"/>
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" type="text" placeholder="搜本店"  readonly="readonly" @click="tosearch"/>
				</div>
			</div>
			<ul class="goods-search-type">
				<li v-for='(item,index) of searchType' :key="index" :class="[index==searchTypeIndex?'active':'']" @click="_searchfn(index)">
					<div>
						{{item.name}}
						<label class="icon-up" :class="[item.upstate?'present':'']" @click.stop="_upstate(index)"></label>
						<label class="icon-down" :class="[item.downstate?'present':'']" @click.stop="_downstate(index)"></label>
					</div>
				</li>
			</ul>
		</div>
		<!-- 商品列表 -->
		<div class="goods-list">
			<ul class="goods-ul clear " >
				<li v-for="(item,index) in searchGoodsData" :key="index">
					<img class="goods-img" :src="item.goodsImg" />
					<div class="goods-txt">
						<label class="goodsTitle">{{item.goodsName}}</label>
						<label class="money">
							¥<label class="f36 ml5">{{item.amount}}</label>
						</label>
						<label class="total">
							<label class="total-line">{{item.commendCount}}条评价</label>
							<label class="ml5">好评:{{item.score}}星</label>
						</label>
					</div>
				</li>
				
			</ul>
		</div>
		<!-- 商品列表end -->
		<div class="footer-nav">
			<div class="active" >全部宝贝<label class="footer-line"></label></div>
			<div class="" @click="toType">宝贝分类</div>
			<div class="" @click="toService">联系商家</div>
		</div>
		<div class="toTop"  @click="backTop">
			<img src="../../../static/img/top.png" />
		</div>
	</div>
</template>

<script>
	import shop from '../../server/shop.js';
	export default {
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
				btnFlag:false,
				props:['goodList'],
				// 商品列表
				params:{
					merchCategoryId:null,
					merchantId:'',
					fromNum:1,
					pageSize:10,
					type:0,
					level:''
				},
				// 加载更多
				// showGoods:true,
				loadingstate: true,
				loadingtext: '正在加载',
				searchGoodsData:[],
				pagecount:'',
			}
		},
		mounted() {
			this.params.merchantId = this.$route.query.merchantId
			this.getlist();
		},
		methods:{
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
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				that.searchType[index].upstate = true
			},
			_downstate(index){
				let that = this
				that.searchTypeIndex = index
				for (let i = 0; i < that.searchType.length; i++) {
					that.searchType[i].upstate = false
					that.searchType[i].downstate = false
				}
				that.searchType[index].downstate = true
			},
			cancel(){
				this.$router.go(-1)
			},
			tosearch(){
				// 搜索本店
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
			// 获取列表
			getlist(){
				shop.typeList(this.params).then(res =>{
					console.log(res)
					if(res.code==0){
						if(res.data.count > 0){
								// this.showGoods = true;
								this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
								this.searchGoodsData = this.searchGoodsData.concat(res.data.goodsListVo);
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
				this.searchGoodsData.length = 0
			},
			//回到顶部
			backTop(){
				console.log(document.getElementsByClassName('.goods-list li') )
				console.log(document.body.scrollTop )
				console.log(document.body.scrollTop )
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0
			}
			
		},
	}
</script>
 
<style lang="scss" scoped>
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
.c-main-goods-all{
		width: 100%;
		height: 100vh;
		overflow: auto;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: #fff;
	
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
		margin: 1.58rem 0 1.1rem 0;
	}

	.goods-ul {
		margin: 0 .3rem;
	}
	.goods-ul li{
		display: flex;
		width: 100%;
		height: 2rem;
		align-items: center;
		margin-top: .32rem;
	}
	.goods-ul li:first-child{
		margin-top: .42rem;
	}
	.goods-img{
		width: 2rem;
		height: 2rem;
	}
	.goods-txt{
		width: 4.68rem;
		height: 100%;
		margin-left: .18rem;
		text-align: left;
	}
	.goodsTitle{
		width: 100%;
		font-size:.3rem;
		font-weight: normal;
		line-height: .36rem;
		color: #1e1e1e;
		display: block;
		margin-top: .16rem;
	}
	.money {
		color: #b50101;
		display: block;
		font-size: .22rem;
		margin-top: .15rem;
	}
	.ml5{
		margin-left: .05rem;
	}
	.total{
		font-size: .22rem;
		color: #aaa;		
		display: block;
		margin-top: .3rem;
		line-height: .22rem;
	}
	.total-line:after{
		content:"|";
		height: .10rem;
		padding-left: .12rem;
		margin: auto 0;
	}
	.toTop{
		position: fixed;
		width: .72rem;
		height: .72rem;
		right: .24rem;
		border-radius:50%; 
		bottom: 1.26rem;
		z-index: 1;
	}
	.toTop img{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
}
	
</style>
