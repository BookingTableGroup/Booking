<template>
  <div id="container">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/home">主页</router-link></el-menu-item>
    </el-menu>
    <div>
        <top></top>
    </div>
    <div id="top_image"></div>
    <div id="time">
       <p id="timeTitle">时间</p>
       <img id="calendarIcon" src="../assets/icon/calendar.png" hspace = "5" />
       <br/><br/><br/>

      <el-select v-model="addForm.time" placeholder="请选择预订时间" class="timeArea">
        <el-option label="11:00-14:00" value="11:00-14:00"></el-option>
        <el-option label="17:00-21:00" value="17:00-21:00"></el-option>
      </el-select>

    </div>

    <div id="table" >
      <p id="tableTitle">餐桌</p>
      <img id="chairIcon" src="../assets/icon/chair.png" hspace = "5" />
      <div id="table1" >
        <img id="circle" src="../assets/18.png" />
        <p id = "peopleNum">8人桌</p>
        <img id="star" src="../assets/2.png" />
        <img id="tableSample" src="../assets/8.png" />
        <input type="radio" id="choose" value="8" v-model="addForm.table">
      </div>

      <div id="table2" >
        <img id="circle" src="../assets/18.png" />
        <p id = "peopleNum">10人桌</p>
        <img id="star" src="../assets/2.png" />
        <img id="tableSample" src="../assets/10.png" />
        <input type="radio" id="choose" value="10" v-model="addForm.table">
      </div>

      <div id="table3" >
        <img id="circle" src="../assets/18.png" />
        <p id = "peopleNum">16人桌</p>
        <img id="star" src="../assets/2.png" />
        <img id="tableSample" src="../assets/16.png" />
        <input type="radio" id="choose" value="16" v-model="addForm.table">
      </div> 
    </div>
    <div id="space"></div>
     <div>
      <br/>
      <button type="button" id = "tableButton1" v-on:click="add">确认订单</button>
      <button type="button" id = "tableButton2" v-on:click="cancel">取消订单</button>
     </div>

     <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        >
        <span>餐桌预订成功!是否需要预订菜品？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="yes">是 的</el-button>
          <el-button  @click="no">不需要</el-button>
        </span>
     </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      addForm: {
        phone: localStorage.getItem('user'),
        table: "",
        time:""
      }
    }
  },
  methods: {
    add: function() {
      if (this.addForm.table != "" && this.addForm.time !="") {
        this.$http.post('/api/book', this.addForm).then(
        function(response) {
          if (response.ok) {
            this.$message({
              message: "桌子预订成功",
              type: "success"
              });
              this.dialogVisible = true;
          } else {
            this.$message({
                  type: "error",
                  message: "桌子预订失败!"
                });
          }
        }
        );
      } else {
        this.$message({type: "error",message: "请选择预订时间和桌号！"});
      }
      
    },
    cancel: function() {
      this.$router.push('/home')
    },
    yes: function() {
      this.dialogVisible = false;
      this.$router.push('/food');
    },
    no: function() {
      this.dialogVisible = false;
      this.$router.push('/home');
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  #container {
    height: 400px;
    /* border: 1px solid blue; */
  }
  #top_image {
    background-image: url('../assets/bg3.jpeg');
    background-size:cover;
    height: 250px;
  }
  #space {
     margin-top:10px;
    float: right;
    height: 20px;
    width: 80%;
    /* border: 2px solid rgb(110, 86, 7); */
  }
  #table {
    border: 1px solid rgb(051, 069, 091);
    margin-top:10px;
    float: right;
    height: 400px;
    width: 80%;
    /* border: 2px solid rgb(110, 86, 7); */
    background-color: white;
    box-shadow: #666 0px 0px 10px;
    overflow: hidden;
  }
  #table1 {
    float: left;
    margin-top:10px;
    margin-left:100px;
    height: 250px;
    width: 20%;
    border: 1px solid rgb(051, 069, 091);
    background-color: rgb(252, 252, 252);
    border-radius: 8px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
  #table2 {
    float: left;
    margin-top:10px;
    margin-left:100px;
    height: 250px;
    width: 20%;
    border: 1px solid rgb(051, 069, 091);
    background-color: rgb(252, 252, 252);
    border-radius: 8px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
  #table3 {
    float: left;
    margin-top:10px;
    margin-left:100px;
    height: 250px;
    width: 20%;
    border: 1px solid rgb(051, 069, 091);
    background-color: rgb(252, 252, 252);
    border-radius: 8px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
  #time {
    border: 1px solid rgb(051, 069, 091);
    margin-top:10px;
    float: left;
    height: 400px;
    width: 19%;
    border: 1% solid rgb(110, 86, 7);
    background-color: white;
    box-shadow: #666 0px 0px 10px;
  }
  #timeTitle{
    margin-top: 12px;
    float: left;
    width: 40%;
    /*color: rgb(110, 86, 7);*/
    font-size: 30px;
    font-family: Roboto;
  }
  #tableTitle{
    margin-top: 12px;
    float: left;
    width: 11%;
    /*color: rgb(110, 86, 7);*/
    font-size: 30px;
    font-family: Roboto;
  }
  .timeArea {
  width: 96%;
}
  #tableButton1 {
    background-color:rgb(051, 069, 091);
    border: none;
    color: white;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    margin-left:500px;
    box-shadow: #666 0px 0px 10px;
  }
  #tableButton2 {
    background-color:rgb(051, 069, 091);
    border: none;
    color: white;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    margin-left:100px;
    box-shadow: #666 0px 0px 10px;
  }
  #calendarIcon {
    margin-top: 12px;
    margin-left: 100px;
    width: 15%;
  }
  #chairIcon {
    margin-top: 1px;
    margin-left: 1000px;
    width: 4%;
  }
  #circle {
    float: left;
    margin-left: 10px;
    width: 14%;
  }
  #peopleNum{
    float: left;
    margin-top: 10px;
  }
  #tableSample{
    float: left;
    margin-top: 10px;
    height: 150px;
    width: 100%;
  }
  #choose{
    
    margin-top: 10px;
    height: 30px;
    width: 100%;
  }
  #star{
    float: right;
    margin-left: 30px;
    margin-top: 5px;
    width: 12%;
  }
</style>
