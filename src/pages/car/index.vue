<template>
	<div class="car">
		<div class="header">
			<img class="icon-left" src="../../../static/img/icon-left-blod.png" @click="cancel"/>
			<label>购物车</label>
			<div class="c1e edit" @click="edit()">{{editTxt}}</div>
		</div>
		<!-- 购物车列表 -->
		<div class="car-list">
			<div class="car-adv-tips f24">
				新年特卖会，火热进行中！
			</div>
			<ul class="shop-goods">
				<!-- 购物车列表详细 -->
				<li class="shop-goods-list" v-for="(items,index) in shopGoodstList" :key="index" >
					<!-- 店铺名字 -->
					<div class="shop-title">
						<!-- 选择框 -->
						<div class="check-box" @click="shopAll(index)" >
							<input type="checkbox"  v-model="items.checkState"/>
							<label class="checkbox-label"></label>
						</div>
						<div class="shop-name cle">
							浦东日上免税店
							<img class="icon-right" src="../../../static/img/icon-r-return.png" />
						</div>
					</div>
					<!-- 商品清单 -->
					<ul class="goods-list">
						<li class="goods-list-li" v-for="(item,levindex) in items.goodslist" :key="levindex" :style='item.moveStyle'
						v-swipeleft = "{fn:swipeleft,index:levindex+','+index}" v-swiperight = "{fn:swiperight,index:levindex+','+index}">
							<!-- 选择框 -->
							<div class="check-box">
								<input type="checkbox"  :checked ="item.ischeck" @click="sltActive(index, levindex)"/>
								<label class="checkbox-label"></label>
							</div>
							<div class="goods-img">
								<img src="../../../update/img/c1.png" />
							</div>
							<div class="goods-txt">
								<div class="goods-name c1e">
									专柜正品New Balance/NB 女士针织连帽卫衣 NCNC9105X
									专柜正品 女士针织连帽卫衣 NCNC9105X
								</div>
								<div class="goods-type f24">
									蓝色 XXL
								</div>
								<div class="goods-choose">
									<div class="goods-price">
										<small class="f24">¥</small>1400
									</div>
									<div class="goods-choose-input">
										<input type="button" class="buy-reduce"  @click="buyReduce" value="-" />
										<input type="number" class="buy-count" v-model="item.buyCount" />
										<input type="button" class="buy-plus" @click="buyPlus(item.buyCount)" value="+" />
									</div>
								</div>
							</div>
							<div class="del-btn del" @click="deleteList(index)">
								删除
							</div>
						</li>
					</ul>
				</li>
				
			</ul>
		</div>
		<!-- 管理栏 -->
		<div class="manager-nav">
			<!-- 选择框 -->
			<div class="all-check">
				<div class="check-box" @click="checkAll($event)">
					<input type="checkbox"  v-model="allState"/>
					<label class="checkbox-label"></label>
				</div>
				<label class="check-title">全选</label>
			</div>
			<div class="car-total-price">
				<label class="gray">合计：</label>
				<label class="money">¥1200</label>
			</div>
			<div class="account-btn">去下单</div>
			
		</div>
		<div class="manager-nav">
			<!-- 选择框 -->
			<div class="all-check">
				<div class="check-box" @click="checkAll($event)">
					<input type="checkbox"  v-model="allState"/>
					<label class="checkbox-label"></label>
				</div>
				<label class="check-title">全选</label>
			</div>
			<div class="car-del">删除</div>
			
		</div>
		<!-- 导航 -->
		<foot></foot>
	</div>
</template>

