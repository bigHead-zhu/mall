class commonfn {
  constructor() {}
  /* 时间解析 */
  getTimerFormat(date) {
    let now = new Date(date)
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    let timer = {
      year: year,
      month: month,
      day: day,
      hour: hour < 10 ? '0' + hour : hour,
      minute: minute < 10 ? '0' + minute : minute,
      second: second < 10 ? '0' + second : second
    }
    return (this.timer = timer)
  }
  
  /* 单位转换 */
  getCountFormat(num) {
    let ls = Number(num)
    let count = null
    if (ls >= 10000) {
      count = (num / 10000).toFixed(1) + '万'
    } else {
      count = num
    }
    return (this.count = count)
  }
  /* 获取地址栏参数 */
  _getUrlParams(name) {
    console.log(name)
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  }
  /* 点击返回 */
  _goBack(param) {
    if (param && param.gobackurl) {
      window.location.href = param.gobackurl //返回的地址
      return false
    }
    if (param && param.isReferrer) {
      window.location.href = document.referrer //返回上一页并刷新，真正实现页面后退并刷新页面
      return false
    }
    if (param && param.beforeBack) {
      //返回的回调函数
      if (param.beforeBack()) {
        if (history.length > 2) {
          history.back()
        } else {
          location.assign('/')
        }
      }
    } else {
      if (history.length > 2) {
        history.back()
      } else {
        location.assign('/')
      }
    }
  }
  /* // 时间解析 */
  _getLocalTime(date) {
    let that = this
    let returnDate = ''
    let oldDate = new Date(date).getTime()
    let nowdate = new Date().getTime()
    let discrepantDate = nowdate - oldDate
    let month = Math.floor(discrepantDate / 1000 / 60 / 60 / 24 / 30)
    let day = Math.floor(discrepantDate / 1000 / 60 / 60 / 24)
    let hour = Math.floor(discrepantDate / 1000 / 60 / 60)
    let minutes = Math.floor(discrepantDate / 1000 / 60)
    if (month >= 1) {
      returnDate = '发表于1个月以前'
    } else {
      if (day >= 1) {
        returnDate = '发表于' + day + '天前'
      } else {
        if (hour >= 1) {
          returnDate = '发表于' + hour + '小时前'
        } else {
          if (minutes >= 1) {
            returnDate = '发表于' + minutes + '分钟前'
          } else {
            returnDate = '发表于刚刚'
          }
        }
      }
    }
    return returnDate
  }
  /* 设置cookes */
  _setCookie (name, value, hour = 1) {
     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除  小时为单位    
    if(hour !== 0){   
      let expires = hour * 60 * 60 * 1000
      let date = new Date(+new Date()+expires)
      document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString()
    }else{
      document.cookie = name + "=" + escape(value)
    }
  }
  /* 获取cookes */
  _getCookes(name) {
    let arr
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg))
      return unescape(arr[2])
    else
    return null
  }
  /* 清除所有的cookes */
  clearCookie(){ 
    let keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
      for (let i = keys.length; i >= 0 ; i--) {
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
      }
    } 
  } 
}
const common = new commonfn()
common.getCurrentPosition()
export default common
