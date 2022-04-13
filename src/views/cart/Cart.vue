<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <span slot="center">购物车（{{length}}）</span>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'; //导航
  import {mapGetters} from 'vuex'; //辅助函数
  import CartList from './childComps/CartList.vue';
  import CartBottomBar from './childComps/CartBottomBar.vue';


  export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      ...mapGetters({
        length:'cartLength',
      })
    },

  }
</script>

<style>
    .cart-nav{
      height: 44px;
      background-color: var(--color-tint);
      color: #fff;
    }
</style>