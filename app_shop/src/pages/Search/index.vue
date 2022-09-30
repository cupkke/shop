<template>
<div>
     <h2>Search</h2>
     <h2>params: ---{{$route.params.keyWord}}</h2>
     <h2>query: ---{{$route.query.k}}</h2>
     <TypeNav></TypeNav>
</div>
</template>

<script>
import TypeNav from '@/components/TypeNav/index.vue';
export default {
    name: "Search",
    mounted() {
        console.log(this.$route);
    },
    components: { TypeNav }
}
</script>

<style>

</style>