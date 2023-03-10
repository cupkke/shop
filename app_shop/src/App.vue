<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
   Header,
   Footer
  },
  // 放在app组件里面 是只让请求发一次 就够了 发一次请求 就放在vuex里面 让后面的直接使用 而不是不停的发请求
  mounted(){
  // 向vuex发请求以拿到想要三级目录的数据
  this.$store.dispatch('home/reqCategoryList')
  console.log("@@@@@",this.$route);
},
}
</script>

<style>

</style>
