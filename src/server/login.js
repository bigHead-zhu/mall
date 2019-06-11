import axios from '@/server/public.js';
// import axios from '@/server/base.js';

class loginfn{
	/*
		*登录
		* params{}.userPhone 手机号
		* params{}.pwd 密码 2选1
		* params{}.yzc验证码 2选1
		* logInWay登录方式
 	*/
	postLogin(params){
		return axios.http({
			url:'/bwl/user/logIn',
			method:'post'
		},params)
	}
	/**
		*获取手机验证码
		 * phone 手机号
		 * type:0密码登录
	 	*/
	getCode(params){
		return axios.http({
			url:'/bwl/upload/sendValidateCode',
			method:'post'
		},params)
	}
}

let login = new loginfn();
export default login;