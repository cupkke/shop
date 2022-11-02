// 对当前这个项目所有的接口进行统一管理 
import requests  from "./requests";
import mockRequests  from "./mockRequests";
// 先来个三级联动的 接口  http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
// 别忘记对外暴露，暴露这个函数，只要外部调用这个函数，就向服务器发起ajax请求，获得三级菜单的数据
export const reqCategoryList=()=>{
    // 返回的是一个promise对象
    return requests({url:'product/getBaseCategoryList',method:'get'})
}
// 继续对外暴露一个函数，这里是为了获得轮播图的mock数据 
export const reqBannerList=()=> {
    return mockRequests({url:'/banner',method:'get'})
}
// 得到home组件下的floor组件所需要的数据
export const reqFloorList=()=>{
    return mockRequests({url:'/floor',method:'get'})
}
// 获取搜索模块的数据哦 请求方式为post 而且需要带参数（带搜索框的内容）
export const reqSearchData=(params)=>{
    return requests({url:'/list',method:'post',data:params})
}
// 得到详细页的数据
export const reqDetailData=(goodid)=>{
    return requests({url:`/item/${goodid}`,method:'get'})
}
// 产品加入购物车或者修改购物车的数量
export const addShopCar=(goodid,goodNum)=>{
    return requests({url:`/cart/addToCart/${goodid}/${goodNum}`,method:'post'})
}
// 获得购物车的数据
export const reqCartList=()=>{
    return requests({url:'/cart/cartList',method:'get'})
}
// 删除购物车内的某个商品
export const deleteShopCart=(goodid)=>{
    return requests({url:`/cart/deleteCart/${goodid}`,method:'delete'})
}
// 改变购物车内的商品选中状态
export const changeCartState=(goodid,isChecked)=>{
    return requests({url:`/cart/checkCart/${goodid}/${isChecked}`,method:'get'})
}
// 获取验证码的接口
export const reqUserCode=(phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
// 注册新用户的接口 带的userInfo是一个对象 包含三个参数类型 分别为 phone password code（验证码）
export const userRegister=(userInfo)=>{
    return requests({url:'/user/passport/register',data:userInfo,method:'post'})
}
// 登录接口
export const userLogin=(data)=>{
    return requests({url:'/user/passport/login',data,method:'post'})
}
// 获得用户信息的接口
export const getUserInfo=()=>{
    return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}
// 获得用户地址接口MOCK
export const getUserAddressInfo=()=>{
    return mockRequests({url:'/address',method:'get'})
}
// 获取订单交易页信息
export const getUserTradeInfo=()=>{
    return requests({url:'/order/auth/trade',method:'get'})
}
// 提交订单的接口
export const subMitOrder=(tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
}
// 获取订单支付信息
export const getPayInfo=(orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}