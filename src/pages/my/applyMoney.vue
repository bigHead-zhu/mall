<template>
    <div class="details">
        <myback :title="this.title"/>
        <div >
            <div class="order-details">
            <div class="details-title">
                <p class="title cle">退款商品</p>
                <p class="buyer">商家审核</p>
            </div>
            <div class="details-content">
                <img src="../../../static/img/user/jindian.png" alt="">
                <div class="details-model">
                    <div class="detail-title">北海道心心酒店，精品大床房谁都睡了快速度快北海道心心酒店，精品大床房谁都睡了快速度快</div>
                    <div class="model-one">
                        <p class="mo-type">床型:大床房</p>
                        <p class="number">×1</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-list">
                <div class="list-one">退款原因</div>
                <div class="list-two" @click="select">
					<label v-show="!des">请选择</label>
					<label v-show="des">{{des}}</label>
				</div>
            </div>
            <div class="content-list">
                <div class="list-one">商品退款</div>
                <div class="list-two">¥  100.00</div>
            </div>
            <div class="content-list">
                <div class="list-one">运费退款</div>
                <div class="list-two">¥ 0.00</div>
            </div>
            <div class="edit">
                <p>备注</p> 
                <textarea name="" ></textarea>
            </div>
            
        </div>
        <div class="confirmorder">
            <div class="confirm" @click="sureorder">提交申请</div>
        </div>
        
        </div>
        <reason v-model="showState" @reas="content"></reason>
    </div>
</template>

<script>
    import myback from "@/pages/my/myback"
	import reason from '../../components/order.vue';
	import user from '../../server/user.js';
	
export default {
    data() {
        return {
            code:"",
            title:"申请退款",
			showState:false,
			des:'',//选择理由
			params:{
				source:'0',
				userId:'',
				userToken:"",
				orderId:""
			},
        }
    },
    components:{
        myback,
		reason
    },
	mounted(){
		let islogin = JSON.parse(localStorage.getItem("islogin"));
		this.params.userToken = islogin.userToken;
		this.params.orderId = this.$route.query.id;
		this.params.userId = islogin.userId;
		this.orderDetail()
	},
    methods:{
        sureorder(){
            this.$router.push({path:"/my"})
        },
		select(){
			// 
			this.showState = true
		},
		content(val){
			console.log(val)
			this.des = val;
		},
		orderDetail() {
			user.orderDetails(this.params).then(res=>{
				console.log(res)
				this.orderlist = res.data;
				this.logistics = res.data.logistics[0];
				this.orderDetails = res.data.orderDetails[0];
			})
		},
    },
    created() {
        this.code = this.$route.query;
    },
}
</script>

<style lang="scss" scoped>
	// @import "../../../static/css/style.css";
    .details{
        width: 100%;
        height: auto;
        background-color: #fff;
        box-sizing: border-box;
    
    .order-details{
        width: 100%;
        height: 3rem;
		border-top: .16rem solid #f1f1f1;
		border-bottom: .16rem solid #f1f1f1;
    }
    .details-title{
        width: 100%;
        font-size: 0.26rem;
        text-align: left;
        display: flex;
        flex-direction: row;
		margin: .3rem 0;
        align-items: center;
    }
    .details-title p{
    }
    .title{
        margin-left: 0.3rem;
		color: #1e1e1e;
    }
    .details-title img{
        width: 0.1rem;
        height: 0.18rem;
        margin-left: 0.4rem;
    }
    .confirmorder{
		position: fixed;
		width: 100%;
		left: 0;
		bottom: .8rem;
        background-color: #fff;
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
		.detail-title{
			width: 100%;
			height: .7rem;
			overflow: hidden;
			color: #1e1e1e;
			text-overflow: ellipsis;
			line-clamp: 2;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
    }
    
    .model-one{
        width: 100%;;
        text-align: left;
        color: #aaaaaa;
        margin-top: 0.2rem;
		.number{
			margin-top: .2rem;
		}
		
    }
    .confirm{
       margin: 0 .55rem;
       color: #fff;
       font-size: 0.3rem;
       height: 0.8rem;
	   line-height: .8rem;
       background-image: linear-gradient(187deg, #feca3a 0%, #feb336 100%), linear-gradient(#ffba30, #ffba30);
       background-blend-mode: normal, normal;
       box-shadow: 0 0.09rem 0.17rem 0.01rem rgba(254, 166, 19, 0.2);
       border-radius: 0.4rem;
    }
    .content{
        background-color: #ffffff;
		margin:  0 .28rem;
    }
    .content-list{
        height: 1rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;		
    }
    .list-one{
        margin-left: 0rem;
		color: #1e1e1e;
        font-size: 0.26rem;
    }
    .list-two{
        margin-right: 0rem;
		width: 2rem;
		height: .3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		white-space: nowrap;
        font-size: 0.26rem;
		text-align: right;
        color: #bdbdbd;
    }
    .edit{
        width: 100%;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .edit p{
        font-size: 0.24rem;
        margin-bottom: 0.2rem;
        text-align: left;
    }
    
    .edit textarea{
        height: 1.2rem;
		padding: .3rem 0;
		text-indent: .52rem;
		overflow: auto;
		font-size: .26rem;
		line-height: .3rem;
        width:100%;
		outline: none;
		border: none;
		background: #f7f7f7;
		resize:none;  
		border-radius: .04rem;
        // margin-left: -1.4rem;
    }
    
    }
</style>