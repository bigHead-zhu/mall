import axios from 'axios'
import md5 from 'js-md5'
const baseURL = 'http://192.168.2.105:8001'
// import { getToken } from '@/lib/util'

class HttpRequest {
    constructor(baseUrl = baseURL) {
            this.baseUrl = baseUrl
                // 队列
            this.queue = {}
        }
        // 内部配置
    getInsideConfig() {
        // 全局配置
        const config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }
   
        // 拦截器
    interceptors(instance, url) {
            // 请求拦截
            instance.interceptors.request.use(config => {
                    return config
                }, error => {
                    return Promise.reject(error)
                })
                // 响应拦截
            instance.interceptors.response.use(res => {
				const { data } = res
				return data
            }, error => {
                return Promise.reject(error.response.data)
            })
        }
        // 请求
    request(options) {
            const instance = axios.create()
            options = Object.assign(this.getInsideConfig(), options)
            this.interceptors(instance, options.url)
            return instance(options)
        }
        // 初次请求
    factor() {
            return this.request({
                url: '/bwl/upload/factorSource',
                methods: 'post'
            })
        }
        // 正式请求,实际要请求的参数
    http(realOptions, vmParam) {
        /* 此处2个return很有玄机，不加获取不到结果 */
        // 获取到初次请求的参数factor
        return this.factor().then(factorSource => {
            if (factorSource.code == 0) {
                // 将factor与vm中的参数合并
                const newParam = this.$param(Object.assign({ factor: factorSource.data }, vmParam))
                    // 添加data,post请求的参数
                realOptions.data = newParam
                return this.request(realOptions)
            }
        })
    }
    $param(obj) {
        const $key = 'XgscKey';
        let arr = [];
        for (let i in obj) {
            arr.push(i);
        }
        arr.sort();
        // 生成新对象,用于产生sign字段
        let newObj = new Object();
        for (let i = 0; i < arr.length; i++) {
            newObj[arr[i]] = obj[arr[i]]
        }
        // 添加key在最后
        newObj.key = $key;
        // 如果键值不为string类型，转为string
        for (let x in newObj) {
            // if (Array.isArray(newObj[x])) {
            //     // 数据为数组对象[{},{},...{}]
            //     for (let j = 0; j < newObj[x].length; j++) {
            //         // 遍历数组
            //         for (let y in newObj[x][j]) {
            //             if (typeof newObj[x][j][y] !== 'string') {
            //                 newObj[x][j][y] = String(newObj[x][j][y])
            //             }
            //         }
            //         newObj[x][j] = Object(String(JSON.stringify(newObj[x][j])));
            //     }
            // } else

            // 数组,对象不加签
            if (typeof(newObj[x]) == "object" && newObj[x] !== null) {
                delete newObj[x]
            } else {
                if (typeof newObj[x] !== 'string') {
                    newObj[x] = String(newObj[x])
                }
            }
        }
        // 生成sign字段
        let sign = md5(JSON.stringify(newObj))
        obj.sign = sign;

        // console.log(newObj)
        // console.log(obj)

        return obj
    }
}

export default new HttpRequest()