<template>
    <div class="vue-box">
        <div>
            <div class="user" v-for="(item,index) in spreadlist" :key="index">
                <img v-lazy="item.headIcon" alt="">
                <div class="userinfo">
                    <p>账号：{{item.phone}}</p>
                    <p>时间:{{item.date}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import user from '../../server/user.js';

export default {
    data() {
        return {
            params:{
                fromNum: 0,
                openId: "string",
                pageSize: 10,
                source: 0,
                type: 1,
                userId: "string",
                userToken: "string"
            },
            spreadlist:[]
        }
    },
    methods: {
        getextendlist() {
            user.extendlist(this.params).then(res=>{
                console.log(res);
                this.spreadlist = res.data.recoUserAndMercVo
                console.log(this.spreadlist);
            })
        }
    },
     mounted() {
        const islogin = JSON.parse(localStorage.getItem("islogin"));
        this.params.userToken = islogin.userToken;
        this.params.userId = islogin.userId;
        this.getextendlist();
    },
}
</script>

<style lang="scss" scoped>
    .vue-box{
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
        margin-right: 0rem;
    }
    .userinfo{
        margin-left: .3rem;
        color: #aaa;
        border-bottom: 0.01rem solid #f1f1f1;
        text-align: left;
        padding-bottom: 0.3rem;
        width: 100%;
    }
    }
</style>