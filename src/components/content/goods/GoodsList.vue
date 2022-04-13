<template>
  <div class="goods" >
    <goods-list-item v-for="(item,index) in goods" 
    :goods-item="item" :key="index" ></goods-list-item>
  </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'
    export default {
        components: { GoodsListItem },
        name:'GoodsList',
        props:{
            goods:{
                type:Array,
                default:function(){
                    return []
                }
            },
        }
    }
</script>

<style>
    .goods{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>