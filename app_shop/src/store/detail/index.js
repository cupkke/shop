import {reqDetailData,addShopCar} from '../../api/index'
import {getNanoid} from '../../utils/getid'
const state={
    detailData:{},
    userid:getNanoid()
}
const actions={
    async reqDetailData(content,goodid){
        let result = await reqDetailData(goodid)
        if(result.code==200){
            content.commit('REQDETAILDATA',result.data)
        }else{
            console.log('chu wenti le 4');
        }
    },
    // 传来的是对象 需要解构，这里是发请求给服务器请求向购物车添加数据 
    async addShopCar(context,{goodid,goodNum}){
        let result = await addShopCar(goodid,goodNum)
        if(result.code==200){
            return 'success'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

}
const mutations={
    REQDETAILDATA(state,data){
        state.detailData=data
    },
}
const getters={
    categoryView(state){
        return state.detailData.categoryView ||{}
    },
    skuInfo(state){
        return state.detailData.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailData.spuSaleAttrList  || []
    },
    skuAttrValueList(state){
        return state.detailData.skuInfo.skuAttrValueList
    },
    skuImageList(state){
        return state.detailData.skuInfo.skuImageList
    },
    skuSaleAttrValueList(state){
        return state.detailData.skuInfo.skuSaleAttrValueList
    }
}
export default {
namespaced:true,
state,
actions,
mutations,
getters
}