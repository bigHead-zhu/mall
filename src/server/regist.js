
import axios from '@/server/public.js';

class registfn{
		/**
		 * 注册用户
		 */ 
		
		registerUser(params){
			return axios.http({
				url:'/bwl/user/registeByWeb',
				method:'post',
				},params);
		}
		/**
		 * 忘记密码
		 */
		forgetPwd(params){
			return axios.http({
				url:'/bwl/user/UserForgetPwd',
				method:'post',
			},params)
		}
}
	
let register = new registfn();
export default register;