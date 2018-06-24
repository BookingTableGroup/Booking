<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form
         label-position="left" 
         label-width="80px" 
         :model="formRegister"
         :rules="rules"
         ref="formRegister">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formRegister.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formRegister.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formRegister.checkPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addUser">立即注册</el-button>
              <el-button @click="toLogin">返回登录</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script type="text/javascript">
  export default {
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('账户不能为空!'))
        } else if (!/^[0-9]{11}$/.test(value)) {
          return cb(new Error('请输入11位手机号码!'))
        } else {
          cb(); // 将判断传递给后面
        }

      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('密码不能为空!'))
         }else{
          cb();
         }
      }
      let checkPasswordAgain = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('再次输入密码不能为空!'))
         }else if(value !== this.formRegister.password){
          return cb(new Error('两次输入密码不一致!'));
         }else{
          cb();
         }
      }

      return{
        formRegister:{
          phone: '',
          password: '',
          checkPassword: ''
        },
        rules:{
          phone:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ],
          checkPassword:[
            {validator:checkPasswordAgain,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      // 用户注册
      addUser(){
        let user = this.formRegister;
        let formData = {
          phone: user.phone,
          password: user.password
        };
        // 表单验证
        this.$refs['formRegister'].validate((valid)=>{
          if(valid){
            this.$http.post('/api/register',formData)
            .then(res => {
              console.dir(res.data)
              if (res.data.error) {
                this.$message.error(res.data.error);
                return false;
              }else{
                //注册成功
                this.$message.success(`${res.data.message}`)
                this.$router.push('/')
              }
            })
            .catch(err => {
                this.$message.error(`${err.message}`)
            })
          }else{
            this.$message.error('表单验证失败!')
            return false;
          }
        })
      },
      toLogin() {
        this.$router.push('/')
      }
    }
  }
</script>
