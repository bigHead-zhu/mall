<template>
	<div class="content" id="forget">
		<div class="w-title mt45 c1e f26 tleft ml32 flexC" @click="goback">
			<img src="../../static/img/icon-left.png"/><span>返回</span>
		</div>
		<div class="bg-car"></div>
		<!--  -->
		<div class="title">
			<h1 class="f48">忘记密码</h1>
			<h4 class="f24 mt10">Forgot Password</h4>
		</div>
		<!-- 手机号 -->
		<form class="form-login">
			<div 
				v-if="nextsate"
				class="form-input">
				<label class="form-label f24">手机号码</label>
				<input class="f26 c1e" v-model="phoneNum" type="tel" placeholder="请输入11位手机号" />
			</div>
			<div 
				v-if="nextsate"
				class="form-input mt48">
				<label class="form-label f24">验证码</label>
				<input class="f26 c1e" v-model="phoneCode" type="tel" placeholder="请输入验证码" />
				<span class="form-link f24" @click="getAuthCode" >{{verificationValue}}</span>
			</div>
			<!-- 密码输入 -->
			<div 
				v-if="!nextsate"
				class="form-input mt48">
				<label class="form-label f24">密码设置</label>
				<input class="f26 c1e" type="password" v-model="password" placeholder="输入六位数以上密码" />
			</div>
			<div
				v-if="!nextsate"
				class="form-input mt48">
				<label class="form-label f24">密码确认</label>
				<input class="f26 c1e" type="password" v-model="againpwd" placeholder="输入六位数以上密码" />
			</div>
			
			<input
				v-if="nextsate"
				type="button" class="btn-login" value="下一步" @click="next"/>
			
			<input 
				v-if="!nextsate"
			type="button" class="btn-login" value="确定" @click="forgetPassword"/>
		</form>
		<!-- 弹窗 -->
		<message
			v-model="sendVal"
		  :content="msgContent"
		  type="message"
		  timer="2000"/>
	</div>
</template>

<script>
	import Regist from '../server/regist.js';
	import logIn from '../server/login.js';
	import message from '../components/message.vue';
	export default {
		components:{
			message
		},
		data() {
			return {
				sendCodeStatus:false,//防止二次点击
				verificationValue: "获取验证码",//
				phoneNum:'',
				phoneCode:'',
				password:'',
				againpwd:'',
				msgContent:'',//弹窗内容
				sendVal:'',//状态
				nextsate: true,//下一步
			}
		},methods:{
			/* 第一步 */
			next() {
				if (!this.phoneNum) {
					this._setMsgBox('请输入手机号')
					return false
				}
				if (!this.phoneCode) {
					this._setMsgBox('请输入验证码')
					return false
				}
				this.nextsate = false
			},
			
			/*--获取验证码----*/
			getAuthCode() {
				let that = this;
				let timer = null;
				let sencods = 60;//验证码间隔时长
				let params = {
					phone: that.phoneNum,
					validateType: '1',
					source:'web'
				 }
				if (that.sendCodeStatus) {
					return false
				}
				that.sendCodeStatus = true;
				let phoneReg = /0?(13|14|15|17|18|19)[0-9]{9}/
				  if (!phoneReg.test(that.phoneNum)) {
					that._setMsgBox('请输入正确的手机号码')
					return false
				}
				logIn.getCode(params).then(res => {
					let code = res.code;
					console.log(res)
					// let accessToken = res.data.accessToken
					if (code == 0) {
					  timer = setInterval(function() {
						if (sencods <= 0) {
						  clearInterval(timer)
						  timer = null
						  that.verificationValue = '重新发送'
						} else {
						  that.verificationValue = sencods + '秒后重发'
						  sencods--
						}
					  }, 1000)
					  // common._setCookie('code_token', accessToken)
					} else {
					  that._setMsgBox(res.data.message)
					}
				});
			}, 
			//修改密码
			forgetPassword(){
				let params = {
					userPhone:this.phoneNum,
					source:'web',
					validateCode:this.phoneCode,
					password:this.password,
					surePwd:this.againpwd
				}
				/*判断密码*/
				if(this.password != this.againpwd || !this.password || !this.againpwd){
					this._setMsgBox('两次密码不一致且密码不能为空！')
					return false
				}
				if(this.password.length < 6 || this.password.length > 18 ){
					this._setMsgBox('密码长度应为6-18位')
					return false
				}
				Regist.forgetPwd(params).then(res => {
					console.log(res)
					let code = res.code;
					if(code==0){
						this._setMsgBox('修改成功,马上登陆！');
						this.$router.push('/');
					}else{
						this.message;
					}
				})
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
			/*--返回--*/
			goback(){
				this.$router.go(-1)
			},
			
		}
		
	}
	
</script>
<style lang="scss"  scoped>
	@import '../../static/css/style.css';
	#forget {
		font-family: 'pf-Medium';
		.content {
			width: 100%;
			height: 100vh;
			overflow: hidden;
			position: relative;
			background-color: transparent;
		}
		.flexC{
			display:-webkit-box;
			align-items: center;
			z-index: 2;
			position: relative;
			justify-content: flex-start;
		}
		.w-title{
			height: .45rem;
		}
		.w-title img{
			width: .24rem;
			height: .24rem;
		}
		.caaa{
			color: #aaa;
		}
		.bg-car {
			position: absolute;
			width: 2.94rem;
			height: 3.25rem;
			top: -0.325rem;
			left: -0.25rem;
			background: url(../../static/img/bg-car.png) no-repeat;
			background-size: 100%;
			z-index: 0;
		}
		
		.title {
			text-align: center;
			margin-top: 0.8rem;
			font-family:'pf-Bold';
			color: #1e1e1e;
		}
		.form-login {
			height: auto;
			margin: 1.46rem 0.55rem 0;
		}
		.form-input {
			position: relative;
			width: 100%;
			height: 0.8rem;
			border-radius: 0.4rem;
			border: 1px solid #babac2;
		}
		.form-label {
			position: absolute;
			color: #aaa;
			left: 0.5rem;
			top: -0.12rem;
			background: #fff;
			font-family:'pf-Regular';
			padding: 0 0.1rem;
		}
		.form-input input {
			position: absolute;
			left: 0.5rem;
			top: 0.25rem;
			width: 60%;
			padding: 0 0.1rem;
		}
		.form-link {
			position: absolute;
			right: 0.5rem;
			top: 0.3rem;
			color: #aaa;
			background: #fff;
		}
		.btn-login{
			width:100%;
			color:#fff;
			font-size: 0.3rem;
			height: 0.8rem;
			margin-top: 1.2rem;
			background-image: linear-gradient(187deg,#feca3a 0%,#feb336 100%),linear-gradient(#ffba30,#ffba30);
			background-blend-mode: normal,normal;
			box-shadow: 0 0.09rem 0.17rem 0.01rem rgba(254, 166, 19, 0.2);
			border-radius: 0.4rem;
		}
	}
</style>
