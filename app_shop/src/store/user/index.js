// 此仓库负责用户的登录和注册
import {reqUserCode,userRegister,userLogin,getUserInfo} from '@/api/index'
const state={
    //token:''
    userInfo:{}
}
const mutations={
    GETUSERINFO(state,value){
        state.userInfo=value
    }
}
const actions={
    // 用户请求拿到code
    async reqUserCode(context,phone){
        let result= await reqUserCode(phone)
        if(result.code==200){
            console.log("reqUserCode",result);
            return result.data
        }else{
            console.log("chu wenti le getcode");
            return Promise.reject(new Error('fail reqUserCode'))
        }
    },
    // 用户注册
    async userRegister(context,data){
        let result= await userRegister(data)
        console.log("userRegister",result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail userRegister'))
        }
    },
    // 用户登录 data 表示用户登录所需要带去的数据 为对象
    async userLogin(context,data){
        let result=await userLogin(data)
        if(result.code==200){
            console.log("userLogin",result);
            // 如果没有 我就存 有 就不存
            if(!localStorage.getItem('Token')){
                localStorage.setItem('Token',result.data.token)
            }
            return 'ok'
        }else{
            return Promise.reject(new Error('fail userLogin'))
        }
    },
    //用户信息的获得
    async getUserInfo(context){
        let result = await getUserInfo()
        console.log("getUserInfo",result);
        if(result.code==200){
            context.commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail getUserInfo'))
        }
    }
}
const getters={}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}