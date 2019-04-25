import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/recommend"
    },
    {
      path: "/singer",
      component: (resolve) => {import('@/views/Singer.vue').then((module) => {
        resolve(module)
      })},
      children:[
        {
          path:':id',
          component: () => import('@/views/SingerDetail.vue')
        }
      ]
    }, 
    {
      path: "/recommend",
      component: () => import('@/views/Recommend.vue')
    },
    {
      path: "/rank",
      component: () => import('@/views/Rank.vue')
    },
    {
      path: "/search",
      component: () => import('@/views/Search.vue')
    }
  ]
})
