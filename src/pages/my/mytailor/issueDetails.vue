<template>
    <div class="vue-box">
        <myback :title="this.title"/>
        <div>
            <div class="issue-title">
                {{issue.title}}
            </div>
            <div class="issue-content">
                <div class="user-headimg">
                    <img src="../../../../static/img/user/avatar.png" alt="">
                </div>
                <div class="issue-name">
                    {{issue.userName}}
                </div>
                <div class="issue-select">{{issue.categoryDesc}}</div>
            </div>
            <div class="textarea">
                {{issue.custDesc}}
            </div>
            <div>
                <img v-lazy="issue.custImg" />
            </div>
        </div>
        <div class="moreinfo">
            <p class="moreinfo-title">更多信息</p>
            <div class="moreinfo-time">
                <p>定制时间</p>
                <p class="usernews">{{issue.custTimeStr}}</p>
                <!-- <input type="number" placeholder="2019-05-13"/> -->
            </div>
            <div class="phone">
                <p>联系方式</p>
                <p class="usernews">{{issue.userPhone}}</p>
                <!-- <input type="number" placeholder="userPhone"/> -->
            </div>
        </div>
        <div class="to-issue" @click="popup">
            确认收货
        </div>
        <popup ref="myConfirm" @userBehavior="onback"></popup>
    </div>
</template>
<script>
import myback from '@/pages/my/myback'
import popup from '@/pages/my/popup'

export default {
    data() {
        return {
            title:"定制详情",
            userName:"一个死安华",
            custDesc:"",
            categoryDesc:"",
            custTimeStr:"",
            userPhone:"",
            issue:{}


        }
    },
    components:{
        myback,
        popup
    },
    methods:{
        popup() {
            // this.$router.push({path:"/popup"})
            this.$refs.myConfirm.show("确认收货", {titleText:"操作提示",cancelText:"取消",confirmText:"确认",type:"confirm"})
        },
        onback(type) {
            console.log(type);
            if(type) {
                 this.$router.push({path:"/my"})
            }
        }
    },
    created(){
        let data = this.$route.query;
        console.log(data);
        this.issue = data
    }
}
</script>
<style lang="scss" scpoed>
.vue-box{
    .issue-title{
        font-size: 0.48rem;
        font-weight: bold;
        text-align: left;
        padding-left: 0.3rem;
        margin-top: 0.5rem;
    }
    .usernews{
        margin-top: 0.3rem;
        font-size: 0.26rem;
        color: #aaaaaa;
    }
    .issue-content{
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        margin-top: 0.4rem;
    }
    .user-headimg{
        width: 0.4rem;
        height: 0.4rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .user-headimg img{
        width: 100%;
        height: 100%;
    }
    .issue-name{
        margin-left: 0.18rem;
        font-size: 0.24rem;
    }
    .issue-select{
        width: 1.2rem;
        height: 0.4rem;
        border: 0.01rem solid #ffba30;
        color: #ffba30;
        border-radius: 0.05rem;
        margin-right: 0.3rem;
    }
    .textarea{
        font-size: 0.32rem;
        margin-top: 0.36rem;
        margin-bottom: 0.4rem;
        margin-left: 0.3rem;
        text-align: left;
        margin-right: 0.5rem;
    }



    .moreinfo{
        padding-left: 0.3rem;
        text-align: left;
        margin-top: 0.4rem;
    }
    .moreinfo-title{
        font-size: 0.34rem;
        font-weight: bold;
        
    }
    .moreinfo-time{
        height: 1.5rem;
        width: 6.9rem;
        margin-left: 0rem;
        border-bottom: 0.01rem solid #ececec;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .moreinfo-time p{
        font-size: 0.24rem;
        font-weight: 600;
    }
    .moreinfo-time input{
        width: 100%;
        margin-top: 0.3rem;
    }
    .phone{
        height: 1.5rem;
        width: 6.9rem;
        
        margin-left: 0rem;
        border-bottom: 0.01rem solid #ececec;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .phone p{
        font-size: 0.24rem;
        font-weight: 600;
    }
    .phone input{
        width: 100%;
        margin-top: 0.3rem;
    }
    .to-issue{
        width: 6.4rem;
        height: 0.8rem;
        background-color: #fec339;
        color: #ffffff;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.4rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
}
</style>
