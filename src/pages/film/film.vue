<template>
	<!-- 电影 -->
	<div class="filmmain">
		<!-- 顶部导航star -->
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="toindex"/>
			<div class="search">
				<img class="icon-search" src="../../../static/img/icon-search.png" />
				<input class="search-input" type="text" placeholder="搜索商品名称"  readonly="readonly" @click="tosearch"/>
			</div>
			<div class="addr-text c1e" @click="maskLayer">
				{{local.localposition}}
			</div>
		</div>
		<!-- 主轮播 -->
		<div class="banner">
			<swiper :options="swiperOption" class="banner-box">
				<swiper-slide v-for="(item,index) in banner" :key = "index"><img v-lazy="item.bannerImg" /></swiper-slide>
			</swiper>
			<div class="swiper-pagination" id="film-banner-pagination"></div>
		</div>
		<!-- 主轮播end -->
		<!-- 电影列表 -->
		<div class="film-list">
				<ul class="film-list-ul">
					<scrollto :datalist="filmList" @scrollend="nextList">
						<li v-for="(item,index) in filmList" :key="index" @click="todetail(item.id)">
							<div class="film-left">
								<div class="title">
									<label class="film-name f32 c1e">{{item.merchantName}}</label>
									<label class="bg-score">好评：{{item.score}}</label>
								</div>
								<div class="address f26 caaa">
									地址：{{item.merchantAddress}}
								</div>
							</div>
							<div class="film-right">
								<label class="num">{{item.minAmount}}</label><small>元</small><small class="caaa">起</small>
							</div>
						</li>
						<li 
						  class="loadingmore">
						  <img 
							v-if="loadingstate"
							src="../../../static/img/img_list_loading.gif">
						  {{ loadingtext }}
						</li>
					</scrollto>
				</ul>
				
			</div>
		
		<div class="mask" v-if="mask" @click="maskLayer()"></div>
		<!-- 地址 -->
		<div class="addr-main" v-if="addrProps">
			<div class="addr-title c1e f32">
				您的位置
				<img @click="maskLayer" src="../../../static/img/icon-close.png" />
			</div>
			<div class="addr-detail">
				<!-- 地址 -->
				<ul class="address-title">
					<li v-for="(item,index) in addressTitle" 
					:key="index" :class="item.title ?'active':''"
					@click="titleTab(index)" :codeId="item.code"
						v-if="item.state" >
						{{item.txt}}
					</li>					
				</ul>
				<div class="address-list">
					<!-- 省 -->
					<ul class="ad-list provice" v-if="addressData.codeproviceState">
						<li v-for="(item,index) in proviceData" 
						:class="addressData.proviceIndex == index?'person':''"
						@click="tocity(item.areaCode,item.name,index)" 
						:key="index">{{item.name}}</li>
					</ul>
					<!-- 市 -->
					<ul class="ad-list provice" v-if="addressData.codecityState">
						<li v-for="(item,index) in cityData" 
						@click="toarea(item.areaCode,item.name,index)" 
						:class="addressData.cityIndex == index?'person':''"
						:key="index">{{item.name}}</li>
					</ul>
					<ul class="ad-list provice" v-if="addressData.codeareaState">
						<li v-for="(item,index) in areaData" 
						 :key="index"
						 :class = "addressData.areaIndex == index?'person':''"
						 @click = "areaval(item.name,index)">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</div>		
		
	
	</div>
</template>

