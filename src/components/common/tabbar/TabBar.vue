// 底部导航栏的组件
<template>
  <div id="tab-bar">
      <slot>

      </slot>
    </div>
</template>

<script>
import TabBarItem from './TabBarItem.vue'
export default {
    name:'TabBar',
    components:{
        TabBarItem,
    }
}
</script>

<style>
  #tab-bar{
    display: flex;
    background-color: #fff;
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 3px rgba(100, 100, 100, 0.08);
  }
</style>