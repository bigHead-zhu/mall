<template>
    <div class="wallet">
        <div class="wallet-back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="walletback">
            <p>VIP钱包充值</p>
        </div>
        <div class="box"></div>
        <div class="profit">
            <div class="card">
                    <div class="cardimg1">
                        <p class="name">Drill card</p>
                        <p class="price">1000.00</p>
                        <p class="tips">注意：试用卡片支付时无法组合支付</p>
                    </div>
                    <div class="cardimg2">
                        <p class="name">Gold card</p>
                        <p class="price">500.00</p>
                        <p class="tips">注意：试用卡片支付时无法组合支付</p>
                    </div>
                    <div class="cardimg3">
                        <p class="name">Silver card</p>
                        <p class="price">300.00</p>
                        <p class="tips">注意：试用卡片支付时无法组合支付</p>
                    </div> 
			</div>

        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
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
        
    },
    methods:{
        walletback() {
            this.$router.go(-1)
        },
    },
    components:{
        
    }
}
</script>

<style scoped lang="scss">
@import "../../../../static/css/style.css";

.wallet{
        background-color: #f1f1f1;
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
        background-color: #ffffff;
    }
    .wallet-back img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .wallet-back p{
        font-size: 0.34rem;
        // font-weight: 700;
        color: #1e1e1e;
        font-family:'pf-Bold';
        width: 6.58rem;
        text-align: center;
    }
    .box{
        height: 0.16rem;
        width: 100%;
        background-color: #f1f1f1; 
    }
    .profit{
        width: 100%;
        height: 4.4rem;
        margin-left: 0rem;
        text-align: left;
        flex-direction: row;
        justify-content: center;
        background-color: #ffffff;
    }
    .card{
        width: auto;
        border-radius: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        font-size: 0.48rem;
        background-position: center 0;
        background-size: cover;
        .cardimg1{
            height: 3.54rem;
            width: 6.3rem;
            margin-top: 0.4rem;
            background: url("../../../../static/img/user/Diamondscard.png") no-repeat;
            background-size: cover;
            .name{
                font-size: 0.36rem;
                font-family:'pis';
                margin-top: 0.5rem;
                margin-left: 0.36rem;
            }
            .price{
                font-size: 0.72rem;
                margin-top: 0.9rem;
                margin-left: 0.35rem;
                font-family:'pis';
            }
            .tips{
                font-size: 0.22rem;
                font-family:'pf-Regular';
                margin-left: .35rem;
            }
        }
        .cardimg2{
            height: 3.54rem;
            width: 6.3rem;
            margin-top: 0.4rem;
            background: url("../../../../static/img/user/normalcard.png") no-repeat;
            background-size: cover;
            .name{
                font-size: 0.36rem;
                font-family:'pis';
                margin-top: 0.5rem;
                margin-left: 0.36rem;
            }
            .price{
                font-size: 0.72rem;
                margin-top: 0.9rem;
                margin-left: 0.35rem;
                font-family:'pis';
            }
            .tips{
                font-size: 0.22rem;
                font-family:'pf-Regular';
                margin-left: .35rem;
            }
        }
        .cardimg3{
            height: 3.54rem;
            width: 6.3rem;
            margin-top: 0.4rem;
            background: url("../../../../static/img/user/silvercard.png") no-repeat;
            background-size: cover;
            .name{
                font-size: 0.36rem;
                font-family:'pis';
                margin-top: 0.5rem;
                margin-left: 0.36rem;
            }
            .price{
                font-size: 0.72rem;
                margin-top: 0.9rem;
                margin-left: 0.35rem;
                font-family:'pis';
            }
            .tips{
                font-size: 0.22rem;
                font-family:'pf-Regular';
                margin-left: .35rem;
            }
        }
    }
    
}
</style>
