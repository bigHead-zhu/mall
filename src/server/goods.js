import axios from '@/server/public.js';

// 商品
class goodsfn{
	goodsDetail(params){
		return axios.http({
			url:'/bwl/goods/details',
			method:'post'
		},params)
	}
	// 评论列表	
	goodsCommentList(params){
		return axios.http({
			url:'/bwl/goods/goodsCommend',
			method:'post'
		},params)
	}
}

let goods = new goodsfn();
export default goods;