<template>
    <div class="pagination">
        <button :disabled="pageNow==1" @click=getPageNow(pageNow-1) >上一页</button>
        <button v-show="3<pageNow"  :class="{active:pageNow==1}" @click=getPageNow(1)>1</button>
        <button v-show="pageNow>3">···</button>
  
        <button v-for="page in arr" :key="page" :class="{active:pageNow==page}" @click=getPageNow(page)>{{page}}</button>

        
        <button v-show="end<totalPage">···</button>
        <button v-show="end<totalPage" :class="{active:pageNow==totalPage}"> {{totalPage}}</button>
        <button  :disabled="pageNow==totalPage" @click=getPageNow(pageNow+1)>下一页</button>
        
      <button style="margin-left: 30px">共 {{totalPage}} 页</button>
    </div>
  </template>
<script>

export default {
name:'Pagination',
props:['pageNow','pageSize','totalData'],
data(){
    return {
        // 用来确定中间遍历的数组
        arr:[],
        start:this.pageNow-2,
        end:this.pageNow+2
        }
},
methods:{
    // 通信装备 把这边我点到了第几页 送给子组件search
    getPageNow(page){
        console.log("111");
        this.$bus.$emit('getPageNow',page)
    }
},
computed:{
    // 确定总页数的
    totalPage(){
        return Math.ceil(this.totalData/this.pageSize)
    },
},
watch:{
    immediate:true,
    pageNow:{
        immediate:true,
        handler(nv,old){
        console.log("bian hua le ");
        let arr=[]
        this.start=nv-2
        this.end=nv+2
        if(this.end>this.totalPage){
            this.end=this.totalPage
            this.start=this.end-4
        }
        if(this.start<=0){
            this.start=1
            this.end=5
        }
        for(let i=this.start;i<=this.end;i++){
            arr.push(i)
        }
        this.arr=arr
        }
    }
},
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>