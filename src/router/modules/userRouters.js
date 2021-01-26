// 路由懒加载
const login = () => import('views/login/login')
const register = () => import('views/register/register')


const userRouters = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
]


export default userRouters