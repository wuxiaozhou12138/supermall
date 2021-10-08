<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><span slot="center">购物街</span></nav-bar>
    <!-- 轮播区域 -->
    <home-swiper :banners="banners"/>
    <!-- 推荐区域 -->
    <recommend-view :recommends="recommends"/>
    <!-- 本周流行 -->
    <popular-view/>
    <!-- tabControl -->
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
    <!-- 商品列表 -->
    <goods-list :goods="goods[currentType].list"/>

  </div>
</template>

<script>
  // 导入导航组件
  import NavBar from 'components/common/navbar/NavBar';
  // 导入轮播组件
  import HomeSwiper from './childComps/HomeSwiper.vue';
  // 导入推荐
  import RecommendView from './childComps/RecommendView.vue';
  // 导入本周流行
  import PopularView from './childComps/PopularView.vue';
  // 导入tabcontrol
  import TabControl from 'components/content/tabControl/TabControl';
  // 导入商品
  import GoodsList from 'components/content/goods/GoodsList';


  // 导入网络请求函数
  import {getHomeData,getHomeGoods} from 'network/home';


  export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      PopularView,
      TabControl,
      GoodsList,
    },
    created(){
      // 请求多个数据 这里调用的是这个组件中的getHomeData函数，不是导入的
      this.getHomeData()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
      }
    },
    methods:{
      // 将导入的网络请求函数getHomeData保存到这个组件的函数中
      getHomeData(){
        getHomeData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      // 将导入的网络请求函数getHomeGoods保存到这个组件的函数中
      getHomeGoods(type){
        let page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      },


      // 事件监听相关方法

      // 切换商品列表的按钮
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      }
    }

  }
</script>

<style>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }
</style>