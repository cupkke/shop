<template>
    <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>

                        <p v-if="userInfo.name">
                            <router-link to="/login">欢迎你 {{userInfo.name}}</router-link> 
                            <a @click="logOut">退出登录</a>
                        </p>
                        <p v-else>
                            <span>请</span>
                            <router-link to="/login">登录</router-link> 
                            <router-link to="/register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###">我的订单</a>
                        <a href="###">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <a class="logo" title="尚品汇" href="###" target="_blank">
                        <img src="./image/logo.png" alt="">
                    </a>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" v-model="keyWord" class="input-error input-xxlarge"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>

</template>

<script>
import { mapState } from 'vuex'
export default {
name:'Header',
mounted(){
this.$store.dispatch('user/getUserInfo')
},
data(){
    return{
        keyWord:''
    }
},
methods:{
    // 点击查看
    goSearch(){
        // 路由传参 这里还顺便还合并了参数 因为在input里面默认带的是 params 如果此时还有query参数，那么还需要把query给合并进去
        let location={name:'search',params:{keyWord:this.keyWord || undefined} }
        if(this.$route.query){
            location.query=this.$route.query
        }
        this.$router.push(location)
    },
    // 退出登录
    logOut(){
       this.$store.dispatch("user/logOut").then((v)=>{
        localStorage.removeItem('Token')
        this.$router.push('/home')
       },(r)=>{
        alert('退出登录失败')
       })
    }
},
computed:{
    ...mapState('user',['userInfo'])
}
}
</script>

<style lang='less' scoped>
// 
   .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;
                       
                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }

</style>