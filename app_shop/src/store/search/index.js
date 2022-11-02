import { reqSearchData } from "@/api";
const state={
    searchData:{}
};
const mutations={
    REQSEARCHDATA(state,data){
        state.searchData=data
    }
};
const actions={
    // 第二个参数是我在search中触发action时候传递的params值
async reqSearchData(context,value){
    const result =await reqSearchData(value)
    //console.log("发请求用的value是 ：",value);
    if(result.code==200){
        console.log("SearchData",result);
        context.commit('REQSEARCHDATA',result.data)
    }else{
        console.log("chuwen ti le  3");
    }
}
};
const getters={
    // 为了简化数据，好让组件直接可以拿计算好的数据 这里的形参是这个search小仓库里面的state 不是总仓库里面的state
    goodsList(state){
        return state.searchData.goodsList || []
    },
    attrsList(state){
        return state.searchData.attrsList || []
    },
    trademarkList(state){
        return state.searchData.trademarkList || []
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}