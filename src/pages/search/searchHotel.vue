<template>
	<!-- 搜索 -->
	<div class="hotel-main-search">
		<div class="header">
			<div class="searchs-content">
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" v-model="searchTitle" type="text" placeholder="搜索商品或企业" @keyup.enter="targetSearch" />
				</div>
				<div class="search-btn" @click="cancel">取消</div>
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
				searchTitle: '',
				params: {
					areaCode: '',
// 					userId: '',
// 					userToken: ''
				},
			}
		},
		mounted() {
			this.searchTitle = this.$route.query.searchTitle;
			this.params.areaCode = this.$route.query.areaCode
			this.params.categoryId = this.$route.query.categoryId
// 			this.params.userToken = common._getCookes('code_token') || undefined
// 			this.params.userId = common._getCookes('userid') || undefined

		},
		methods: {
			cancel() {
				this.$router.go(-1)
			},
			/* 请求搜索数据 */
			targetSearch() {
				if (!this.searchTitle) {
					alert('请输入搜索内容')
					return false
				}
				if(this.$route.query.categoryId ==2 || this.$route.query.categoryId ==3){
					this.$router.push({
						path: '/hotelSearchGoods',
						query: {
							searchTitle: this.searchTitle,
							areaCode:this.$route.query.areaCode,
							categoryId:this.$route.query.categoryId,
							}
					})
				}else if(this.$route.query.categoryId ==4){
					this.$router.push({
						path: '/tourSearchGoods',
						query: {
							searchTitle: this.searchTitle,
							areaCode:this.$route.query.areaCode,
							categoryId:this.$route.query.categoryId,
							}
					})
				}else if(this.$route.query.categoryId ==5){
					this.$router.push({
						path: '/filmSearchGoods',
						query: {
							searchTitle: this.searchTitle,
							areaCode:this.$route.query.areaCode,
							categoryId:this.$route.query.categoryId,
							}
					})
				}
				
			},
		
		},
	}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";

	.hotel-main-search {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
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

		.search {
			margin: 0rem .9rem 0 .3rem;
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
			border: none;
			color: #7f7f7f;
			flex: 2;
		}

		.searchs-content {
			position: relative;
			margin-bottom: .16rem;
		}

		.search-btn {
			position: absolute;
			right: .2rem;
			font-size: .28rem;
			top: .2rem;
		}

		.search-type {
			display: flex;
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
