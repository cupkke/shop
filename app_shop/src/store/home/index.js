import { reqCategoryList,reqBannerList } from '@/api';
const state={
    categoryList:[],
    bannerList:[]
};
const mutations={
    REQCATEGORYLIST(state,data){ // 第二个参数就是action里面的data
        state.categoryList=data
    },
    REQBANNERLIST(state,data){
        state.bannerList=data
    }
};
const actions={
    async reqCategoryList(context){
        // 向我们封装好的接口直接拿数据
        const result=await reqCategoryList()
        console.log(result);
        // 如果成功
        if(result.code==200){
            context.commit('REQCATEGORYLIST',result.data)
        }
    },
    async reqBannerList(context){
        // 向我们封装好的接口直接拿数据
        const result =await reqBannerList()
        console.log("reqBannerList:",result );
        if(result.code==200){
            context.commit('REQBANNERLIST',result.data)
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