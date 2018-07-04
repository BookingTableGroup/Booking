<template lang="html">

  <div class="list">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">返回登录界面</router-link></el-menu-item>
    </el-menu>
      <el-table
    :data="tableData"
    stripe
    element-loading-text="拼命加载中"
    header-row-class-name="tableHeader"
    v-loading.fullscreen.lock="loading"
    empty-text="亲，暂时没有数据哦"
    border
    align="center"
    style="width: 100%">
            <el-table-column
           
            prop="phone"
            label="电话"
            align="center"
            width="250">
            </el-table-column>

            <el-table-column
            prop="password"
            label="密码"
            align="center"
            width="250">
            </el-table-column>

            <el-table-column
            prop="table"
            label="桌子大小"
            align="center"
            width="200">
            </el-table-column>

            <el-table-column
            prop="time"
            label="预订时间"
            align="center"
            width="250">
            </el-table-column>
            
            <el-table-column
            label="操作"
            align="center"
            width="400">
              <template slot-scope="scope">
                  <el-button  size="small" type="success" @click="checkFood(scope.row['_id'])">查看菜品</el-button>
                  <el-button  size="small" type="success" @click="modify(scope.row)">修改</el-button>
                  <el-button type="danger" size="small" @click="deleteOrder(scope.row['_id'])">删除订单</el-button>                  
                  <el-button type="danger" size="small" @click="deleteDate(scope.row['_id'])">删除用户</el-button>
              </template>
            </el-table-column>
  </el-table>

    <!-- 新增数据 -->
  <el-dialog title="新增数据" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd">
  <el-form :model="addForm" class="addForm">

    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="addForm.phone" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="addForm.password" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="桌子大小" :label-width="formLabelWidth">
      <el-select v-model="addForm.table" placeholder="请选择桌号" class="tableArea">
        <el-option label="8人桌" value="8"></el-option>
        <el-option label="10人桌" value="10"></el-option>
        <el-option label="16人桌" value="16"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="预订时间" :label-width="formLabelWidth">
      <el-select v-model="addForm.time" placeholder="请选择预订时间" class="tableArea">
        <el-option label="11:00-14:00" value="11:00-14:00"></el-option>
        <el-option label="17:00-21:00" value="17:00-21:00"></el-option>
      </el-select>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改数据 -->
  <el-dialog title="修改数据" :visible.sync="modifyFormVisible" class="addArea" modal custom-class="addFormArea">
  <el-form :model="modifyForm" class="addForm">

    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.phone" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.password" auto-complete="off"></el-input>
    </el-form-item>


    <el-form-item label="桌子大小" :label-width="formLabelWidth">
      <el-select v-model="modifyForm.table" placeholder="请选择桌号" class="sexArea">
        <el-option label="8人桌" value="8"></el-option>
        <el-option label="10人桌" value="10"></el-option>
        <el-option label="16人桌" value="16"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="预订时间" :label-width="formLabelWidth">
      <el-select v-model="modifyForm.time" placeholder="请选择预订时间" class="tableArea">
        <el-option label="11:00-14:00" value="11:00-14:00"></el-option>
        <el-option label="17:00-21:00" value="17:00-21:00"></el-option>
      </el-select>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifySure">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="查看菜品" :visible.sync="foodVisible" size="tiny">
  <el-table :data="foodData.foods">
    <el-table-column property="name" label="菜名" align="center" width="257"></el-table-column>
    <el-table-column property="price" label="价格" align="center" width="257"></el-table-column>
  </el-table>
</el-dialog>

<el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加</el-button>
  
  </div>
</template>

