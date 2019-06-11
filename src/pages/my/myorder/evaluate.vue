<template>
    <div  class="evaluate">
        <myback :title="this.title"/>
        <div class="evaluate-content">
            <div class="evaluate-icon">
                <div class="evaluate-img">
                    <img src="../../../../static/img/user/jindian.png" alt="">
                </div>
                <div class="iconimg">
                    <div class="icon-img">
                        <img src="../../../../static/img/user/praise1.png" alt="">
                    </div>
                    <p>好评</p>
                </div>
                <div class="iconimg">
                    <div class="icon-img">
                        <img src="../../../../static/img/user/secondary.png" alt="">
                    </div>
                    <p>中评</p>
                </div>
                <div class="iconimg">
                    <div class="icon-img">
                        <img src="../../../../static/img/user/bad.png" alt="">
                    </div>
                    <p>差评</p>
                </div>
            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="宝贝符合你的预期吗，评价一下吧"></textarea>
            <div class="add-img">
                <img src="../../../../static/img/user/addimg.png" alt="">
            </div>
        </div>
        <div class="shop-eva">
            <div class="shop-title">店铺评分</div>
            <div class="select-love">
                <p>物流服务</p>
                <div class="love">
                    <img src="../../../../static/img/user/love.png" alt="">
                    <img src="../../../../static/img/user/love.png" alt="">
                    <img src="../../../../static/img/user/love.png" alt="">
                    <img src="../../../../static/img/user/love.png" alt="">
                    <img src="../../../../static/img/user/love.png" alt="">
                </div>
            </div>
            <div class="select-love">
                <p>店铺服务</p>
                <div class="love">
                    <img src="../../../../static/img/user/love1.png" alt="">
                    <img src="../../../../static/img/user/love1.png" alt="">
                    <img src="../../../../static/img/user/love1.png" alt="">
                    <img src="../../../../static/img/user/love1.png" alt="">
                    <img src="../../../../static/img/user/love1.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myback from "@/pages/my/myback"
export default {
    data() {
        return {
            title:"评分"
        }
    },
    components:{
        myback
    }
}
</script>
<style lang="scss" scoped>
    .evaluate{
        background-color: #f1f1f1;
    
    .evaluate-content{
        background-color: #ffffff;
        margin-top: 0.16rem;
        padding-bottom: 0.3rem;
    }
    .evaluate-icon{
        height: 1.3rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .evaluate-img{
        width: 0.7rem;
        height: 0.7rem;
        margin-left: .3rem;
        margin-right: 0rem;
    }
    .evaluate-img img{
        height: 100%;
        width: 100%;
    }
    .iconimg{
        display: flex;
        flex-direction: row;
        margin-left: 0.5rem;
    }
    .icon-img{
        width: 0.28rem;
        height: 0.28rem;
        margin-right: 0.1rem;
    }
    .icon-img img{
        height: 100%;
        width: 100%;
        
    }
    textarea{
        height: 1rem;
        width: 100%;
        /* border: 0.01rem solid #ececec; */
        margin-left: 0.3rem;
        margin-top: 0.2rem;
        margin-bottom: 0.8rem;
    }
    .add-img{
        width: 1.6rem;
        height: 1.6rem;
        margin-left: 0.3rem;
        
    }
    .add-img img{
        width: 100%;
        height: 100%;
    }
    .shop-eva{
        padding-left: 0.3rem;
        background-color: #ffffff;
        margin-top: 0.16rem;
        padding-top: 0.3rem;
    }
    .shop-title{
        font-size: 0.3rem;
        font-weight: 600;
        text-align: left;
    }
    .select-love{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.4rem;
    }
    .love{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0.6rem;
    }
    .love img{
        width: 0.3rem;
        height: 0.26rem;
        margin-right: 0.1rem;
    }
    }
</style>
