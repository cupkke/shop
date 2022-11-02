// 创建一个整体结构
function Promise(executor){
    let self=this // 这里不先存这个this的话，后面的函数resolve的this指向的就是window了
    self.status='pending'
    self.data=undefined
    self.callback=[] // 数组的每一项都包含了两个回调函数，分别为onResolved和onRejected

    function resolve(value){
        // 做一个判断 如果状态初始不为pending 那么我直接结束掉函数
        if(self.status!=='pending'){
            return
        }
        self.status='resolved'
        self.data=value
        // 如果说我提前指定好了回调函数，即回调函数的数组里面长度大于0 立即调用回调函数里面的onResolved
        if(self.callback.length>0){
            setTimeout(()=>{ // 放入任务队列里面执行所有成功的回调
                self.callback.forEach(callbackobj => {
                    callbackobj.onResolved(value)
                });
            })
        }
    }
    function reject(reason){
        self.status='rejected'
        self.data=reason
        if(self.callback.length>0){
            setTimeout(()=>{
                self.callback.forEach(callbackobj => {
                    callbackobj.onRejected(reason)
                });
            })
        }
    }
    // 如果我抛出了错误，那么promise依旧会进入失败状态，所以我们需要捕获异常
    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }

}
// 在Promise的原型对象上添加一个then方法 用来指定promise结果（成功或者失败）的回调 返回一个新的promise对象
Promise.prototype.then=function (onResolved,onRejected){
    let self=this
    // 假设当前状态仍是pending（还未执行resolve或者reject） 但是回调函数已经指定，那么我就把这个指定的回调函数先保存起来
    if(self.status=="pending"){
    self.callback.push({onResolved,onRejected})
    } 

}
// 原型对象上面还有catch方法 这个地方 只接收一个错误的回调方法 指定失败的回调函数，也是返回一个新的promise
Promise.prototype.catch=function(onRejected){

}
// 函数对象Promise上的方法resolve和reject 记得接受一个参数哦
Promise.resolve=function(value){
        
}
Promise.reject=function(reason){
        
}
// 函数对象上添加一个all 和race 方法 记得接收的参数为promise数组
Promise.all=function(promises){
        
}
Promise.race=function(promises){
        
}
// --------------



