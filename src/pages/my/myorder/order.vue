<template>
    <div class="order-main">
        <div class="head">
            <orderback></orderback>
            <div class="order">
                <ul>
                <router-link to="/order1" class="listall">全部</router-link>
                <router-link to="/order2">待付款</router-link>
                <router-link to="/order3">待发货</router-link>
                <router-link to="/order4">待收货</router-link>
                <router-link to="/order5">待评价</router-link>
            </ul>
        </div>
        </div>
        <div class="footer">
            <router-view></router-view>
        </div>
        
        
    </div>
</template>

<script>
import orderback from "@/pages/my/orderback"
import order1 from "@/pages/my/myorder/order1"

export default {
    data(){
        return {
            code:"",
            
        }
        
    },
    created() {
        this.code = this.$route.query.code;
    },
    mounted() {
        this.accept();
    },
    methods:{
        
        accept() {
            console.log(this.code)
        },
        

    },
    components:{
        orderback,
        order1
    }
}
</script>

<style scoped lang="scss">
.order-main{
    .head{
        position: fixed;
        top: 0rem;
        background-color: #fff;
        width: 100%;
    }
    .footer{
        margin-top: 1.66rem
    }
    .router-link-active{
        border-bottom: 0.04rem solid #feb336;
        color: #feb336!important;
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .order{
        width: 100%;
        height: 0.8rem;
        
    }
    .order ul{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        flex-direction: row;
        font-size: 0.28rem;
        a{
            color: #7f7f7f;
            text-decoration: none;
        }
    }
    .selection{
        border-bottom: 0.04rem solid #feb336;
        color: #feb336;
        
    }
}
</style>
