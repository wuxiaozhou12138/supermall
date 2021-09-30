<template>
  <div class="tab-bar-item" @click="itemClick()">
      <slot v-if="!isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-active"></slot>
      <div :class="{active:isActive}">
          <slot  name="item-text"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String
    },
    computed:{
        isActive(){
            // 当前活跃状态的路由的路径是否包含这个组件中的path，不包含返回-1
            // 所有这个计算属性的值当不包含的时候返回false
            return this.$route.path.indexOf(this.path) !== -1;
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
        }
    }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    /* line-height: 49px; */
  }
  .tab-bar-item img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
  }
  .active{
      color: #ff5777;
  }
</style>