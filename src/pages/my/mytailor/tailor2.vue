<template>
    <div class="vue-box">
        <div class="tailor1" v-for="(item,index) in issuelist" :key="index" @click="details(index,item)">
            <div class="tailor1-img">
                <img v-lazy="item.imgs" alt="">
            </div>
            <div class="tailor1-title">
                <div class="title-one">
                    <div class="title1">{{item.categoryDesc}}</div>
                    <p>{{item.title}}</p>
                </div>
                <div class="title-two">
                    {{item.custDesc}}
                </div>
            </div>
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
                fromNum:0
            },
            issuelist:[]
        }
    },
    mounted() {
        const islogin = JSON.parse(localStorage.getItem("islogin"));
        this.params.userToken = islogin.userToken;
        this.params.userId = islogin.userId;
        this.getlist();
    },
    methods:{
        //获取发布列表
        getlist() {
            user.customList(this.params).then(res =>{
                console.log(res)
                let issuelist = res.data.customMadeVo;
                let list = [];
                for(let i = 0;i < issuelist.length;i++){
                    if(issuelist[i].categoryId == 10){
                        list.push(issuelist[i])
                    }
                }
                console.log(list);
                this.issuelist = list;
            })
        },
        //发布详情
        details(index,item) {
            // console.log(index,item);
            
            const id = item.id;
            let status = item.status;
            let param = {
                id:id,
                source:0,
                userId:this.params.userId,
                userToken:this.params.userToken,
            }
            
            user.issueDetail(param).then(res=>{
                console.log(res);
                let data1 = res.data
                if(res.status == 0) {
                    this.$router.push({path:"/issue",query:{message:"审核中，暂无法修改信息",data1:data1}})
                }else if(res.status = 1){
                    this.$router.push({path:"/issueDetails",query:data1})
                }
            })
            
        }
    },
    components:{
        
    }
}
</script>

<style lang="scss" scoped>
.vue-box{
    .tailor1{
        width: 6.8rem;
        height: 2rem;
        margin-left: 0rem;
        text-align: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0.3rem;
        margin-top: 0.5rem;
    }
    .tailor1-img{
        width: 2rem;
        height: 2rem;
        margin-right: 0.2rem;
    }
    .tailor1 img{
        width: 100%;
        height: 100%;
    }
    .tailor1-title{
        width: 4.6rem;
        margin-left: 0rem;
    }
    .title1{
        width: 1rem;
        height: 0.34rem;
        background-color: #fc5649;
        color: #ffffff;
        font-size: 0.22rem;
        font-weight: 500;
        line-height: 0.34rem;
        text-align: center;
        border-radius: 0.05rem;
        float: left;
        margin-right: 0.24rem;
    }
    .title-one{
        font-size: 0.3rem;
        margin-bottom: 0.28rem;
    }
    .title-two{
        width: 4.4rem;
        
        font-size: 0.24rem;
        color: #999999;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}
</style>
