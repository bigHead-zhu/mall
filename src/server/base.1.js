// /**
//  * 测试环境 API 接口设置
//  */
// import Qs from 'qs'
// import md5 from 'js-md5'
// //接口地址域名
// // const baseURL = 'https://test.djx.api02.opentickets.cn/mobile'
// const baseURL = 'http://192.168.2.105:8001'
// //接口数据请求
// import axios from 'axios'
// //公共方法
// import common from '../plugins/common'
// 
// class Base {
// 	constructor() {
// 		this.$http = axios.create({
// 			baseURL: baseURL,
// 			timeout: 5000,
// 			url: '/bwl/upload/factorSource',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			}
// 
// 		})
// 		/**
// 		 * axios 请求拦截器
// 		 */
// 		this.$http.interceptors.request.use(
// 			config => {
// 				if (config.data) {
// 					config.data = this.getParams(config.data)
// 				} else {
// 					config.params = this.getParams(config.params)
// 				}
// 				return config
// 			},
// 			error => {
// 				return Promise.reject(error)
// 			}
// 		)
// 		/**
// 		 * axios 响应拦截器
// 		 */
// 		this.$http.interceptors.response.use(res => {
// 			return res
// 		})
// 		this.getParams = function (obj) {
// 			// common._setCookie('factor', res.data.data) 
// 			//每次都请求
// 			const $key = 'bwl';
// 			let arr = [];
// 			if (typeof obj == 'string') {
// 				obj = JSON.parse(obj)
// 			}
// 			for (let i in obj) {
// 				arr.push(i);
// 			}
// 			arr.sort();
// 			// 生成新对象,用于产生sign字段
// 			let newObj = new Object();
// 			for (let i = 0; i < arr.length; i++) {
// 				newObj[arr[i]] = obj[arr[i]]
// 			}
// 			// 添加key在最后
// 			newObj.key = $key;
// 			// 如果键值不为string类型，转为string
// 			for (let x in newObj) {
// 				// 数组,对象不加签
// 				if (typeof(newObj[x]) == "object" && newObj[x] !== null) {
// 					delete newObj[x]
// 				} else {
// 					if (typeof newObj[x] !== 'string') {
// 						newObj[x] = String(newObj[x])
// 					}
// 				}
// 			}
// 			// 生成sign字段
// 			let sign = md5(JSON.stringify(newObj)) 
// 			obj.sign = sign;
// 			axios.get(baseURL + '/bwl/upload/factorSource').then(res => {
// 				// obj.factor = res.data.data;
// 				this.$http.interceptors.request.use(
// 					config => {
// 						if (config.data) {
// 							config.data = {
// 								factor: res.data.data,
// 								...this.getParams(config.data)
// 							}
// 						} else {
// 							config.params = {
// 								factor: res.data.data,
// 								...this.getParams(config.params)
// 							}
// 						}
// 						
// 						return config
// 					},
// 					// Promise.resolve().then(()=> console.log(4))
// 
// 					error => {
// 						return Promise.reject(error)
// 					}
// 				)
// 			})
// 			console.log(obj)
// 			return obj
// 
// 		}
// 	}
//  }
// const base_service = new Base()
// export {
// 	base_service,
// 	Base
// }
// 