<script>
export default {
  name: "list",
  data: function() {
    return {
      total: 0,
      tableData: [],
      foodData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      addpicVisible: false,
      foodVisible: false,
      modifyId: "",
      addForm: {
        phone: "",
        password: "",
        table: "",
        time:""
      },
      modifyForm: {
        phone: "",
        password: "",
        table: "",
        time:""
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    add: function() {
      this.addFormVisible = true;
    },
    addSure: function() {
      var that = this;

      this.addFormVisible = false;
      //调新增接口,在回调函数中刷新一次

      var addObj = this.addForm;

      this.$http.post("/api/user", addObj).then(
        function(res) {
          if (!res.data.error) {
            this.$message({
              message: "添加成功",
              type: "success",
              onClose: function() {
                that.getAll();
              }
            });
          } else {
            this.$message({
              message: "添加失败",
              type: "error"
            })
          }
        }
      );
    },
    // 关闭dialog的函数
    closeAdd: function() {
      this.addForm.phone = "";
      this.addForm.password = "";
      this.addForm.table = "";
      this.addForm.time = ""
    },
    //修改操作
    modify: function(row) {
      this.modifyFormVisible = true;
      this.modifyForm = Object.assign({}, row);
      this.modifyId = row["_id"];
    },
    modifySure: function() {
      var that = this;
      this.$http.put(`/api/user/${this.modifyId}`, this.modifyForm, {
          emulateJSON: true
        })
        .then(
          function(response) {
            if (response.ok) {
              this.modifyFormVisible = false;
              this.$message({
              message: "修改成功",
              type: "success",
              onClose: function() {
                that.getAll();
              }
            });
            }
          },
          function() {
            // this.loading = false;
          }
        );
    },
    // 删除用户操作
    deleteDate: function(id) {
      var that = this;
      var deleteId = id;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/api/user/${deleteId}`).then(
            function(response) {
              if (response.ok) {
                this.$message({
                  type: "success",
                  message: "删除用户成功!"
                });
                that.getAll();
              } else {
                this.$message({
                  type: "error",
                  message: "删除用户失败!"
                });
              }
            },
            function() {
              // this.loading = false;
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
        // 删除订单操作
    deleteOrder: function(id) {
      var that = this;
      var deleteOrderderId = id;

      this.$confirm("此操作将删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.put(`/api/deleteOrder/${deleteOrderderId}`).then(
            function(response) {
              if (response.ok) {
                this.$message({
                  type: "success",
                  message: "删除订单成功!"
                });
                that.getAll();
              } else {
                this.$message({
                  type: "error",
                  message: "删除订单失败!"
                });
              }
            },
            function() {
              // this.loading = false;
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看菜品
    checkFood: function(id) {
      this.foodVisible = true;
      var checkId = id;
      this.$http.get(`/api/user/${checkId}`).then(
            function(response) {
              if (response.ok) {
                this.foodData = response.body;
                for (let index = 0; index <  this.foodData.foods.length; index++) {
                    this.total = this.foodData.foods[index].price + this.total;
                }
              } else {
                this.$message({
                  type: "error",
                  message: "查询失败!"
                });
              }
            }
      );
    },
    // 获取全部数据
    getAll: function() {
      this.loading = true;
      this.$http.get("/api/user").then(
        function(response) {
          this.loading = false;
          this.tableData = response.body;
        },
        function() {
          this.loading = false;
          console.log("error");
        }
      );
    },
    //跳转至详情页面
    toDetail: function(id) {
      //通过这种方式也可以实现跳转
      this.$router.push(`/league/${id}`);
    }

  },

  //页面初始化进来查询数据
  mounted: function() {
    this.getAll();
  }
};
</script>

<style lang="css">
.tableHeader {
  color: #000;
}
div.list {
  width: 73.7%;
  margin: 0 auto;
}
.addBtn {
  margin: 50px auto 0;
  display: block;
}
.addArea .el-input {
  width: 200px;
}
.addPicArea .el-input {
  width: 500px;
}
.addForm {
  overflow: hidden;
}
.addForm .el-form-item {
  float: left;
}
.tableArea {
  width: 200px;
}
.addFormArea .el-dialog__header .el-dialog__title {
  text-align: left;
}
</style>

<!--by Mingyf 2018-05-->
<template>
<div class="admin" v-show="showAdmin">
  <div class = "admin_h1" v-html="title"></div>
  <div class = "line"> </div>
  <div id = "tablebox">
    <div class="leftbar">
      <div id = "homepageicon" @click="goHome($index)">
        <img id="adminIcon" src="../assets/14.png">
      </div>
      <div id = "adminicon">
        <img src="../assets/12.png">
        <br/>
        <div id="word" v-text = "admininfo"></div>
      </div>
    </div>
    <div class = "order">
      <span v-text = "orderList"> </span>
      <div class = "tablescroll">
        <table  class="table">
          <thead>
            <tr>
              <th class="text-center" style="color:white" v-text = "num"></th>
              <th class="text-center" style="color:white" v-text = "time"></th>
              <th class="text-center" style="color:white" v-text = "tabletyp"></th>
              <th class="text-center" style="color:white" v-text = "phonenum"></th>
              <th class="text-center" style="color:white" v-text = "foodmenu"></th>
              <th class="text-center" style="color:white" v-text = "operat"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="orderitem in orderitems">
              <td>{{orderitem.num}}</td>
              <td>{{ orderitem.time }}</td>
              <td>{{ orderitem.tabletype }}</td>
              <td>{{ orderitem.phonenumber  }}</td>
              <td><img src="../assets/food1.png" @click="seeMenu($index)"></td>
              <td><img src="../assets/3.png" @click="removeOrder($index)"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div id = "bottombar"> </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'admin',
  data: function () {
    return {
      title: '所有顾客订单信息',
      admininfo: '管理员：小明',
      orderList: '订单列表',
      num: '编号',
      time: '就餐时间',
      tabletyp: '桌型',
      phonenum: '联系人',
      foodmenu: '预订的菜单',
      operat: '操作',
      showAdmin: true,
      time1: '10:30-13:00',
      data: [],
      orderitems: [
        {
          num: '订单1',
          time: '11:00-14:00',
          tabletype: '8人桌',
          phonenumber: '13321037989',
          operation: 'delete'
        },
        {
          num: '订单2',
          time: '11:00-14:00',
          tabletype: '１0人桌',
          phonenumber: '15521030989',
          operation: 'delete'
        },
        {
          num: '订单3',
          time: '17:00-21:00',
          tabletype: '16人桌',
          phonenumber: '15521039989',
          operation: 'delete'
        },
        {
          num: '订单4',
          time: '17:00-21:00',
          tabletype: '1６人桌',
          phonenumber: '15521035989',
          operation: 'delete'
        }
      ]
    }
  },
  methods: {
    removeOrder: function (index) {
      alert('删除之后无法恢复，确认要删除吗？')
      this.orderitems.splice(index, 1)
    },

    seeMenu: function ($index) {
      this.$router.push('/query')
    },

    goHome: function ($index) {
      this.$router.push('/')
    }
  }

}
</script>

<style>

    .admin {
      margin-top:-3%;
    }

    #word {
      margin-right:20%;
      /*color: rgb(110, 86, 7);*/
      font-size: 20px;
      font-family: Roboto;
      color:white；
    }

    #word2 {
      float: left;
      /*color: rgb(110, 86, 7);*/
      font-size: 25px;
      font-family: Roboto;
      color:white
    }

    .line {
        margin-top:0.5%;
        width:100%;
        height:1%;
        border:solid 1px rgb(000, 188, 212);
        background:rgb(000, 188, 212);
    }

    .admin_h1 {
        width:100%;
        height:70px;
        margin-top:50px;
        text-align:left;
        padding-top:1%;
        background: white;
        font-size:30px;
        /*box-shadow: #666 0px 0px 10px;*/
    }
 
    #tablebox {
        width:100%;
        height:500px;
        margin:auto;
        margin-top:5px;
        border: solid 2px 2px 2px 2px rgb(000, 188, 212);
    }

    .leftbar {
        float:left;
        width:12%;
        height:100%;
        background: rgb(000, 188, 212);
        box-shadow: #666 0px 0px 4px;
    }

    #homepageicon {
        float:left;
        width:35px;
        height:30px;
        margin-top:2%;
        margin-left:2%;
    }

    #adminIcon {
        margin-right:2%;
        /*float:left;*/
        width:100%;
        height:95%;
    }

    #homepageicon:hover {
        cursor:pointer
    }

    #adminicon {
        width:70%;
        margin-top:60%;
        margin-left:23%;
        font-size:15px;
    }

    #adminicon img {
        margin-top:0%;
        margin-right:40px;
        width:80%;
    }

    #alerticon {
        width:45%;
        margin-top:15%;
        margin-left:auto;
        margin-right:auto;
    }

    #alerticon img {
        float:left;
        width:90%;
    }

    #alerticon span {
        float:right;
        font-size:13px;
    }

     .order {
        float:right;
        margin-top:1%;
        width:88%;
        height:98%;
        text-align:center;
    }

    .order span {
        font-size:25px;
        float:left;
        margin-left:2%;
        margin-top:-1.5%;
    }

    .tablescroll {
        margin-top:2%;
        margin-left:1.5%;;
        width:98%;
        height:90%;
        overflow-y:scroll;
        /*border: 0px solid rgb(000, 188, 212);*/
        
    }

    .table {
        margin-left:0px;
        width:100%;
        border-collapse:collapse;
        box-shadow: #666 0px 0px 10px;
    }

    .text-center {
        height:50px;
        border: solid 4px white;
        background: rgb(000, 188, 212);
    }

    td {
        height: 20px;
        border:solid 1.5px rgb(000, 188, 212);
        background: white;
    }

    tr img {
        cursor:pointer;
    }
</style>

