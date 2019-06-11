import axios from '@/server/public.js';
class searchFn {
	/*
	*搜索商品
	*/
	searchGoods(params){
		return axios.http({
			url:'/bwl/search/goodsSearch',
			method:'post'
		},params)
	}
	/*
	*搜索店铺
	*/
   searchShops(params){
	   return axios.http({
		   url:'/bwl/search/merchantSearch',
		   method:'post'
	   },params)
   }
   /*
   *搜索住宿
   */
   searchHotel(params){
	   return axios.http({
	   		   url:'/bwl/hotel/hotelSearch',
	   		   method:'post'
	   },params)
   }
   /*
   *历史搜索
   */
  searchHistory(params){
	  return axios.http({
		  url:'/bwl/search/userHistorySearch',
		  method:'post'
	  },params)
  }
  /* 系统热搜关键字 */
  hotCode(params){
	return axios.http({
		url:'/bwl/search/sysHotSearch',
		method:'post'
	},params)
  }
  /**
   *用户为你推荐 
   */
  forYourCode(params){
	  return axios.http({
		  url:'/bwl/search/recommendForUser',
		  method:'post'
	  },params)
  }
  /*首页热搜搜索 为你推荐*/
  indexAll(params){
	  return axios.http({
		  url:'/bwl/home/home',
		  method:'post'
	  },params)
  }
  /*爆品推荐*/
  topGoods(params){
	  return axios.http({
		  url:'/bwl/home/modularRec',
		  method:'post'
	  },params)
  }
  // 搜索食物
  searchFood(params){
  	   return axios.http({
  	   		   url:'/bwl/catering/cateringSearch',
  	   		   method:'post'
  	   },params)
  }
  // 旅游搜索
   searchTour(params){
  	   return axios.http({
  	   		   url:'/bwl/tourism/tourismSearch',
  	   		   method:'post'
  	   },params)
  }
  
  // 电影搜索
   searchFilm(params){
  	   return axios.http({
  	   		   url:'/bwl/film/filmSearch',
  	   		   method:'post'
  	   },params)
  }
}
 let search = new searchFn();
 export default search;