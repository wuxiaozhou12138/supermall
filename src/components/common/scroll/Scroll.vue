<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name:'Scroll',
        props:{
            probeType:{
                type:Number,
                default:0,
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                scroll:null,
            }
        },
        mounted(){
            // 创建scroll对象
             this.scroll = new BScroll(this.$refs.wrapper,{
                 observeImage: true,
                 observeDOM:true,
                 click:true,
                //  是否监听滑动位置由父组件传递过来probeType属性决定
                 probeType:this.probeType,
                // 是否上拉加载更多由父组件传递过来pullUpLoad属性决定
                pullUpLoad:true,
                mouseWheel:false,
             });
            //  监听滚动的位置
            this.scroll.on('scroll',position => {
                this.$emit('scroll',position)
            });
            // 监听上拉事件
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
            });
        },
        methods:{
            finishPullUp(){
                this.scroll.finishPullUp();
            },
            scrollTo(x, y, time=500){
				this.scroll && this.scroll.scrollTo(x, y, time)
			},
            refresh(){
				this.scroll && this.scroll.refresh()
			}
        }

    }
</script>

<style scoped>

</style>