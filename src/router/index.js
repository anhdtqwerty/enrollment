import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import IDOPools from '@/views/IDOPools.vue'
import IDOSwap from '@/views/IDOSwap.vue'
import LookedPools from '@/views/LookedPools.vue'
import PancakeSwap from '@/views/PancakeSwap.vue'
import ProviderRegister from '@/views/ProviderRegister.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/IDOPools',
    name: 'IDOPools',
    component: IDOPools,
  },
  {
    path: '/IDOSwap',
    name: 'IDOSwap',
    component: IDOSwap,
  },
  {
    path: '/LookedPools',
    name: 'LookedPools',
    component: LookedPools,
  },
  {
    path: '/PancakeSwap',
    name: 'PancakeSwap',
    component: PancakeSwap,
  },
  {
    path: '/ProviderRegister',
    name: 'ProviderRegister',
    component: ProviderRegister,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
