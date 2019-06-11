<template>
    <div class="order-main">
        <div class="back">
            <img src="../../../static/img/user/arrowLeft.png" alt="" @click="back">
            <p>我的推广</p>
        </div>
        <div>
            <div class="select">
                <div class="list">
                    <router-link to="/popularizeUser">用户</router-link>
                </div>
                <div class="list">
                    <router-link to="/popularizeFirm">商家</router-link>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        back() {
            this.$router.push({path:"/my"})
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../../static/css/style.css";

.order-main{
    .back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
    }
    .back img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .back p{
        font-size: 0.34rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
        width: 6.58rem;
        text-align: center;
    }
    .select{
        height: 0.66rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.28rem;
    }
    .user{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.28rem;
        margin-top: 0.5rem;
    }
    .user img{
        width: 0.8rem;
        height: 0.8rem;
        margin-left: 0.3rem;
    }
    .userinfo{
        margin-left: -3.7rem;
        color: #aaaaaa;
        text-align: left;
    }
    .selection{
        border-bottom: 0.04rem solid #feb336;
        color: #feb336;
        
    }
    .router-link-active{
        border-bottom: 0.04rem solid #feb336;
        color: #feb336;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .list{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        flex-direction: row;
    }
}
</style>