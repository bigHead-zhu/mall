<template>
    <div class="wallet">
        <div class="wallet-back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="walletback">
            <p>收益钱包</p>
        </div>
        <div class="profit">
            <div class="revenue">当前收益</div>
            <div class="money-titli">收益金额</div>
            <div class="money">{{money}}<span>元</span></div>
            <!-- <div class="button">
                <div class="take">提现</div>
                <div class="transfer">转账</div>
            </div> -->
        </div>
        <div class="record-list">
            <div class="record" @click="detailed1">
                <p>交易记录</p>
                <img src="../../../../static/img/user/arrow.png" alt="">
            </div>
            <div class="detailed" @click="detailed2">
				<p>收益明细</p>
                <img src="../../../../static/img/user/arrow.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            money:""
        }
    },
    created() {
        this.money = this.$route.query.walletone
    },
    methods:{
        walletback() {
            this.$router.go(-1)
        },
        detailed1() {
            this.$router.push({path:"/detailed",query:{code:2,title:"交易明细",num:0}})
        },
        detailed2() {
            this.$router.push({path:"/detailed",query:{code:2,title:"收益明细",num:1}})
        }
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../static/css/style.css";

   .wallet{
        background-color: #f1f1f1;
    
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
        height: 3.48rem;
        margin-left: 0rem;
        text-align: left;
        background-color: #ffffff;
    }
    .revenue{
        height: 1rem;
        width: 100%;
        font-size: 0.34rem;
        line-height: 1rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
        // font-weight: 800;
        padding-left: 0.3rem;
    }
    .money-titli{
        height: 0.7rem;
        width: 100%;
        font-size: 0.24rem;
        line-height: 0.7rem;
        padding-left: 0.3rem;
        color: #aaaaaa;
    }
    .money{
        font-size: 0.6rem;
        width: 100%;
        color: #1e1e1e;
        font-family:'pf-Bold';
        padding-left: 0.3rem;
    }
    .money span {
        font-size: 0.24rem;
        margin-left: 0.05rem;
    }
    .button{
        height: 1rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .take{
        width: 0.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        margin-left: 0.3rem;
        background-color: #e9f6ef;
        color: #20d26d;
        text-align: center;
    }
    .transfer{
        margin-left: -5.4rem;
        width: 0.8rem;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        border: 0.01rem solid #20d26d;
        border-radius: 0.05rem;
        color: #20d26d;
        text-align: center;
    }
    .record-list{
        margin-top: 0.16rem;
        background-color: #ffffff;
    }
    .record{
        height: 1rem;
        // width: 100%;
        font-size: 0.28rem;
        line-height: 1rem;
        color: #959595;
        text-align: left;
        border-bottom: 0.01rem solid #ececec;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
	.record p{
		margin-left: 0.3rem;
	}
    .record img{
        width: 0.1rem;
        height: 0.18rem;
        margin-right: 0.3rem;
    }
    .detailed{
        height: 1rem;
        font-size: 0.28rem;
        line-height: 1rem;
        color: #959595;
        padding-left: 0.3rem;
        text-align: left;
        border-bottom: 0.01rem solid #ececec;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .detailed img{
        width: 0.1rem;
        height: 0.18rem;
        margin-right: 0.3rem;
    }
    }
</style>