<script>
	import {swipeleft,swiperight} from '../../plugins/touchvue.js';
	import foot from '../../components/footer.vue';

	export default{
		components:{
			foot
		},
		data(){
			return{
				delWidth:'',
				editState:false,//管理状态
				editTxt:"管理",
				shopGoodstList:[],
				moveStyle:'',//移动样式
				shopallState:false,
				allState:false,//全选
			}
		},
// 		watch:{
// 			buyCount(newVal,oldVal){
// 				if (newVal == 1) {
// 					this.onstyle = false
// 				} else {
// 					this.onstyle = true 
// 				}
// 			},
// 		},
		created(){
			// 
			this.$nextTick(() =>{
				let c = document.documentElement.clientWidth || document.body.clientWidth
					c = c >= 750 ? 750 : c
				this.delWidth = 1.4*(c / 7.5)
			})
		},
		mounted() {
			this.getGoods()
		},
		methods:{
			cancel(){
				this.$router.go(-1);
			},
			// 管理按钮
			edit(){
				this.editState = !this.editState;
				if(this.editState){
					this.editTxt = "完成"
				}else{
					this.editTxt = "管理"
				}
			},
			swipeleft(s,e) {
				let that = this;
				console.log(s.index)
				let indexArr = s.index.split(',')
				let deltaX = Math.abs(e.changedTouches[0].clientX)
				if(e.changedTouches.length === 1) {
					// 如果是向右滑动或者只是点击，不改变滑动位置
					if(deltaX < 0 || deltaX == 0) {
					   that._setMove()
					}else if (deltaX > 0) {
						//如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
							that._setMove()
							console.log(deltaX)
							console.log(this.delWidth)
						if (deltaX>= this.delWidth) {
						 that._setMove(indexArr[1], indexArr[0])
						}
					}
				}

			},
			 swiperight(s,e) {
				let that = this;
				let deltaX = Math.abs(e.changedTouches[0].clientX)
				let indexArr = s.index.split(',')
				console.log(s.index)
				if(e.changedTouches.length === 1) {
					// 如果是向右滑动或者只是点击，不改变滑动位置
					if(deltaX < 0 || deltaX == 0) {
						console.log(indexArr);
						that._setMove(indexArr[1], indexArr[0])
					}else if (deltaX > 0) {
						//如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
							that._setMove(indexArr[1], indexArr[0])
						if (deltaX>= this.delWidth) {
							that._setMove()
						}
					}
				}
			},
			 // setMOve
			_setMove(pindex = undefined, index = undefined){
				for(let i = 0; i < this.shopGoodstList.length; i++){
					// that.shopGoodstList[i].moveStyle = "transform:translateX(0rem)"
					for(let j = 0; j< this.shopGoodstList[i].goodslist.length; j++){
						this.shopGoodstList[i].goodslist[j].moveStyle = "transform:translateX(0rem)"
					}
				}
				if (pindex && index) {
					this.shopGoodstList[pindex].goodslist[index].moveStyle = "transform:translateX(-1.4rem)"
				}
				// if(index !== ''){
				//  that.shopGoodstList[index].moveStyle = "transform:translateX(-1.4rem)"
				// }
			},
			// 获取商品数据
			getGoods(){
				let shopData =[
						{
							id:0,
							title:"店铺名字",
							goodslist:[
								{
								id:'12',
								title:"商品名字",
							},{
								id:'34',
								title:"商品名字",
							}
							],
							
						},
						{
							id:1,
							title:"店铺名字2",
							goodslist:[
								{
								id:'122',
								title:"商品名字2",
							},{
								id:'122',
								title:"商品名字2",
							},{
								id:'34',
								title:"商品名字3",
							}
							],
						},
						
					]
				 for(let i = 0; i <shopData.length; i++){
					 shopData[i].checkState = false
						for(let j = 0; j<shopData[i].goodslist.length; j++){
								shopData[i].goodslist[j].moveStyle = "transform:translateX(0rem)"
								shopData[i].goodslist[j].ischeck =false;
							
						}
					}
					this.shopGoodstList = this.shopGoodstList.concat(shopData);
			},
			// 商品加
			buyPlus(index) {
				this.arr[index].num++
			},
			// 商品减
			buyReduce() {
				if(this.arr[index].num <1){
					this.arr[index].num=0
				}else{
					this.arr[index].num--
				}
			},
			// 删除商品
			deleteList(index){
				$(".del").eq(index).parents("li").remove();
			},
			// 全选框操作
			checkAll(event){
				if(!this.allState){
					for(let i=0; i< this.shopGoodstList.length; i++){
						this.shopGoodstList[i].checkState = true
						for(let j=0;j<this.shopGoodstList[i].goodslist.length;j++){
							this.shopGoodstList[i].goodslist[j].ischeck = true
						}
					}
				}else{
					for(let i=0; i< this.shopGoodstList.length; i++){
						this.shopGoodstList[i].checkState = false
						for(let j=0;j<this.shopGoodstList[i].goodslist.length;j++){
							this.shopGoodstList[i].goodslist[j].ischeck = false
						}
					}
				}
			},
			// 店铺选择框
			shopAll(index){
//				let count = this.shopGoodstList.length ;
//				let num =0 ;
				this.shopGoodstList[index].checkState = !this.shopGoodstList[index].checkState
				for (let i = 0; i < this.shopGoodstList[index].goodslist.length; i ++) {
					if (this.shopGoodstList[index].checkState) {
						this.shopGoodstList[index].goodslist[i].ischeck = true;
					} else {
						this.shopGoodstList[index].goodslist[i].ischeck = false;
					}
					
				}
				this.isAllSlt()
				
//				if(!this.shopGoodstList[index].checkState){
//					num++
//					for(let i=0;i<this.shopGoodstList[index].goodslist.length;i++){
//						this.shopGoodstList[index].goodslist[i].ischeck = true;
//					}
//				}else{
//					for(let i=0;i<this.shopGoodstList[index].goodslist.length;i++){
//						this.shopGoodstList[index].goodslist[i].ischeck = false;
//					}
//				}
//				let selectData = this.shopGoodstList.filter(item =>{
//					return item.checkState == true
//				})
//				console.log(selectData.length)
//				console.log(this.shopGoodstList.length === (selectData.length+1))
//				console.log(num)
//				console.log(count)
//				if(count === num){
//					this.allState = true
//				}else if(num < count){
//					this.allState = false;
//				}
				
			},
			// 商品选择框
			//单选
			sltActive (pindex, index) {
				let num = 0
				let allList = this.shopGoodstList[pindex].goodslist.length;
				this.shopGoodstList[pindex].goodslist[index].ischeck = !this.shopGoodstList[pindex].goodslist[index].ischeck
				for(let i = 0; i< allList; i++){
					if (this.shopGoodstList[pindex].goodslist[i].ischeck) {
						num ++
					}
				}
				if (num === allList) {
					this.shopGoodstList[pindex].checkState = true
				} else {
					this.shopGoodstList[pindex].checkState = false

				}
				
				this.isAllSlt()
// 				console.log(shopcount+"shop")
// 				if(shopcount === allList){
// 					this.allState = true  
// 				}else if(shopcount < allList){
// 					this.allState = false
// 				}
// 				if (num < count) {
// 					this.allsltstate = false
// 				}
// 				if (num === count) {
// 					this.allsltstate = true   
// 				}
			},
	
			//判断是否已经全选
			isAllSlt() {
				let length = this.shopGoodstList.length
				let num = 0
				for (let i = 0; i < length; i++) {
					if (this.shopGoodstList[i].checkState) {
						num++
					}
				}
				console.log(num, length)
				console.log(num == length)
				if (num == length) {
					this.allState = true
				} else {
					this.allState = false
				}
			}
		},
		
}
</script>

