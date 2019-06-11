<template>
	<div class="share-there">
		<div class="header-share">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label class="header-title">{{title}}</label>
		</div>
		<div class="article-body">
			<div class="invite" :class="bgName" v-if="type==0 || type ==1" >
				<div class="invite-btn b180" >
					<input type="button"  @click="closeProps" class="btn-primary " value="生成我的邀请链接" />
					<div class="invite-txt">《邀请说明》</div>
				</div>
			</div>
			<div class="redpackte" v-if="type==2" >
				<div class="invite-btn b60" >
					<input type="button"  @click="closeProps" class="btn-primary " value="生成我的邀请链接" />
					<div class="invite-txt cffb">《邀请说明》</div>
				</div>
			</div>
			<div class="download" v-if="type==3">
				<img class="icon-download" src="../../assets/share/icon-download.png" />
				<label class="dowload-btn cffb">分享应用</label>
			</div>
			
			<div class="mask" v-show="mainMask"></div>
			<!-- 分享链接 -->
			<!-- <div class="props" v-show="linkProps">
				<div class="close">
					<img class="icon-close" @click="closeProps" src="../../../static/img/icon-close.png" />
				</div>
				<h4>您的分享链接</h4>
				<div class="link-txt">
					 <label class="link-title">链接</label>
					<label class="link-target" >
						<input id="copyid" type="text" value="http://47.107.124.31:8001"  readonly="readonly" />
					</label>
				</div>
				<input type="button" class="copy-btn" value="复制并分享" @click="Copy()" />
			</div> -->
			<div class="share-props" v-show="linkProps">
				<div class="share-title">
					分享到：
				</div>
				<ul class="share-ul">
					<li class="share-icon">
						<img  src="../../assets/share/share-weixin.png" />
						<p>微信好友</p>
					</li>
					<li class="">
						<img src="../../assets/share/share-qq.png" />
						<p>QQ</p>
					</li>
					<li class="">
						<img src="../../assets/share/share-weibo.png" />
						<p>微博</p>
					</li>
				</ul>
				<input class="cancel-btn" type="button" value="取消" @click="closeProps"/>
			</div>
		
		</div>
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
		  <!-- 分享 -->
		  <share :show="show" :config="config" @chose="show = false" />
		  <!-- <div class="datasetconfig" data-title="分享标题" data-sites="weibo,weixin,tqq,qzone"></div> -->
	</div>
</template>