<script>
	import hotel from '../../server/hotel.js';
	import film from '../../server/film.js';
	import scrollto from '../../components/scrollto.vue';
	import common from '../../plugins/common.js';

	export default {
		components:{
			scrollto
		},
		data() {
			return {
				
				swiperOption: {
					loop: true,
					autoplay: true,
					pagination: {
						el: '#film-banner-pagination',
						clickable: true,
					}
				},
				mask:false,
				addrProps:false,//地址
				code:{
					areaId:0
				},
				banner:"",//轮播图
				proviceData:[],//省数据
				cityData:[],//城市数据
				areaData:[],//城市数据
				addressTitle:[
					{
						title:true,//切换显示状态
						state:true,//切换前显示状态
						txt:'请选择',
						code:'',
						index:''
					},{
						title:false,
						state:false,
						txt:'请选择',
						code:'',
						index:''
					},{
						title:false,
						state:false,
						txt:'请选择',
						code:'',
						index:''
					}
				],
				addressData:{
					areaIndex:'',
					cityIndex:'',
					proviceIndex:'',
					codeproviceState:true,//长列显示
					codecityState:false,
					codeareaState:false,
				},
				local:{
					localposition:'',
					localareaId:''
				},//酒店位置
				params:{
					fromNum:1,
					pageSize:10
				},
				pagecount: 0,//计算共有多少页码
				filmList:[],
				showlist:false,//T有
				// 加载更多
				loadingstate: true,
				loadingtext: '正在加载',
			}
		},
			mounted() {
				this.params.categoryId = this.$route.query.categoryId
				this.local.localposition = common._getCookes('filmcity') || '北京'
				this.local.localareaId = common._getCookes('filmcityId') || '110000'
				this.city();
				this.film();
			},
			methods:{
				toindex(){
					//回首页
					this.$router.push("/index")
				},
					// 地址窗口
					maskLayer(){
						this.addrProps = !this.addrProps;
						this.mask = !this.mask;
						if (this.mask) {
						  document.body.style.overflow = 'hidden'
						} else {
						  document.body.style.overflow = 'initial'
						}
					},
					/*电影模块*/
					film(){
						this.params.areaCode = this.local.localareaId;
						this.listData = []
						film.film(this.params).then(res =>{
							console.log(res)
							let code = res.code;
							if(code==0){
								this.banner = res.data.banners;
								if(res.data.count > 0){
									
									this.showlist = true;
									this.pagecount = Math.ceil(res.data.count / this.params.pageSize)
									this.filmList = res.data.filmListVo;
									if(this.params.fromNum >= this.pagecount || this.params.pageSize > this.pagecount){
									  this.loadingstate = false
									  this.loadingtext = ''
									}
								}else{
									this.showlist = false;
									this.loadingstate = false
									this.loadingtext = '暂无推荐数据'
								}
							}else{
								console.log(res.message)
							}
						})
					},
					/*三级联动城市*/
					city(){
						hotel.city(this.code).then(res =>{
							console.log(res);
							if(res.code == 0){
								this.proviceData = res.data;
							}else{
								console.log(res.message)
							}
						})
					},
					tocity(areaId,val,index){
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
						if(areaId== 110000 || areaId == 120000 || areaId == 500000 || areaId == 300000){
							this.local.localposition = val
							this.local.localareaId = areaId
							common._setCookie('filmcity', val)
							common._setCookie('filmcityId', areaId)
						}
						
						hotel.city(this.code).then(res =>{
							console.log(res);
							if(res.code == 0){
								this.cityData = res.data;
							}else{
								console.log(res.message)
							}
						})	
				
					},
					toarea(areaId,val,index){
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
							common._setCookie('filmcity', val)
							common._setCookie('filmcityId', areaId)
						}
						console.log(areaId)
						this.film();
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
						hotel.city(this.code).then(res =>{
							if(res.code == 0){
								this.areaData = res.data;
							}else{
								console.log(res.message)
							}
						})	
					},
					areaval(val,index){
						this.addressTitle[2].txt = val;
						this.addressTitle[0].title = false;
						this.addressTitle[1].title = false;
						this.addressTitle[2].title = true;
						this.addressData.areaIndex = index;
						this.maskLayer();
					},
					/*三级联动城市end*/
					/*头部切换*/
					titleTab(index){
						switch(index){
							case 0:
								// this.city();
								this.tocity(this.addressTitle[0].code,this.addressTitle[0].txt,this.addressTitle[0].index)
								this.addressData.cityIndex = "";//切换回来清空index
								this.addressData.areaIndex = "";//切换回来清空index
								this.addressTitle[0].title = true
								this.addressTitle[1].title = false
								this.addressTitle[2].title = false
								this.addressData.codeproviceState = true;
								this.addressData.codecityState = false;
								this.addressData.codeareaState = false;
								break;
							case 1:
								this.addressTitle[0].title = false
								this.addressTitle[1].title = true
								this.addressTitle[2].title = false
								this.addressData.codeproviceState = false;
								this.addressData.codecityState = true;
								this.addressData.codeareaState = false;
								break;
							case 2:
								this.addressTitle[0].title = false
								this.addressTitle[1].title = false
								this.addressTitle[2].title = true
								this.addressData.codeproviceState = false;
								this.addressData.codecityState = false;
								this.addressData.codeareaState = true;
								break;
					}
				},
				// 去店铺
				todetail(id){
					this.$router.push({
						path:'/filmShop',
						query:{
							id:id,
						}
					})
				},
				// 搜索
				tosearch(){
					this.$router.push({
						path:'/searchotel',
						query:{
							areaCode:this.local.localareaId,
							categoryId: this.$route.query.categoryId
						}
					})
				},
				
				/* 下一页 */
				nextList() {
					console.log(this.params.fromNum < this.pagecount)
				  if (this.params.fromNum < this.pagecount) {
					++this.params.fromNum
					this.loadingstate = true
					this.loadingtext = '正在加载'
					this.tour()
				  }
				},
			
		},
	}
