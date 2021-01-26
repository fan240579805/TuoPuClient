<template>
  <div class="login">
    <div class="Form">
      
      <div class="loginForm">
        <!-- :model="user"绑定表单对应的数据对象 
             :rules="LoginRules" 绑定需要的表单验证规则-->
        <el-form :model="user" :rules="LoginRules" ref="loginForm">
          <!-- prop="name" 为form item 绑定对应的LoginRules.name表单规则 -->
            <!-- <el-form-item prop="name">
                <el-input prefix-icon="el-icon-user"
                          placeholder="用户名"
                          v-model="user.name"></el-input>
            </el-form-item> -->
            <el-form-item prop="email">
                <el-input prefix-icon="el-icon-message"
                          placeholder="邮箱"
                          v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="el-icon-lock"
                          v-model="user.password"
                          placeholder="密码"
                          type="password"></el-input>    
            </el-form-item >
            <el-form-item prop="code">
              <div  class="indentify-zoom">
                <el-row :span="24">
                  <el-col :span="8">
                      <identify :identifyCode="identifyCode" @click.native="refreshCode"/>
                  </el-col>
                  <el-col :span="16">
                    <el-input prefix-icon="el-icon-lock"
                          v-model="user.code"
                          placeholder="验证码"
                          maxlength="4">
                    </el-input>   
                  </el-col>
                </el-row>
              </div> 
            </el-form-item >
            <div>
              <el-form-item class="btns">
                
                  <div class="relink">
                    <span>没有账号?点击</span>
                    <router-link to="/register">注册</router-link>
                  </div>
                  
                  <el-button type="primary" class="btn" @click="login">登录</el-button>
                
              </el-form-item>

            </div>

        </el-form>
      </div>        
    </div>
  </div>
</template>

<script>


  import {mapActions} from 'vuex';



  import identify from 'components/common/Identify/identify';
  export default {
    name:'Login',
    data() {
      const validateCode = (rule, value, callback) => {
        if (this.identifyCode !== this.user.code) {
            callback(new Error('请输入正确的验证码')) 
        } else {
            callback()
        }
      }
      return {
        user:{
          email:'',
          password:'',
          code:''
        },
        identifyCodes: '1234567890',
        identifyCode: '',
        //element 表单的验证规则
        LoginRules:{
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: ['blur' , 'change']}
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: validateCode, trigger: ['blur' , 'change'] }
          ]
        }
      }
    },
    methods: {
      ...mapActions(['loginActions']),
      randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
      },
      makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ]
            }
      },
      login(){
        this.$refs.loginForm.validate(vaild =>{
          if(!vaild) {
            // element toast弹窗警告
            this.$message.error('您输入的数据有误，请重新输入');  
            return
          }
          else{
            this.loginActions({email:this.user.email,password:this.user.password}).then(res =>{

              this.$message.success('登陆成功')
              this.$router.push('/admin')
            }).catch(err =>{

              this.$message.error(err.response.data.Err)
            })
          }
        })
      }
    },
    created() {
        this.refreshCode()
    },
    components:{
      identify
    }
  }
</script>

<style scoped>
    .login{
        height: 100%;
        background-color: darkslateblue;
    }
    .Form{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 450px;
        height: 300px;
        transform: translate(-50% , -50%);
        border: 1px solid #eee;
        border-radius: 5px;
        background-color: #fff;
    }
    .loginForm{
      position: absolute;
      bottom: 10px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      
    }

    .btns{
      position: relative;
    }

    .relink{
      position: absolute;
      top:10px;
      font-size: 10px;
      
    }
    
    .btn{
      float: right;
    }

</style>
