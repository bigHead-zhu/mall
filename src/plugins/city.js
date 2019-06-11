
import hotel from '@/server/hotel.js';

class cityFn{
	/*三级联动城市*/
	city(params){
		hotel.city(params).then(res =>{
			console.log(res);
			if(res.code == 0){
				this.proviceData = res.data;
			}else{
				console.log(res.message)
			}
		})
	}
	
	tocity(params,areaId,val,index){
		this.addressTitle[1].state = true;
		this.addressData.codeproviceState = false;
		this.addressData.codecityState = true;
		this.addressData.codeareaState = false;
		this.addressTitle[0].code = areaId;
		this.addressTitle[0].index = index;
		this.addressTitle[0].title = false;
		this.addressTitle[1].title = true;
		this.addressTitle[2].title = false;
		this.addressData.proviceIndex = index;
		this.addressTitle[0].txt = val;
		this.code.areaId = areaId;
		if(areaId== 110000){
			this.local.localposition = "北京"
			this.local.localareaId = areaId
		}else if(areaId == 120000 ){
			this.local.localposition = "天津"
			this.local.localareaId = areaId
		}else if(areaId == 500000){
			this.local.localposition = "重庆"
			this.local.localareaId = areaId
		}else if(areaId == 300000){
			this.local.localposition = "上海"
			this.local.localareaId = areaId
		}
		
		hotel.city(params).then(res =>{
			console.log(res);
			if(res.code == 0){
				this.cityData = res.data;
			}else{
				console.log(res.message)
			}
		})	
	
	}
	
	toarea(codeParams,areaId,val,index){
		if(areaId== 110100 || areaId == 110200){
			this.local.localposition = "北京"
			this.local.localareaId = 110000
			this.params.areaCode = 110000
		}else if(areaId == 120100 || areaId == 120200){
			this.local.localposition = "天津"
			this.local.localareaId = 120000
			this.params.areaCode = 120000
		}else if(areaId == 500100 || areaId == 500200){
			this.local.localposition = "重庆"
			this.local.localareaId = 500000
			this.params.areaCode = 500000
		}else if(areaId == 300100 || areaId == 300200){
			this.local.localposition = "上海"
			this.local.localareaId = 300000
			this.params.areaCode = 300000
		}else{
			this.local.localposition = val;
			this.local.localareaId = areaId
			this.params.areaCode = areaId
		}
		console.log(areaId)
		this.hotel();
		this.addressTitle[1].txt = val;
		this.addressTitle[0].title = false;
		this.addressTitle[1].title = false;
		this.addressTitle[2].title = true;
		this.addressTitle[1].code = areaId;
		this.addressTitle[1].index = index;
		this.addressTitle[2].state = true;
		this.code.areaId = areaId;
		this.addressData.codeproviceState = false;
		this.addressData.codecityState = false;
		this.addressData.codeareaState = true;
		this.addressData.cityIndex = index;
		hotel.city(codeParams).then(res =>{
			if(res.code == 0){
				this.areaData = res.data;
			}else{
				console.log(res.message)
			}
		})	
	}
	
	areaval(val,index){
		this.addressTitle[2].txt = val;
		this.addressTitle[0].title = false;
		this.addressTitle[1].title = false;
		this.addressTitle[2].title = true;
		this.addressData.areaIndex = index;
		this.maskLayer();
	}
	/*三级联动城市end*/
}
let city = new cityFn()
export default city