</script>

<style lang="scss" >
	@import "../../../static/css/style.css";
	@import "../../../static/css/common.css";
	.filmmain{
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow:auto;

		// 顶部导航
		.header {
			width: 100%;
			padding: .18rem 0 .14rem 0;
			position: fixed;
			background: #fff;
			font-size: .28rem;
			overflow: hidden;
			z-index: 9;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			
		}
		.search {
			width: 5.54rem;
			height: .64rem;
			text-align: left;
			display: flex;
			align-items: center;
			background: #f1f1f1;
		}
		.icon-search {
			width: .27rem;
			height: .26rem;
			font-size: .28rem;
			margin-left: .24rem;
		}
		.search-input {
			margin-left: .14rem;
			height: 100%;
			background: transparent;
			color: #7f7f7f;
			border: none;
			flex: 2;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.addr-text{
			font-size: .3rem;
			margin-right: .3rem;
		}
		.banner {
			width: 100%;
			height: 2.8rem;
			margin: .96rem 0 .2rem 0;
			position: relative;
			background: #1E1E1E;
		}
		.banner img{
			width: 100%;
			height: 100%;
		}
		.banner-box {
			height: 100%;
		}
		.banner .swiper-pagination {
			bottom: .13rem;
			width: 100%;
			align-items: center;
			z-index: 2;
		}
		.banner .swiper-pagination-bullet {
			width: .3rem;
			height: .04rem;
			border-radius: .02rem;
			background-color: #fff;
			opacity: 0.4;
			margin-right: .08rem;
		}
		.banner .swiper-pagination-bullet-active {
			background: #fff;
			opacity: 1;
		}
		/*电影院列表*/
		.film-list{
			border-top: .16rem solid #f2f2f2;
			.film-list-ul{
				margin: 0 .3rem;			
			}
			.film-list-ul li{
				border-bottom: 1px solid #f2f2f2;
				display: flex;
				align-items: center;
				min-height: 1.44rem;
			}
			.film-left{
				width: 5.55rem;
				text-align: left;
			}
			.film-name{
				display: inline-block;
				max-width: 3.7rem;
				height: .32rem;
				overflow: hidden;
				vertical-align: middle;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.bg-score{
				display: inline-block;
				width: 1.5rem;
				height: .30rem;
				line-height: .34rem;			
				vertical-align: middle;
				font-size: .22rem;
				border-radius: 4px 20px 4px 20px;
				text-align:center;
				color:#fff;
				margin:-.12rem 0 0;
				margin: 0;
				vertical-align: middle;
				background: #ffba30;
			}
			.film-right{
				margin: -.32rem 0 0;
				color: #b50000;
				font-size: .22rem;
			}
			.film-right .num{
				font-size: .32rem;
				font-weight: bold;
			}
			.caaa{
				color: #aaa;
			}
			.address{
				margin-top: .12rem;
				
			}
		}
}
</style>
