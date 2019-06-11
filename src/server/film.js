import axios from '@/server/public.js';

class filmFn{
	/*film首页*/
	film(params){
		return axios.http({
			url:'/bwl/film/film',
			method:'post'
		},params)
	}

	// 商铺详情
	shop(params){
		return axios.http({
			url:'/bwl/film/filmMerchant',
			method:'post'
		},params)
	}
	// 商品详情
	detail(params){
		return axios.http({
			url:'/bwl/film/filmGoods',
			method:'post'
		},params)
	}
	
}

let film = new filmFn();
export default film;