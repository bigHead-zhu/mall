import Vue from 'vue'
import Router from 'vue-router'

import comGoods from '@/pages/company/comGoods'
import searchGoods from '@/pages/search/searchGoods'
import searchshop from '@/pages/search/searchShop'
import search from '@/pages/search/search'
import searchotel from '@/pages/search/searchHotel'
import searchCom from '@/pages/search/searchC'
// 商品
import goodsDetail from '@/pages/goods/goodsDetail'
import goodsComment from '@/pages/goods/goodsComment'

import company from '@/pages/company/company'
import companyDes from '@/pages/company/companyDes'
import companySearch from '@/pages/company/companySearch'
import companyAll from '@/pages/company/companyAll'
import listType from '@/pages/company/listGoods'
import login from '@/pages/login'
import regist from '@/pages/regist'
import forget from '@/pages/forget'
import pwd from '@/pages/password'
import registok from '@/pages/regist_down'
import index from '@/pages/index'
import customer from '@/pages/company/Customer'
// 商城
import shop from '@/pages/shop/shop'
import news from '@/pages/shop/message'
import shopGoods from '@/pages/shop/shopGoods'
// 住宿模块
import hotel from '@/pages/hotel/hotel'
import hotelDetail from '@/pages/hotel/hotelDetail'
import hotelSearchGoods from '@/pages/hotel/hotelSearchGoods'
import hotelGoodsDetail from '@/pages/hotel/hotelGoosDetail'
import hotelOrder from '@/pages/hotel/hotelOrder'
import hotelOrderDetail from '@/pages/hotel/hotelOrderDetail'
import couple from '@/pages/hotel/couple'
import date from '@/pages/hotel/date'
//电影模块
import film from '@/pages/film/film'
import filmShop from '@/pages/film/filmShop'
import filmShopDetail from '@/pages/film/filmShopDetail'
import filmSearchGoods from '@/pages/film/searchGoods'
// 餐饮模块
import food from '@/pages/food/food'
import foodShop from '@/pages/food/foodShop'
import foodDetail from '@/pages/food/foodDetail'
// 旅游模块
import tour from '@/pages/tour/index'
import tourShop from '@/pages/tour/shopDetail'
import tourShopDetail from '@/pages/tour/goodsDetail'
import tourSearchGoods from '@/pages/tour/searchGoods'

// 购物车
import car from '@/pages/car/index'
import carAddr from '@/pages/car/address'
import fillAddr from '@/pages/car/fillAddress'
import carOrder from '@/pages/car/orderAcount'
import carPSuccess from '@/pages/car/paySuccess'

// 入驻
import settled from '@/pages/settled/index'
import settledInfo from '@/pages/settled/fillInfo'
import settledId from '@/pages/settled/idVerification'//身份验证
import settledLogin from '@/pages/settled/login'
import merchantIndex from '@/pages/settled/merchantIndex'
import tradeDetail from '@/pages/settled/tradeDetail'
import applyMoney from '@/pages/settled/applyMoney'
import applyDetail from '@/pages/settled/applyDetail'
import park from '@/pages/settled/bPark'
import directory from '@/pages/settled/directory'
import service from '@/pages/settled/service'
import employee from '@/pages/settled/employee'
import check from '@/pages/settled/checkState'


// 分享
import share from '@/pages/share/index'
import shareInvite from '@/pages/share/share'

// 分类支付成功
import classifiPaySuccess from '@/pages/hotel/paySuccess'

