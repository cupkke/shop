import {reqCartList,deleteShopCart,changeCartState} from '../../api/index'
const state={
    shopCartData:[]
}
const actions={
    // 获得购物车的数据列表
    async reqCartList(context){
        let result =await reqCartList()
        if(result.code==200){
            console.log(result);
            context.commit('REQCARTLIST',result.data)
        }else{
            console.log("chu wenti  le 6");
        }
    },
    // 删除商品 返回一个promise
    async deleteShopCart(context,goodid){
        let result =await deleteShopCart(goodid)
        if(result.code==200){
            return 'ok2'
        }else{
            return Promise.reject(new Error('fail2'))
        }
    },
    // 删除所选中的商品 其实本质还是需要利用上面的函数deleteShopCart来删除
    deleteCheckedShopCart(context){
        // 来一个数组接收遍历后的所有promise
        let prs=[]
        context.getters.shopCartData.cartInfoList.forEach(item => {
            // 这里返回的result是一个promise对象 所以
            let result=item.isChecked==true? context.dispatch('deleteShopCart',item.skuId) :''
            prs.push(result)
        });
        // promise。all 若是数组里面的p1 p2 p3都成功 返回一个成功的promise 若有一个失败 则会返回一个失败的promise
        return Promise.all(prs)
    },
    // 更改商品被选中状态 返回一个promise
    async changeCartState(context,{goodid,isChecked}){
        let result=await changeCartState(goodid,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Errow('fail3'))
        }
    }
}
const mutations={
    REQCARTLIST(state,data){
        state.shopCartData=data
    }
}
const getters={
    shopCartData(state){
        return state.shopCartData[0] ||{}
    }
}
export default {
namespaced:true,
state,
actions,
mutations,
getters
}