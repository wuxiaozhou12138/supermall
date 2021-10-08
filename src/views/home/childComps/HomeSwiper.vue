<template>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index"> 
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>  
      </swiper-item>
    </swiper>
</template>

<script>
// 导入轮播组件
    import Swiper from 'components/common/swiper/Swiper';
    import SwiperItem from 'components/common/swiper/SwiperItem';
  
    export default {
        name:'HomeSwiper',
        props:{
            banners:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        components:{
            Swiper,
            SwiperItem    
        }
    }
</script>

<style>

</style>