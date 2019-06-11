<template>
	<div class="verifacation-main">
		<div class="header">
			<img class="icon-left-p" src="../../../../static/img/icon-left-blod.png" @click="cancel"/>
			上传图片
			<label class="ok" @click="settledInfo">完成</label>
		</div>
		<div class="main">
			<div class="tips f24 c1e">
				{{ptitle}}
			</div>
			<!-- 拍摄容器 -->
			<div class="upload " v-show="kind == 1">
				<div class="none-img" v-show="!upfileState">
					<div class="upfile">
						<input class="file5"  @change="_upDataImg('.file5',3)"  type="file" accept="image/*" />
						<label class="camera"></label>
					</div>
					<div class="camera-txt f24">点击上传图片</div>
				</div>
				<div class="has-img" v-show="upfileState">
					<img   class="card-img" :src="handImg"/>
					<div class="img-mask">
						重新选择
						<input class=" file6"  @change="_upDataImg('.file6',3)"  type="file" accept="image/*" />
					</div>
				</div>
								
			</div>
					
		</div>
	</div>
</template>

<script>
	import settled from '../../../server/settled.js';
	import axios from 'axios';
	
	export default{
		data(){
			return{
				upfileState:false,//默认x相机上传图标
				upfileState2:false,
				http:'',
				imgData:'',//图片地址
				imgDouble:'',
				handImg:'',
				bussImg:'',
				ptitle:'',
                kind:'',
                data:""
			}
		},
		mounted(){
            this.kind = this.$route.query.kind;
            this.data = this.$route.query;
			console.log(this.data);
			 if(this.kind == 1){
				this.ptitle = "拍摄/上传图片"
			}
			this.http = axios.create();
		},
		methods: {
			// 完成
			settledInfo(){
				console.log(this.kind)
				
					this.$router.push({
						path:'/issue',
						query:{
                            handImg:this.handImg,
                            data:this.data,
							// merchantName:this.$route.query.merchantName,
							// IdcardImg:this.$route.query.IdcardImg,
							// IdcardImgDou:this.$route.query.IdcardImgDou,
							// bussImg: this.$route.query.bussImg,
							// merchantContacts:this.$route.query.merchantContacts,
							// merchantPhone:this.$route.query.merchantPhone,
							// areaCode:this.$route.query.areaCode,
							// cityCode:this.$route.query.cityCode,
							// provinceCode:this.provinceCode,
							// merchantAddress:this.$route.query.merchantAddress,
							// categoryId:this.$route.query.categoryId,
							// recommenderId:this.$route.query.recommenderId,
							// provice:this.$route.query.provice,
							// city:this.$route.query.city,
							// area:this.$route.query.area,
							// detailAddr:this.$route.query.detailAddr,
							state:0
						}
					})
				
			},
			cancel(){
				this.$router.go(-1)
			},
			  // 上传图片
			fileUpdate(url,formData,imglist,index) {
			  let that = this
				that.http.post(url,formData,{
					method: 'post',
					headers: {'Content-Type': 'multipart/form-data'},
					withCredentials: true
				}).then(function (res) {	
					let data = res.data
					console.log(res);
					if(data.code == 0){
						if(index == 1){
							that.upfileState = true;
							that.imgData = data.data;
						}else if(index == 2){
							that.upfileState2 = true;
							that.imgDouble = data.data;
						}else if(index == 3){
							that.upfileState = true;
							that.handImg = data.data;
						}else if(index==4){
							that.upfileState = true;
							that.bussImg = data.data;
						}
						imglist = data.data;
					}
				}).catch(function(error){
					console.log(error);
				})
			},
			/* 转码 */
			convertBase64UrlToBlob(urlData) {
			  var bytes = window.atob(urlData.split(',')[1])
			  //处理异常,将ascii码小于0的转换为大于0
			  var ab = new ArrayBuffer(bytes.length)
			  var ia = new Uint8Array(ab)
			  for (var i = 0; i < bytes.length; i++) {
				  ia[i] = bytes.charCodeAt(i)
			  }
			  return new Blob([ab], {type: 'image/png'})
			},
			_upDataImg(o,index) {
			  let that = this
			  let file = document.querySelector(o).files[0]
			  console.log(file)
			  if (file.size > 5242880) {
				that._setMsgBox('上传图片大小不超过5M ')
				return false
			  }
				let url = 'http://47.107.124.31:8001/bwl/upload/uploadImgs'
				that.canvasDataURL(file, 200, function(base64) {
					let formData=new FormData();//通过formdata上传
					formData.append('imgs',file);
					console.log(that.kind)
					if(index ==1){
						that.fileUpdate(url,formData,that.imgData,index)
					}else if(index==2){
						that.fileUpdate(url,formData,that.imgDouble,index)
					}else if(index == 3){
						that.fileUpdate(url,formData,that.handImg,index)
					}else if(index == 4){
						that.fileUpdate(url,formData,that.bussImg,index)
					}
					
			  })
			},
			// 图片处理
			canvasDataURL(path, obj, callback) {
			  let ready = new FileReader()
			  let that = this
			  /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,
			  readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,
			  则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
			  ready.readAsDataURL(path)
			  ready.onload = function() {
				let re = this.result
				let img = new Image()
				img.src = re
				img.onload = function() {
				  let that = this
				  // 默认按比例压缩
				  let w = that.width,
					h = that.height,
					scale = w / h
				  w = obj.width || w
				  h = obj.height || w / scale
				  let quality = 0.7 // 默认图片质量为0.7
				  //生成canvas
				  let canvas = document.createElement('canvas')
				  let ctx = canvas.getContext('2d')
				  // 创建属性节点
				  let anw = document.createAttribute('width')
				  anw.nodeValue = w
				  let anh = document.createAttribute('height')
				  anh.nodeValue = h
				  canvas.setAttributeNode(anw)
				  canvas.setAttributeNode(anh)
				  ctx.drawImage(that, 0, 0, w, h)
				  // 图像质量
				  if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
					quality = obj.quality
				  }
				  // quality值越小，所绘制出的图像越模糊
				  let base64 = canvas.toDataURL('image/jpeg', quality)
				  // 回调函数返回base64的值
				  // console.log(base64)
				  callback(base64)
				}
			  }
			},
			
		},
	}
