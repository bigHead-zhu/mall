<template>
    <div class="vue-box">
        <div class="account-back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="userback">
            <p>通用</p>
        </div>
        <div class="box"></div>
        <div class="account-list" >
            <p>推送消息设置</p>
            <img src="../../../../static/img/user/arrow.png" alt="">
        </div>
        <div class="account-list" >
            <p>隐私设置</p>
            <img src="../../../../static/img/user/arrow.png" alt="">
        </div>
        <div class="account-list" >
            <p>清除本地缓存</p>
            <img src="../../../../static/img/user/arrow.png" alt="">
        </div>
        <div class="account-list" >
            <p>当前版本号</p>
            <img src="../../../../static/img/user/arrow.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        userback() {
            this.$router.go(-1)
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../../static/css/style.css";

.vue-box{
    .account-back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
    }
    .account-back img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .account-back p{
        font-size: .34rem;
        font-family:'pf-Bold';
        color: #1e1e1e;
        width: 6.58rem;
        text-align: center;
    }
    .box{
        height: 0.16rem;
        width: 100%;
        background-color: #f1f1f1; 
    }
    .account-list{
        height: 0.86rem;
        /* margin-left: 0rem; */
        border-bottom: 0.01rem solid #ececec;
        text-align: left;
        margin-left: 0.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .account-list p{
        font-size: 0.28rem;
        color: #666666;
    }
    .account-list img{
        width: 0.1rem;
        height: 0.18rem;
        margin-right: 0.3rem;   
    }
    .right{
        width: 0.1rem;
        height: 0.18rem;
        margin-right: 0.3rem; 
    }
}
</style>
