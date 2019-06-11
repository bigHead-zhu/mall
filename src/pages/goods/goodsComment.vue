<template>
	<div class="good-comment-main" >
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">商品评价</label>
		</div>
		<div class="comment-code">
			<label v-for="(item,index) in commentCode" :key='index' :class="[index==commentIndex?'active':'']" @click="chooseComment(index)">{{item}}</label>
		</div>
		<div class="comment-des">
			<scrollto :datalist="commentList" @scrollend="nextList">
				<div class="user-comonet" v-for="(item,index) in commentList" :key="index">
					<div class="user">
						<img class="user-img" v-lazy="item.headIcon" />
						<div class="user-text">{{item.nickName}}</div>
						<div class="user-card">{{item.userLevel}}</div>
					</div>
					<div class="user-comment-des">
						<div class="user-comment-des-text">
							{{item.content}}
						</div>
						<div class="user-comment-des-img">
							<img v-for="(item,index) in item.img" :key="index" v-lazy = "item"/>
						</div>
						<div class="goods-type">
							<div class="tl">{{item.specName}}</div>
							<div class="tr">{{item.time}}</div>
						</div>
					</div>
				</div>
				
				<div 
				  class="loadingmore">
				  <img 
					v-if="loadingstate"
					src="../../../static/img/img_list_loading.gif">
				  {{ loadingtext }}
				</div>
			</scrollto>
			
			
		</div>
	</div>
</template>

<script>
	import goodsDetail from '../../server/goods.js';
	import scrollto from '../../components/scrollto.vue';
	export default{
		components:{
			scrollto
		},
		data() {
			return {
				commentCode:['全部','有图','好评','中评','差评'],
				commentIndex:0,
				params:{
					goodsId:'',
					type:0,
					fromNum:1,
					pageSize:10
				},
				commentList:"",
				notxt:false,
				pagecount:'',//页码
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},mounted() {
			this.params.goodsId = this.$route.query.goodsId;
			this.listData();
		},
		methods: {
			cancel(){
				this.$router.go(-1);
			},
			chooseComment(index) {
				this.commentIndex =index;
				this.params.type = index;
				this.clearList();
				this.listData();
			},
			// 列表数据
			listData(){
				goodsDetail.goodsCommentList(this.params).then(res =>{
					console.log(res)
					let code = res.code;
					if(code==0){
						if(res.data.count > 0){
							this.notxt = false;
							this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
							this.commentList = res.data.goodsCommendVo;
							if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
							  this.loadingstate = false
							  this.loadingtext = ''
							}
						}else{
							this.loadingstate = false
							this.loadingtext = '暂无评论~'
							this.showGoods = false
						}
					}else{
						console.log(res.message);
					}
				})
			},
			clearList() {
				this.params.fromNum = 1;
				this.commentList.length = 0
			},
			/* 下一页 */
			nextList() {
			  if (this.params.fromNum < this.pagecount) {
				++this.params.fromNum
				this.loadingstate = true
				this.loadingtext = '正在加载'
				this.listData()
			  }
			},
		},
	}
</script>

<style lang="scss">
	@import '../../../static/css/style.css';
.good-comment-main{
			width: 100%;
			height:auto;
		
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content: center;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #e6e6e6;
			position: fixed;
			top: 0;
			left: 0;
			z-index:999;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.header-title{
			margin: 0;
			flex: 1;
			display: inline-block;
		}
		.comment-code{
			display: flex;
			width: 100%;
			height: 1.02rem;
			margin-top: .9rem;
			flex-wrap: wrap;
			align-items: center;
			border-bottom: .16rem solid #f1f1f1;
		}
		.comment-code label{
			height: .4rem;
			line-height: .4rem;
			border-radius: .2rem;
			background: #f5f5f5;
			font-size: .24rem;
			color: #7f7f7f;
			margin-left: .3rem;
			display: inline-block;
			padding:0rem .24rem;
			background: #f5f5f5;
			margin: 0.28rem 0rem .24rem 0.3rem;
		}
		.comment-code label.active{
			border: 1px solid #febf38;
			color: #febf38;
			background: #fff9ec;
		}
		.comment-des{
			
		}
		.user-comonet{
			padding: 0 .3rem;
			margin: .24rem 0 .34rem 0;
		}
		.user{
			display: flex;
			align-items: center;
		}
		.user-img{
			display: inline-block;
			width: .48rem;
			height: .48rem;
			margin: 0;
			border-radius: 50%;
		}
		.user-text{
			font-size: .28rem;
			color: #1e1e1e;
			margin:0 0 0 .15rem;
		}
		.user-card{
			font-size: .18rem;
			padding: .06rem 0.16rem;
			color: #cfba89;
			background-image: linear-gradient(90deg,#252525 0%,#505050 100%),linear-gradient(#e7e7e7,#e7e7e7);
			background-blend-mode: normal,normal;
			border-radius:.25rem;
			margin-left: .22rem;
		}
		.user-comment-des{
			margin:.15rem 0 0 .62rem;
			text-align: left;
		}
		.user-comment-des-text{
			font-size: .26rem;
			color: #1e1e1e;
		}
		.user-comment-des-img{
			margin-top: .32rem;
			display: flex;
			justify-content: space-between
		}
		.user-comment-des-img img{
			width: 2rem;
			height: 2rem;
			margin: 0;
			border-radius: 0.05rem;
		}
		
		.goods-type{
			display: flex;
			margin-top: .24rem;
			font-size: .24rem;
			color: #7f7f7f;
		}
		.goods-type .tl{
			text-align: left;
			flex: 2;
		}
		.goods-type .tr{
			text-align: right;
			flex: 1;

		}
	}
</style>
