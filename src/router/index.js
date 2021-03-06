import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/Home');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Sort = () => import('views/sort/Sort');
const Detail = () => import('views/detail/Detail');

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/sort',
      component:Sort
    },
    {
      path:'/detail/:iid',
      component:Detail
    },
  ],
  mode:'hash',
})

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};