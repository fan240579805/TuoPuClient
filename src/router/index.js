import Vue from 'vue'
import VueRouter from 'vue-router'

import userRouters from './modules/userRouters';
import homeRouters from './modules/homeRouters';
//导入store
import store from '@/store';


Vue.use(VueRouter)

  const routes = [
  ...userRouters,
  ...homeRouters,
  {
    path:'/',
    redirect:'/admin'
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局路由导航守卫
router.beforeEach((to, from, next) => {
  
  if(to.meta.auth){//如果去往的路由的 auth  to.meta.auth 为true，则需要登陆

    //判断用户是否已经登录(判断vuex中的 token是否存在)
    if(store.state.userModule.token !== null){// 存在
      next() // 放行
    }else{
      //没有登录，跳转登录页
      router.push({name : 'login'})
    }

  }else{// to 路由没有auth标记，不需要登陆
    next() //不需要登录，放行
  }

})

export default router
