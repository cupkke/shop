<template>
<div>
     <TypeNav></TypeNav>
     <List></List>
     <Recommend></Recommend>
     <Rank></Rank>
     <Like></Like>
     <Floor></Floor>
     <Brand></Brand>
</div>

</template>

<script>
import TypeNav from '../../components/TypeNav';
import List from './List/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

export default {
    name: "Home",
    components: { TypeNav, List, Recommend, Rank,  Like,Floor,Brand}
}
</script>

<style>

</style>