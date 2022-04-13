<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><span slot="center">购物街</span></nav-bar>
    <!-- tabControl -->
        <tab-control :titles="['流行','新款','精选']" 
        ref="tabControl0" @tabClick="tabClick" class="tab-control" v-show="isTabFixed"/>
    <!-- 自定义的滑动组件 -->
    <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll" 
    :pull-up-load="true" @pullingUp="loadMore">
        <!-- 轮播区域 -->
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
        <!-- 推荐区域 -->
        <recommend-view :recommends="recommends"/>
        <!-- 本周流行 -->
        <popular-view/>
        <!-- tabControl -->
        <tab-control :titles="['流行','新款','精选']" 
        ref="tabControl1" @tabClick="tabClick"/>
        <!-- 商品列表 -->
        <goods-list :goods="goods[currentType].list"/>
    </scroll>

    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" class="back-top"/>

  </div>
</template>

<script>
  // 导入导航组件
  import NavBar from 'components/common/navbar/NavBar';
  // 导入轮播组件
  import HomeSwiper from './childComps/HomeSwiper.vue';
  // 导入推荐组件
  import RecommendView from './childComps/RecommendView.vue';
  // 导入本周流行组件
  import PopularView from './childComps/PopularView.vue';
  // 导入tabcontrol组件
  import TabControl from 'components/content/tabControl/TabControl';
  // 导入商品组件
  import GoodsList from 'components/content/goods/GoodsList';
  // 导入自定义的滑动组件
  import Scroll from 'components/common/scroll/Scroll';

  // 导入混入对象
  import {backTopMixin} from 'common/mixin';


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
      Scroll,
    },
    // 组件中引入混入对象
    mixins:[backTopMixin],
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
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:null,
      }
    },
    mounted(){
      // 获取tabControl的offsetTop
      
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
        });
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
        };
        this.$refs.tabControl0.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
      },
      
      contentScroll(position){
        // 处理回到顶部按钮是否显示
        this.isShowBackTop = (-position.y) > 1000;

        // 决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      // 处理上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType);

        // 触发Scroll组件中的事件，以允许执行下一次的下拉加载更多
        this.$refs.scroll.finishPullUp();
        // 让Scroll的可滚动区域刷新，就不会出现数据加载完成后无法下拉的情况
        this.$refs.scroll.scroll.refresh();
      },
      // 轮播图片加载完成后执行的方法
      swiperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
      }
    },
    // 进入路由时执行
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY);
      this.$refs.scroll.refresh();
    },
    // 离开路由时执行
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y
    }

  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /deep/ .tab-control .demo{
    color: #fff;
  }
  ::v-deep .tab-control .demo{
    color: #fff;
  }
  .tab-control >>> .demo{
    color: #fff;
  }
</style>