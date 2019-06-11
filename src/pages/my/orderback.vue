<template>
    <div class="myorder-back">
        <img src="../../../static/img/user/arrowLeft.png" alt="" @click="orderback">
        <p>我的订单</p>
    </div>
</template>

<script>
export default {
    methods:{
        orderback() {
            // this.$router.go(-1)
            this.$router.push({path:"/my"})
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/style.css";

    .myorder-back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
    
    img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    p{
        font-size: .34rem;
        color: #1e1e1e;
        font-family: 'pf-Bold';
        // font-weight: 700;
        width: 6.58rem;
        text-align: center;
    }
    }
</style>
