import axios from '@/server/public.js';

class tourFn{
	/*food首页*/
	tour(params){
		return axios.http({
			url:'/bwl/tourism/tourism',
			method:'post'
		},params)
	}

	// 商铺详情
	shop(params){
		return axios.http({
			url:'/bwl/tourism/tourismMerchant',
			method:'post'
		},params)
	}
	// 商品详情
	detail(params){
		return axios.http({
			url:'/bwl/tourism/tourismGoods',
			method:'post'
		},params)
	}
	
}

let tour = new tourFn();
export default tour;