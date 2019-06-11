import axios from '@/server/public.js';

class hotelFn{
	/*酒店首页*/
	hotel(params){
		return axios.http({
			url:'/bwl/hotel/hotel',
			method:'post'
		},params)
	}
	/*城市地区联动*/
	city(params){
		return axios.http({
			url:'/bwl/home/areaList',
			method:'post'
		},params)
	}
	// 商铺详情
	shop(params){
		return axios.http({
			url:'/bwl/hotel/hotelMerchant',
			method:'post'
		},params)
	}
	// 商品详情
	detail(params){
		return axios.http({
			url:'/bwl/hotel/hotelGoods',
			method:'post'
		},params)
	}
	
}

let hotel = new hotelFn();
export default hotel;