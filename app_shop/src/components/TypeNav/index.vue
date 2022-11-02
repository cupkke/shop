<template>
  <div class="type-nav">
    <div class="container">
      <div></div>
      <h2 class="all" @mouseenter="mouseover" @mouseleave="mouseleave">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" @mouseleave="leaveIndex"  v-show="show">
      <!-- 三级菜单联动 -->
        <div class="all-sort-list2" @click="goSearch ">
          <div class="item" v-for="c1,index in categoryList" :key="c1.categoryId" @mouseenter="getIndex(index)" :class="{currentbg: currentIndex==index}">
            <h3>
              <a :data-categoryname="c1.categoryName" :data-category1id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <!-- 二 三级菜单 -->
            <div class="item-list clearfix" :style="{display:currentIndex==index? 'block' : 'none'}">
              <div class="subitem"  v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryname="c2.categoryName" :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryname="c3.categoryName" :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name:'TypeNav',
    data(){
      return{
        currentIndex:-1 ,
        show:true
      }
    },

    computed:{
      ...mapState('home',['categoryList'])
    },
    methods:{
      // 鼠标移入三级菜单事件
      getIndex(index){
        // console.log(index);
        this.show=true
        this.currentIndex=index // 拿到鼠标当前所在的索引值
      },
      // 鼠标移出三级菜单事件 
      leaveIndex(){
        this.currentIndex=-1
                if(this.$route.path!=='/home'){
        this.show=false
        }
      },
      // 两个问题 你怎么确定你点的是a节点 而不是空白地方？ 第二个问题 你就算确定了a节点 你怎么确定你选中的是几级菜单中的a节点？
      goSearch(e){ 
        let Element=e.target //这里会解析出来 你点击的标签身上是否又自己自定义的属性，注意此时你的自定义属性必须要以data-开头 并在此时返回给你一个对象
        // 运行es6语法 直接解析出来elment.dataset里面的对象属性  并且准备进行下一步的判断
        let {categoryname,category1id,category2id,category3id}=Element.dataset
        if(categoryname){ // 如果点击的是菜单 
            const location={name:'search'}
            const query={categoryName:categoryname} // 如果点击的属性里面又catagroyname这个属性 则为a标签 准备进行 二三级菜单的判断
          if(category1id){
          // 假如是一级菜单
          query.category1Id=category1id
          }else if(category2id){
          // 假如是二级菜单
          query.category2Id=category3id
          }else if(category3id){
          // 假如是三级菜单
          query.category3Id=category3id
          }
          //  此时 loaction和query为两个对象，我们需要将他动态的整合到一起，于是动态的给loaction加上一个属性为query，值为我们自己指定的值
          location.query=query
          // 整理完全部参数后 准备跳转
          if(this.$route.params){
            location.params=this.$route.params
          }
          this.$router.push(location)
        }
      },
      // 如果不是在home组件下 我们让鼠标移入进去三级菜单就显示 移除的话我就让他不显示
      mouseover(){
        if(this.$route.path!=='/home'){
        this.show=true
        }
      },
      mouseleave(){
        if(this.$route.path!=='/home'){
        this.show=false
        }
      }
    },
    mounted(){
      if(this.$route.path!=='/home'){
        this.show=false
        }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
        
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              // display: block;
            }
          }
        }
          .currentbg{
            background: skyblue;
          }
      }
    }
  }
}
</style>