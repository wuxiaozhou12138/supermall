<template>
  <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" >
      </div>
      <div slot="center" class="titles">
          <div 
            v-for="(item, index) in titles" 
            :key="index" 
            class="title-item"
            :class="{active: currentTitleIndex === index}"
            @click="titleClick(index)">{{item}}</div>
      </div>
  </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';

export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles:['商品','参数','评论','推荐'],
            currentTitleIndex: 0,
        }
    },
    components: {
        NavBar,
    },
    methods: {
        backClick() {
            this.$router.push('/home');
            // this.$router.back()    返回上一个页面
            // this.$router.go(-1)    也是返回上一个页面
        },
        titleClick(index){
            this.currentTitleIndex = index;
            this.$emit('titleClick', index, 500);
        }
    },
}
</script>

<style scoped>
 .back img {
     width: 20px;
     height: 20px;
     vertical-align: middle;
     margin-left: 10px;
 }
 .titles {
     display: flex;
 }
 .titles .title-item{
     flex: 1;
 }
 .active {
     color: var(--color-tint);
 }
</style>