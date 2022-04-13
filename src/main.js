import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import toast from 'components/common/toast';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;
// 安装自定义的toast插件
Vue.use(toast);

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

var vm = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
