import axios from 'axios';
import storageService from 'service/storageService';

const request = axios.create({
    baseURL:'http://127.0.0.1:9998',
    timeout:5000
})


//拦截器，动态的更新每一次请求头
request.interceptors.request.use(config=>{


    Object.assign(config.headers,{ Authorization: `Bearer ${storageService.get('token')}` })
    
    return config
},err=>{
    //console.log(err);
});

export default request

export function request1(queryP){
    return axios({
        ...queryP,
        baseURL:'http://127.0.0.1:9998',
        timeout:5000
    })
}  
