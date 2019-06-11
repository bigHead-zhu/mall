<template>
	<div class="message-main">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>消息</label>
			<div class="delTips" @click="_setMarkConfirm('清空消息','是否清空所有消息？')">清空消息</div>
		</div>
		<!-- 消息列表 -->
		<div class="message-list" v-show="showList">
			<!-- 精选活动 -->
			<div class="list-main" v-for="(item,index) in newslist" :key="index">
				<img class="list-icon" v-lazy="item.headIcon" />
				<div class="list-main-cotent">
					<div class="list-title-top">
						<label class="list-title tl c1e">{{item.title}}</label>
						<div class="list-title-time tr f24">{{item.date}}</div>
					</div>
					<div class="list-title-des">{{item.content}}</div>
				</div>
			</div>
			
		</div>
		<!-- 暂无消息 -->
		<div class="message-list f24" v-show="!showList">
			<!-- <div class="">你还没有收到消息~</div> -->
		</div>
		
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
			:title="msgtitle"
		  :content="msgContent"
		  @confirm ="delmsg()"
		  type="confirm"
		  timer="2000"/>
	</div>
</template>

<script>
	import common from '../../plugins/common.js';
	import shop from '../../server/shop.js';
	import message from '../../components/message.vue';
	import scrollto from '../../components/scrollto.vue';
	
	export default{
		components:{
			scrollto,
			message
		},
		data(){
			return{
				sendVal: '',
				msgtitle:'',
				msgContent: '',//弹窗
				params:{
					userId:'',
					fromNum:1,
					pageSize:10,
					userToken:"",
					source:0
				},
				delparams:{
					source:0,
					dis:1,
					userToken:'',
					userId:'',
					messageId:''
				},
				showList:true,
				newslist:'',
			}
		},
		mounted() {
			this.params.userToken = common._getCookes('code_token') || undefined
			this.params.userId = common._getCookes('userid') || undefined;
			this.delparams.userToken = common._getCookes('code_token') || undefined
			this.delparams.userId = common._getCookes('userid') || undefined;
			this.getList();
		},
		methods:{
			cancel(){
				this.$router.go(-1)
			},
			getList(){
				// 获取消息
				shop.newsList(this.params).then(res =>{
					console.log(res)
					if(res.code == 0){
							this.showList = true;
							this.newslist = res.data;
						}else{
							this.showList = false;
						}
				})
			},
			delmsg(ids,title,content){
				this.delMessage(ids)
				let that = this;
            that.sendVal1 = false;   
            switch (that.ctype) {
                case 0:
                    that._setLooked(that.id);
                    break;
                case 1:
                    that._delMsg(that.id)
                    break;
                case 2:
                    that._setLooked();
                    break;    
                default:
                    break;
            }
			},
			delMessage(){
				//清空

				shop.newsDel(this.delparams).then(res =>{
					console.log(res)
				})
				this.getList();
			},
			 //删除弹窗
			_setMarkConfirm(ids,title,contnet){
				let that = this;
				// that.id = that.commentList[ids].id;
				that.msgtitle = title;
				that.sendVal1 = true;
				that.msgContent = contnet;
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

<style lang="scss">
	@import '../../../static/css/common.css';
	@import '../../../static/css/style.css';
	.message-main{
		width: 100%;
		height: 100vh;
		overflow:auto;
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content:center;
			align-items: center;
			background: #fff;
			z-index:999;
			position: relative;			
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin:0 0 0 .3rem;
		}
		.header label{
			position: absolute;
			display: inline-block;
			font-weight:bold;
		}
		.delTips{
			width: 1.2rem;
			color: #7f7f7f;
			font-size: .28rem;
			margin-right: .3rem;
		}
		// 消息列表
		.message-list{
			width: 100%;
			height: auto;
			background: #fff;
			border-top: .16rem solid #f1f1f1;
		}
		.list-main{
			width: 100%;
			display: flex;
			align-items: center;
			align-content: center;
			height: 1.58rem;			
			text-align: left;
		}
		.list-icon{
			width: 1rem;
			height: 1rem;
			margin:0 0 0 .3rem;
			display: inline-block;
			border-radius: 50%;
		}
		.list-main-cotent{
			width: 5.88rem;
			height:100%;
			text-align: left;
			margin: 0 0 0 .32rem;
			border-bottom: .01rem solid #f2f2f2;
		}
		.list-title-top{
			width: 100%;
			line-height: .32rem;
			margin-top: .445rem;
			display: flex;
			justify-content: space-between;
		}
		.list-title{
			font-size: .32rem;
			display: inline-block;
			margin: 0;
		}
		.list-title-time{
			color: #9c9b9b;
			margin: 0 .32rem 0 0;
		}
		.list-title-des{
			color: #9c9b9b;
			margin: .2rem 0 0;
			width: 5.52rem;
			font-size: .26rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
