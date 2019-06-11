<template>
		<div class="footer">
			<ul>
				<li 
					v-for="(item,index) in dataList"
					:key="index"
					:class="linkindex==index ?'person':''">
					<label class="icon-footer" :class="item.icon"></label>
					<p>{{item.name}}</p>
				</li>
			</ul>
		</div>
			
</template>

<script>
	export default{
		data(){
			return {
				dataList: [
					{
						name: '首页',
						link: '/index',
						icon: 'icon-shop'
					},
					{
						name: '入驻',
						link: '/none',
						icon: 'icon-shop'
					},
					{
						name: '分享',
						link: '/share',
						icon: 'icon-share'
					},
					{
						name: '购物篮',
						link: '/none',
						icon: 'icon-car'
					},
					{
						name: '我的',
						link: '/my',
						icon: 'icon-my'
					},
				],
				linkindex: undefined
			}
		},
		mounted() {
			this.sltIndex()
		},
		methods:{
			sltIndex() {
				let url = this.$route.name
				if (url.indexOf('index') >= 0) {
					this.linkindex = 0
				}
				if (url.indexOf('car') >= 0) {
					this.linkindex = 1
				}
				if (url.indexOf('share') >= 0) {
					this.linkindex = 2
				}
				if (url.indexOf('car') >= 0) {
					this.linkindex = 3
				}
				if (url.indexOf('my') >= 0) {
					this.linkindex = 4
				}
			},
			
		},
	}
</script>

<style lang="scss" scoped="scoped">
	/* */
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1rem;
		font-size: .24rem;
		background: #fff;
		border-top: 1px solid #f1f1f1;
		// box-shadow: 2px 3px 5px #0c0c0c;
		z-index: 99;
	}
	
	.footer ul {
	  display: flex;
	  width: 100%;
	  height: 100%;
	  align-items: center;
	  justify-content: center; }
	
	.footer ul li {
	  flex: 1;
	  color: #c4c4c4; }
	
	.footer ul li p {
	  margin-top: .13rem; }
	
	.footer ul li.person {
	  color: #feb336; }
	
	.icon-footer {
	  width: .34rem;
	  height: .34rem;
	  display: block;
	  background-size: .34rem .34rem;
	  background-repeat: no-repeat; }
	
	.icon-home {
	  background-image: url("../../static/img/icon-home.png"); }
	
	.footer ul li.person .icon-home {
	  background-image: url("../../static/img/icon-home-active.png"); }
	
	.icon-shop {
	  background-image: url("../../static/img/icon-shop.png"); }
	
	.footer ul li.person .icon-shop{
	  background-image: url("../../static/img/icon-shop-active.png"); }
	
	.icon-share {
	  background-image: url("../../static/img/icon-share.png"); }
	
	.footer ul li.person .icon-share{
	  background-image: url("../../static/img/icon-share-active.png"); }
	
	.icon-car {
	  background-image: url("../../static/img/icon-car.png"); }
	
	.footer ul li.person  .icon-car{
	  background-image: url("../../static/img/icon-car-active.png"); }
	
	.icon-my {
	  background-image: url("../../static/img/icon-my.png"); }
	
	.footer ul li.person .icon-my{
	  background-image: url("../../static/img/icon-my-active.png"); }
	.banner-box img{
				width: 100%;
				height: 100%;
			}
</style>