</script>

<style lang="scss">
	@import '../../../../static/css/style.css';
	@import '../../../../static/css/header.css';

	.verifacation-main{
		width: 100%;
		height: 100vh;
		background: #f1f1f1;
		
		.ok{
			position: absolute;
			right: .32rem;
			font-family: 'pf-Medium';
			font-size: .28rem;
			z-index: 19
		}
		.main{
			margin-top: .88rem;
			.tips{
				padding: .84rem 0 .6rem 0;
			}
			.upload{
				width: 4rem;
				height: 2.5rem;
				display: flex;
				background: #fff;
				flex-wrap: wrap;
				border-radius: .04rem;
			}
			.card-img{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 2;
			}
			.upfile{
				width: 100%;
				position: relative;
				padding: .75rem 0 .2rem 0;

			}
			.upfile input{
				position: absolute;
				left: 50%;
				margin-left: -.33rem;
				width: 0.66rem;
				height: 0.58rem;
				top:.75rem;
				z-index: 2;
				opacity: 0
				
			}
			.camera{
				display: inline-block;
				width: 0.65rem;
				height: 0.58rem;
				background: url('../../../assets/setteled/icon-camera.png') no-repeat;
				background-size: 100% 100%;
			}
			.camera-txt{
				color: #ffba30;
			}
			.has-img{
				width: 100%;
				height: 100%;
				position: relative;
				.img-mask{
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					right: 0;
					line-height: 2.5rem;
					color: #fff;
					z-index: 5;
					background: rgba($color: #000, $alpha: .4)
					
				}
				input{
					position:absolute;
					width: 100%;
					height: 100%;
					left: 0;
					opacity: 0;
				}
				
			}
		}
	}
</style>
