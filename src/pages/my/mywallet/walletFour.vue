<template>
    <div class="number-card">
        <div class="wallet-back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="walletback">
            <p>数字钱包</p>
        </div>
        <div class="card-content">
            <div class="card-list">
                 <router-link to="/unexpired">未使用<span>(1)</span></router-link>
            </div>
            <div class="card-list">
                <router-link to="/use">已使用<span>(0)</span></router-link>
            </div>
            <div class="card-list">
                <router-link to="/invalid">已过期<span>(0)</span></router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods:{
        walletback() {
            // this.$router.go(-1)
            this.$router.push({path:"/my"})
        }
    },
}
</script>

<style scoped lang="scss">
@import "../../../../static/css/style.css";

.number-card{
    .wallet-back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
        /* justify-content: center; */
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
    .card-content{
        height: 0.6rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .card-list{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        flex-direction: row;
        a{
            font-size: 0.28rem;
        }
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
}
</style>

