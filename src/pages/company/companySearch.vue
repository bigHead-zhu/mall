<template>
	<div class="c-compay-search" id="compay-search">
		<div class="header">
			<div class="searchs-content">
				<img class="icon-left" src="../../../static/img/icon-left-blod.png"  @click="cancel"/>
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" type="text" placeholder="搜索商品"  readonly="readonly" @click="tosearchC"/>
				</div>
			</div>
		</div>
		<!-- 宝贝类别 -->
		<div class="type-main">
			<div class="comp-type" v-show="showList" v-for="(item,index) in listcode" :key="index">
				<!-- 分类盒子 -->
				<div class="comp-type-box" >
					<div class="comp-type-title c1e">{{item.desc}}
					<img class="icon-right" src="../../../static/img/icon-r-return.png" @click="toList(item.id,1)" />
					</div>
					<div class="type-list clear">
						<div class="type-list-code" v-for="(item,index) in item.merchantCategory" 
						:key="index" @click="toList(item.id,2)">{{item.desc}}</div>
					</div>
				</div>
				
			</div>
			<!--  -->
			<!-- 暂无分类 -->
			<div class="tips-txt" v-show="!showList">暂无分类~</div>
		</div>
		<!--  -->
		<div class="footer-nav">
			<div class="" @click="toAll">全部宝贝</div>
			<div class="active" >宝贝分类 <label class="footer-line"></label></div>
			<div class="" @click="toService()">联系商家 </div>
		</div>
	</div>
</template>

<script>
	import shop from '../../server/shop.js';
	
	export default {
		data(){
			return{
				showList:true,
				listcode:'',
				params:{
					merchantId:""
				}
			}
		},
		mounted() {
			this.params.merchantId = this.$route.query.merchantId;
			this.typeList()
		},
		methods:{
			cancel(){
				this.$router.go(-1)
			},
			//页面跳转
			tosearchC(){
				this.$router.push({
					path:"/searchCom",
					query:{
						merchantId:this.params.merchantId
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
			/*分类关键字列表*/
			typeList(){
				shop.goodsType(this.params).then(res =>{
					if(res.code == 0){
						if(res.data.length>0){
							this.listcode = res.data;
							this.showList = true;
						}else{
							this.showList = false;
						}
					}
					console.log(res)
				})
			},
			// 去列表
			toList(val,index){
				this.$router.push({
					path:"/listType",
					query:{
						merchantId:this.params.merchantId,
						merchCategoryId:val,
						level:index
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/style.css';
	@import '../../../static/css/common.css';
	.c-compay-search{
		  background: #f9f9f9;
		  width: 100%;
		  height: 100vh;
		  overflow: hidden;
	}
	#compay-search{
	
	.header {
		width: 100%;
		height: .88rem;
		position: fixed;
		background: #fff;
		overflow: hidden;
		z-index: 99;
		left: 0;
		top: 0;
	}
	.searchs-content {
		position: relative;
		margin: .1rem 0;
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
	.icon-right{
		width: .16rem;
		height: .28rem;
		float: right;
		vertical-align: middle;
	}
	.type-main{
		margin: 1.28rem .3rem 0;
	}
	.comp-type{
		width: 100%;
		background: #fff;
		min-height: 1.6rem;
		box-shadow: 0px .03rem .06rem 0px rgb(220, 220, 220);
		border-radius: 0.04rem;
		overflow: hidden;
		margin-bottom: .24rem;
	}
	.comp-type-box{
		margin: .35rem .3rem .0rem;
		font-size: .26rem;
		text-align: left;
		overflow: hidden;
	}
	.comp-type-title{
		font-size: 0.3rem;
	}
	.type-list{
		width: 100%;
		min-height:.72rem;
		margin: .3rem 0 .2rem 0;
		
	}
	.type-list .type-list-code{
		width:45.5%;
		height: .72rem;
		padding-left: .22rem;
		line-height: .72rem;
		background-color: #f5f5f5;
		border-radius: .04rem;
		margin-bottom: .1rem;
		float: left;
		color: #7f7f7f;
	}
	.tips-txt{
		color: #7f7f7f;
		font-size: .26rem;
	}
	.type-list .type-list-code:nth-child(2n){
		margin-left:1%;
	}
}
</style>
