import Vue from 'vue'

import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:
      [
        {
          path:'/msite',
          component: MSite,
          meta:{
            showFoot: true
          }
        },
        {
          path:'/order',
          component: Order,
          meta:{
            showFoot: true
          }
        },
        {
          path:'/profile',
          component: Profile,
          meta:{
            showFoot: true
          }
        },
        {
          path:'/search',
          component: Search,
          meta:{
            showFoot: true
          }
        },
        {
          path:'/login',
          component:Login
        },
        {
          path: '/shop',
          component: Shop,
          children: [
            {
              path : '/shop/goods',
              component: ShopGoods
            },
            {
              path : '/shop/ratings',
              component: ShopRatings
            },
            {
              path : '/shop/info',
              component: ShopInfo
            },
            {
              path : '',
              redirect: '/shop/goods'
            }
          ]
        },
        {
          path:'/',
          redirect:'/msite'
        }


      ]
  }


)

