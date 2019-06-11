<template>
    <div class="issue">
        <div class="back">
            <img src="../../../../static/img/user/arrowLeft.png" alt="" @click="back">
            <p>定制发布</p>
            
        </div>
        <div class="form">
            <div class="information">基本信息</div>
            <div class="titles">
                <p>定制标题</p>
                <input type="text" v-model="title" :placeholder="list.title" v-if="status == -1"/>
                <input type="text" v-model="title" :placeholder="list.title" disabled="disabled" v-else/>
            </div>
            <div class="sort">
                <p>选择分类</p>
                <!-- <input type="text" v-model="categoryId" placeholder="女装女鞋"/> -->
                <select v-model="name">                                  
                    <option :value="{categoryId:item.id,categoryDesc:item.name}" v-for="(item,index) in categoryDesc" :key="index">{{item.name}}</option>                                    
                </select>
            </div>
            <div class="edit">
                <p>内容编辑及备注</p>
                <!-- <input type="button" placeholder="衣服有破损"/> -->
                <textarea name="" id="" cols="30" rows="10" :placeholder="list.custDesc" v-model="custDesc" v-if="status == -1"/>
                <textarea name="" id="" cols="30" rows="10" :placeholder="list.custDesc" v-model="custDesc" disabled="disabled" v-else/>
            </div>
            <div class="add-img">
                <div class="add-img-add" @click="uploadImg" v-if="status == -1 && kind == -1">
                    <img src="../../../../static/img/user/addimg.png" alt="">
                </div>
                <div class="add-img-show" v-else>
                    <img v-lazy="list.custImg" alt="">
                </div>
            </div>
        </div>
        <div class="moreinfo">
            <p class="moreinfo-title">更多信息</p>
            <div class="moreinfo-time">
                <p>定制时间</p>
                <input type="number" :placeholder="list.custTimeStr" v-model="custTime" v-if="status == -1"/>
                <input type="number" :placeholder="list.custTimeStr" v-model="custTime" disabled="disabled" v-else/>
            </div>
            <div class="phone">
                <p>联系方式</p>
                <input type="number" :placeholder="list.userPhone" v-model="userPhone" v-if="status == -1"/>
                <input type="number" :placeholder="list.userPhone" v-model="userPhone" disabled="disabled" v-else/>
            </div>
            <div class="phone">
                <p>联系人</p>
                <input type="text" :placeholder="list.userName" v-model="userName" v-if="status == -1"/>
                <input type="text" :placeholder="list.userName" v-model="userName" disabled="disabled" v-else/>
            </div>
        </div>
        <div :class="toissue" @click="submit" v-if="status == -1">
            {{tosubmit}}
        </div>
        <div class="newissue" v-else>
            {{tosubmit}}
        </div>
        <popup ref="myConfirm" @userBehavior="onback"></popup>
        <div class="treaty">
            点击我要发布按钮表示您已阅读且同意<span class="treaty-content">《定制协议》</span>
        </div>
    </div>
</template>
<script>
import user from '../../../server/user.js';
import popup from '@/pages/my/popup'

