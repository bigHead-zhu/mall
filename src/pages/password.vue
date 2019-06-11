<template>
	<div class="content" id="password">
		<div class="w-title c1e mt45 f26 tleft ml32 flexC" @click="goback()">
			<img src="../../static/img/icon-left.png"/><span>返回</span>
		</div>
		<div class="bg-car"></div>
		<!--  -->
		<div class="title">
			<h1 class="f48">注册</h1>
			<h4 class="f24 mt10">Sign Up</h4>
		</div>
		<form class="form-login">
			<div class="form-input">
				<label class="form-label f24">密码设置</label>
				<input class="f26 c1e" type="password" placeholder="输入八位数以上密码" />
			</div>
			<div class="form-input mt48">
				<label class="form-label f24">密码确认</label>
				<input class="f26 c1e" type="password" placeholder="输入八位数以上密码"/>
				<span class="form-link f24" @click="getAuthCode" >{{verificationValue}}</span>
			</div>
			<input type="button" class="btn-login" value="立即注册"/>
			<div class="text-link f24 caaa mt26">点击立即登录按钮则表示您已阅读且同意<router-link class="cffb" to="/shopText">《商城协议》</router-link></div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				Tinput:true,
				verificationValue: "获取验证码",
				CodeState: true
			};
		},methods:{
			getAuthCode: function() {
				this.CodeState = false;
				this.verificationValue = 60;
				var vfValue = setInterval(() => {
					this.verificationValue--;
					if (this.verificationValue <= 0) {
						this.CodeState = true;
						this.verificationValue = '重新发送';
						clearInterval(vfValue);
					}
				}, 1000);
			}, /*,--获取验证码----*/
			goback(){
				console.log(this.$router)
				this.$router.go(-1)
			},/*--返回--*/
		}
		
	}
	
</script>
<style lang="scss" scoped="scoped">
	@import '../../static/css/style.css';
	
	#password {
	.content {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		background-color: transparent;
	}
	.flexC{
		display: -webkit-box;
		align-items: center;
		z-index: 2;
		position: relative;
		justify-content: flex-start;
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
	}
	.w-title img{
		width: 0.24rem;
		height: 0.24rem;
	}
	.title {
		text-align: center;
		margin-top: 1.06rem;
		font-family:'pf-Blod';
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
		border: 0.01rem solid #babac2;
	}
	.form-label {
		position: absolute;
		color: #aaa;
		left: 0.5rem;
		top: -0.12rem;
		background: #fff;
		padding: 0 0.1rem;
	}
	.form-input input {
		position: absolute;
		left: 0.5rem;
		top: 0.2rem;
		width: 70%;
		padding: 0 0.1rem;
		height: 0.6rem;
	}
	.form-link {
		position: absolute;
		right: 0.5rem;
		top: 0.3rem;
		color: #aaa;
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