<style lang="scss">
	@import "../../../static/css/style.css";
	.car {
			width: 100%;
			height: auto;
			overflow: hidden;
			position: relative;
			background-color: #fff;
		.header{
			width: 100%;
			height: .88rem;
			display: flex;
			font-size: .34rem;
			color: #1e1e1e;
			justify-content:center;
			align-items: center;
			background: #fff;
			z-index:999;
			position: fixed;
			border-bottom: 1px solid #f5f5f5;
			top: 0;
			left: 0;
		}
		.icon-left{
			display: inline-block;
			width: .16rem;
			height: .28rem;
			margin-left: .3rem;
		}
		.header label{
			display: inline-block;
			flex: 1;
			font-weight:bold;
		}
		.edit{
			width: .6rem;
			height: .3rem;
			font-size: .3rem;
			display: inline-block;
			margin-right: .3rem;
		}
		
		// 购物车列表
		.car-list{
			border-top: .16rem solid #f1f1f1;
			margin: .88rem 0 1.95rem;
			width: 100%;
			height: auto;
			.car-adv-tips{
				width: 100%;
				height: .48rem;
				overflow: hidden;
				text-align: left;
				padding-left:.32rem; 
				line-height: .48rem;
				color: #feb336;
				background-color: #fff9e9;
			}
			.shop-goods{
				width: 100%;
				height: auto;
			}
			.shop-goods-list{
				width: 100%;
				height: auto;
				border-bottom: .16rem solid #f1f1f1;
				.shop-title{
					display: flex;
					height: .8rem;
					margin: 0 .3rem;
					align-items: center;
					
					.shop-name{
						margin: 0 0 0 .2rem;
						font-size: .24rem;
						vertical-align: middle;
					}
					.icon-right{
						width: .1rem;
						height: .18rem;
						vertical-align: middle;
						margin: 0 0 0 .2rem;
					}
				}
				// 商品清单
				.goods-list{
					margin: 0 .3rem;
				}
				.goods-list-li{
					height: 2.1rem;
					display: flex;
					border-bottom: 1px solid #f1f1f1; 
					align-items: center;
					transition: all 0.5s;
				}
				.goods-img{
					width: 1.8rem;
					height: 1.8rem;
					margin: 0 0 0 .2rem;
					img{
						width: 100%;
						height: 100%;
						border-radius: .04rem;
					}
				}
				.goods-txt{
					margin: 0 0 0 .24rem;
					text-align: left;
				}
				.goods-name{
					width:4.40rem;
					line-height: .36rem;
					font-size: .26rem;
					height: .72rem;
					display:-webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.goods-type{
					color: #9c9c9c;
					margin: .18rem 0 .26rem  0;
				}
				.goods-choose{
					display: flex;
					justify-content: space-between;
				}
				.goods-price{
					color: #b50000;
					margin: 0;
					font-size: .3rem;
				}
				.goods-choose-input{
					width: 1.6rem;
					height: .4rem;					
					margin: 0;
					font-size: .24rem;
					display: flex;
					border-radius: .04rem;
					border: solid 0.02rem #eee;
				}
				.goods-choose-input input {
					width: .4rem;
					height: .36rem;
					border: none;
					outline: none;
					color: #999;
					text-align: center;
					background-color: #fff;
				}
				.buy-reduce.forbid {
					color: #eee;
				}
				.buy-count {
					display: inline-block;
					width: .8rem;
					color: #999;
					border-left: solid 0.02rem #eee;
					border-right: solid 0.02rem #eee;
				}
				.del-btn{
					width: 1.4rem;
					height:2.1rem;
					color: #fff;
					line-height: 2.1rem;
					text-align: center;
					background: #b50000;
					position: absolute;
					right: -1.7rem;
				}
				
			}
		}
	
		// 选择按钮
		.check-box{
			width: .3rem;
			height: .3rem;
			margin: 0;
			display: inline-block;
			vertical-align: middle;
			position: relative;
		}
		.check-box input{
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
			z-index: 2;
		}
		.check-box input:checked + label{
			border: none;
			background: #ffba30;
			background-image: url('../../../static/img/icon-check-fff.png');
			background-repeat: no-repeat;
			background-size:.21rem .14rem;
			background-position: .04rem .08rem;
		}
		.check-box .checkbox-label{
			display: inline-block;
			width: .3rem;
			height: .3rem;
			border-radius:50%;
			border: .02rem solid #babac2;
		}
		// 管理栏
		.manager-nav{
			width: 100%;
			height: .95rem;
			position: fixed;
			display: flex;
			align-items: center;
			bottom: 1rem;
			left: 0;
			background: #fff;
			box-shadow: 2px 3px 5px #0c0c0c; 
			z-index: 5;
			.all-check{
				// width: 1.1rem;
				margin: 0 0 0 .32rem;
			}
			.check-title{
				font-size: .28rem;
				color: #999;
				margin: 0 0 0 .16rem;
				vertical-align: middle;
			}
			.car-del{
				width: 1.2rem;
				height: .4rem;
				border-radius: .2rem;
				color: #feb336;
				font-size: .26rem;
				line-height: .34rem;
				font-family: 'pf-Regular';
				margin-right: 0.3rem;;
				border: solid 1px #feb336;
			}
			.car-total-price{
				margin-right:0;
				font-size: .28rem;
			}
			.gray{
				color: #999;
			}
			.money{
				color:#b50000;
				margin: 0 .15rem;
			}
			.account-btn{
				width: 2.26rem;
				height:.95rem;
				margin:0;
				font-size: .3rem;
				line-height: .95rem;
				color: #fff;
				align-self: center;
				background-image: linear-gradient(98deg,#feca3a 0%, #feb336 100%), linear-gradient(	#c8c8c8, #c8c8c8);
				background-blend-mode: normal,normal;
				box-shadow: 0px 9px 17px 1px rgba(254, 166, 19, 0.2);
			}
		}
		
	}
</style>
