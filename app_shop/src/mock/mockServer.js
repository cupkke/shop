// 首先引入这个Mock对象
import Mock from 'mockjs'
// 然后引入你自己准备好的想模拟的数据 json数据不需要对外暴露也跨域引用哦 
import banner from './banner.json'
import floor from './floor.json'
// 最后用Mock对象上的mock方法 来模拟数据 第一个参数请求地址，第二个参数请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
//  最后别忘记在入口文件使用一次mockserver 这个文件相当于一个小型服务器了