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
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'
import store from '@/store'
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
            path:'/center',
            name:'center',
            component:Center,
            redirect:'/center/myorder',
            meta:{isShow:true},
            children:[
                {
                    path:'/center/myorder',
                    name:'MyOrder',
                    component:MyOrder,
                },
                {
                    path:'/center/grouporder',
                    name:'GroupOrder',
                    component:GroupOrder,
                }
            ]
        },
        {
            path:'/paysuccess',
            name:'paysuccess',
            component:PaySuccess,
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
    // let arr=Object.keys(store.state.user.userInfo)
    // console.log(arr); 还是不行啊settimeout才行
router.beforeEach((to,from,next)=>{
    // 开始对token进行判断 首先有没有token 有的话 过期了吗？
    let token=localStorage.getItem('Token')
    // setTimeout(() => {
    //     let name=store.state.user.userInfo.name
    //     console.log("store.state.user",store.state.user.userInfo.name);
    // }, 1000);
    console.log(store);
    console.log(store.state);
    let name=store.state.user.userInfo.name
    if(token){
        console.log('you token');
        // 是否过期了吗？ 过期了name就为undefined了 
        if(name){
            // 没过期 那不让去登陆注册
            console.log('没过期');
            if(to.path=="/login" ||to.path=="/register"){
                next('/')
            }else{
                // 去其他地方 放行
                next()
            }
        }else{
            console.log('过期le');
            //store.dispatch('user/getUserInfo')
            let arr=['/trade','/pay','/paysuccess','center']
            let result=arr.some(item=>
                    to.path.indexOf(item)==0 // 如果有一个被匹配上了 就返回true
            )
            console.log(result);
            if(result){
                next('/login')
            }else{
                next()
            }
        }
    }else{
        // 这里就是 没有token 进来的分支 即未登录
        next()
    }
})
export default router