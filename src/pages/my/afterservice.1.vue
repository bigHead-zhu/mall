<template>
    <div class="details">
        <myback :title="this.title"/>
        <div >
            <div class="order-details">
            <div class="details-title">
                <p class="title">售后商品</p>
                <!-- <img src="../../../static/img/user/arrow.png" alt=""> -->
                <!-- <p class="buyer">商家审核</p> -->
            </div>
            <div class="details-content">
                <div>
                    <img src="../../../static/img/user/jindian.png" alt="">
                </div>
                <div class="details-model">
                    <div>
                        <p class="name">北海道心心酒店，精品大床房谁都睡了快速度快</p>
                    </div>
                    <div class="model-one">
                        <p>床型:大床房</p>
                        <p class="number">×1</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-list">
                <div class="list-one">售后方式</div>
                <div class="list-two">退款</div>
            </div>
            <div class="content-list">
                <div class="list-one">申请原因</div>
                <div class="list-two">质量问题</div>
            </div>
            <div class="content-list">
                <div class="list-one">退款金额</div>
                <div class="list-two">￥99</div>
            </div>
            <div class="edit">
                <p>内容编辑及备注</p> 
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入详细类容"></textarea>
            </div>
            <div class="add-img">
                <div class="add-img-show">
                    <img src="../../../static/img/user/issueimg.png" alt="">
                </div>
                <div class="add-img-add">
                    <img src="../../../static/img/user/addimg.png" alt="">
                </div>
            </div>
        </div>
        <div class="confirmorder">
            <div class="confirm" @click="sureorder">确认订单</div>
        </div>
        
        </div>
        
    </div>
</template>

<script>
    import myback from "@/pages/my/myback"

export default {
    data() {
        return {
            code:"",
            title:"售后"
        }
    },
    components:{
        myback
    },
    methods:{
        sureorder(){
            this.$router.push({path:"/my"})
        }
    },
    created() {
        this.code = this.$route.query;
        console.log(this.code);
    },
}
</script>

<style lang="scss" scoped>
    .details{
        width: 100%;
        height: auto;
        background-color: #f1f1f1;
        box-sizing: border-box;
    
    .order-details{
        width: 100%;
        height: 3rem;
        background-color: #ffffff;
        margin-bottom: 0.16rem;
        margin-top: 0.16rem;
    }
    .details-title{
        height: 0.78rem;
        width: 100%;
        line-height: 0.78rem;
        font-size: 0.26rem;
        text-align: left;
        display: flex;
        flex-direction: row;
        margin-left: 0rem;
        align-items: center;
    }
    .details-title p{
        font-weight: bold;
    }
    .title{
		color: #1e1e1e;
        margin-left: 0.3rem;
    }
    .details-title img{
        width: 0.1rem;
        height: 0.18rem;
        margin-left: 0.4rem;
    }
    .confirmorder{
        width: 100%;
        background-color: #fff;
        margin-top: -0.3rem;
    }
    .buyer{
        margin-right: 0.3rem;
        color: #feb336;
    }
    .details-content{
        width: 100%;
        height: 1.8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .details-content img{
        width: 1.8rem;
        height: 1.8rem;
    }
    .details-model{
        width: 4.8rem;
        height: auto;
        text-align: left;
        font-size: 0.26rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .name{
        font-weight: bold;
    }
    .model-one{
        width: 4.6rem;
        text-align: left;
        margin-left: 0rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #aaaaaa;
        margin-top: 0.2rem;
    }
    .confirm{
        width: 1.5rem;
        height: 0.54rem;
        border: 0.01rem solid #feb336;
        border-radius: 0.27rem;
        font-weight: bold;
        line-height: 0.54rem;
        display: flex;
        flex-direction:row; 
        justify-content: center;
        margin-right: 0.3rem;
        color:#feb336;
        margin-top: 0.3rem;
    }
    .content{
        background-color: #ffffff;
    }
    .content-list{
        height: 1rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* border: 0.01rem solid #feb336; */
    }
    .list-one{
        margin-left: 0.3rem;
        font-size: 0.26rem;
        font-weight: 600;
    }
    .list-two{
        margin-right: 0.3rem;
        font-size: 0.26rem;
        color: #bdbdbd;
    }
    .edit{
        width: 6.9rem;
        margin-left: 0.3rem;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .edit p{
        font-size: 0.24rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
        text-align: left;
    }
    
    .edit textarea{
        height: 0.94rem;
        /* background-color: blueviolet; */
        width: 80%;
        border: 0.01rem solid #ececec;
        margin-left: -1.4rem;
    }
    .add-img{
        height: 2.5rem;
        width: 6.9rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0.3rem;
    }
    .add-img-show{
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 0rem;
        margin-right: 0rem;
    }
    .add-img-add{
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 0rem;
        
    }
    .add-img img{
        width: 100%;
        height: 100%;
    }
    }
</style>