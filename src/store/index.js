import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装插件
Vue.use(Vuex);

// 2.创建store对象
import mutations from './mutations';
import getters from './getters';
const store = new Vuex.Store({
    state:{
        cartList:[],
    },
    mutations,
    getters,
});

// 3.挂载到Vue实例上
export default store;