import axios from '@/server/public.js';

class foodFn{
	/*food首页*/
	food(params){
		return axios.http({
			url:'/bwl/catering/catering',
			method:'post'
		},params)
	}

	// 商铺详情
	shop(params){
		return axios.http({
			url:'/bwl/catering/cateringMerchant',
			method:'post'
		},params)
	}
	// 商品详情
	detail(params){
		return axios.http({
			url:'/bwl/catering/cateringGoods',
			method:'post'
		},params)
	}
	
}

let food = new foodFn();
export default food;