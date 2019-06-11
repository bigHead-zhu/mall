<template>
<div class="vue-box">
    <div class="box"></div>
    <div class="tailor1" v-for="(item,index) in volumelist" :key="index">
        <div class="tailor1-img">
            <!-- <img src="../../../../static/img/user/issueimg.png" alt=""> -->
            <p class="volumeprice">300</p>
            <p class="volumenews">满3000元可用</p>
        </div>
        <div class="tailor1-title">
            <div class="title-one">
                <div class="title1">{{item.couponType}}</div>
                <p>仅可购买优惠券商家商品</p>
            </div>
            <div class="title-three">
                <p>{{item.startTime}}-{{item.endTime}}</p>
            </div>
            <div class="title-two">
                <p>使用说明：此卷不能与商家卷叠加使用，请在有效期使用</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import user from '../../../server/user.js';

export default {
    data() {
        return {
            params:{
                fromNum: 0,
                openId: "string",
                pageSize: 10,
                source: 0,
                type: 2,
                userId: "string",
                userToken: "string"
            },
            volumelist:[]
        }
    },
    methods: {
        getNumberWallet() {
            user.numberWallet(this.params).then(res=>{
                this.volumelist = res.data.myCouponListVo
                console.log(res);
            })
        }
    },
    mounted() {
        const islogin = JSON.parse(localStorage.getItem("islogin"));
        this.params.userToken = islogin.userToken;
        this.params.userId = islogin.userId;
        this.getNumberWallet();
    },
    created() {
        
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
.vue-box{


    .tailor1{
        width: 6.8rem;
        height: 2rem;
        margin-left: 0rem;
        text-align: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0.3rem;
        margin-top: 0.3rem;
        background: url('../../../../static/img/user/bg-volume.png') ;
        background-size: cover;
    }
    .box{
        height: 0.16rem;
        width: 100%;
        margin-top: 0.1rem;
        background-color: #f1f1f1; 
    }
    .tailor1-img{
        width: 2.6rem;
        height: 2rem;
        margin-right: 0.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .volumeprice{
        color: #fff;
        font-size: 0.72rem;
        font-weight: bold;
    }
    .volumenews{
        color: #fff;
        font-size: 0.26rem;
        font-weight: 500;
    }
    .tailor1-title{
        width: 4.5rem;
        margin-left: 0rem;
    }
    .title1{
        width: 1rem;
        height: 0.34rem;
        background-color: #fc5649;
        color: #ffffff;
        font-size: 0.22rem;
        font-weight: 500;
        line-height: 0.34rem;
        text-align: center;
        border-radius: 0.05rem;
        float: left;
        margin-right: 0.24rem;
    }
    .title-one{
        width: 4rem;
        font-size: 0.22rem;
        
    }
    .title-one p{
        font-size: 0.22rem;
    }
    .title-two{
        width: 4rem;
        font-size: .2rem;
        color: #999;
        border-top: 0.01rem solid #f1f1f1;
        padding-top: 0.14rem;
    }
    .title-three{
        width: 4rem;
        color: #aaaaaa;
        font-size: 0.2rem;
            margin-bottom: 0.25rem;
    }
}
</style>
