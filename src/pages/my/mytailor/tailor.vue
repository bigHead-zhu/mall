<template>
    <div class="order-main">
        <div class="back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="back">
            <p>私人订制</p>
            <span @click="myissue">我的定制</span>
        </div>
        <div class="tailor">
            <ul>
                <router-link to="/tailor1">全部分类</router-link>
                <router-link to="/tailor2">服饰内衣</router-link>
                <router-link to="/tailor3">女装女鞋</router-link>
                <router-link to="/tailor4">男鞋男装</router-link>
            </ul>
            <router-view></router-view>
        </div>
        <div class="tailor-issue" @click="issue">
            <img src="../../../../static/img/user/issue.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        back() {
            this.$router.push({path:"/my"})
        },
        issue() {
            this.$router.push({path:"/issue"})
        },
        myissue() {
            this.$router.push({path:"/myissue"})
        }
    }
}
</script>
<style scoped lang="scss">
@import "../../../../static/css/style.css";

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
    }
    .back p{
        font-size: 0.28rem;
        font-size: 0.34rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
    }
    .back span{
        margin-right: 0.3rem;
        color: #ffba30;
        margin-left: 2rem;
    }


    
    .router-link-active{
        border-bottom: 0.04rem solid #feb336;
        color: #feb336;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .tailor{
        width: 100%;
        height: 0.8rem;
        
    }
    .tailor ul{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
    }
    .selection{
        border-bottom: 0.04rem solid #feb336;
        color: #feb336;
    }
    .tailor-issue img{
        width: 0.72rem;
        height: 0.72rem;
        position: fixed;
        bottom: 1.26rem;
        right: 0.24rem;
    }
}
</style>