<script>
	import message from '../../components/message.vue';
	import share from '../../components/share.vue';
	
	export default{
		components:{
			message,
			// share
		},
		data(){
			return{
				type:'',//好友or商家
				title:'',
				bgName:'',//背景图
				mainMask:false,//蒙版
				linkProps:false,
				sendVal: '',
				msgContent: '',
				show:false,
				config:{
					title:'邀请',
					url:window.location.href,
					desc:'好友享好礼',
					logo:'http://47.107.124.31/images/goods/njr1.jpg',
					sign:'邀请'
				},
				 
			}
		},
		mounted(){
			this.type = this.$route.query.type;
			this.getName();
		},
		methods:{
			cancel(){
				this.$router.go(-1);
			},
			// 复制
			copy(){
			  let url = window.location.href;
			},
			// 关闭分享弹窗
			closeProps(){
// 				 soshm.popIn({
// 				  title: '弹窗分享',
// 				  sites: ['weixin', 'weibo',  'qzone', 'qq']
// 				});
				this.linkProps = !this.linkProps
				this.Props();
			},
			Props(){
				this.mainMask = !this.mainMask;
				if (this.mainMask) {
				  document.body.style.overflow = 'hidden'
				} else {
				  document.body.style.overflow = 'initial'
				}
			},
			// 
			getName(){
				if(this.type == 0){
					this.title = "邀请好友"
					this.bgName = "friends"
				}else if(this.type == 1){
					this.title= "邀请商家"
					this.bgName = "shop"
				}else if(this.type==2){
					this.title= "我的红包码"
				}else if(this.type==3){
					this.title= "应用下载"
				}
			},
			// 弹窗
			_setMsgBox(content = '', timer = 2000, callback) {
			  let that = this
			  that.sendVal = true
			  that.msgContent = content
			  setTimeout( () => {
				that.sendVal = false
				if (callback) {
				  callback()
				}
			  }, timer)
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.share-there{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		/* 部分头部 */
		.header-share {
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content: center;
			align-items: center;
			background: #fff;
			font-family: 'pf-Bold';
			border-bottom: 1px solid #f5f5f5;
		}
		.icon-left {
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin: 0 0 0 .3rem;
		}
		.header-title{
			flex: 1;
		}
		.article-body{
			position: relative;
			overflow: hidden;
			height: 95vh;
			.mask{
				position: fixed;
				width: 100%;
				height: 100vh;
				left: 0;
				top: 0;
				background: rgba($color: #000000, $alpha: .5);
				z-index:15;
			}
			.props{
				position: absolute;
				width: 6rem;
				height: 4.56rem;
				background: #fff;
				left: 50%;
				top: 50%;
				padding: 0 .3rem;
				border-radius: .04rem;
				margin: -2.28rem 0 0 -3rem;
				z-index: 25;
				h4{
					font-size: .3rem;
					line-height: .32rem;
					color: #1e1e1e;
					margin-bottom:.52rem;
					font-family: 'pf-Bold';
				}
				label{
					display: block;
				}
			}
			.link-txt{
				position: relative;
				text-align: center;
				min-height: 1.2rem;
				border: 1px solid #aaa;
			}
			.link-title{
				color: #aaa;
				font-size: .24rem;
				background: #fff;
				width: 1rem;
				margin-top: -.18rem;
			}
			.link-target{
				color: #1e1e1e;
				width: 100%;
				height: auto;
				text-align: center;
				font-size: .24rem;
				margin-top: .24rem;
				font-family: 'pf-Bold';
				input{
					background: transparent;
					border: none;
				}
			}
			.copy-btn{
				height:.6rem;
				width: 100%;
				color: #fff;
				margin-top: .8rem;
				background-color: #030303;
				border-radius:0.08rem;
			}
			.close{
				text-align: right;
				line-height: .32rem;
				margin-top: .1rem;
				.icon-close{
					width: .32rem;
					height: .32rem;
				}
			}
		}
		// 
		.invite{
			width: 100%;
			height: 100vh;
			background-size:100% 100%;
		}
		.redpackte{
			width: 100%;
			height: 100vh;
			background-image: url('../../assets/share/bg-redcode.png');
			background-repeat: no-repeat;
			background-size: 100% 76vh;
		}
		.invite-btn{
			position: absolute;
			left: 0;
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			color: #fff;
			input{
				width: 6.4rem;
				font-size: .3rem;
				height:0.8rem;
				border: none;
				color: #fff;
				background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
				background-blend-mode: normal,normal;
				border-radius:0.4rem;
			}
			.invite-txt{
				width: 100%;
				font-size: .24rem;
				margin-top: .16rem;
			}
		}
		.b180{
			bottom: 1.8rem;
		}
		.b60{
			bottom: .6rem;
		}
		.friends{
			background-image: url('../../assets/share/bg-ifriends.png');
		}
		.shop{
			background-image: url('../../assets/share/bg-ishop.png');
		}
		.cffb{
			color: #ffba30;
		}
		.download{
			border-top: .16rem solid #f5f5f5; 
			height: 100vh;
			text-align: center;
			background: #fff;
		}
		.icon-download{
			width: 2.84rem;
			height: 2.58rem;
			margin: 1.4rem auto 1.1rem;
			background-image: url('../../assets/share/icon-download.png');
		}
		.dowload-btn{
			width: 1.8rem;
			height: .6rem;
			line-height: .6rem;
			display: block;
			font-size: .28rem;
			border-radius: .3rem;
			border: solid 1px #ffba30;
		}
		.share-props{
			width: 100%;
			background: #f1f1f1;
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 45;
			.share-title{
				font-size: .26rem;
				text-align: left;
				margin: .32rem 0 0 .42rem;
				color: #aaa;
			}
			.share-ul{
				height: 1.7rem;
				overflow: hidden;
				font-size: .26rem;
				color: #1e1e1e;
				display: flex;
				list-style: none;
				margin: .3rem 0 .2rem  .4rem;
				li{
					width: 1.12rem;
					margin:0 .66rem 0 0;
					img{
						width: 1.12rem;
						height: 1.12rem;
						margin-bottom: .16rem;
					}
				}
			}             
			.cancel-btn{
				width: 100%;
				height: 1.08rem;
				background: #fff;
				border: none;
				outline: none;
				text-align: center;
			}
		}
	}
</style>
