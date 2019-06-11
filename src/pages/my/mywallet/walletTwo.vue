<template>
    <div class="wallet-card">
        <div class="wallet-back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="walletback">
            <p>VIP钱包</p>
        </div>
		<div class="com-swiper-box">
			<swiper :options="swiperOptionGood" class="banner-box">
				<swiper-slide v-for = "(item,index) in wallent" :key="index">
					<div class="card-main" :class="item.name">
						<div class="card-title">
							<span>{{item.title}}</span>
							<label></label>
							<label class="dot"></label>
						</div>
						<div class="card-money">
							<small>¥</small>{{item.balance}}
						</div>
					</div>
				</swiper-slide>
				
			</swiper>
		</div>
		<div class="vip-txt">《会员权益说明》</div>
       
        <div class="record-list">
            <div class="record" @click="buyCard">
                <p>VIP钱包购买</p>
                <img src="../../../../static/img/user/arrow.png" alt="">
            </div>
            <div class="detailed" @click="detailed">
				<p>交易明细</p>
                <img src="../../../../static/img/user/arrow.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import user from '../../../server/user.js';
import common from '../../../plugins/common.js';
export default {
    data() {
        return {
			swiperOptionGood: {
				loop: false,
				slidesPerView: 'auto',
				spaceBetween: '1%',
				centeredSlides: false,
			},
			params:{
				userId:'',
				userToken:'',
				source:0
			},
			wallent:[],
            paddingleft: {
                'padding-left': "13.4rem"
            },
            startX:"",//触摸开始x轴
            endX:"",//触摸结束X轴
            cardlist:[
                {
                    img:"../../../../static/img/user/normalcard.png",
                    money:1000
                },
                {
                    img:"../../../../static/img/user/silvercard.png",
                    money:10000
                },
                {
                    img:"../../../../static/img/user/Diamondscard.png",
                    money:10000
                }
            ]
        }
        
    },mounted(){
		 let islogin = JSON.parse(localStorage.getItem("islogin"));
		this.params.userToken = islogin.userToken;
		this.params.userId = islogin.userId;
		this.getBag();
	},
    methods:{
        walletback() {
            this.$router.go(-1)
        },
        buyCard(){
            this.$router.push({path:"/buyCard"})
        },
        detailed() {
            this.$router.push({path:"/detailed",query:{code:3,title:"收益明细"}})
        },
        handleTouchStart (event) {
            this.startX = event.touches[0].clientY
        },
        handleTouchEnd (event) {
            this.startX = event.touches[0].clientY
        },
        leftChangeImg(){
            console.log("左滑动")
        },
        rightChangeImg(){
            console.log("右滑动")
        },
		// 获取用户钱包
		getBag(){
			console.log(this.params)

			user.getBag(this.params).then(res =>{
				console.log(res)
				if(res.code==0){
					this.wallent = []
					let title = '',name="";
					for(let i =0 ;i<res.data.vipWalletList.length;i++){
						switch(res.data.vipWalletList[i].level){
							case 0:
								title="Silver card";
								name="bank";
								break;
							case 1:
								title="Gold card"
								name = 'gold'
								break;
							case 2:
								title="Drill card"
								name = 'drill'
								break;
						}
						this.wallent.push({
							id:res.data.vipWalletList[i].id,
							title:title,
							name:name,
							balance:res.data.vipWalletList[i].restMoney
						})
					}
				}else{
					console.error(res.message)
				}
			})
		}
    }
}
</script>

<style scoped lang="scss">
@import "../../../../static/css/style.css";

.wallet-card{
        background-color: #fff;
    .number{
            position: relative;
    z-index: 999;
    color: #fff;
    top: 2rem;
    left: 2rem;
    }
    .wallet-back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
    }
    .wallet-back img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .wallet-back p{
        font-size: 0.34rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
        width: 6.58rem;
        text-align: center;
    }
    .profit{
        width: 100%;
        height: 4.4rem;
        margin-left: 0rem;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }
	/* 相册 start */
	.com-swiper-box {
		position: relative;
		-webkit-justify-content: center;
		display: flex;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
		.banner-box {
			margin: .3rem 0 .0rem .5rem;
			.swiper-slide {
				width: 6.4rem;
				height: 3.54rem;
			}
			.swiper-slide img{
				width: 100%;
				height: 100%;
				border-radius: .04rem;
			}
		}
		
	}
	.vip-txt{
		border-bottom: .16rem solid #f1f1f1;
		font-size: .24rem;
		padding:.2rem 0; 
		color: #666;
		
	}
	/* 相册 end */
    .record-list{
        margin-top: 0.16rem;
        background-color: #ffffff;
    }
    .record,.detailed{
        height: 1rem;
        width: 100%;
        font-size: 0.28rem;
        line-height: 1rem;
        color: #959595;
        text-align: left;
        border-bottom: 0.01rem solid #ececec;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
	.record p,.detailed p{
		margin-left: .3rem;
	}
    .record img,.detailed img{
        width: 0.1rem;
        height: 0.18rem;
        margin-right: 0.3rem;
    }
    
	.card-main{
			height: 3.54rem;
			overflow: hidden;
			border-radius: .06rem;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			font-family: 'pis';
			color: #fff;
			text-align: left;
			.card-title{
				padding: .5rem .3rem 0 .36rem;
				position: relative;
				span{
					font-size: .36rem;
				}
				label{
					display: inline-block;
					position: absolute;
					right: .3rem;
					top: .5rem;
					width: .3rem;
					height: .3rem;
					z-index: 5;
					background: #fff;
					border-radius: 50%;
					opacity: .4
				}
				.dot{
					right: .45rem;
				}
			}
			// 金额
			.card-money{
				font-size: .72rem;
				line-height: .72rem;
				margin: 1rem 0 0 .36rem;
				small{
					font-size: .42rem;
					margin-right: .15rem;
				}
			}
			p{
				font-size: .22rem;
				line-height: .22rem;
				margin: .3rem 0 0 .36rem;
				font-family: 'pf-Regular'
		}
	}
	// 金卡背景
	.gold{
		background-image: url('../../../assets/car/bg-gold.png');
	}
	// 银卡
	.bank{
		background-image: url('../../../assets/car/bg-bank.png');
	}
	// 钻卡
	.drill{
		background-image: url('../../../assets/car/bg-drill.png');
		
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
}
</style>
