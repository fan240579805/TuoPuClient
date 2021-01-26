
//storage本地缓存服务

const set = (ItemName,value)=>{
    return localStorage.setItem(ItemName,value)
}


const get = (ItemName)=>{
    return localStorage.getItem(ItemName)
}


export default {
    set,
    get
}