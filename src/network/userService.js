import request from './request';
import { _ } from 'core-js';

//1.注册，提交表单数据
const userRegister = (user)=>{
    return request.post('/api/Registerauth',user)
}



//2.注册成功时，请求userinfo用户数据
const Info = ()=>{
    return request.get('/api/userInfo')
}

// 登录
const userLogin = (user)=>{
    return request.post('/api/login',user)
}






export default {
    userRegister,
    Info,
    userLogin,
}