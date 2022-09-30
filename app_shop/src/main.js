import Vue from 'vue'
import App from './App.vue'
import './assets/reset.css'
import router from './router/index'
// 引入vuex仓库
import store from '@/store'
Vue.config.productionTip = false
// 全局注册一下三级目录
import TypeNav from './components/TypeNav'
// 这里第一个参数是组件的名字，第二个参数是哪个组件
Vue.component(TypeNav.name,TypeNav)
// 测试  这里是分别引入 所有要加大括号啊记得
// import {reqCategoryList} from '@/api'
// reqCategoryList()
import './mock/mockServer'
new Vue({
  render: h => h(App),
  store, // 注册仓库 此时组件身上都多了一个￥store属性
  router, // 注册路由，此时组件身上都多了一个￥router ￥route属性
}).$mount('#app')
