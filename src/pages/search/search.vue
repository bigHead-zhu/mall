<template>
	<!-- 搜索 -->
	<div class="all-main-search">
		<div class="header">
			<div class="searchs-content">
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" v-model="searchTitle" type="text" placeholder="搜索商品或企业" @keyup.enter="targetSearch" />
				</div>
				<div class="search-btn" @click="cancel">取消</div>
			</div>
			
			<ul 
				v-if="searchstate"
				class="search-type">
				<li :class="[index==tabcurrent?'active':'']" 
				v-for="(item,index) in tablist" 
				:key="index" :sid="index" 
				@click="tab(item.index)"><label>{{item.name}}</label></li>
			</ul>

		</div>
		<!-- 为你推荐 -->
		<div class="goods-main">
			<div class="goods-main-code clear" v-show="foryouShow">
				<label class="g-title">为你推荐</label>
				<div class="code-btns">
					<label class="code" v-for="(item,index) in foryouCode" 
					:key="index" @click="codeSearch">{{item.value}}</label>
				</div>
			</div>
			<div class="goods-main-code" v-show="historyShow">
				<div class="recode">
					<label class="g-title">搜索记录</label>
					<label class="icon-del" @click="transh"></label>
				</div>
				<div class="code-btns">
					<label class="code" v-for="(item,index) in historyCode" :key="index" @click="codeSearch">{{item}}</label>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import search from '../../server/search.js';
	import common from '../../plugins/common.js';
	export default {
		data() {
			return {
				tabcurrent: 0,
				tablist: [
					{
						name:"商品",
						index: 0
					},
					{
						name:"品牌",
						index: 1
					},
					{
						name:"企业",
						index: 2
					}
				],
				/* 
				 * value = 1 代表一种类型
				 *假如value=4 没有那个搜索栏
				 */
				queryType: this.$route.query.queryType,
				searchstate: true,
				searchTitle: '',
				params:{
					source:'0',
					userId:'',
					userToken:''
				},
				historyCode:[],
				historyShow:true,//历史搜索
				foryouShow:true,//为你推荐
				foryouCode:'',//为你推荐
				searchCode:""//搜索关键词
			}
		},
		mounted() {
			this.forYourCode();
			this.searchTitle = this.$route.query.searchTitle;
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined
			this.searchHistory();
			
		},
		methods: {
			cancel() {
				this.$router.push({path:'/index'});
			},
			tab(index){
				this.tabcurrent = index;
			},
			transh(){
				this.historyCode = [];
				this.historyShow = false;
			},
			/* 请求搜索数据 */
			targetSearch() {
				if (!this.searchTitle) {
					alert('请输入搜索内容')
					return false
				}
				if(this.queryType=='goods'){
					switch (this.tabcurrent){
						case 0:
							this.$router.push({
								path: '/searchGoods',
								query: {
										searchTitle: this.searchTitle,
										type: this.queryType
										}
								})
							break;
						case 1:
							this.$router.push({
								path: '/searchshop',
								query: {
										searchTitle: this.searchTitle,
										type: 0
										}
								})
							break;
						case 2:
							this.$router.push({
								path: '/searchshop',
								query: {
										searchTitle: this.searchTitle,
										type: 1
										}
								})
							break;	
					}
					
				}
// 				switch (parseInt(this.searchType)){
// 					case 1:
// 						if (this.tabcurrent == 0) {
// 							// 跳转商品搜索结果页面
// 							this.$router.push({
// 								path: '/searchGoods',
// 								query: {
// 									searchTitle: this.searchTitle,
// 									type: this.searchType
// 								}
// 							})
// 						} else if(this.tabcurrent == 1){
// 							this.$router.push({
// 								path: '/searchshop',
// 								query: {
// 									searchTitle: this.searchTitle,
// 									type: 0
// 								}
// 							})
// 						}else if(this.tabcurrent == 2){
// 							this.$router.push({
// 								path: '/searchshopc',
// 								query: {
// 									searchTitle: this.searchTitle,
// 									type: 1
// 								}
// 							})
// 						}
// 						break;
// 					case 2:
// 						alert('我是请求的商城接口')
// 						break;
// 					case 3:
// 						alert('1')
// 						break;	
// 					case 4:
// 					this.searchstate = false
// 					default:
// 						break;
// 				}
				this.setHistory(this.searchTitle);

			},
			codeSearch(e){
				this.searchCode = e.target.innerText;
				this.$router.push({
					path: '/searchGoods',
					query: {
						searchTitle: this.searchCode,
						type: this.queryType
						}
					})
				
			},
			unique(arr){
			　　var arr2 = arr.sort();
			　　var res = [arr2[0]];
			　　for(var i=1;i<arr2.length;i++){
			　　　　if(arr2[i] !== res[res.length-1]){
			　　　　　　res.push(arr2[i]);
			　　　　}
			　　}
			　　return res;
			},
			/*添加历史记录*/
			setHistory(keyword){
				/*历史记录保存5条记录超出则删除最先保存的那条记录*/
				let code = this.historyCode
				console.log(code)
				code.push(keyword);
				this.unique(code);
				console.log(code)
				if(code.length > 5){
					code.shift();
				}
				localStorage.setItem('historyCode',JSON.stringify(code));
 			},
			/* 用户历史搜索 */
			searchHistory(){
				if(this.params.userToken == undefined || this.params.userToken == ''){
					// 没有登录获取本地搜索记录
					let historyCode = localStorage.getItem('historyCode')
					// 判断是否有搜索记录
					if (historyCode) {
						this.historyCode = JSON.parse(historyCode)
					} else {
						this.historyCode = [];
						this.historyShow = false;
					}
				}else{
					search.searchHistory(this.params).then( res =>{
						if(res.data.length > 0){
							this.historyShow = true;
							this.historyCode = res.data;
						}else{
							this.historyShow = false;
						}
					})
				}
			},
			/* 为你推荐 */
			forYourCode(){
				if(common._getCookes('code_token')||common._getCookes('userid')){
					search.forYourCode(this.params).then( res =>{
						console.log(res)
						if(res.data.length > 0){
							this.foryouShow = true;
							this.foryouCode = res.data;
						}else{
							this.foryouShow = false;
						}
					})
				}else{
					this.foryouShow = false;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/css/style.css";

	.all-main-search {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		background-color: #fff;
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

	.search {
		margin: 0rem 1rem 0 .3rem;
		height: .64rem;
		// width: 6.05rem;
		font-size: .22rem;
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
		border: none;
		color: #7f7f7f;
		flex: 2;
	}

	.searchs-content {
		position: relative;
		width: 100%;
		height: .64rem;
		margin:0 0 0 .16rem;
	}

	.search-btn {
		position: absolute;
		right: .3rem;
		font-size: .28rem;
		top: .2rem;
	}

	.search-type {
		display: flex;
		width: 100%;
		height: .6rem;
		align-items: center;
	}

	.search-type li {
		color: #7f7f7f;
		font-size: .28rem;
		line-height: .28rem;
		flex: 1;
	}

	.search-type li label {
		display: inline-block;
		padding: .14rem 0;
	}

	.search-type li.active label {
		color: #feb336;
		border-bottom: .04rem solid #feb336;
	}

	.goods-main {
		margin-top: 1.58rem;
		border-top: .16rem solid #f1f1f1;
	}

	.goods-main-code {
		margin: .24rem .3rem .48rem;
	}

	.g-title {
		display: inline-block;
		float: left;
		text-align: left;
		color: #323232;
		line-height: .28rem;
		margin-bottom: .08rem;
		font-size: .28rem;
	}

	.code-btns {
		text-align: left;
		width: 100%;
		float: left;
		margin-top: .08rem;
	}

	.code {
		display: inline-block;
		padding: .08rem .15rem;
		color: #7f7f7f;
		margin-top: .24rem;
		font-size: .24rem;
		background: #f1f1f1;
		margin-right: .24rem;
		border-radius: .04rem;
	}

	.icon-del {
		display: inline-block;
		width: .19rem;
		height: .23rem;
		float: right;
		background-size: .19rem .23rem;
		background-image: url(../../../static/img/icon-del.png);
		background-repeat: no-repeat;
	}
	}
</style>
