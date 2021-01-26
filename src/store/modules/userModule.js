
import storageService from 'service/storageService';
import userService from 'network/userService';

const userModules = {
    state: {
        token: storageService.get('token')
    },
    mutations: {
        setToken(state,newToken){

            // 将新的token保存到本地缓存
            storageService.set('token',newToken)

            // 更新vuex中的token
            state.token = newToken
        }
    },
    actions: {
        registerActions(context,user){
            return new Promise((resolve,reject)=>{
                userService.userRegister(user).then(res =>{
                    
            
                    context.commit('setToken',res.data.data.token)
                    
                    // return userService.Info()
                    
                  }).then(res =>{
                    resolve(res)
                  }).catch(err =>{
                    reject(err)
                  })
            })
 
        },
        loginActions(context,user){
            return new Promise((resolve,reject)=>{
                userService.userLogin(user).then(res => {
                    resolve(res)
                    
                    //保存token和用户信息
                    context.commit('setToken',res.data.data.token)
                    // 用户信息
                    // return userService.Info()
                  }).catch(err=>{
                    reject(err)
                  })
            })
        },
        logoutActions(context){
            
            //清空token
            context.commit('setToken','')

            window.location.replace('/login')
        }
    },
    modules: {
    }
}

export default userModules