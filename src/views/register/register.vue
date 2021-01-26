<template>
  <div class="register">
    <div class="Form">
      <div class="registerForm">
        <!-- :model="user"绑定表单对应的数据对象 
             :rules="registerRules" 绑定需要的表单验证规则-->
        <el-form :model="user" :rules="registerRules" ref="registerForm">
          <!-- prop="name" 为form item 绑定对应的registerRules.name表单规则 -->
          <el-form-item prop="name">
            <el-input
              prefix-icon="el-icon-user"
              placeholder="用户名"
              v-model="user.name"
            ></el-input>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-input
              prefix-icon="el-icon-phone"
              v-model="user.telephone"
              placeholder="手机号"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-message"
              placeholder="邮箱"
              v-model="user.email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="user.password"
              placeholder="密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="indentify-zoom">
              <el-row :span="24">
                <el-col :span="8">
                  <identify :identifyCode="identifyCode" @click.native="refreshCode" />
                </el-col>
                <el-col :span="16">
                  <el-input
                    prefix-icon="el-icon-lock"
                    v-model="user.code"
                    placeholder="验证码"
                    maxlength="4"
                  >
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item class="btns">
            <div style="float:left;margin-right: 230px; font-size: 12px;">已有账号，点击<router-link to="login">登录</router-link></div>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import userService from "network/userService";
import storageService from "service/storageService";
import identify from "components/common/Identify/identify";

import validator from "common/utils";

export default {
  name: "register",
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      user: {
        name: "",
        telephone: "",
        email: "",
        password: "",
        code: "",
      },
      identifyCodes: "1234567890",
      identifyCode: "",
      //element 表单的验证规则
      registerRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度在大于3个字符", trigger: ["blur", "change"] },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: ["blur", "change"] },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度必须为11位", trigger: ["blur", "change"] },

          // validator: validator.telephoneVa element-ui自定义表单验证器
          { validator: validator.telephoneVa, trigger: ["blur", "change"] },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: ["blur", "change"],
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateCode, trigger: ["blur", "change"] },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["registerActions"]),
    register() {
      this.$refs.registerForm.validate((vaild) => {
        if (!vaild) {
          // element toast弹窗警告
          this.$message.error("您输入的数据有误，请重新输入");
          return;
        } else {
          this.registerActions(this.user)
            .then((res) => {
              //注册成功，跳转路由
              this.$message.success("注册成功");
              this.$router.push("/admin");
            })
            .catch((err) => {
              // 注册失败
              this.$message.error(err.response.data.Err);
            });
        }
      });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
  },
  components: {
    identify,
  },
  created() {
    this.refreshCode();
  },
};
</script>

<style scoped>
.register {
  height: 100%;
  background-color: darkslateblue;
}
.Form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  height: 400px;
  transform: translate(-50%, -50%);
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
}
.registerForm {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
