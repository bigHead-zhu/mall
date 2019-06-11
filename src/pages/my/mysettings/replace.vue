<template>
    <div class="vue-box">
        <!-- 头像和昵称设置 -->
        <myback :title="this.title"/>
        <div class="set">
            <p class="head">头像</p>
            <div class="head-img">
                <img v-lazy="headIcon" alt="">
            </div>
            <div class="right">
                <img src="../../../../static/img/user/arrow.png" alt="">
            </div>
        </div>
        <div class="set">
            <p class="head">昵称</p>
            <div class="head-name">
                {{nickName}}
            </div>
            <div class="right">
                <img src="../../../../static/img/user/arrow.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import myback from '@/pages/my/myback'

export default {
    data() {
        return {
                headIcon:"",
                nickName:"",
                title:"用户头像"
        }
    },
    created() {
        let data = this.$route.query;
        this.headIcon = data.headIcon;
        this.nickName = data.nickName;
        console.log(this.$route.query)
    },
    mounted() {
        

    },
    components:{
        myback
    }
}
</script>
<style lang="scss" scoped>
.vue-box{


    .set{
        height: 1.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .head{
        margin-left: 0.3rem;
        color: #666666;
    }
    .head-img{
        margin-right: 0rem;
    }
    .head-img img{
        width: 1rem;
        height: 1rem;
    }
    .right{
        margin-right: 0.3rem;
        margin-left: 0.3rem;
        width: 0.1rem;
        height: 0.18rem;
    }
    .right img{
        width: 100%;
        height: 100%;
    }
    .head-name{
        margin-right: 0.1rem;
    }
}
</style>
