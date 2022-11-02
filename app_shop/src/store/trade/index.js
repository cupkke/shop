import {getUserAddressInfo, getUserTradeInfo} from '@/api'
const state={
    TardeInfo:{},
    userAddressInfo:[]
}
const actions={
    async getUserAddressInfo({commit}){
        let result= await getUserAddressInfo()
        console.log("getUserAddressInfo",result);
        if(result.code==200){
            commit('getUserAddressInfo',result.data)
        }else{
            return Promise.reject(new Error('getUserAddressInfo fail'))
        }
    },
    async getUserTradeInfo({commit}){
        let result =await getUserTradeInfo()
        console.log("getUserTradeInfo",result);
        if(result.code==200){
            commit('GETUSERTRADEINFO',result.data)
        }else{
            return Promise.reject(new Error('getUserTradeInfo fail'))
        }
    }
}
const mutations={
    GETUSERTRADEINFO(state,value){
        state.TardeInfo=value
    },
    getUserAddressInfo(state,value){
        state.userAddressInfo=value
    }
}
const getters={
    detailArrayList(state){
        return state.TardeInfo.detailArrayList
    },
    totalAmount(state){
        return state.TardeInfo.totalAmount
    },
    totalNum(state){
        return state.TardeInfo.totalNum
    },
    tradeNo(state){
        return state.TardeInfo.tradeNo
    }
}
export default {
    namespaced:true,
    state,
    actions
    ,mutations,
    getters
}