export default {
    data() {
        return {
            status:-1,//判断是展示页面还是提交页面
            kind:-1,//是否可点击
            toissue:"to-issue",
            tosubmit:"我要发布",
            title:'',
            categoryId:"",
            custDesc:"",
            custTime:"",
            userPhone:"",
            userName:"",
            userId:"",
            userToken:"",
            categoryDesc:"",
            custImg:"../../../../static/img/user/issueimg.png",
            name:{},
            categoryDesc:[
                {id:10,name: "服装鞋帽"},{id:11,name: "个户化妆"},{id:12,name: "内衣配饰"},{id:13,name: "母婴童装"},
                {id:14,name: "箱皮包具"},{id:15,name: "钟表珠宝"},{id:16,name: "户外运动"},{id:17,name: "玩具乐器"}
            ],
            orderid:"",//成功之后的订单id
            list:{
                title:"请输入标题",
                custDesc:"请输入详细内容",
                custTimeStr:"2019-05-13",
                userPhone:"电话号码",
                userName:"姓名",
                custImg:""
            }
        }
    },
    methods:{
        back() {
            // this.$router.go(-1);
            this.$router.push({path:"/tailor1"})
        },
        //上传图片
        uploadImg() {
            this.$router.push({
                path:"/uploadImg",
                query:{
                        kind:1,
                        title:this.title,
                        name:this.name,
                        custDesc:this.custDesc
					}
            })
        },
        //我要发布
        submit() {
            // this.$router.push({path:"/issueDetails"})
            let params = {
                title: this.title,
                categoryId: this.name.categoryId,
                categoryDesc:this.name.categoryDesc,
                custDesc: this.custDesc,
                custTime: this.custTime,
                userPhone: this.userPhone,
                userName: this.userName,
                custImg: this.custImg,
                source: 0,
                userId: this.userId,
                userToken: this.userToken
            }
            console.log(params);
            user.toissue(params).then(res =>{
                console.log(res);
                this.orderid = res.data;
                if(res.code == 0){
                    this.popup();
                }
            })
        },
        //弹窗类容
        popup() {
            this.$refs.myConfirm.show("查看定制", {titleText:"发布成功",cancelText:"取消",confirmText:"确认",type:"confirm"})
        },
        //弹出个提示
        onback(type) {
            console.log(type);
            if(type == "clickConfirm") {
                this.$router.push({path:"/myissue"})
            }else{
                this.$router.push({path:"/tailor1"})
            }
        },
    },
    created(){
        this.name = this.categoryDesc[0];//默认选择第一个分类
        let message = this.$route.query.message;//列表进入详情的状态的信息
        let data1 = this.$route.query.data1;//我的定制传递过来的值，渲染页面，
        this.custImg = this.$route.query.handImg;//上传图片传过来的值
        this.list.custImg = this.$route.query.handImg;//上传图片传过来的值
        console.log(data1)
        if(data1){
            this.status = data1.status;
        }
        if(message){
            let namelist = {}
            this.tosubmit = message;//根据信息改变按钮
            this.list = data1;
            namelist.categoryDesc = data1.categoryDesc;
            namelist.categoryId = data1.categoryId;
            this.name = namelist;
        }
    },
    mounted() {
        let loadData = this.$route.query.data;
        console.log(loadData);
        if(loadData){
            this.title = loadData.title;
            this.name = loadData.name;
            this.custDesc = loadData.custDesc;
            this.kind = loadData.kind;
        }
        let islogin = JSON.parse(localStorage.getItem("islogin"));//获取userId userToken
        this.userToken = islogin.userToken;
        this.userId = islogin.userId;
        
    },
    components:{
        popup
    } 
}
</script>
<style lang="scss" scoped>
@import "../../../../static/css/style.css";

    .issue{
        
        margin-left: 0rem;
        text-align: left;
    
    .back{
        height: 0.86rem;
        border-bottom: 0.01rem solid #ececec;
        line-height: 0.86rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
    }
    .back img{
        width: 0.16rem;
        height: 0.28rem;
        margin-left: 0.3rem;
        margin-right: 0rem;
    }
    .back p{
        font-size: 0.34rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
        width: 6.58rem;
        text-align: center;
    }
    .information{
        font-size: 0.34rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
        margin-top: 0.55rem;
    }
    .titles{
        height: 1.5rem;
        width: 6.9rem;
        margin-top: 0.2rem;
        margin-left: 0rem;
        border-bottom: 0.01rem solid #ececec;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .titles p{
        font-size: 0.24rem;
        font-family:'pf-Medium';
    }
    .titles input{
        width: 100%;
        margin-top: 0.3rem;
        background-color: #fff;
        font-size: 0.26rem;
    }
    .sort{
        height: 1.5rem;
        width: 6.9rem;
        
        margin-left: 0rem;
        border-bottom: 0.01rem solid #ececec;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .sort p{
        font-size: 0.24rem;
        font-family:'pf-Medium';
    }
    .sort select{
        width: 20%;
        margin-top: 0.3rem;
        background-color: #f1f1f1;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
    }
    .sort select option{
        font-size: 0.24rem;
        border: none;
    }
    .edit{
        width: 6.9rem;
        margin-left: 0rem;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .edit p{
        font-size: 0.24rem;
        font-family:'pf-Medium';
        margin-bottom: 0.2rem;
    }
    
    .edit textarea{
        height: 1.2rem;
        width: 80%;
        background-color: #fff;
        font-size: 0.26rem;
    }
    .add-img{
        height: 2.5rem;
        width: 6.9rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0rem;
    }
    .add-img-show{
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 0rem;
        margin-right: 0.2rem;
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
    .moreinfo-title{
        font-size: 0.34rem;
        color: #1e1e1e;
        font-family:'pf-Bold';
    }
    .moreinfo-time{
        height: 1.5rem;
        width: 6.9rem;
        margin-left: 0rem;
        border-bottom: 0.01rem solid #ececec;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .moreinfo-time p{
        font-size: 0.24rem;
        font-family:'pf-Medium';
    }
    .moreinfo-time input{
        width: 100%;
        margin-top: 0.3rem;
        font-size: 0.26rem;
        background-color: #fff;
    }
    .phone{
        height: 1.5rem;
        width: 6.9rem;
        
        margin-left: 0rem;
        border-bottom: 0.01rem solid #ececec;
        box-sizing: border-box;
        padding-top: 0.3rem;
    }
    .phone p{
        font-size: 0.24rem;
        font-family:'pf-Medium';
    }
    .phone input{
        width: 100%;
        margin-top: 0.3rem;
        font-size: 0.26rem;
        background-color: #fff;
    }
    .to-issue{
        width: 6.4rem;
        height: 0.8rem;
        background-color: #fec339;
        color: #ffffff;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.4rem;
        margin-top: 0.6rem;
        margin-bottom: 0.8rem;
    }
    .newissue{
        width: 6.4rem;
        height: 0.8rem;
        background-color: #c3c3c3;
        color: #ffffff;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.4rem;
        margin-top: 0.6rem;
        margin-bottom: 0.8rem;
    }
    .treaty{
        font-size: 0.24rem;
        color: #aaaaaa;
        margin-top: 0.26rem;
        margin-bottom: 0.4rem;
        margin-left: 1rem;
    }
    .treaty-content{
        color: #ffba30;
    }
    .form{
        padding-left: 0.3rem;
    }
    .moreinfo{
        padding-left: 0.3rem;
    }
    }
</style>
