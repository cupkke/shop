import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
Vue.use(VueRouter)
export default  new VueRouter({
    namespaced:true,
    routes:[
        {
            path:'/home',
            name:'home',
            component:Home,
            meta:{isShow:true}
        },
        {
            path:'/login',
            name:'login',
            component:Login,
            meta:{isShow:false}
        },
        {
            path:'/register',
            name:'register',
            component:Register,
            meta:{isShow:false}
        },
        {
            path:'/search/:keyWord',
            name:'search',
            component:Search,
            meta:{isShow:true}
        },
        // 路由重新定向
        {path:'/', redirect: '/home'}, 
        
    ]
})