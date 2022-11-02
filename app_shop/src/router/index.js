import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
Vue.use(VueRouter)
const router=  new VueRouter({
    namespaced:true,
    routes:[
        {
            path:'/home',
            name:'home',
            component:Home,
            meta:{isShow:true}
        },
        {
            path:'/pay',
            name:'pay',
            component:Pay,
            meta:{isShow:true}
        },
        {
            path:'/trade',
            name:'trade',
            component:Trade,
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
            path:'/search/:keyWord?',
            name:'search',
            component:Search,
            meta:{isShow:true}
        },
        {
            path:'/detail/:goodid',
            name:'detail',
            component:Detail,
            meta:{isShow:true}
        },
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{isShow:true}
        },
        {
            path:'/shopcart',
            name:'shopcart',
            component:ShopCart,
            meta:{isShow:true}
        },
        // 路由重新定向
        {path:'/', redirect: '/home'}, 
        
    ]
})
// router.beforeEach((to,from,next)=>{
//     // 开始对token进行判断 首先有没有token 有的话 过期了吗？
//     let token=localStorage.getItem('Token')
//     console.log("store.state.user",store.state.user.userInfo
//     );
//     let name=store.state.user
//     //console.log(name);
//     if(token){
//         // 是否过期了吗？ 过期了name就为undefined了 
//         if(name){

//         }
//     }else{
//         // 这里就是 没有token 进来的分支
//     }
// })
export default router