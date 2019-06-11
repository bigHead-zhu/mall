<template>
    <div class="myorder-back">
        <img src="../../../static/img/user/arrowLeft.png" alt="" @click="orderback">
        <div class="content">
            {{title}}
        </div>
    </div>
</template>

<script>
export default {
    // mounted() {
    //     console.log(this.data)
    //     this.mydata = this.data
    //     console.log(this.mydata)
    // },
    data() {
        return {
        }
    },
    props: ["data"],
    methods: {
        orderback() {
            this.$router.go(-1)
            // this.$router.push({path:"/my"})
        }
    },
    props:["title"],
    mounted() {
        console.log(this.title)
    },
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
        background: #fff;
        /* justify-content: center; */
    }
    .myorder-back img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .content{
        width: 6.7rem;
        font-size: 0.34rem;
        text-align: center;
        // font-weight: bold;
        font-family:'pf-Bold';
        color: #1e1e1e;
        margin-left: 0rem;
        text-align: center;
    }
    
</style>
