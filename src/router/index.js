import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/homepage/Home.vue'
import DocumentDetail from '@/views/document/DocumentDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ho-so',
    name: 'DocumentDetail',
    component: DocumentDetail,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
