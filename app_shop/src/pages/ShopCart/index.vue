<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="item.isChecked" @click="changeChecked(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt"></div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('odd',-1,item)" >-</a>
            <input autocomplete="off" type="number" :value="item.skuNum" minnum="1" class="itxt" @change="handler('change',+$event.target.value,item)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum*item.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="delectItem(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox"  @click="allChecked(checked)" :checked="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedShopCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{CheckedSku}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{AllPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {throttle} from 'lodash'
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    data(){
      return{
        checked:this.isAllChecked,
        
      }
    },
    mounted(){
      // 获取个人购物车的数据
      this.getData()
    },
    methods:{
      // 定义一个方法 专门用来获取个人购物车的数据
      getData(){
      this.$store.dispatch('shopcart/reqCartList')
      },
      // 某个商品是否被选中 ? 是否修改了状态？
      changeChecked(item){
        item.isChecked=!item.isChecked
        let isChecked=item.isChecked ? '1': '0'
        console.log(isChecked);
        this.$store.dispatch('shopcart/changeCartState',{goodid:item.skuId,isChecked:isChecked}).then((value)=>{
          this.getData()
        },(reason)=>{
          alert('chu wen ti ',reason)
        })
      },
      // 全选
      allChecked(checked){
        if(checked){
          this.cartInfoList.forEach((item)=>{
            item.isChecked=true
          })
          this.checked=!checked
        }
        if(!checked){
          console.log("jinalile");
          this.cartInfoList.forEach((item)=>{
            item.isChecked=false
          })
          this.checked=!checked
        }
      },
      // 购物车内商品数量的增删 运用了节流
      handler:throttle(function(str,Num,item){
         // changeNum 是变化量
         let changeNum=0
        if(str=='add'){
          // 传进来的NUM是1 直接等于变化量
          changeNum=Num
          item.skuNum++
        }
        if(str=='odd'){
          //  传进来的NUM是-1 直接等于变化量 但是input内戎不能小于0 不然我就最小为0
          item.skuNum--
          item.skuNum<=0 ? item.skuNum=0 :changeNum=Num 
          //console.log(changeNum,typeof(changeNum));
        }
        if(str=='change'){
          let temp=item.skuNum
          //  传进来的NUM是用户输入的值 变化量=num-item.skuNum
          changeNum=Num-item.skuNum 
          // 如果用户输入的为负数 我直接让内容回去默认值
          if(Num<0){
            changeNum=0
            item.skuNum=temp
          }
          //console.log(changeNum);
        }
        // 还是一样的 如果成功 我指定一个 成功的回调 如果失败 指定一个失败的回调
        this.$store.dispatch('detail/addShopCar',{goodid:item.skuId,goodNum:changeNum}).then((value)=>{
          // 如果成功了 我就发送请求 再去 拿购物车的数据更新过来
          this.getData()
        },
        (reason)=>{
          alert('你好2.0，。失败了原因是：',reason);
        })
      },1000),

      // 删除某商品
      delectItem(item){
        // 触发仓库里面的delectShopCart 还是指定一个删除成功 或者删除失败的回调函数
        this.$store.dispatch('shopcart/deleteShopCart',item.skuId).then((value)=>{
          // 删除成功 拿数据渲染 
          this.getData()
        },(reason)=>{
          // 没成功 提示错误信息
          alert('chu wen ti l 3',reason)
        })
      },
      // 删除选中的商品
      deleteCheckedShopCart(){
        this.$store.dispatch('shopcart/deleteCheckedShopCart').then((value)=>{
          // 删除成功 拿数据渲染 
          this.getData()
        },(reason)=>{
          console.log("chu wen ti le 8",reason);
        })
      }
    },
    computed:{
      ...mapGetters('shopcart',['shopCartData']),
      cartInfoList(){
        return this.shopCartData.cartInfoList
      },
      AllPrice(){
        let sum =0
        this.cartInfoList.filter((item)=>{
          // 如果被选中我就计算进去 不选中的不计算
          if(item.isChecked=='1'){
            sum=sum+item.cartPrice*item.skuNum
          }
        }) 
        return sum
      },
      // 所选中的商品数量
      CheckedSku(){
        let num=0
        this.cartInfoList.filter((item)=>{
          if(item.isChecked=='1'){
            num++
          }
        })
        return num
      },
      // 是否全选了？
      isAllChecked(){
        console.log("mmm",this.cartInfoList);
        return this.cartInfoList.every(item=>
          item.isChecked=='1')
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>