

const admin = () => import('views/adminPage/admin')

const homeRouters = [
    {
        path: '/admin',
        meta:{
          auth:true
        },
        component: admin
    },
]


export default homeRouters