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