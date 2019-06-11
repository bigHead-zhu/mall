<template>
	<div class="share-mask" v-show="show">
		<div class="mask"></div>
		<div class="share-props"  ref = "msg"  @click.stop="invitationBtnNO">
			<div class="share-title">
				分享到：
			</div>
			<ul class="share-ul">
				<li class="share-icon" @click="_setCall('wechatFriend')">
					<img  src="../assets/share/share-weixin.png" />
					<p >微信好友</p>  
				</li>
				<li class="-mob-share-qq" @click="_setCall('qqFriend')">
					<img src="../assets/share/share-qq.png" />
					<p>QQ</p>
				</li>
				
			</ul>
			<input class="cancel-btn" type="button" value="取消" @click="invitationBtnNO"/>
		</div>
	</div>
	
</template>

<script>
	import NativeShare from 'nativeshare';
	import share from '../server/share.js';
	
	export default {
	  props: {
		config: {
		  type: Object,
		  default: () => {}
		},
		show :{
			type:Boolean,
			default:false
		}
	  },
	  data() {
		return {
			params:{
				url:''
			},
			NativeShare: {}
		};
	  },
	  mounted() {
		this.NativeShare = new NativeShare({
		  syncDescToTag: false,
		  syncIconToTag: false,
		  syncTitleToTag: false
		});
		this._getConfig();
	  },
	  methods: {
		   // // 取消邀请
		  invitationBtnNO(){
		  	this.$emit("chose");
		  },
		/* 获取配置 */
		_getConfig() {
		  /* 接口请求的的配置就可以这个里面自己定义写了 */
		  console.log(window.location.href)
		  this.params.url = window.location.href;
		  share.share(this.params)
		  .then( res =>{
			  console.log(res)
			  if(res.code == 0 ){
				  let data = res.data;
				   this.NativeShare.setConfig({
						wechatConfig: {
						  appId: data.appId,
						  timestamp:data.timestamp,
						  nonceStr: data.noncestr, 
						  signature: data.signature,
						}		
				  });
			  }else{
                    console.log(res.message)
              }
			 
		  })
		  
		},
		/* 设置分享文案 */
		setShareData(config) {
		  /* config  */
		  this.NativeShare.setShareData({
			icon: config.logo,
			link: config.url,
			title: config.title,
			desc: config.desc,
			from: "@fa-ge"
		  });
		},
		/* 调起分享 */
		_setCall(type) {
		  /* 
		  default 默认，调用起底部的分享组件，当其他命令不支持的时候也会调用该命令
		  wechatTimeline 分享到朋友圈
		  wechatFriend 分享给微信好友
		  qqFriend 分享给QQ好友
		  qZone 分享到QQ空间
		  weibo 分享到微博 
		 */
		  try {
			this.NativeShare.call(type);
			// 如果是分享到微信则需要 nativeShare.call('wechatFriend')
			// 类似的命令下面有介绍
		  } catch (err) {
			// 如果不支持，你可以在这里做降级处理
		  }
		}
	  }
};
</script>

<style lang="scss" scoped="scoped">
	.share-mask{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		.mask{
			width: 100%;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba($color: #000000, $alpha: 0.4);
			z-index: 35;
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
