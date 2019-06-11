<template>
    <div class="product-wallet">
        <div class="wallet-back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="walletback">
            <p>产品钱包</p>
        </div>
        <div class="productt">
            <div class="product-list1" @click="toGoods(item.id)" v-for="(item,index) in productlist" :key="index">
                <div class="product-letter1">
                    <img v-lazy="item.productLogo" alt="">
                </div>
                <div class="product-words">
                    <div>
                        <span>钱包名称:</span><span>{{item.productName}}</span>
                    </div>
                    <div class="product-price">
                        <span>钱包余额:</span><span>{{item.balance}}</span>
                    </div>
                </div>
            </div>
        </div> 
        <div class="product-explain">
            <p>《使用规则说明》</p>
        </div>
    </div>
</template>
 <script>
 import user from '../../../server/user.js';

 export default {
     data() {
        return{
            params:{
                userId:"",
                userToken:"",
                source:'0',
                type:0,
                pageSize:10,
                fromNum:1,
            },
            paramsL:{
                userId:"",
                userToken:"",
                fromNum:1,
                pageSize:10,
                sort:0,
                amout:0,
                level:1,
                source:'0',
                categoryId:""
            },
            productlist:[]
        }
    },
    mounted() {
        const islogin = JSON.parse(localStorage.getItem("islogin"));
        this.params.userToken = islogin.userToken;
        this.params.userId = islogin.userId;
        this.paramsL.userToken = islogin.userToken;
        this.paramsL.userId = islogin.userId;
        this.getwalletlist();
    },
     methods:{
        walletback() {
            this.$router.go(-1)
        },
        toGoods(id){
            // this.paramsL.categoryId = id;
            // user.productList(this.paramsL).then(res =>{
            //     console.log(res)
            // })
            console.log(id);
            this.$router.push({
                path:"/shopGoods",
                query:{
                    categoryId:id,
                    title:"服装鞋帽",
                    userToken: this.paramsL.userToken,
                    userId: this.paramsL.userId
                }
            })
        },
        //产品钱包分类
        getwalletlist() {
            user.productWallet(this.params).then(res =>{
                console.log(res.data.productCateegoryVo)
                this.productlist = res.data.productCateegoryVo;
            })
        }
    },
 }
 </script>

<style lang="scss" scoped>
@import "../../../../static/css/style.css";

    .product-wallet{
        background-color: #f6f6f6;
        height: 14rem;
    
    .wallet-back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #ffffff;
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
    .product-list1{
        width: 6.9rem;
        height: 1.8rem;
        margin-left: 0rem;
        text-align: left;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin: 0.38rem 0rem 0.15rem 0.3rem;
        background-color: #fff;

        /* border-left: 0.04rem solid #50d166; */
    }
    .product-list2{
        width: 6.9rem;
        height: 1.8rem;
        margin-left: 0rem;
        text-align: left;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin: 0rem 0rem 0.15rem 0.3rem;
        border-left: 0.04rem solid #5078ff;
    }
    .product-list3{
        width: 6.9rem;
        height: 1.8rem;
        margin-left: 0rem;
        text-align: left;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin: 0rem 0rem 0.15rem 0.3rem;
        border-left: 0.04rem solid #f18f1c;
    }
    .product-list4{
        width: 6.9rem;
        height: 1.8rem;
        margin-left: 0rem;
        text-align: left;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin: 0rem 0rem 0.15rem 0.3rem;
        border-left: 0.04rem solid #ff5c82;
    }
    .product-letter1{
        width: 1.14rem;
        height: 1.14rem;
        background-color: #e8ffec;
        font-size: 0.62rem;
        color: #50d166;
        line-height: 1.14rem;
        text-align: center;
        margin-left: 0.36rem;
        border-radius: 0.57rem;
    }
    .product-letter2{
        width: 1.14rem;
        height: 1.14rem;
        background-color: #e8ffec;
        font-size: 0.62rem;
        color: #5078ff;
        line-height: 1.14rem;
        text-align: center;
        margin-left: 0.36rem;
        border-radius: 0.57rem;
    }
    .product-letter3{
        width: 1.14rem;
        height: 1.14rem;
        background-color: #e8ffec;
        font-size: 0.62rem;
        color: #f18f1c;
        line-height: 1.14rem;
        text-align: center;
        margin-left: 0.36rem;
        border-radius: 0.57rem;
    }
    .product-letter4{
        width: 1.14rem;
        height: 1.14rem;
        background-color: #e8ffec;
        font-size: 0.62rem;
        color: #ff5c82;
        line-height: 1.14rem;
        text-align: center;
        margin-left: 0.36rem;
        border-radius: 0.57rem;
    }
    .product-words{
        font-size: 0.26rem;
        font-weight: 400;
        margin-left: -2.8rem;
    }
    .product-price{
        color: #aaaaaa;
        margin-top: 0.2rem;
    }
    .product-explain{
        color: #929292;
        font-size: 0.24rem;
        margin-top: 0.42rem;
    }
    }
</style>
