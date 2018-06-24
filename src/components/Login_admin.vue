<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form 
          label-position="left" 
          label-width="80px" 
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
          <el-form-item label="管理账号" prop="phone">
            <el-input v-model="formLogin.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLogin.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="login">管理员登录</el-button>
              <el-button @click="cancel">取消</el-button>
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
        }else{
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

      return{
        formLogin:{
          phone: '',
          password: ''
        },
        rules:{
          phone:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      login(){
        let user = this.formLogin;
        let formData = {
          phone: user.phone,
          password: user.password
        };
        // 表单验证
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            if (formData.phone=="admin"&& formData.password=="admin") {
              this.$message.success('管理员登录成功');
              this.$router.push('/list');
            } else {
              this.$message.error('管理员登录失败');
            }
          } else {
            this.$message.error('表单验证失败!')
          }
        });
      },

      cancel(){
        this.$router.push('/');
      }
    }
  }
</script>