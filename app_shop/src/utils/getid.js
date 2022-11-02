import { nanoid } from 'nanoid'
export const  getNanoid= ()=>{
// 首先判断本地存储里面有没有nanoid？
let nanoId=localStorage.getItem('nanoid')
// 如果没有id那我们就手动创建并且加入到本地存储 有的话就不执行这个if了
if(!nanoId){
    nanoId=nanoid()
    localStorage.setItem('nanoid',nanoId)
}
return nanoId
}