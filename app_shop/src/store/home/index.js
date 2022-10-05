import { reqCategoryList,reqBannerList,reqFloorList } from '@/api';
const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations={
    REQCATEGORYLIST(state,data){ // 第二个参数就是action里面的data
        state.categoryList=data
    },
    REQBANNERLIST(state,data){
        state.bannerList=data
    },
    REQFLOORLIST(state,data){
        state.floorList=data
    }
};
const actions={
    async reqCategoryList(context){
        // 向我们封装好的接口直接拿数据
        const result=await reqCategoryList()
        console.log("result",result);
        // 如果成功
        if(result.code==200){
            context.commit('REQCATEGORYLIST',result.data)
        }else{
            console.log("chu wen ti le ");
        }
    },
    async reqBannerList(context){
        // 向我们封装好的接口直接拿数据
        const result =await reqBannerList()
        console.log("reqBannerList:",result );
        if(result.code==200){
            context.commit('REQBANNERLIST',result.data)
        }else{
            console.log("chu wen ti le ");
        }
    },
    async reqFloorList(context){
        const result =await reqFloorList()
        console.log('reqFloorList',result);
        if(result.code==200){
            context.commit('REQFLOORLIST',result.data)
        }else{
            console.log("chu wen ti le 2");
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