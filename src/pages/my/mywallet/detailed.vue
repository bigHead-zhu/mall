<template>
    <div class="vue-box">
        <!-- 交易明细 -->
        <myback :title="this.title"/>
        <div class="detailed">
            <div class="detailed-list" v-for="(item,index) in incomeList" :key="index">
                <div class="time-list">{{item.strTime}}</div>
                
                <div class="name">{{item.remark}}
                    <div class="list" v-if="code">订单： {{item.id}}</div>
                    <span class="price-list">{{item.restMoney}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myback from "@/pages/my/myback"
import user from '../../../server/user.js';

export default {
    data() {
        return{
            title:"明细",
            code:"",//判断是否是VIP明细
            params:{
                categoryId: "string",
                fromNum: 0,
                openId: "string",
                pageSize: 10,
                source: 0,
                type: 0,
                userId: "",
                userToken: ""
            },
            incomeList:[]
        }
    },
    methods:{
        //收益明细
        getIncome(){
            user.IncomeDetails(this.params).then(res=>{
                console.log(res.data)
                this.incomeList = res.data.incomeDetailsList;
            })
        },
        //VIP明细
        gitVIPIncome() {
            user.IncomeVIP(this.params).then(res=>{
                console.log(res.data)
                this.incomeList = res.data.vipWalletDetailsVo;
            })
        }
    },
    mounted(){
        const islogin = JSON.parse(localStorage.getItem("islogin"));
        this.params.userToken = islogin.userToken;
        this.params.userId = islogin.userId;
        let data = this.$route.query;
        console.log(data);
        if(data.code == 2){
            if(data.num == 1){
                this.params.type = 1;
                this.getIncome();
            }else{
                this.getIncome();
            } 
        }else if(data.code == 3){
            this.code = data.code;
            this.gitVIPIncome();
        }
    },
    components:{
        myback
    }
}
</script>
<style lang="scss" scoped>
@import "../../../../static/css/style.css";

.vue-box{
    .detailed-list{
        height: 1.26rem;
        width: 6.9rem;
        text-align: left;
        border-bottom: 0.01rem solid #f1f1f1;
        margin-bottom: 0.4rem;
    }
    .time-list{
        font-size: 0.24rem;
        color: #c1c1c1;
        margin-bottom: 0.24rem;
    }
    .list{
        /* width: 50%; */
        margin-left: 0rem;
        display: inline;
    }
    .detailed{
        margin-top: 0.16rem;
        padding-top: 0.34rem;
    }
    .name{
        font-size: 0.3rem;
        // font-weight: 600;
        font-family:'pf-Medium';
        color: #1e1e1e;
    }
    .price-list{
        float: right;
        font-size: 0.32rem;
        font-family:'pf-Bold';
        color: #b50000;
    }
}
</style>