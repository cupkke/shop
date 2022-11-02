// 这里我准备对axios进行二次封装
import axios from 'axios'
// 引入进度条  其中有start和done方法 表示进度条的开始和结束
import nProgress from 'nprogress'
console.log("nProgress:",nProgress);
// 引入进度条的样式 这里就是默认的样式
import 'nprogress/nprogress.css'
// 其实是个青春版axios 是你单独配置过的
const requests =axios.create({
    // 基础路径，自动会加上的
    baseURL:'/api',
    // 代表超时的时间 5s
    timeout:5000
})
// 设置请求拦截器
requests.interceptors.request.use((config)=>{
    // config是一个配置对象，其中有个属性很重要 是请求头
    // 看看是否有uuid呀？ 有的话带上啊！
    let userTempId=localStorage.getItem('nanoid')
    if(userTempId){
        config.headers.userTempId=userTempId
    }
    // 看看是否有Token 啊  有的话 带上啊！
    let token=localStorage.getItem('Token')
    if(token){
        console.log("有token 并且token已经在请求头了带上了");
        config.headers.token=token
    }
    nProgress.start()
    return config
})
// 设置一个响应拦截器，分别对应请求成功和失败的回调
requests.interceptors.response.use((response)=>{
     // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nProgress.done()
    return response.data;
},(error)=>{
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    
    return Promise.reject(error); // 终结我们promise的错误
})
export default requests