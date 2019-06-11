<template>
		<!-- 地址 -->
	<div class="addr-main" v-if="addrProps" name ="address">
		<div class="addr-title c1e f32">
			您的位置
			<img @click="maskLayer" src="../../static/img/icon-close.png" />
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
	<!--  -->
</template>

<script>
</script>

<style lang="scss" scoped>
	.addr-main{
			width: 100%;
			height: 10rem;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			border-radius: .2rem .2rem 0 0;
			z-index: 25;
		.addr-title{
			text-align: left;
			margin:.32rem .3rem;
		}
		.addr-title img{
			float: right;
			width: .32rem;
			height: .32rem;
		}
		.addr-detail{
			margin: 0 .3rem;
		}
		.address-title{
			height: .46rem;
			line-height: .46rem;
			font-size: .26rem;
			color: #ffba30;
			border-bottom:.03rem  solid  #f2f2f2;
		}
		.address-title li{
			float: left;
			height: 100%;
			margin-right: .7rem;
		}
		.address-title li.active{
			border-bottom:.03rem  solid  #ffba30;
		}
		.address-list{
			
		}
		.ad-list{
			float: left;
			height: 8.58rem;
			overflow: auto;
			text-align: left;
			margin-right: .8rem;
		}
		.ad-list .person{
			color: #ffba30;
		}
		.ad-list li{
			font-size: .26rem;
			color: #1e1e1e;
			line-height: .26rem;
			margin-top: .55rem;
		}
	}
	
</style>
