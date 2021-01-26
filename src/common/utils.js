  // element-ui自定义验证器  value为输入的值
  const telephoneVa = (rule,value,callback) => {
    let partten = /^1[3456789]\d{9}$/
    if(!partten.test(value)){
      callback(new Error('请输入正确的手机号'))
    }else{
      callback()
    }
  }
  
  
  

  //邮箱验证器
  const emailVa = (value) => /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value);

  export default {
    telephoneVa,
    emailVa
  }

 
  