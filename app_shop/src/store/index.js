import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
//  引入相关模块的vuex
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
// 还要记得对外暴露store类的一个实例
export default new vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})