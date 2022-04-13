<template>
 <tab-bar>
   <tab-bar-item path="/home" activeColor="#ff5777">
     <img slot="item-icon" src="~assets/img/tabbar/home.svg">
     <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
   </tab-bar-item>
    <tab-bar-item path="/sort">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg">
       <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
       <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg">
       <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg">
       <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
       <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
       <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入导航组件
import TabBar from '@/components/common/tabbar/TabBar.vue';
import TabBarItem from '@/components/common/tabbar/TabBarItem.vue';

export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>
