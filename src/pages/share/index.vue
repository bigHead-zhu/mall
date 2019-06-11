
<template>
	<div class="share-main">
		<div class="header">
			分享
		</div>
		<ul class="share-ul">
			<li :class="item.class" v-for="(item,index) in sharelist" 
			:key="index" @click="sharelink(item.link,index)">
				<div class="txt">
					<p class="txt-title c1e">{{item.title}}</p>
					<p class="txt-en">{{item.english}}</p>
				</div>
			</li>
		</ul>
		<!--  -->
		<foot></foot>
	</div>
</template>

<script>
	import foot from '../../components/footer.vue';
	
	export default{
		components:{
			foot
		},
		data(){
			return{
				sharelist:[
					{
						class:'bg-friends',
						title:'邀请好友',
						english:'Invite friends',
						link:'/shareInvite'
					},
					{
						class:'bg-business',
						title:'邀请商家',
						english:'Invite businessmen',
						link:'/shareInvite'

					},
					{
						class:'bg-red',
						title:'我的红包码',
						english:'Red packet',
						link:'/shareInvite'

					},
					{
						class:'bg-download',
						title:'应用下载',
						english:'App download',
						link:'/shareInvite'

					},
				]
			}
		},
		methods:{
			sharelink(link,index) {
				this.$router.push({
					path:link,
					query:{
						type :index
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import "../../../static/css/style.css";
	@import "../../../static/css/header.css";
	.share-main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		background-color: #f1f1f1;
		.share-ul{
			margin: 1.5rem .3rem 0;
			display: flex;
			flex-wrap: wrap;
			li{
				width: 3.36rem;
				height: 2.40rem;
				font-size: .2rem;
				margin-bottom: .3rem;
				border-radius: 0.08rem;
				background-size: 100% 100%; 

			}
			li:nth-child(2n-1){
				margin-right: .16rem;
			}
			.txt{
				text-align: left;
				margin: .92rem  0rem 0 1.5rem;
				.txt-title{
					font-size: .3rem;
					font-family: 'pf-Bold';
				}
				.txt-en{
					font-size: .2rem;
					font-family: 'pf-Regular';
					color: #aaa
				}
			}
			.bg-friends{
				background-image: url('../../assets/share/bg-friends.png');
			}
			.bg-business{
				background-image: url('../../assets/share/bg-business.png');
			}
			.bg-download{
				background-image: url('../../assets/share/bg-download.png');
			}
			.bg-red{
				background-image: url('../../assets/share/bg-red.png');
			}
		}
	}
	
</style>
