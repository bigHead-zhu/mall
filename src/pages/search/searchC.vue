<template>
	<!-- 搜索 -->
	<div class="com-main-search">
		<div class="header">
			<div class="searchs-content">
				<div class="search">
					<img class="icon-search" src="../../../static/img/icon-search.png" />
					<input class="search-input" v-model="searchTitle" type="text" placeholder="搜索商品" @keyup.enter="targetSearch" />
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
				searchTitle:''
			}
		},
	
		methods: {
			cancel() {
				this.$router.go(-1);
			},
			// 搜索数据
			targetSearch(){
				this.$router.push({
					path: '/comGoods',
					query: {
						searchTitle: this.searchTitle,
						merchantId:this.$route.query.merchantId
						}
				})
			}
		},
	}
</script>

<style lang="scss"  scoped="scoped">
	@import "../../../static/css/style.css";
	@import "../../../static/css/style.css";

	.com-main-search {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		background-color: #F9F9F9;

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
		font-size: .28rem;
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
	}

</style>