//个人中心
import my from '@/pages/my/my'
//用户设置
import userhead from '@/pages/my/userhead'
import address from '@/pages/my/mysettings/address'
import security from '@/pages/my/mysettings/security'
import currency from '@/pages/my/mysettings/currency'
import replace from '@/pages/my/mysettings/replace'
//个人中心-订单
import order from '@/pages/my/myorder/order'
import order1 from '@/pages/my/myorder/order1'
import order2 from '@/pages/my/myorder/order2'
import order3 from '@/pages/my/myorder/order3'
import order4 from '@/pages/my/myorder/order4'
import order5 from '@/pages/my/myorder/order5'
import orderDetail from '@/pages/my/myorder/orderDetail'
import evaluate from '@/pages/my/myorder/evaluate'
//个人中心-卡包
import walletOne from '@/pages/my/mywallet/walletOne'
import detailed from '@/pages/my/mywallet/detailed'
import walletTwo from '@/pages/my/mywallet/walletTwo'
import buyCard from '@/pages/my/mywallet/buyCard'
import walletThree from '@/pages/my/mywallet/walletThree'
import walletFour from '@/pages/my/mywallet/walletFour'
import unexpired from '@/pages/my/mywallet/unexpired'
import use from '@/pages/my/mywallet/use'
import invalid from '@/pages/my/mywallet/invalid'
//推广
import popularize from '@/pages/my/popularize'
import popularizeUser from '@/pages/my/popularizeUser'
import popularizeFirm from '@/pages/my/popularizeFirm'
//客服服务
import Personservice from '@/pages/my/service'
import afterservice from '@/pages/my/afterservice'
import apply from '@/pages/my/applyMoney'
//私人订制
import tailor from '@/pages/my/mytailor/tailor'
import tailor1 from '@/pages/my/mytailor/tailor1'
import tailor2 from '@/pages/my/mytailor/tailor2'
import tailor3 from '@/pages/my/mytailor/tailor3'
import tailor4 from '@/pages/my/mytailor/tailor4'
import issue from '@/pages/my/mytailor/issue'
import myissue from '@/pages/my/mytailor/myissue'
import issueDetails from '@/pages/my/mytailor/issueDetails'
import uploadImg from '@/pages/my/mytailor/uploadImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
			path:'/',
			name:'index',
			component:index
		},
		{
			path:'/login',
			name:"login",
			component:login
		},
		{
			path:'/regist',
			name:'regist',
			component:regist
		},
		{
			path:'/pwd',
			name:'passwprd',
			component:pwd
		},
		{
			path:'/registok',
			name:'registok',
			component:registok
		},
		{
			path:'/forget',
			name:'forget',
			component:forget
		},{
			path:'/search',
			name:'search',
			component:search
		},
		{
			path:'/searchotel',
			name:'searchotel',
			component:searchotel
		},
		{
			path:'/searchGoods',
			name:'searchGoods',
			component:searchGoods
		},
		{
			path:'/comGoods',
			name:'comGoods',
			component:comGoods
		},
		{
			path:'/searchshop',
			name:'searchshop',
			component:searchshop
		},
		{
			path:'/searchCom',
			name:'searchCom',
			component:searchCom
		},
		{
			path:'/customer',
			name:'customer',
			component:customer
		},
		{
			path:'/companyType',
			name:'companyType',
			component:companySearch
		},
		{
			path:'/company',
			name:'company',
			component:company
		},
		{
			path:'/companyDes',
			name:'companyDes',
			component:companyDes
		},
		{
			path:'/shop',
			name:'shop',
			component:shop
		},
		{
			path:'/news',
			name:'news',
			component:news
		},
		{
			path:'/shopGoods',
			name:'shopGoods',
			component:shopGoods
		},
		{
			path:'/goodsDetail',
			name:'goodsDetail',
			component:goodsDetail
		},
		{
			path:'/goodsComment',
			name:'goodsComment',
			component:goodsComment
		},
		{
			path:'/companyAll',
			name:'companyAll',
			component:companyAll
		},
		
		{
			path:'/hotelDetail',
			name:'hotelDetail',
			component:hotelDetail
		},
		{
			path:'/hotelSearchGoods',
			name:'hotelSearchGoods',
			component:hotelSearchGoods
		},
		{
			path:'/hotelGoodsDetail',
			name:'hotelGoodsDetail',
			component:hotelGoodsDetail
		},
		{
			path:'/hotel',
			name:'hotel',
			component:hotel
		},
		{
			path:'/hotelOrder',
			name:'hotelOrder',
			component:hotelOrder
		},
		{
			path:'/hotelOrderDetail',
			name:'hotelOrderDetail',
			component:hotelOrderDetail
		},
		{
			path:'/couple',
			name:'couple',
			component:couple
		},
		{
			path:'/classifiPaySuccess',
			name:'classifiPaySuccess',
			component:classifiPaySuccess
		},
		{
			path:'/date',
			name:'date',
			component:date
		},
		/*电影模块*/
		{
			path:'/film',
			name:'film',
			component:film
		},
		{
			path:'/filmShop',
			name:'filmShop',
			component:filmShop
		},
		{
			path:'/filmShopDetail',
			name:'filmShopDetail',
			component:filmShopDetail
		},
		
		/*餐饮模块*/
		{
			path:'/food',
			name:'food',
			component:food
		},
		{
			path:'/foodShop',
			name:'foodShop',
			component:foodShop
		},
		{
			path:'/foodDetail',
			name:'foodDetail',
			component:foodDetail
		},
		
		/*旅游模块*/
		{
			path:'/tour',
			name:'tour',
			component:tour
		},
		{
			path:'/tourShop',
			name:'tourShop',
			component:tourShop
		},
		{
			path:'/tourShopDetail',
			name:'tourShopDetail',
			component:tourShopDetail
		},
		{
			path:'/tourSearchGoods',
			name:'tourSearchGoods',
			component:tourSearchGoods
		},
		{
			path:'/filmSearchGoods',
			name:'filmSearchGoods',
			component:filmSearchGoods
		},
		{
			path:'/listType',
			name:'listType',
			component:listType
		},
		// 购物车
		{
			path:'/car',
			name:'car',
			component:car
		},
		{
			path:'/carAddr',
			name:'carAddr',
			component:carAddr
		},
		{
			path:'/fillAddr',
			name:'fillAddr',
			component:fillAddr
		},
		{
			path:'/carOrder',
			name:'carOrder',
			component:carOrder
		},
		{
			path:'/carPSuccess',
			name:'carPSuccess',
			component:carPSuccess
		},
		
		// 入驻
		{
			path:'/settled',
			name:'settled',
			component:settled
		},
		{
			path:"/settledInfo",
			name:'settledInfo',
			component:settledInfo
		},
		{
			path:"/settledId",
			name:'settledId',
			component:settledId
		},
		{
			path:"/settledLogin",
			name:'settledLogin',
			component:settledLogin
		},
		{
			path:"/merchantIndex",
			name:'merchantIndex',
			component:merchantIndex
		},
		{
			path:"/tradeDetail",
			name:'tradeDetail',
			component:tradeDetail
		},
		{
			path:"/applyMoney",
			name:'applyMoney',
			component:applyMoney
		},
		{
			path:"/applyDetail",
			name:'applyDetail',
			component:applyDetail
		},
		{
			path:"/park",
			name:'park',
			component:park
		},
		{
			path:"/directory",
			name:'directory',
			component:directory
		},
		{
			path:"/service",
			name:'service',
			component:service
		},
		{
			path:"/employee",
			name:'employee',
			component:employee
		},
		{
			path:"/check",
			name:'check',
			component:check
		},
		// 分享
		{
			path:'/share',
			name:share,
			component:share
		},
		{
			path:'/shareInvite',
			name:shareInvite,
			component:shareInvite
		},{
			path:'/listType',
			name:'listType',
			component:listType
		},
		//个人中心
		{
			path:'/my',
			name:'my',
			component:my
		},
		{
			path:'/userhead',
			name:'userhead',
			component:userhead
		},
		{path:"/address",name:"address",component:address},
		{path:"/security",name:"security",component:security},
		{path:"/currency",name:"currency",component:currency},
		{path:"/replace",name:"replace",component:replace},
		{
			path:'/order',
			name:'order',
			component:order,
			children:[
				{
					path:"/order1",
					name:"order1",
					component:order1,
					linkActiveClass:"selection"
				},
				{
					path:"/order2",
					name:"order2",
					component:order2,
					linkActiveClass:"selection"
				},
				{
					path:"/order3",
					name:"order3",
					component:order3,
					linkActiveClass:"selection"
				},
				{
					path:"/order4",
					name:"order4",
					component:order4,
					linkActiveClass:"selection"
				},
				{
					path:"/order5",
					name:"order5",
					component:order5,
					linkActiveClass:"selection"
				},
			]
		},
		{path:"/orderDetail",name:"orderDetail",component:orderDetail},
		{path:"/evaluate",name:"evaluate",component:evaluate},
		{path:"/afterservice",name:"afterservice",component:afterservice},
		//卡包
		{
			path:"/walletOne",
			name:"walletOne",
			component:walletOne,
			// linkActiveClass:"selection"
		},
		{path:"/detailed",name:"detailed",component:detailed},
		{
			path:"/walletTwo",
			name:"walletTwo",
			component:walletTwo
		},
		{path:'/buyCard',name:'buyCard',component:buyCard},
		{
			path:"/walletThree",
			name:"walletThree",
			component:walletThree
		},
		{
			path:"/walletFour",
			name:"walletFour",
			component:walletFour,
			children:[
				{path:"/unexpired",name:"unexpired",component:unexpired,linkActiveClass:"selection"},
				{path:"/use",name:"use",component:use,linkActiveClass:"selection"},
				{path:"/invalid",name:"invalid",component:invalid,linkActiveClass:"selection"},
			]
		},
		{//宣传
			path:"/popularize",
			name:"popularize",
			component:popularize,
			children:[
				{path:"/popularizeUser",name:"popularizeUser",component:popularizeUser,linkActiveClass:"selection"},
				{path:"/popularizeFirm",name:"popularizeFirm",component:popularizeFirm,linkActiveClass:"selection"}
			]
		},
		{path:"/Personservice",name:"Personservice",component:Personservice},//客服
		{path:"/apply",name:"apply",component:apply},//申请退款
		
		{
			path:"/tailor",name:"tailor",component:tailor,
			children:[
				{path:"/tailor1",name:"tailor1",component:tailor1,linkActiveClass:"selection"},
				{path:"/tailor2",name:"tailor2",component:tailor2,linkActiveClass:"selection"},
				{path:"/tailor3",name:"tailor3",component:tailor3,linkActiveClass:"selection"},
				{path:"/tailor4",name:"tailor4",component:tailor4,linkActiveClass:"selection"},
			]
		},
		{path:"/issue",name:"issue",component:issue},
		{path:"/myissue",name:"myissue",component:myissue},
		{path:"/issueDetails",name:"issueDetails",component:issueDetails},
		{path:"/uploadImg",name:"uploadImg",component:uploadImg}

	

		
		
		
  ]
})
