import axios from '@/server/public.js';

class shopFn{
	// 消息列表
	newsList(params){
		return axios.http({
			url:'/bwl/home/homeMessage',
			method:'post'
		},params)
	}
	// 消息删除
	newsDel(params){
		return axios.http({
			url:'/bwl/home/deleteMessage',
			method:'post'
		},params)
	}
	/*商城首页*/
	shopIndex(params){
		return axios.http({
			url:'/bwl/home/mallModular',
			method:'post'
		},params)
	}
	/*爆款推荐*/
	list(params){
		return axios.http({
			url:'/bwl/home/mallGoodsList',
			method:'post'
		},params)
	}
	/*------企业数据--------*/	
	
	company(params){
		return axios.http({
			url:'/bwl/merchant/merchantHome',
			method:'post'
		},params)
	}
	/*宝贝分类*/
	goodsType(params){
		return axios.http({
			url:'/bwl/merchant/merchantCategory',
			method:'post'
		},params)
	}
	/*分类列表*/	/*全部宝贝*/
	typeList(params){
		return axios.http({
			url:'/bwl/merchant/goodsCategoryList',
			method:'post'
		},params)
	}
	// 优惠券列表
	couple(params){
		return axios.http({
			url:'/bwl/goods/couponList',
			method:'post'
		},params)
	}
	// 领取优惠券
	getCoupons(params){
		return axios.http({
			url:'/bwl/goods/getCoupons',
			method:'post'
		},params)
	}
	/*------企业数据--------*/	

}

let shopping = new shopFn();
export default shopping;