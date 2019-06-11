class commonfn {
  constructor() {}
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
export default common
