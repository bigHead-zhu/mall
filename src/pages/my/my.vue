<template>
    <div class="my-message">
        <!-- 个人中心 -->
        <div class="my-userinfo">
            <div class="avatar" @click="userhead" v-if="headIcon == ''">
                <img src="../../../static/img/user/avatar.png" alt="">
            </div>
            <div class="avatar" @click="userhead" v-else>
                <img v-lazy="headIcon" alt="">
            </div>
            <div class="mobile" @click="switch1&&login()">
                <label class="mobile-p">{{islogin}}</label>
                <div class="member" v-if="this.switch1==false">{{levelName}}</div>
            </div>
            <div class="user-set">
                <img class="set-one" src="../../../static/img/user/news.png" alt="">
                <img class="set-two" src="../../../static/img/user/set.png" alt="" @click="userhead">
            </div>
        </div>
        <!-- 订单 -->
         <div class="my-order">
            <div class="order-all">
                <p>全部订单</p>
                <img src="../../../static/img/user/arrow.png" alt="" @click="allorder">
            </div>
            <div class="orderoptions">
                <div class="orderlist" @click="payment">
                    <img src="../../../static/img/user/order1.png" alt="">
                    <div class="selectname">待付款</div>
                </div>
                <div class="orderlist" @click="send">
                    <img src="../../../static/img/user/order2.png" alt="">
                    <p>待发货</p>
                </div>
                <div class="orderlist" @click="collect">
                    <img src="../../../static/img/user/order3.png" alt="">
                    <p>待收货</p>
                </div>
                <div class="orderlist" @click="evaluate">
                    <img src="../../../static/img/user/order4.png" alt="">
                    <p>待评价</p>
                </div>
                <div class="orderlist" @click="afterservice">
                    <img src="../../../static/img/user/order5.png" alt="">
                    <p>售后</p>
                </div>
            </div>
        </div>
        <!-- 卡包 -->
        <div class="my-wallet">
            <div class="wallet-one">
                <div class="wallet" @click="walletOne">
                    <img src="../../../static/img/user/wallet1.png" alt="">
                    <div class="wallet-news">
                        <p>收益钱包</p>
                        <p class="money">{{walletone}}</p>
                    </div>
                </div>
                <div class="wallet" @click="walletTwo">
                    <img src="../../../static/img/user/wallet2.png" alt=""> 
                    <div class="wallet-news">
                        <p>VIP钱包</p>
                        <p>{{wallettwo}}</p>
                    </div>
                </div>
            </div>
            <div class="wallet-two">
                <div class="wallet" @click="walletThree">
                    <img src="../../../static/img/user/wallet3.png" alt="">
                    <div class="wallet-news">
                        <p>产品钱包</p>
                        <p>{{productWallets}} </p>
                    </div>
                </div>
                <div class="wallet" @click="walletFour">
                    <img src="../../../static/img/user/wallet4.png" alt="">
                    <div class="wallet-news">
                        <p>数字钱包</p>
                        <p>{{couponCount}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 更多 -->
        <div class="my-more">
            <div class="more-title">更多功能</div>
            <div class="my-more-list" @click="popularizeUser">
                <div class="more-left">
                    <img src="../../../static/img/user/more1.png" alt="">
                    <p>我的推广</p>
                </div>
                <div class="more-right">
                    <img src="../../../static/img/user/arrow.png" alt="">
                </div>
            </div>
            <div class="my-more-list" @click="service">
                <div class="more-left">
                    <img src="../../../static/img/user/more2.png" alt="">
                    <p>客服服务</p>
                </div>
                <div class="more-right">
                    <img src="../../../static/img/user/arrow.png" alt="">
                </div>
            </div>
            <div class="my-more-list" @click="tailor">
                <div class="more-left">
                    <img src="../../../static/img/user/more3.png" alt="">
                    <p>发布定制</p>
                </div>
                <div class="more-right">
                    <img src="../../../static/img/user/arrow.png" alt="">
                </div>
            </div>
        </div>
        <!-- 导航 -->
		<foot ></foot>
    </div>
    
</template>

<script>
    import foot from '../../components/footer.vue';
    import order from '../../server/order.js';
	import common from '../../plugins/common.js';
	import login from '../../server/login';
	import message from '../../components/message.vue';
	
    export default {
        data() {
            return {
                userInfo:"",
                walletone:"0",
                wallettwo:"0",
                levelName:"",
                headIcon:"",
                productWallets:"暂无可用",
                couponCount:"暂无可用",
                islogin:"188***0001",
                switch1:false,//默认是不可点击
                params:{
                    source:'0',
					// openId:'1',
                    userId:'',
                    userToken:""
                }
            }
        },
        methods:{
            //返回
            userhead() {
                this.$router.push({path: "/userhead",query:this.userInfo})
            },
            //全部订单
            allorder() {
                this.$router.push({path:"/order1",query:{code:0}})
            },
            //代付款
            payment() {
                this.$router.push({path:"/order2",query:{code:1}})
            },
            //待发货
            send() {
                this.$router.push({path:"/order3",query:{code:2}})
            },
            //待收货
            collect() {
                this.$router.push({path:"/order4",query:{code:3}})
            },
            //待评价
            evaluate() {
                this.$router.push({path:"/order5",query:{code:4}})
            },
            //卡包
            walletOne() {
                this.$router.push({path:"/walletOne",query:{walletone:this.walletone}})
            },
            walletTwo() {
                this.$router.push({path:"/walletTwo",query:{code:""}})
            },
            walletThree() {
                this.$router.push({path:"/walletThree",query:{code:""}})
            },
            walletFour() {
                this.$router.push({path:"/unexpired",query:{code:""}})
            },
            //推广
            popularizeUser() {
                this.$router.push({path:"/popularizeUser",query:{code:""}})
            },
            //客服
            service() {
                this.$router.push({path:"/Personservice",query:{code:""}})
            },
            //售后
            afterservice() {
                this.$router.push({path:"/afterservice",query:{code:""}})
            },
            //定制
            tailor() {
                 this.$router.push({path:"/tailor1",query:{code:""}})
            },
            //获取收益钱包余额
            tomoney() {
                order.getMoney(this.params).then(res =>{
                    console.log(res)
					if(res.code == 1010){
						this.login();
						common.clearCookie();
					}
                    if(res.data){
                        this.walletone = res.data;
                    }else{
                        this.walletone = 0
                    }
                    
                })
            },
            //去登录
            login(){
                this.$router.push({path:"/login"})
            },
            tologin() {
                const islogin = JSON.parse(localStorage.getItem("islogin"));
                console.log(islogin);
                if(islogin == null){
                    this.islogin = "登录",
                    this.switch1 = true
                    this.$router.push({path:"/login"})
                }else{
                    this.userInfo = islogin;
                    this.params.userToken = islogin.userToken;
                    this.params.userId = islogin.userId;;
                    this.wallettwo = islogin.vipWallets;
                    this.levelName = islogin.levelName;
                    this.productWallets ="￥" + islogin.productWallets;
                    this.couponCount = islogin.couponCount  + " 张优惠券";
                    this.islogin = islogin.nickName;
                    this.headIcon = islogin.headIcon
                }
            }
        },
        mounted() {
            this.tomoney();
            this.tologin();
        },

        components:{
            foot
        },
    }
</script>

<style lang="scss" scoped>
@import "../../../static/css/style.css";

   .my-message{
        display: flex;
        flex-direction: column;
        margin: 0;
        list-style-type: none;
        background-color: #f6f6f6;
        font-family: 'pf-Medium';
    
    /* 个人信息 */
    .my-userinfo{
        width: 100%;
        height: 2.5rem;
        background-color: #ffc867;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align:left;
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
        margin-left: -1.3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // align-items: center;
    }
    .mobile-p {
        font-size: 0.28rem;
        font-family: "pf-Bold";
        color: #1e1e1e;
        margin-left: 0rem;
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
    .user-set{
        margin-right: 0.3rem;
    }
    .set-one{
        width: 0.25rem;
        height: 0.3rem;
        margin-right: 0.15rem;
    }
    .set-one img{
        width: 100%;
        height: 100%;
    }
    .set-two{
        width: 0.3rem;
        height: 0.3rem;
    }
    .set-two img{
        width: 100%;
        height: 100%;
    }
    /* 订单 */
    .my-order{
        width: 6.9rem;
        height: 2.4rem;
        background-color: #ffffff;
        margin-top: -0.5rem;
        border-radius: 0.1rem;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        /* text-align:left; */
    }
    .order-all{
        width: 100%;
        height: 0.74rem;
        border-bottom: 0.01rem solid #ececec;
        display: flex;
        flex-direction: row;
          
    }
    .order-all p{
        width: 30%;
        margin-top: 0.2rem;
        margin-left: -0.2rem;
        font-size: 0.28rem;
        // font-weight: bold;
        font-family: 'pf-Bold';
    }
    .order-all img{
        width: 0.1rem;
        height: 0.18rem;
        /* float: right; */
        margin-right: 0.3rem;
        margin-top: 0.3rem;
    }
    .orderoptions{
        height: 1.65rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .orderlist{
        height: 100%;
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .orderlist img{
        width: 0.5rem;
        height: 0.4rem;
        margin-bottom: 0.24rem;
    }
    .selectname{
        // margin-top:-1rem;
        font-family:'pf-Medium';
        font-size: 0.24rem;
        color: #666666;
    }
    .orderlist p{
        font-family:'pf-Medium';
        font-size: 0.24rem;
        color: #666666;
    }
    /* 卡包 */
    .my-wallet{
        text-align:left;
        margin-left: 0rem;
    }
    .wallet-one{
        display: flex;
        flex-direction: row;
        padding-left: 0.3rem;
        margin-top: 0.4rem;
    }
    .wallet-two{
        
        display: flex;
        flex-direction: row;
        padding-left: 0.3rem;
    }
    .wallet{
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
        width: 3.36rem;
        background-color: #ffffff;
        margin-right: 0.18rem;
        margin-bottom: 0.2rem;
        height: 1.48rem;
        border-radius: 0.1rem;
    }
    .wallet img{
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.2rem;
        margin-left: 0.23rem;
    }
    .wallet-news {
        margin-left: 0rem;
    }
    .wallet-news :first-child{
        font-size: 0.28rem;
        font-family: 'pf-Bold';
    }
    .wallet-news :last-child{
        font-size: 0.24rem;
        margin-top: 0.1rem;
        color: #aaaaaa;
    }
    /* 更多功能 */
    .my-more{
        width: 6.9rem;
        height: 3.1rem;
        text-align: left;
        background-color: #fff;
        margin-top: 0.2rem;
        margin-bottom: 1rem;
        border-radius: 0.1rem;
    }
    .more-title{
        height: 0.8rem;
        width: 100%;
        font-size: 0.26rem;
        // font-weight: 800;
        font-family: 'pf-Bold'; 
        padding-left: 0.3rem;
        line-height: 0.8rem;
        border-bottom: 1px solid #ececec; 
    }
    .my-more-list{
        height: 0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #aaaaaa;
    }
    .more-left{
        margin-left: 0.3rem;
        display: flex;
        flex-direction: row;
    }
    .my-more-list p{
        font-size: 0.26rem;   
    }
    .my-more-list img{
        width: 0.26rem;
        height: 0.26rem;
        margin-right: 0.16rem;
        margin-top: 0.05rem;
    }
    .more-right{
        width: 0.1rem;
        height: 0.18rem;
        margin-right: 0.6rem;
        font-size: 0.26rem;
    }
    .more-right img{
        width:100%;
        height: 100%;
    }
    }
</style>
