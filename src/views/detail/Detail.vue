<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="detail-content" ref="scroll" @scroll="contentScroll" :probeType="3" >
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo" ref="param"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top v-show="isShowBackTop" @click.native="backClick"/>
    </div>
</template>

<script>

    import DetailNavBar from './childComps/DetailNavBar'; //导航区域
    import DetailSwiper from './childComps/DetailSwiper'; //轮播区域
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';  //网络请求方法
    import DetailBaseInfo from './childComps/DetailBaseInfo.vue'; //商品信息
    import DetailShopInfo from './childComps/DetailShopInfo.vue'; //店铺信息
    import Scroll from '../../components/common/scroll/Scroll.vue'; //滚动组件
    import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'; //商品详情
    import DetailParamInfo from './childComps/DetailParamInfo.vue'; //参数信息
    import DetailCommentInfo from './childComps/DetailCommentInfo.vue'; //评论区
    import GoodsList from '../../components/content/goods/GoodsList.vue'; //推荐列表
    import {debounce} from '@/common/utils'; //防抖函数
    import DetailBottomBar from './childComps/DetailBottomBar.vue'; //底部工具栏
    import {backTopMixin} from 'common/mixin'; // 导入混入对象


    export default {
        name:'Detail',
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTops:[0],
                getThemeTopY:null,
                currentIndex:0,
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,

            },
        // 组件中引入混入对象
        mixins:[backTopMixin],
        created(){
            // 1.保存传入的iid
            this.iid = this.$route.params.iid;
            // 2.根据这个iid请求详情页数据
            getDetail(this.iid).then(res => {
                // ①获取轮播图的数据
                const data = res.result;
                this.topImages = data.itemInfo.topImages;
                // ②获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
                // ③获取店铺信息
                this.shop = new Shop(data.shopInfo,data);
                // ④获取商品详情数据
                this.detailInfo = data.detailInfo;
                // ⑤获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
                // ⑥获取评论信息
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0];
                }

            })
            // 3.请求推荐数据
            getRecommend().then( res => {
                this.recommends = res.data.list;
            })
            // 4给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
                this.themeTops = [];
                this.themeTops.push(0);
                this.themeTops.push(this.$refs.param.$el.offsetTop);
                this.themeTops.push(this.$refs.comment.$el.offsetTop);
                this.themeTops.push(this.$refs.recommend.$el.offsetTop);
                this.themeTops.push(Infinity);
                // console.log(this.themeTops);
            },200)

        },
        methods:{
            imageLoad(){
                this.$refs.scroll.scroll.refresh();
                this.getThemeTopY();
            },
            titleClick(index){
                this.$refs.scroll.scroll.scrollTo(0,-this.themeTops[index] + 44,500)
            },
            contentScroll(position){
                // 1.获取y轴的值
                const positionY = -position.y + 44;
                // 2.positionY和主题中的值对比
                let length = this.themeTops.length;
                for(let i = 0;i < length - 1;i ++){
                    if (this.currentIndex !== i && 
                    (positionY >= this.themeTops[i] && positionY < this.themeTops[i + 1])){
                        this.currentIndex = i;
                        this.$refs.nav.currentTitleIndex = this.currentIndex;
                    }
                };
                // 处理回到顶部按钮是否显示
                this.isShowBackTop = (-position.y) > 1000;  
            },
            addToCart(){
                // 1.获取购物车需要展示的信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                // 2.将商品添加到购物车
                this.$store.commit('addCart',product);
                console.log('已添加购物车');
                // 3.提示
                this.$toast.show('加入购物车成功')
            }
        },
    }
</script>

<style scoped>
    .detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: calc(100vh - 93px);
    }
    .detail-content{
        height: 100%;
    }
    .detail-nav{
        position: relative;
        z-index: 99;
        background-color: #fff;
    }
</style>