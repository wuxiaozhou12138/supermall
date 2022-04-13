<template>
    <div class="cart-list">
        <scroll class="content" :probeType="3" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
        </scroll>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Scroll from 'components/common/scroll/Scroll.vue';
    import CartListItem from './CartListItem.vue';
    export default {
        name:"CartList",
        computed:{
            ...mapGetters(['cartList'])
        },
        components:{
            Scroll,
            CartListItem,

        },
        activated(){
            this.$refs.scroll.refresh();
        }
    }
</script>

<style scoped>
    .cart-list{
        height: calc(100vh - 93px - 40px);
    }
    .content{
        height: 100%;
        overflow: hidden;
    }
</style>