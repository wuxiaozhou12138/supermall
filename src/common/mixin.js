import BackTop from 'components/content/backTop/BackTop'; //回到顶部

const backTopMixin = {
    components:{
      BackTop,
    },
    data(){
      return {
        isShowBackTop:false,
      }
    },
    methods:{
      // 点击回到顶部的函数
      backClick(){
         // scroll接收三个参数，前两个是x个y轴上的坐标，第三个参数是回到目标位置的时间
        this.$refs.scroll.scroll.scrollTo(0,40,500);
      },
    }
}

export {backTopMixin};