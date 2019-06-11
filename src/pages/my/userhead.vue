<template>
    <div class="account">
        <div class="account-back">
            <img src="../../../static/img/user/arrowLeft.png" alt="" @click="userback">
            <p>账户设置</p>
        </div>
        <div class="my-userinfo" @click="replace">
            <div class="avatar">
                <img v-lazy="headIcon" alt="">
            </div>
            <div class="mobile">
                <p>{{nickName}}</p>
                <div class="member">{{levelName}}</div>
            </div>
            <div class="right"><img src="../../../static/img/user/arrow.png" alt=""></div>
        </div>
        <div class="account-list" @click="address">
            <p>地址管理</p>
            <img src="../../../static/img/user/arrow.png" alt="">
        </div>
        <div class="account-list" @click="security">
            <p>账户与安全</p>
            <img src="../../../static/img/user/arrow.png" alt="">
        </div>
        <div class="account-list" @click="currency">
            <p>通用</p>
            <img src="../../../static/img/user/arrow.png" alt="">
        </div>
        <div class="account-list" @click="Logout">
            <p>退出当前账号</p>
            <img src="../../../static/img/user/arrow.png" alt="">
        </div>
        <popup ref="myConfirm" @userBehavior="onback"></popup>
    </div>
</template>

<script>
import popup from '@/pages/my/popup'
import common from '../../plugins/common.js';

export default {
    data() {
        return{
                headIcon:"../../../static/img/user/arrow.png",
                nickName:"",
                levelName:"",
                data:""
        }
    },
    methods:{
        userback() {
            this.$router.go(-1)
        },
        address() {
            this.$router.push({
                path:"/carAddr",
                // goodsId:this.$route.query.goodsId
            })
        },
        security() {
            this.$router.push("/security")
        },
        currency() {
            this.$router.push("/currency")
        },
        replace() {
            this.$router.push({path:"/replace",query:this.data})
        },
        Logout() {
            this.$refs.myConfirm.show("退出登录", {titleText:"操作提示",cancelText:"取消",confirmText:"确认",type:"confirm"})
            common.clearCookie();
        },
        onback(type) {
            console.log(type);
            if(type == "clickConfirm") {
                localStorage.removeItem('islogin');
                common.clearCookie();
                this.$router.push({path:"/"});
            }else{
                console.log("用户点击了取消")
            }
        }
    },
    created(){
        let data = this.$route.query;
        this.data = data;
        this.headIcon= data.headIcon;
        this.nickName= data.nickName;
        this.levelName= data.levelName;

        // console.log(this.$route.query)
    },
    mounted() {
        

    },
    components:{
        popup
    }
}
</script>

<style lang="scss" scoped>
@import "../../../static/css/style.css";

.account{
    .my-userinfo{
        width: 100%;
        height: 2.5rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align:left;
        border-bottom: 0.01rem solid #ececec;
    }
    
    .avatar{
        width: 1rem;
        height: 1rem;
        margin-left: 0.3rem;
    }
    .avatar img{
        width: 100%;
        height: 100%;
    }
    .mobile{
        margin-left: -1.8rem;
    }
    .mobile p {
        font-size: 0.28rem;
        // font-weight: bold;
        font-family: "pf-Bold";
        margin-bottom: 0.1rem;
    }
    .member{
        font-family: "pf-Medium";
        width: 1.2rem;
        height: 0.36rem;
        font-size: 0.18rem;
        color: #cfba89;
        background: linear-gradient(to right,#252525,#505050);
        border-radius: 0.14rem;
        line-height: 0.35rem;
        text-align: center;
        margin-top: 0.1rem;
        margin-left: -0.1rem;
        transform: scale(0.9);
    }
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
