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
    console.log("213123");
    const result =await reqSearchData(value)
    if(result.code==200){
        context.commit('REQSEARCHDATA',result.data)
    }else{
        console.log("chuwen ti le  3");
    }
}
};
const getters={}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}